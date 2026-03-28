import { Settings, UserRoundPen } from "lucide-react";
import { Link, } from "react-router";
// import useAuthStore from "../../store/useAuthStore";

export default function Navbar() {
  // const { user } = useAuthStore();
 
  
  return (
    <div className="lg:p-10 my-10">
      <ul className="flex justify-between max-w-2xl m-auto  px-10">
        <li>
       
          <Link to="profile">
          
            <UserRoundPen />
          </Link>
        </li>
        <li>
        
          <Link to="setting">
            <Settings />
          </Link>
        </li>
      </ul>
    </div>
  );
}
