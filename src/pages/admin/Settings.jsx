import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";

export default function Settings() {
  const { user } = useAuth();
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (newPass !== confirm) return toast.error("كلمات المرور غير متطابقة");
    if (newPass.length < 6) return toast.error("6 أحرف على الأقل");

    const { data } = await supabase.from("users").select("id")
      .eq("email", user.email).eq("password", current).maybeSingle();
    if (!data) return toast.error("كلمة المرور الحالية خطأ");

    const { error } = await supabase.from("users").update({ password: newPass }).eq("id", data.id);
    if (error) return toast.error(error.message);
    toast.success("تم تغيير كلمة المرور");
    setCurrent(""); setNewPass(""); setConfirm("");
  }

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-3xl font-arabic text-brand-gold">الإعدادات</h1>
      <form onSubmit={submit} className="card-glass p-6 space-y-4">
        <h2 className="text-xl text-white font-bold">تغيير كلمة المرور</h2>
        <input type="password" required placeholder="كلمة المرور الحالية" value={current}
          onChange={(e) => setCurrent(e.target.value)} className="input-field" />
        <input type="password" required placeholder="كلمة المرور الجديدة" value={newPass}
          onChange={(e) => setNewPass(e.target.value)} className="input-field" />
        <input type="password" required placeholder="تأكيد كلمة المرور" value={confirm}
          onChange={(e) => setConfirm(e.target.value)} className="input-field" />
        <button className="btn-gold">حفظ</button>
      </form>
    </div>
  );
}