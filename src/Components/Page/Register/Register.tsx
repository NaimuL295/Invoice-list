import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ReceiptText, Loader2 } from "lucide-react";
import Social from "../../Share/Social";
import api from "../../../lib/axios";
import useAuthStore from "../../../store/useAuthStore";

interface formData {
  user_name: string;
  email: string;
  password: string;
}

export default function Register() {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  const Handler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/register", form, {
        withCredentials: true,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Account created successfully!");
        setUser(res.data.user);
        navigate("/");
      }
    } catch (err: unknown) {
      const errorMsg =
        (err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined) ||
        (err instanceof Error ? err.message : String(err)) ||
        "Registration failed. Try again.";

      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      {/* BRANDING: Spacing based on 1.618 */}
      <div className="mb-2 flex flex-col items-center">
        <div className="bg-green-500 p-2 rounded-2xl text-white shadow-lg mb-3">
          <ReceiptText size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          QuickBill
        </h1>
      </div>

      {/* REGISTRATION CARD: Max-width ~38% of desktop viewport */}
      <div className="w-full max-w-[400px] bg-white rounded-[1.618rem] shadow-xl shadow-slate-200/60 p-2 md:p-10 border border-slate-100">
        <header className="mb-3 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Join us to start managing your invoices.
          </p>
        </header>

        <form onSubmit={Handler} className="space-y-2">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">
              Full Name
            </label>
            <input
              className="w-full px-4 py-1 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:text-gray-600 focus:bg-white outline-none transition-all disabled:opacity-50"
              type="text"
              name="user_name"
              value={form.user_name}
              onChange={handlerForm}
              placeholder="Full  Name"
              required
              disabled={loading}
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">
              Email Address
            </label>
            <input
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:text-gray-600 focus:bg-white outline-none transition-all disabled:opacity-50"
              type="email"
              name="email"
              value={form.email}
              onChange={handlerForm}
              placeholder="name@company.com"
              required
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">
              Password
            </label>
            <input
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:text-gray-600 focus:bg-white outline-none transition-all disabled:opacity-50"
              type="password"
              name="password"
              value={form.password}
              onChange={handlerForm}
              placeholder="••••••••"
              required
         autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-semibold hover:bg-black transition-all shadow-md active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="my-1 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-slate-100"></div>
          <span className="text-xs text-slate-400 uppercase tracking-widest font-medium">
            Or
          </span>
          <div className="h-[1px] flex-1 bg-slate-100"></div>
        </div>

        <Social />
      </div>

      {/* FOOTER */}
      <p className="mt-8 text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-red-500 font-medium hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
