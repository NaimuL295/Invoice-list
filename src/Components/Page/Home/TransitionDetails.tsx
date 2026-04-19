import { useQuery, useQueryClient } from "@tanstack/react-query";
import {

  EllipsisVertical,

  Share,
  Trash2,
} from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import PrintPreview from "../Settings/PrintSettings/PrintPreview";
import type { Invoice } from "../../../types/type";
import api from "../../../lib/axios";
import useAuthStore from "../../../store/useAuthStore";
import Swal from "sweetalert2";

export default function TransitionDetails() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const {
    data: invoices,
    isLoading,
    isError,
  } = useQuery<Invoice[]>({
    queryKey: ["invoices", user?.id],
    queryFn: async () => {
      const res = await api.get("/api/invoice", {
        params: { userId: user?.id },
        withCredentials: true,
      });
      return res.data.data;
    },
    enabled: !!user?.id,
  });

  const onDelete = async (id: number | undefined) => {
    if (!id) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    Swal.fire({
      title: "Deleting...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await api.delete(`/api/delete/${id}`, {
        withCredentials: true,
      });

      queryClient.setQueryData(
        ["invoices", user?.id],
        (old: Invoice[] | undefined) =>
          old ? old.filter((inv) => inv.id !== id) : []
      );

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Invoice has been deleted.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete invoice!",
      });
    }
  };

  // 🔄 Loading State
  if (isLoading) {
    return (
      <div className="p-6 text-center text-slate-500">
        Loading invoices...
      </div>
    );
  }

  // ❌ Error State
  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load invoices
      </div>
    );
  }

  // 📭 Empty State
  if (!invoices || invoices.length === 0) {
    return (
      <div className="p-6 text-center space-y-3">
        <p className="text-slate-500">
          You have not created any invoice yet.
        </p>

        <Link to="/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Create Invoice
          </button>
        </Link>
      </div>
    );
  }

  // ✅ Main UI
  return (
    // <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
    //   {invoices.map((inv: Invoice) => (
    //     <div
    //       key={inv?.id}
    //       className="relative bg-white border border-slate-100 rounded-xl p-1 shadow-sm hover:shadow-md transition-all duration-200"
    //     >
    //       <div className="flex flex-col space-y-4">
    //         {/* TOP ROW */}
    //         <div className="grid grid-cols-12 gap-2">
    //           {/* Info */}
    //           <Link
    //             to={`/modify/${inv?.id}`}
    //             className="col-span-8 grid grid-cols-2 gap-y-1 group"
    //           >
    //             <div>
    //               <p className="text-[10px] font-bold text-slate-400 uppercase">
    //                 Sale ID
    //               </p>
    //               <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600">
    //                 #{inv.id}
    //               </p>
    //             </div>

    //             <div>
    //               <p className="text-[10px] font-bold text-slate-400 uppercase">
    //                 Total
    //               </p>
    //               <p className="text-sm font-bold text-green-600">
    //                 ${inv?.subtotal}
    //               </p>
    //             </div>

    //              <p className="text-sm font-bold text-green-600">
    //                 ${inv?.due}
    //               </p>
    //           </Link>

    //           {/* Actions */}
    //           <div className="col-span-4 flex flex-col items-end justify-between border-l pl-3">
    //             <div className="flex items-center space-x-1">
    //               <PrintPreview
    //                 invoiceId={inv?.id?.toString() || ""}
    //               />

    //               <div className="relative">
    //                 <button
    //                   onClick={() =>
    //                     setOpenMenuId(
    //                       openMenuId === inv.id ? null : inv.id ?? null
    //                     )
    //                   }
    //                   className="p-1.5 hover:bg-slate-100 rounded-full"
    //                 >
    //                   <EllipsisVertical size={18} />
    //                 </button>

    //                 {openMenuId === inv.id && (
    //                   <div
    //                     onMouseLeave={() => setOpenMenuId(null)}
    //                     className="absolute right-0 mt-2 w-36 bg-white shadow-xl border rounded-lg p-1 z-50"
    //                   >
    //                     <button className="flex w-full items-center px-3 py-2 text-xs hover:bg-slate-50 rounded-md">
    //                       <Share size={14} className="mr-2" />
    //                       Share
    //                     </button>

    //                     <button
    //                       onClick={() => onDelete(inv?.id)}
    //                       className="flex w-full items-center px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-md"
    //                     >
    //                       <Trash2 size={14} className="mr-2" />
    //                       Delete
    //                     </button>
    //                   </div>
    //                 )}
    //               </div>
    //             </div>

    //             <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded">
    //               Sale
    //             </span>
    //           </div>
    //         </div>

    //         {/* BOTTOM */}
    //         <div className="border-t flex flex-wrap items-center gap-3 pt-2">
    //           <div className="flex items-center bg-amber-50 px-2 py-0.5 rounded">
    //             <Hash size={10} className="text-amber-600" />
    //             <span className="text-[10px] font-mono ml-1">
    //               {inv.id}
    //             </span>
    //           </div>

    //           <div className="flex items-center text-slate-500 text-[11px]">
    //             <CalendarDays size={12} className="mr-1" />
    //             {inv.createdAt
    //               ? new Date(inv.createdAt).toLocaleString()
    //               : "Pending"}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>

<div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
  {invoices.map((inv: Invoice) => {
    const total = inv.total || 0;
    const received = inv.received || 0;
    const due = total - received;

    return (
      <div
        key={inv.id}
        className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition relative"
      >
        <div className="flex justify-between items-start">

          {/* LEFT INFO */}
          <Link to={`/modify/${inv.id}`} className="space-y-1">
            <p className="text-xs text-gray-400">
              Invoice #{inv.id}
            </p>

            <p className="text-sm font-bold text-gray-800">
              Total ৳ {total}
            </p>

            <p className="text-sm font-semibold text-blue-600">
              Received ৳ {received}
            </p>

            <p
              className={`text-sm font-semibold ${
                due > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {due > 0 ? `Due ৳${due}` : "No Due"}
            </p>

            <p className="text-[11px] text-gray-500">
              {inv.createdAt
                ? new Date(inv.createdAt).toLocaleString()
                : "No Date"}
            </p>
          </Link>

          {/* RIGHT ACTION */}
          <div className="flex flex-col items-end gap-2">
            <PrintPreview invoiceId={inv.id?.toString() || ""} />

            <span
              className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                due > 0
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {due > 0 ? "UNPAID" : "PAID"}
            </span>

            <button
              onClick={() =>
             setOpenMenuId(openMenuId === inv.id ? null : inv.id ?? null)
              }
              className="text-gray-400 hover:text-black"
            >
              <EllipsisVertical size={18} />
            </button>

            {openMenuId === inv.id && (
              <div
                onMouseLeave={() => setOpenMenuId(null)}
                className="absolute right-6 mt-2 w-28 bg-white border shadow rounded-lg text-xs"
              >
                <button className="w-full px-2 py-2 hover:bg-gray-50 flex gap-1">
                  <Share size={12} /> Share
                </button>

                <button
                  onClick={() => onDelete(inv.id)}
                  className="w-full px-2 py-2 text-red-500 hover:bg-red-50 flex gap-1"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  })}
</div>
  );
}