import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const links = [
    { to: isHome ? "#who" : "/#who", label: "احنا مين؟" },
    { to: "/menu", label: "المنيو" },
    { to: "/ratings", label: "التقييمات" },
    { to: isHome ? "#address" : "/#address", label: "العنوان" },
    { to: isHome ? "#payment" : "/#payment", label: "طرق الدفع" },
    { to: isHome ? "#delivery" : "/#delivery", label: "التوصيل" },
    { to: isHome ? "#contact" : "/#contact", label: "اتصل بنا" },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-brand-maroon/95 backdrop-blur-md border-b-2 border-brand-gold/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/img/Asset-2.ico"
            alt="logo"
            className="w-12 h-12 rounded-full border-2 border-brand-gold object-cover"
          />
          <span className="text-xl font-arabic text-brand-gold">
            عبدالحي الكبابجي
          </span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-brand-gold"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

        <ul className="hidden md:flex gap-6">
          {links.map((l) => (
            <li key={l.to}>
              <a
                href={l.to}
                className="text-gray-300 hover:text-brand-gold transition text-sm"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-brand-card border-t border-brand-gold/20"
          >
            {links.map((l) => (
              <li key={l.to}>
                <a
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 text-gray-300 hover:text-brand-gold border-b border-white/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
