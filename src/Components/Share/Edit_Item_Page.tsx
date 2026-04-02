
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
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Item</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          value={currentItem.item_name}
          onChange={(e) =>
            setCurrentItem((prev) => prev ? { ...prev, name: e.target.value } : prev)
          }
          className="w-full p-3 border rounded"
          required
        />

        {/* Quantity + Unit */}
        <div className="flex gap-2">
          <input
            type="number"
            value={currentItem.quantity}
            onChange={(e) => {
              const qty = Number(e.target.value);
              setCurrentItem((prev) => prev ? { ...prev, quantity: qty, total: qty * prev.price } : prev);
            }}
            className="w-2/3 p-2 border rounded"
            required
          />

          <select
            value={currentItem.unit}
            onChange={(e) =>
              setCurrentItem((prev) => prev ? { ...prev, unit: e.target.value } : prev)
            }
            className="w-1/3 p-2 border rounded"
          >
            {units.map((u, idx) => (
              <option key={idx} value={u}>{u}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <input
          type="number"
          value={currentItem.price}
          onChange={(e) => {
            const price = Number(e.target.value);
            setCurrentItem((prev) => prev ? { ...prev, price, total: prev.quantity * price } : prev);
          }}
          className="w-full p-2 border rounded"
          required
        />

        {/* Total */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="font-semibold text-lg">Total Amount</span>
          <span className="text-xl font-bold">৳ {currentItem.total}</span>
        </div>

        <button type="submit" className="w-full py-3 bg-black text-white rounded">
          Update Item
        </button>
      </form>
    </div>
  );
}