import { Settings, UserRoundPen, PlusCircle, LayoutDashboard, ReceiptText, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router";

export default function Navbar() {
  const location = useLocation();
  const user = { name: "Alex" }; // Mock Auth

  // Helper to highlight active link
  const isActive = (path: string) => location.pathname === path ? "text-green-400" : "text-gray-500";

  return (
    <>
      {/* --- DESKTOP SIDEBAR (Visible on md and up) --- */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-54 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="bg-green-500 p-1 rounded-lg text-white">
            <ReceiptText size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">QuickBill</span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavLink to="/" icon={<LayoutDashboard />} label="Dashboard" />
          <NavLink to="/create" icon={<PlusCircle />} label="New Invoice" />
          <NavLink to="/profile" icon={<UserRoundPen />} label="Profile" />
        </nav>

        <div className="mt-auto border-t pt-4">
          <NavLink to="/settings" icon={<Settings />} label="Settings" />
        </div>
      </aside>

      {/* --- MOBILE BOTTOM BAR (Visible on sm and below) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50">
        <ul className="flex justify-between items-center">
          <li>
            <Link to="/" className={`flex flex-col items-center ${isActive('/')}`}>
              <LayoutDashboard size={22} />
              <span className="text-[10px] mt-1">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/create" className="flex flex-col items-center text-green-400 -mt-8 bg-white p-2 rounded-full border-t border-gray-100 shadow-sm">
              <div className="bg-green-600 p-3 rounded-full text-white shadow-lg">
                <PlusCircle size={24} />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/profile" className={`flex flex-col items-center ${isActive('/profile')}`}>
              <UserRoundPen size={22} />
              <span className="text-[10px] mt-1">Profile</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content Spacer (Important!) */}
      <div className="md:pl-64 pb-24 md:pb-0">
        {/* Your Page Content Goes Here */}
      </div>
    </>
  );
}

// Sub-component for Desktop Links to keep code clean
function NavLink({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <Link 
      to={to} 
      className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-blue-50 hover:text-gray-600 rounded-xl transition-all font-medium"
    >
      {icon}
      {label}
    </Link>
  );
}