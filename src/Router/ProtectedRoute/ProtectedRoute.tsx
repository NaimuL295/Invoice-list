// import React from 'react'
// import useAuthStore from '../../store/useAuthStore'
// import { Navigate } from 'react-router'

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//  const {user}=useAuthStore()
 

// if (!user?.id || !user.email) return <Navigate to="/auth/register" replace />;
//     return <>{children}</>
// }
import React from "react";
import useAuthStore from "../../store/useAuthStore";
import { Navigate } from "react-router";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthStore();

  if (loading) return <div>Loading...</div>;

  if (!user?.id || !user?.email) {
    return <Navigate to="/auth/register" replace />;
  }

  return <>{children}</>;
}