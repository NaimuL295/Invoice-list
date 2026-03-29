import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../../store/useAuthStore";
import api from "../../../lib/axios";

export default function TransitionDetails() {
  const { user } = useAuthStore();

  const listInvoice = async () => {
    const res = await api.get(`/api/invoice/${user?.id}`, {
      withCredentials: true,
    });
    return res.data;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: [user?.id as number],
    queryFn: listInvoice,
  });
  return (<>
<div>
<ul className="flex justify-between"><li></li>
<li> {"io"}</li>

<li>{"op"}</li>
</ul>
  <div className="flex justify-around">
    <ul>
      <li> {"op"} </li>
        <li>{"op"}  </li>
          <li>{"op"}  </li>
    </ul>
      </div>
</div>


  </>);
}



