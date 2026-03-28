
import { useState } from "react";
import { Link } from "react-router";
import Social from "../../Share/Social";
import api from "../../../lib/axios";
import useAuthStore from "../../../store/useAuthStore";

interface formData {
  user_name: string;
  email: string;
  password: string;
}

export default function Register() {
    const {setUser}=useAuthStore()
  const [form, setForm] = useState<formData>({
    user_name: "",
    email: "",
    password: "",
  });
  const handlerForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: formData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Handler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

  const res=await api.post("/auth/register",form,{
    withCredentials:true
  });
    
  if (res.status==200 || res.status===201) {
    console.log("data successful add database");
     setUser(res.data.user);
  }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen gap-6">
        <form
          action=""
          onSubmit={Handler}
          className="text-center space-y-3  p-5"
        >
          <div className="">
            {" "}
            <label className="block text-left " htmlFor="">
              Name
            </label>
            <input
              className="p-1"
              type="text"
              name="user_name"
              onChange={handlerForm}
              placeholder="Name"
              required
            />
            <div>
              {" "}
              <label className="block text-left " htmlFor="Email">
                Email
              </label>{" "}
              <input
                className="p-1"
                type="text"
                name="email"
                onChange={handlerForm}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-left " htmlFor="">
              Password
            </label>
            <input
              className="p-1 "
              type="text"
              name="password"
              onChange={handlerForm}
              placeholder="password"
              required
            />
          </div>
          <p>
            <Link to="/auth/login">You have already account</Link>
          </p>
          <button type="submit">continue</button>  
        </form>
      <Social/>
      </div>
    </div>
  );
}
