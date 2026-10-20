import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../../components/layout/Sidebar";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-dark">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* المحتوى الرئيسي */}
      <main className="lg:mr-64 min-h-screen p-4 md:p-8 transition-all duration-300">
        
        {/* شريط علوي بيظهر على الموبايل بس فيه زرار القائمة */}
        <div className="lg:hidden flex items-center justify-between mb-6 bg-brand-card p-4 rounded-xl border border-brand-gold/20">
          <h1 className="text-brand-gold font-arabic text-xl">لوحة التحكم</h1>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-brand-gold p-2 hover:bg-brand-gold/10 rounded-lg transition"
          >
            <FiMenu size={24} />
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
}