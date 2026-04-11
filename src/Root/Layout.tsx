import { Outlet, useLocation } from "react-router";
import Navbar from "../Components/Share/Navbar";

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      {!["/setting", "/auth/login", "/auth/register", ].includes(
        pathname,
      ) && <Navbar />}
      <div className="min-h-[calc(100vh-180px)]">
        <main className="flex-1 md:ml-64 pb-24 md:pb-0 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}
