import LoginCheck from "@/components/LoginCheck";
import "./../../globals.css";
import { Providers } from "@/store/provider";
import NavbarHeader from "@/components/common/NavbarHeader";
import Sidebar from "@/components/common/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <>
      <Providers>
        <LoginCheck />
        <aside className="sidebar">
          <div>
            <a href="/my-admin/dashboard" className="sidebar-logo">
              <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                E Police
              </h1>
            </a>
          </div>
          <Sidebar />
        </aside>
        <main className="dashboard-main">
          <NavbarHeader />
          <div className="dashboard-main-body max-w-full">{children}</div>
        </main>
        <ToastContainer />
      </Providers>
    </>
  );
}
