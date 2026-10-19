import { Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-black/50 border-t border-brand-gold/20 py-8 text-center">
      <h2 className="text-2xl font-arabic text-brand-gold mb-2">عبدالحي الكبابجي..... أصل المشويات</h2>
      <hr className="max-w-xs mx-auto border-brand-gold/20 my-4" />
      <p className="text-sm text-gray-500">
        ALL RIGHTS RESERVED © — Designed by <strong className="text-gray-300">Ziad Abdelkader</strong>
      </p>
      <Link to="/admin/login" className="inline-flex items-center gap-1 mt-4 text-xs text-brand-gold/60 hover:text-brand-gold transition">
        <FiLock /> لوحة الإدارة
      </Link>
    </footer>
  );
}