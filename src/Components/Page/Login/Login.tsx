import type React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader2, ReceiptText } from "lucide-react";
import Social from "../../Share/Social";
import api from "../../../lib/axios";
import useAuthStore from "../../../store/useAuthStore";
import { useNavigate } from "react-router";

export default function Login() {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handlerForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const Handler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form, {
        withCredentials: true,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Welcome back!");
        setUser(res.data.user);
        navigate("/");
      }
    } catch (err: unknown) {
      // Convert unknown error to string safely
      let errorMsg = "Login failed. Please check your credentials.";

      // Check if it's an Axios-like error
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        errorMsg = axiosErr.response?.data?.message || errorMsg;
      }
      // If it's a normal JS Error
      else if (err instanceof Error) {
        errorMsg = err.message;
      }
      // Anything else
      else {
        errorMsg = String(err);
      }

      toast.error(errorMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-3">
      {/* BRANDING */}
      <div className="mb-2 flex flex-col items-center">
        <div className="bg-green-500 p-2 rounded-2xl text-white shadow-lg mb-2">
          <ReceiptText size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          QuickBill
        </h1>
      </div>

      {/* THE CARD */}
      <div className="w-full max-w-[400px] bg-white rounded-[1.618rem] shadow-xl shadow-slate-200/60 p-8 md:p-10 border border-slate-100">
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome back</h2>
          <p className="text-gray-500 text-sm mt-2">
            Enter your credentials to access your invoices.
          </p>
        </header>

        <form onSubmit={Handler} className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">
              Email Address
            </label>
            <input
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:text-gray-600 focus:bg-white outline-none transition-all disabled:opacity-50"
              type="email"
              name="email"
              required
              disabled={loading}
              onChange={handlerForm}
              placeholder="name@company.com"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="space-y-2  text-sm font-medium text-gray-700 ml-1">
                Password
              </label>
              {/* <a href="#" className="text-xs text-red-500 hover:underline">Forgot?</a> */}
            </div>
            <input
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:text-gray-600 focus:bg-white outline-none transition-all disabled:opacity-50"
              type="password"
              name="password"
              required
              disabled={loading}
              onChange={handlerForm}
              placeholder="•"
            autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-semibold hover:bg-black transition-all shadow-md active:scale-[0.98] mt-3 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="my-4 flex items-center gap-4 px-3">
          <div className="h-[1px] flex-1 bg-slate-100"></div>
          <span className="text-xs text-slate-400 uppercase tracking-widest font-medium">
            Or
          </span>
          <div className="h-[1px] flex-1 bg-slate-100"></div>
        </div>

        <Social />
      </div>

      <p className="mt-8 text-sm text-slate-500">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/auth/register")}
          className="text-red-500 font-medium cursor-pointer"
        >
          Register here
        </span>
      </p>
    </div>
  );
}
