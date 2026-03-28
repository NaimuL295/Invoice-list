import type React from "react";
import { useState } from "react";
import Social from "../../Share/Social";
import api from "../../../lib/axios";
import useAuthStore from "../../../store/useAuthStore";
import { useNavigate } from "react-router";
interface formData {
  email: string;
  password: string;
}

export default function Login() {
  const {setUser}=useAuthStore()
   const navigate = useNavigate();

 const [form, setForm] = useState<formData>({
    email: "",
    password: "",
  });
    const handlerForm=(e: React.ChangeEvent<HTMLInputElement>)=>{
      const {name,value}=e.target
   setForm((prev:formData) => ({
      ...prev,
      [name]: value,
    }));
  };
    
  const Handler =async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
console.log(form);
const  res=await api.post("/auth/login",form, {
  withCredentials:true
})
  if (res.status==200 || res.status===201) {
    // console.log("data successful add database");
    //   const me = await api.get("/me");
    //       setUser(me.data);
      setUser(res.data.user);
      navigate("/")
  }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen gap-6">
        <h1>Welcome back</h1>
        <form action="" onSubmit={Handler} className="text-center space-y-3  p-5">
          <div>
            <input
              className=" inline"
              type="text"
              name="email"
           required
              onChange={handlerForm}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              className=" inline"
              type="text"
              name="password"
             required
              onChange={handlerForm}
              placeholder="password"
            />
          </div>
          <button  type="submit">continue</button>
        </form>
        <Social/>
      </div>
    </div>
  );
}
