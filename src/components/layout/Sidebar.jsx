import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiList,
  FiPackage,
  FiStar,
  FiSettings,
  FiLogOut,
  FiHome,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/admin/overview", label: "نظرة عامة", icon: FiGrid },
  { to: "/admin/categories", label: "الأقسام", icon: FiList },
  { to: "/admin/items", label: "الأصناف", icon: FiPackage },
  { to: "/admin/ratings", label: "التقييمات", icon: FiStar },
  { to: "/admin/settings", label: "الإعدادات", icon: FiSettings },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <aside className="w-64 bg-gradient-to-b from-brand-maroon to-brand-dark border-l border-brand-gold/20 p-5 fixed h-screen right-0 top-0 z-40 overflow-y-auto shadow-2xl">
      {" "}
      <div className="text-center pb-6 border-b border-brand-gold/20 mb-6">
        <img
          src="/img/Asset-2.ico"
          alt="logo"
          className="w-12 h-12 rounded-full border-2 border-brand-gold object-cover"
        />
        <h2 className="text-lg font-arabic text-brand-gold">
          عبدالحي الكبابجي
        </h2>
        <p className="text-xs text-gray-500 mt-1 truncate">{user?.email}</p>
      </div>
      <nav className="space-y-1.5">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${
                  isActive
                    ? "bg-brand-gold/15 text-brand-gold border border-brand-gold/30"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon /> {l.label}
            </NavLink>
          );
        })}

        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition text-sm font-medium"
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
  );
}
