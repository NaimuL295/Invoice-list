export default function Social() {
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };
  return (
    <button
      onClick={loginWithGoogle}
      className="px-4 py-2 border flex gap-2 border-slate-200  rounded-lg   transition duration-150"
    >
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span>Login with Google</span>
    </button>
  );
}
