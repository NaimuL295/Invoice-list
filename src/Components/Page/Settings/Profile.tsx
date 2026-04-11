
import { useNavigate } from "react-router";
import useAuthStore from "../../../store/useAuthStore";
import api from "../../../lib/axios";
import { LogOut, User, Mail, ShieldCheck } from "lucide-react"; // Nice icons

const Profile = () => {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      navigate("auth/login");
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header/Banner Area */}
        <div className="h-32 bg-gradient-to-r " />

        {/* Profile Content */}
        <div className="px-8 pb-8">
          <div className="relative">
            {/* Avatar */}
            <div className="absolute -top-12 left-0 p-1 bg-white rounded-2xl shadow-md">
              <div className="h-24 w-24 bg-slate-200 rounded-xl flex items-center justify-center text-slate-500">
                <User size={48} />
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h1 className="text-2xl font-bold text-slate-800">Account Settings</h1>
            <p className="text-slate-500 text-sm">Manage your profile and security</p>
          </div>

          {/* Info Rows */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <Mail className="text-indigo-500 mr-4" size={20} />
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Email Address</p>
                <p className="text-slate-700 font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <ShieldCheck className="text-green-500 mr-4" size={20} />
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Account Status</p>
                <p className="text-slate-700 font-medium">Verified User</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-red-100 text-red-500 py-3 rounded-xl font-semibold hover:bg-red-50 hover:border-red-200 transition-all active:scale-95"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// A simple loading placeholder
const LoadingSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="animate-pulse flex flex-col items-center">
      <div className="h-12 w-12 bg-slate-200 rounded-full mb-4"></div>
      <div className="h-4 w-32 bg-slate-200 rounded"></div>
    </div>
  </div>
);

export default Profile;