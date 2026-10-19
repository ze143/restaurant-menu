import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("أهلاً بك 👋");
      nav("/admin/categories");
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-4">
      <form onSubmit={submit} className="card-glass p-10 w-full max-w-md space-y-5">
        <h1 className="text-3xl font-arabic text-brand-gold text-center">لوحة التحكم</h1>
        <p className="text-center text-gray-400 text-sm">عبدالحي الكبابجي</p>
        <input
          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="البريد الإلكتروني" className="input-field"
        />
        <input
          type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="كلمة المرور" className="input-field"
        />
        <button disabled={loading} className="btn-gold w-full">
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
      </form>
    </div>
  );
}