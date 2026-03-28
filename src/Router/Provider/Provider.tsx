import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import api from "../../lib/axios";

interface User {
  id: number;
  email: string;
}

function Provider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get<User>("/me"); // type-safe
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser]);

  if (loading) return <div>Checking auth...</div>;

  return <>{children}</>; // render children routes/pages
}

export default Provider;