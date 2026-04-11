export default function Social() {
  const loginWithGoogle = () => {
    // Tip: Use an environment variable for the base URL in production
    window.location.href = "https://invoice-server-vvx0.onrender.com/auth/google";
  };

  return (
    <div className="w-full">
      <button
        onClick={loginWithGoogle}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm active:scale-[0.98] transition-all duration-200"
      >
        <img
          className="w-5 h-5"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span className="text-sm">Continue with Google</span>
      </button>
    </div>
  );
}