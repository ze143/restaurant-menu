import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid, FiList, FiPackage, FiStar, FiSettings, FiLogOut, FiHome, FiX
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/admin/overview", label: "نظرة عامة", icon: FiGrid },
  { to: "/admin/categories", label: "الأقسام", icon: FiList },
  { to: "/admin/items", label: "الأصناف", icon: FiPackage },
  { to: "/admin/ratings", label: "التقييمات", icon: FiStar },
  { to: "/admin/settings", label: "الإعدادات", icon: FiSettings },
];

// ضفنا isOpen و setIsOpen عشان نتحكم في القائمة على الموبايل
export default function Sidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLinkClick = () => {
    // نقفل القائمة لما ندوس على أي لينك (مهم للموبايل)
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <>
      {/* الخلفية السوداء الشفافة على الموبايل */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 right-0 h-screen w-64 bg-gradient-to-b from-brand-maroon to-brand-dark border-l border-brand-gold/20 p-5 z-50 overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex justify-between items-center mb-6 border-b border-brand-gold/20 pb-6">
          <div className="text-center flex-1">
            <img
              src="/img/logo.jpg"
              alt="logo"
              className="w-16 h-16 rounded-full mx-auto border-2 border-brand-gold object-cover mb-3"
              onError={(e) => (e.target.style.display = "none")}
            />
            <h2 className="text-lg font-arabic text-brand-gold">عبدالحي الكبابجي</h2>
            <p className="text-xs text-gray-400 mt-1 truncate">{user?.email}</p>
          </div>
          
          {/* زرار الإغلاق (يظهر على الموبايل بس) */}
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute left-4 top-6 text-gray-400 hover:text-white p-2"
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="space-y-1.5">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${
                    isActive
                      ? "bg-brand-gold/15 text-brand-gold border border-brand-gold/30"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon /> {l.label}
              </NavLink>
            );
          })}

          <NavLink
            to="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition text-sm font-medium"
          >
            <FiHome /> عرض الموقع
          </NavLink>

          <button
            onClick={() => {
              logout();
              nav("/admin/login");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition text-sm font-medium mt-4 border-t border-white/5 pt-5"
          >
            <FiLogOut /> تسجيل الخروج
          </button>
        </nav>
      </aside>
    </>
  );
}