import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import api from "../../lib/axios";


interface User {
  id: number;
  email: string;
    user_name:string
}

function Provider({ children }: 
  { children: React.ReactNode }) {

  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get<User>("/me"); // type-safe
        setUser(res?.data);
  
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser]);

if (loading)
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-2">
      <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
      <p className="text-gray-500 text-sm">Checking auth...</p>
    </div>
  );

  return <>{children}</>; // render children routes/pages
}

export default Provider;