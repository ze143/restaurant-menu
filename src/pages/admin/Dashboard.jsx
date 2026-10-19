import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Sidebar />
      <main className="mr-64 min-h-screen p-8">
        <Outlet />
      </main>
    </div>
  );
}