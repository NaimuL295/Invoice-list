import { useQuery } from "@tanstack/react-query";
import api from "../../../lib/axios";
import { EllipsisVertical, Printer } from "lucide-react";
import useAuthStore from "../../../store/useAuthStore";
import { Link } from "react-router";

export default function TransitionDetails() {
   const {user}=useAuthStore()

const listInvoice = async () => {
  const res = await api.get("/api/invoice", {
    params: { userId: user?.id },
    withCredentials: true,
  });

  return res.data.data;
};
const { isPending, data } = useQuery({
  queryKey: ["invoices", user?.id],
  queryFn: listInvoice,
  enabled: !!user?.id,
});
   console.log(data,isPending);
  
  return (
    <>
    <div className="  max-w-2xl mx-auto px-2  ">
  {/* Top Row */}
  <div className="max-w-2xl mx-auto px-2 ">


{data?.map((inv:any)=>(
    <div key={inv?.id}  className="grid grid-cols-4 gap-1 text-center py-3 shadow-[-9px_4px_21px_17px_rgba(51,_65,_85,_0.12)]         rounded-md    ">
    {/* Top Row */}
    <span>Sale</span>
    <span>ID</span>
    <span></span> {/* empty for icon column */}
     <span className="">Date</span>
    {/* Bottom Row */}
    <span>Total</span>
    <span>Balance</span>
    <span></span>
    <span></span>

     <span>{inv?.received}</span>
    <span>{inv?.subtotal}</span>
    <div className="flex justify-end">
      <Printer 
      // single data click print
      />
    </div>
    <div className="flex justify-center">
      <Link to={`/`}><EllipsisVertical /></Link>
    </div>
  </div>
))}


</div>
</div>
    </>
  );
}



