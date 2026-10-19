import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-arabic text-brand-gold mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-8">الصفحة مش موجودة 😅</p>
      <Link to="/" className="btn-gold">العودة للرئيسية</Link>
    </div>
  );
}