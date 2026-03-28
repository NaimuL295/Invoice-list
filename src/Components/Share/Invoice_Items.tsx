import { Link,  } from "react-router";
import { useInvoiceStore } from "../../store/useInvoiceStore";

export default function Invoice_Items() {
  const items = useInvoiceStore((state) => state.items);
  // const navigate = useNavigate();

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.id} className="bg-white shadow p-2 rounded-lg border-gray-100">
         <Link to={`/edit/${item.id}`}>
          <div className="flex justify-between">
            <h3 className="font-semibold">
              #{index + 1} {item.item_name}
            </h3>
            <h3 className="text-sm text-gray-500">
              {item.quantity} x {item.price}
            </h3>
          </div>
          <div className="flex justify-between mt-1`">
            <h3>Item Subtotal</h3>
            <div>
              <span className="font-bold">৳ {item.total}</span>
            </div>
          </div>
          {/* <div className="flex gap-2 mt-3">
            <button
            type="button"
              className="text-blue-500 text-sm"
              onClick={() => navigate(`/edit/${item.id}`)}
            >
              Edit
            </button>
          </div> */}
          </Link>
        </div>
      ))}
    </div>
  );
}