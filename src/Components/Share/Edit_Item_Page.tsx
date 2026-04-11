
import { useParams, useNavigate } from "react-router";
import { useInvoiceStore, type Item } from "../../store/useInvoiceStore";
import { useState } from "react";

export default function Edit_Item_Page() {
  const { id } = useParams<{ id: string }>();
  const items = useInvoiceStore((state) => state.items);
  const editItem = useInvoiceStore((state) => state.editItem);
  const navigate = useNavigate();

  const itemId = Number(id);


  const [currentItem, setCurrentItem] = useState<Item | null>(
    items.find((i) => i.id === itemId) || null
  );

  const units = ["Box", "Pieces (pcs)", "Kilogram (kg)", "Gram (g)", "Liter (l)", "Meter (m)"];


  if (!currentItem) {
    return <div className="text-center mt-10 text-red-500">Item not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editItem({
      ...currentItem,
      total: currentItem.quantity * currentItem.price,
    });
    navigate("/create");
  };

  return (
    // <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow rounded">
    //   <h2 className="text-xl font-bold mb-4">Edit Item</h2>

    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     {/* Name */}
    //     <input
    //       type="text"
    //       value={currentItem.item_name}
    //       onChange={(e) =>
    //         setCurrentItem((prev) => prev ? { ...prev, name: e.target.value } : prev)
    //       }
    //       className="w-full p-3 border rounded"
    //       required
    //     />

    //     {/* Quantity + Unit */}
    //     <div className="flex gap-2">
    //       <input
    //         type="number"
    //         value={currentItem.quantity}
    //         onChange={(e) => {
    //           const qty = Number(e.target.value);
    //           setCurrentItem((prev) => prev ? { ...prev, quantity: qty, total: qty * prev.price } : prev);
    //         }}
    //         className="w-2/3 p-2 border rounded"
    //         required
    //       />

    //       <select
    //         value={currentItem.unit}
    //         onChange={(e) =>
    //           setCurrentItem((prev) => prev ? { ...prev, unit: e.target.value } : prev)
    //         }
    //         className="w-1/3 p-2 border rounded"
    //       >
    //         {units.map((u, idx) => (
    //           <option key={idx} value={u}>{u}</option>
    //         ))}
    //       </select>
    //     </div>

    //     {/* Price */}
    //     <input
    //       type="number"
    //       value={currentItem.price}
    //       onChange={(e) => {
    //         const price = Number(e.target.value);
    //         setCurrentItem((prev) => prev ? { ...prev, price, total: prev.quantity * price } : prev);
    //       }}
    //       className="w-full p-2 border rounded"
    //       required
    //     />

    //     {/* Total */}
    //     <div className="flex justify-between items-center border-t pt-4">
    //       <span className="font-semibold text-lg">Total Amount</span>
    //       <span className="text-xl font-bold">৳ {currentItem.total}</span>
    //     </div>

    //     <button type="submit" className="w-full py-3 bg-black text-white rounded">
    //       Update Item
    //     </button>
    //   </form>
    // </div>


    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
  
  {/* HEADER */}
  <h2 className="text-2xl font-bold text-gray-800 mb-6">
    Edit Item
  </h2>

  <form onSubmit={handleSubmit} className="space-y-5">

    {/* ITEM NAME */}
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase">
        Item Name
      </label>
      <input
        type="text"
        value={currentItem.item_name}
        onChange={(e) =>
          setCurrentItem((prev) =>
            prev ? { ...prev, item_name: e.target.value } : prev
          )
        }
        className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
        required
      />
    </div>

    {/* QUANTITY + UNIT */}
    <div className="grid grid-cols-3 gap-3">

      <div className="col-span-2">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Quantity
        </label>
        <input
          type="number"
          value={currentItem.quantity}
          onChange={(e) => {
            const qty = Number(e.target.value);
            setCurrentItem((prev) =>
              prev
                ? { ...prev, quantity: qty, total: qty * prev.price }
                : prev
            );
          }}
          className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
          required
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Unit
        </label>
        <select
          value={currentItem.unit}
          onChange={(e) =>
            setCurrentItem((prev) =>
              prev ? { ...prev, unit: e.target.value } : prev
            )
          }
          className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
        >
          {units.map((u, idx) => (
            <option key={idx} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* PRICE */}
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase">
        Price
      </label>
      <input
        type="number"
        value={currentItem.price}
        onChange={(e) => {
          const price = Number(e.target.value);
          setCurrentItem((prev) =>
            prev
              ? { ...prev, price, total: prev.quantity * price }
              : prev
          );
        }}
        className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
        required
      />
    </div>

    {/* TOTAL BOX */}
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border">
      <span className="font-semibold text-gray-700">
        Total Amount
      </span>
      <span className="text-xl font-bold text-green-600">
        ৳ {currentItem.total}
      </span>
    </div>

    {/* BUTTON */}
    <button
      type="submit"
      className="w-full py-3 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold transition active:scale-[0.98]"
    >
      Update Item
    </button>
  </form>
</div>
  );
}