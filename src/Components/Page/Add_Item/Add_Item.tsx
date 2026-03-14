// import React, { useState } from "react";
// import "react-responsive-modal/styles.css";
// import { Modal } from "react-responsive-modal";
// import { useInvoiceStore } from "../../../store/useInvoiceStore";

// const Add_Item: React.FC = () => {
//   const addItem = useInvoiceStore((state) => state.addItem);
//   const [open, setOpen] = useState(false);

//   const [itemName, setItemName] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [unit, setUnit] = useState("");
//   const [price, setPrice] = useState("");

//   const [units, setUnits] = useState([
//     "Box",
//     "Pieces (pcs)",
//     "Kilogram (kg)",
//     "Gram (g)",
//     "Liter (l)",
//     "Meter (m)",
//   ]);

//   const [newUnit, setNewUnit] = useState("");
//   const [unitModal, setUnitModal] = useState(false);

//   const total = (Number(quantity) || 0) * (Number(price) || 0);

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     addItem({
//       id: Date.now(),
//       name: itemName,
//       quantity: Number(quantity),
//       unit,
//       price: Number(price),
//       total,
//     });
//     setItemName("");
//     setQuantity("");
//     setUnit("");
//     setPrice("");
   
//   };

//   const onAddUnit = () => {
//     if (newUnit.trim() && !units.includes(newUnit)) {
//       setUnits([...units, newUnit]);
//       setUnit(newUnit);
//       setNewUnit("");
//       setUnitModal(false);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center">
//       {/* Add Item Button */}
//       <button
//         type="button"
//         onClick={() => setOpen(true)}
//         className="px-6 py-3 bg-black text-white rounded"
//       >
//         + Add Item
//       </button>

//       {/* Add Item Modal */}
//       <Modal open={open} onClose={() => setOpen(false)} center>
//         <h2 className="text-xl font-bold mb-4">Add Invoice Item</h2>
//         <form onSubmit={onSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Item Name"
//             value={itemName}
//             onChange={(e) => setItemName(e.target.value)}
//             required
//             className="w-full p-3 border rounded"
//           />
//           <div className="flex gap-2">
//             <input
//               type="number"
//               placeholder="Quantity"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               required
//               className="w-2/3 p-2 border rounded"
//             />
//             <select
//               value={unit}
//               onChange={(e) => setUnit(e.target.value)}
//               required
//               className="w-1/3 p-2 border rounded"
//             >
//               <option value="">Select unit</option>
//               {units.map((u, idx) => (
//                 <option key={idx} value={u}>
//                   {u}
//                 </option>
//               ))}
//             </select>
//             <button
//               type="button"
//               onClick={() => setUnitModal(true)}
//               className="px-3 py-2 bg-gray-200 rounded"
//             >
//               + Unit
//             </button>
//           </div>

//           <input
//             type="number"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             className="w-full p-2 border rounded"
//           />

//           {total > 0 && (
//             <div className="flex justify-between items-center border-t pt-4">
//               <span className="font-semibold text-lg">Total Amount</span>
//               <span className="text-xl font-bold">৳ {total}</span>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full py-3 bg-black text-white rounded"
//           >
//             Save Item
//           </button>
//         </form>
//       </Modal>

//       {/* Unit Modal */}
//       <Modal open={unitModal} onClose={() => setUnitModal(false)} center>
//         <h2 className="mb-4 text-lg font-bold">Add New Unit</h2>
//         <input
//           type="text"
//           placeholder="Enter unit"
//           value={newUnit}
//           onChange={(e) => setNewUnit(e.target.value)}
//           className="w-full p-3 border rounded mb-3"
//         />
//         <div className="flex justify-end gap-2">
//           <button
//             type="button"
//             onClick={() => setUnitModal(false)}
//             className="px-4 py-2 bg-gray-300 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={onAddUnit}
//             className="px-4 py-2 bg-black text-white rounded"
//           >
//             Add Unit
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default Add_Item;


import React, { useState } from "react";
import { useInvoiceStore } from "../../../store/useInvoiceStore";
import { useNavigate } from "react-router"; // <-- import

const Add_Item_Page: React.FC = () => {
  const addItem = useInvoiceStore((state) => state.addItem);
  const navigate = useNavigate(); // <-- useNavigate hook

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");

  const [units, setUnits] = useState([
    "Box",
    "Pieces (pcs)",
    "Kilogram (kg)",
    "Gram (g)",
    "Liter (l)",
    "Meter (m)",
  ]);
  const [newUnit, setNewUnit] = useState("");

  const total = (Number(quantity) || 0) * (Number(price) || 0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!itemName || !quantity || !unit || !price) return;

    addItem({
      id: Date.now(),
      name: itemName,
      quantity: Number(quantity),
      unit,
      price: Number(price),
      total,
    });

    // Clear form
    setItemName("");
    setQuantity("");
    setUnit("");
    setPrice("");

    // Navigate to create-invoice page
    navigate("/");
  };

  const onAddUnit = () => {
    if (newUnit.trim() && !units.includes(newUnit)) {
      setUnits([...units, newUnit]);
      setUnit(newUnit);
      setNewUnit("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="bg-white p-2 rounded-lg ">
        <h2 className="text-xl font-bold mb-4">Add Invoice Item</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            className="w-full p-3 border rounded"
          />

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-2/3 p-2 border rounded"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
              className="w-1/3 p-2 border rounded"
            >
              <option value="">Select unit</option>
              {units.map((u, idx) => (
                <option key={idx} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add new unit"
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              className="w-2/3 p-2 border rounded"
            />
            <button
              type="button"
              onClick={onAddUnit}
              className="w-1/3 bg-gray-200 rounded px-3 py-2"
            >
              + Add Unit
            </button>
          </div>

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          {total > 0 && (
            <div className="flex justify-between items-center border-t pt-4">
              <span className="font-semibold text-lg">Total Amount</span>
              <span className="text-xl font-bold">৳ {total}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full my-30 py-3 bg-black text-white rounded"
          >
            Save Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add_Item_Page;