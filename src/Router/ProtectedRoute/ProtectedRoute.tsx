import React from 'react'
import useAuthStore from '../../store/useAuthStore'
import { Navigate } from 'react-router'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
 const {user}=useAuthStore()
 

 if (!user?.id|| !user.email) return <Navigate to="auth/login"/>
    return <>{children}</>
}
