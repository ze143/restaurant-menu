import { useEffect, useState } from "react";
import { FiTrash2, FiEye, FiRefreshCw, FiX } from "react-icons/fi";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";

export default function RatingsAdmin() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  async function load() {
    setLoading(true);
    let q = supabase.from("ratings").select("*").order("created_at", { ascending: false });
    if (filter !== "all") q = q.eq("service_type", filter);
    if (search) q = q.ilike("customer_name", `%${search}%`);
    const { data } = await q;
    setRatings(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, [filter, search]);

  async function remove(id) {
    if (!confirm("حذف التقييم؟")) return;
    await supabase.from("rating_details").delete().eq("rating_id", id);
    const { error } = await supabase.from("ratings").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-arabic text-brand-gold">إدارة التقييمات</h1>

      <div className="flex gap-3 flex-wrap">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-field w-auto">
          <option value="all">جميع الخدمات</option>
          <option value="takeaway">تيك أواي</option>
          <option value="dinein">صالة</option>
          <option value="delivery">دليفري</option>
        </select>
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث بالاسم..." className="input-field w-auto" />
        <button onClick={load} className="btn-gold flex items-center gap-2">
          <FiRefreshCw /> تحديث
        </button>
      </div>

      <div className="card-glass overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-brand-gold/10 text-brand-gold">
            <tr>
              <th className="p-3 text-right">#</th>
              <th className="p-3 text-right">العميل</th>
              <th className="p-3 text-right">الخدمة</th>
              <th className="p-3 text-right">التقييم</th>
              <th className="p-3 text-right">تعليق</th>
              <th className="p-3">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-4 text-center text-gray-500">جاري التحميل...</td></tr>
            ) : ratings.length === 0 ? (
              <tr><td colSpan={6} className="p-4 text-center text-gray-500">لا توجد تقييمات</td></tr>
            ) : ratings.map((r, i) => (
              <tr key={r.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">
                  <div className="font-bold text-white">{r.customer_name}</div>
                  <div className="text-xs text-gray-500">{r.customer_phone}</div>
                </td>
                <td className="p-3"><span className="text-xs bg-blue-500/15 text-blue-300 px-2 py-1 rounded">{r.service_type}</span></td>
                <td className="p-3 text-brand-gold">{"★".repeat(r.rating)}</td>
                <td className="p-3 text-gray-400 max-w-xs truncate">{r.comment || "-"}</td>
                <td className="p-3">
                  <div className="flex gap-1 justify-center">
                    <button onClick={() => setSelected(r)} className="p-2 rounded bg-blue-500/10 text-blue-400">
                      <FiEye />
                    </button>
                    <button onClick={() => remove(r.id)} className="p-2 rounded bg-red-500/10 text-red-400">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}>
          <div onClick={(e) => e.stopPropagation()} className="card-glass p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-brand-gold font-bold">تفاصيل التقييم</h2>
              <button onClick={() => setSelected(null)}><FiX className="text-gray-400" /></button>
            </div>
            <pre className="text-xs bg-black/30 p-4 rounded overflow-x-auto text-gray-300 whitespace-pre-wrap">
              {JSON.stringify(selected.rating_data || selected, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}