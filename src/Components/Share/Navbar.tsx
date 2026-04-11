import { 
  UserRoundPen, 
  PlusCircle, 
  LayoutDashboard, 
  ReceiptText, 
  FilePenLine, 
  LogIn // Added LogIn icon
} from "lucide-react";
import { Link, useLocation } from "react-router";
import useAuthStore from "../../store/useAuthStore";

export default function Navbar() {
  const { pathname } = useLocation();
const {user}=useAuthStore()
  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-10 px-2">
            <div className="bg-green-600 p-1.5 rounded-lg text-white">
              <ReceiptText size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">QuickBill</span>
          </div>

          <nav className="space-y-1">
            <DesktopNavLink to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" active={pathname === "/"} />
            <DesktopNavLink to="/create" icon={<PlusCircle size={20} />} label="New Invoice" active={pathname === "/create"} />
            <DesktopNavLink to="/profile" icon={<UserRoundPen size={20} />} label="Profile" active={pathname === "/profile"} />
            <DesktopNavLink to="/printSettings" icon={<FilePenLine size={20} />} label="Print Settings" active={pathname === "/printSettings"} />
          </nav>
        </div>

        {/* Desktop Bottom Section */}
        <div className="mt-auto p-6 border-t border-gray-100">
      {!user  ?   <DesktopNavLink 
            to="/login" 
            icon={<LogIn size={20} />} 
            label="Log In" 
            active={pathname === "/login"} 
          /> :"" }  
    
        </div>
      </aside>

      {/* --- MOBILE BOTTOM BAR --- */}   
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-8 py-3 z-50">
        <ul className="flex justify-between items-center max-w-md mx-auto">
          <MobileTab to="/" icon={<LayoutDashboard size={24} />} active={pathname === "/"} />
          
          <MobileTab to="/profile" icon={<UserRoundPen size={24} />} active={pathname === "/profile"} />

          {/* Action Button - The "Plus" */}
          <li className="-mt-12">
            <Link to="/create" className="flex bg-green-600 p-4 rounded-full text-white shadow-xl border-4 border-white active:scale-95 transition-transform">
              <PlusCircle size={28} />
            </Link>
          </li>

          {/* Added Login for Mobile */}
          <MobileTab to="/auth/login" icon={<LogIn size={24} />} active={pathname === "/login"} />
          
          <MobileTab to="/printSettings" icon={<FilePenLine size={24} />} active={pathname === "/printSettings"} />
        </ul>
      </nav>
    </>
  );
}

// --- SUB-COMPONENTS ---

function DesktopNavLink({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
        active ? "bg-green-50 text-green-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function MobileTab({ to, icon, active }: { to: string, icon: React.ReactNode, active: boolean }) {
  return (
    <li>
      <Link to={to} className={`transition-colors ${active ? "text-green-600" : "text-gray-400"}`}>
        {icon}
      </Link>
    </li>
  );
}