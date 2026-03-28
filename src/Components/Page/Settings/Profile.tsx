import { useEffect } from "react"

import { useNavigate } from "react-router"
import useAuthStore from "../../../store/useAuthStore"
import api from "../../../lib/axios"


const Profile = () => {
  const { user, setUser } = useAuthStore()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      const res = await api.post("/auth/logout")

      if (res.status === 200) {
        setUser(null)
        navigate("/login")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/me")
        setUser(res.data)
      } catch (error:any) {
        setUser(null)
        navigate("/login")
      }
    }

    fetchMe()
  }, [setUser, navigate])

  if (!user) return <div>Loading...</div>

  return (
    <div>
      <h1>Welcome, {user.email}</h1>

      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Profile