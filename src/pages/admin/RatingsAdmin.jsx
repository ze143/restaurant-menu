import { useEffect, useState } from "react";
import { FiTrash2, FiEye, FiRefreshCw, FiX, FiStar } from "react-icons/fi";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";

export default function RatingsAdmin() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // لمتابعة حالة الحذف

  async function load() {
    setLoading(true);
    let q = supabase.from("ratings").select("*").order("created_at", { ascending: false });
    if (filter !== "all") q = q.eq("service_type", filter);
    if (search) q = q.ilike("customer_name", `%${search}%`);
    const { data, error } = await q;
    if (error) console.error("Load error:", error);
    setRatings(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, [filter, search]);

  async function remove(id) {
    if (!confirm("هل أنت متأكد من حذف هذا التقييم نهائياً؟")) return;
    
    setDeletingId(id); // تعطيل الزرار أثناء الحذف
    
    try {
      // 1. مسح التفاصيل المرتبطة (حتى لو مفيش تفاصيل مش هيضرب)
      const { error: detailsError } = await supabase
        .from("rating_details")
        .delete()
        .eq("rating_id", id);

      if (detailsError) {
        console.warn("مشكلة في مسح التفاصيل (يمكن مفيش تفاصيل):", detailsError);
      }

      // 2. مسح التقييم الأساسي
      const { error: ratingError } = await supabase
        .from("ratings")
        .delete()
        .eq("id", id);

      if (ratingError) throw ratingError;

      toast.success("تم حذف التقييم بنجاح");
      
      // 3. تحديث الجدول
      await load(); 
      
      // 4. قفل المودال لو كان مفتوح على نفس التقييم
      if (selected && selected.id === id) setSelected(null);

    } catch (error) {
      console.error("❌ Delete Error Details:", error);
      toast.error("حدث خطأ أثناء الحذف: " + (error.message || "تأكد من الصلاحيات"));
    } finally {
      setDeletingId(null);
    }
  }

  const arabicLabels = {
    takeaway_cleanliness: "النظافة", takeaway_quality: "جودة الأكل", takeaway_packaging: "التغليف", takeaway_services: "الخدمات", takeaway_time: "الوقت",
    dinein_cleanliness: "نظافة الصالة", dinein_quality: "جودة الأكل", dinein_presentation: "التقديم", dinein_services: "الخدمات", dinein_time: "الوقت", dinein_comfort: "الإضاءة والتكييف", dinein_staff: "أسلوب الويتر",
    delivery_cleanliness: "نظافة الأكل", delivery_quality: "جودة الأكل", delivery_packaging: "التغليف", delivery_services: "الخدمات", delivery_time: "الوقت", delivery_condition: "سلامة الأكل", delivery_driver: "أسلوب الطيار"
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-arabic text-brand-gold">إدارة التقييمات</h1>
      </div>

      <div className="flex gap-3 flex-wrap bg-brand-card p-4 rounded-xl border border-brand-gold/20">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-field w-auto py-2">
          <option value="all">جميع الخدمات</option>
          <option value="takeaway">تيك أواي</option>
          <option value="dinein">صالة</option>
          <option value="delivery">دليفري</option>
        </select>
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث بالاسم..." className="input-field w-auto py-2" />
        <button onClick={load} className="btn-gold py-2 flex items-center gap-2">
          <FiRefreshCw /> تحديث
        </button>
      </div>

      <div className="card-glass overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-brand-gold/10 text-brand-gold">
            <tr>
              <th className="p-3 text-right">#</th>
              <th className="p-3 text-right">العميل</th>
              <th className="p-3 text-right">الخدمة</th>
              <th className="p-3 text-right">التقييم</th>
              <th className="p-3 text-right">تعليق</th>
              <th className="p-3 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-4"><Spinner /></td></tr>
            ) : ratings.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-500">لا توجد تقييمات</td></tr>
            ) : ratings.map((r, i) => (
              <tr key={r.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-3 text-gray-400">{i + 1}</td>
                <td className="p-3">
                  <div className="font-bold text-white">{r.customer_name}</div>
                  <div className="text-xs text-gray-500">{r.customer_phone}</div>
                </td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded ${
                    r.service_type === 'takeaway' ? 'bg-blue-500/15 text-blue-300' : 
                    r.service_type === 'dinein' ? 'bg-green-500/15 text-green-300' : 'bg-yellow-500/15 text-yellow-300'
                  }`}>
                    {r.service_type === 'takeaway' ? 'تيك أواي' : r.service_type === 'dinein' ? 'صالة' : 'دليفري'}
                  </span>
                </td>
                <td className="p-3 text-brand-gold">{"★".repeat(r.rating)}</td>
                <td className="p-3 text-gray-400 max-w-[150px] truncate">{r.comment || "-"}</td>
                <td className="p-3">
                  <div className="flex gap-1 justify-center">
                    <button onClick={() => setSelected(r)} className="p-2 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition" title="عرض">
                      <FiEye />
                    </button>
                    <button 
                      onClick={() => remove(r.id)} 
                      disabled={deletingId === r.id}
                      className={`p-2 rounded transition ${deletingId === r.id ? 'bg-gray-500/10 text-gray-500' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'}`} 
                      title="حذف"
                    >
                      {deletingId === r.id ? <Spinner size="sm" text="" /> : <FiTrash2 />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div 
            className="bg-brand-dark border border-brand-gold/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-brand-dark/95 backdrop-blur p-4 border-b border-brand-gold/20 flex justify-between items-center z-10">
              <h2 className="text-xl font-arabic text-brand-gold">تفاصيل تقييم: {selected.customer_name}</h2>
              <button onClick={() => setSelected(null)} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400">
                <FiX />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg">
                  الخدمة: {selected.service_type === 'takeaway' ? 'تيك أواي' : selected.service_type === 'dinein' ? 'صالة' : 'دليفري'}
                </span>
                <span className="bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-lg flex items-center gap-1">
                  التقييم العام: {selected.rating} <FiStar className="mb-0.5" />
                </span>
                <span className="bg-white/5 text-gray-400 px-3 py-1 rounded-lg">
                  {new Date(selected.created_at).toLocaleString('ar-EG')}
                </span>
              </div>

              {selected.rating_data && (
                <div>
                  <h3 className="text-brand-gold font-bold mb-3 border-b border-white/10 pb-2">تقييم العناصر</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(selected.rating_data)
                      .filter(([key, val]) => 
                        typeof val === 'number' && 
                        val >= 1 && val <= 5 && 
                        !['rating', 'general_rating'].includes(key) &&
                        !key.includes('_id')
                      )
                      .map(([key, val]) => (
                        <div key={key} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                          <span className="text-sm text-gray-300">{arabicLabels[key] || key}</span>
                          <span className="text-brand-gold text-sm">{'★'.repeat(val)}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {selected.comment && (
                <div>
                  <h3 className="text-brand-gold font-bold mb-2 border-b border-white/10 pb-2">رأي الزبون</h3>
                  <p className="text-gray-300 bg-white/5 p-4 rounded-xl leading-relaxed text-sm">
                    "{selected.comment}"
                  </p>
                </div>
              )}

              {selected.rating_data?.general_suggestions && (
                <div>
                  <h3 className="text-brand-gold font-bold mb-2 border-b border-white/10 pb-2">الاقتراحات</h3>
                  <p className="text-gray-400 text-sm">{selected.rating_data.general_suggestions}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}