import {  useState } from "react";
import { useInvoiceStore } from "../../../store/useInvoiceStore";
import { Link, useNavigate } from "react-router";
import Invoice_Items from "../../Share/Invoice_Items";
import {   Printer,   } from "lucide-react";
import api from "../../../lib/axios";
import useAuthStore from "../../../store/useAuthStore";


export default function Create_Invoice() {
  const {user}=useAuthStore()
  const items = useInvoiceStore((state) => state.items);
const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [customer, setCustomer] = useState("");
const [uid, setUid] = useState(1);

// const clearItems = useInvoiceStore((state) => state.clearItems);

  const [discount, setDiscount] = useState<number | "">("");
  const [received, setReceived] = useState<number | "">("");
  const [paymentType, setPaymentType] = useState("Cash");
  const [description, setDescription] = useState("");
  // const email: string = "naimul56@gmail.com";
  //   const user_name: string = "naimul";
  //     const userId: number = 2;
console.log(user);

    // subtotal
  const subtotal = items.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  // total after discount
  const total = subtotal - Number(discount || 0);
  // // balance
  const balance = total - Number(received || 0);
const createId = () => {
  const id = uid + 1;
  setUid(id);
  return id;
};
const handleSubmit = async (e: React.FormEvent): Promise<void> => {
  e.preventDefault();

const newId = createId(); 

  if (!customer || items.length === 0) {
    alert("Customer and items required");
    return;
  }

  const invoiceData = {
    uid: String(newId),
    userId: user?.id,
    user_name: user?.user_name,
    email: user?.email,
    date,
    customer,
    items,
    subtotal,
    discount,
    total,
    received,
    due: balance,
    description,
    paymentType,
  };
console.log(invoiceData);

  try {
    const req = await api.post(
      "/invoice",
      invoiceData
    );

    if (req.status === 200 || req.status === 201) {
      console.log("Invoice processed successfully!");
      //  clearItems(); 
      // setCustomer("");
      // setDiscount(0);
      // setReceived(0);

      navigate("/");
   
    }
  } catch (error) {
    console.error("Error creating invoice:", error);
  }
};

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6 relative">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">
        <Link to="/"> Create Invoice</Link>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Invoice + Date */}
        <div className="grid  grid-cols-2 gap-4   border-b-black">
          <div>
            <label className="block font-medium mb-1">Invoice No</label>
            <input
              type="text"
       defaultValue={uid}
              className="w-full  p-2 rounded-lg  border-none  focus:outline-none "
              placeholder=""
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full    p-2 rounded-lg  border-none  focus:outline-none"
            />
          </div>
        </div>

        {/* Customer */}

        <div className="relative ">
          <input
            id="name"
            type="text"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder=""
            required
            className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:"
          />

          <label
            htmlFor="name"
            className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500 transition-all
    peer-placeholder-shown:top-3
    peer-placeholder-shown:text-base
    peer-placeholder-shown:text-gray-400
    peer-focus:-top-2
    peer-focus:text-sm
   "
          >
            Customer Name
          </label>
        </div>
       
        {/* Item List */}
        <div className="space-y-3">
          <Invoice_Items />
        </div>

        {/* Add Item */}
        <Link to="add_item">
          {" "}
          <div className="border p-2 flex justify-center w-full sm:w-auto mx-auto mt-6">
            Add_Item
          </div>
        </Link>
        {/* Tax & Discount */}
        <section className="space-y-2">
          <span className="font-semibold text-lg">Tax & Discount</span>

          {/* Discount */}
          <div className="flex justify-between items-center">
            <span>Discount</span>

            <div className="flex items-center gap-1">
              <span>৳ %</span>

              {/* <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-24 sm:w-28 border-b focus:border-black outline-none"
              /> */}
              <input
                type="number"
                value={discount}
                onChange={(e) =>
                  setDiscount(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                className="w-24 sm:w-28 border-b outline-none"
              />
            </div>
          </div>

          {/* Total Amount */}
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Total Amount</span>

            <div className="flex items-center gap-1">
              <span>৳</span>

              <input
                type="text"
                value={total}
                readOnly
                className="w-28 sm:w-32 border-b font-bold outline-none"
              />
            </div>
          </div>

          {/* Received */}
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Received
            </label>

            <div className="flex items-center gap-1">
              <span>৳</span>

              {/* <input
                type="number"
                value={received}
                onChange={(e) => setReceived(Number(e.target.value))}
                className="w-24 sm:w-28 border-b outline-none"
              /> */}
              <input
                type="number"
                value={received}
                onChange={(e) =>
                  setReceived(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                className="w-24 sm:w-28 border-b outline-none"
              />
            </div>
          </div>

          {/* Balance */}
          <div className="flex justify-between items-center">
            <span>Balance Due</span>

            <div className="flex items-center gap-1">
              <span>৳</span>

              <input
                type="text"
                value={balance}
                readOnly
                className="w-24 sm:w-28 border-b outline-none"
              />
            </div>
          </div>

          {/* Payment Type */}
          <div className="space-y-2">
            <span className="font-medium">Payment Type</span>

            <div className="">
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="border px-1 py-1 rounded w-full"
              >
                <option>Cash</option>
                <option>Bkash</option>
                <option>Card</option>
              </select>

              <button
                type="button"
                className="px-3 py-2 bg-gray-200 rounded w-full sm:w-auto"
              >
                + Payment
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <span className="font-medium">Description</span>

            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded p-2 outline-none"
            />
          </div>
        </section>

        {/* Submit */}
        <div className="flex gap-10">
           <button
          type="submit"
          className="w-full py-3 bg-black text-white rounded-lg"
        >
          Save Invoice
        </button><button type="button"   //onClick={handlePrint}
        ><Printer /> </button>
        </div>
          
      </form>
    </div>
  );

}









  









