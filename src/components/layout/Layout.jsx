import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex">
      <Sidebar />
      <main className="flex-1 px-6 py-4 lg:p-8 pt-16 lg:pt-8 overflow-x-hidden flex items-center justify-center">
        <div className="max-w-7xl w-full m-auto mx-4 sm:mx-6 lg:mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
