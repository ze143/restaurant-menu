import { useState } from "react";
import { motion } from "framer-motion";
import { FiShoppingBag, FiTruck, FiStar, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

const SERVICES = {
  takeaway: {
    label: "تيك أواي", icon: FiShoppingBag,
    fields: [
      { key: "takeaway_cleanliness", label: "النظافة", hint: "مكان التجهيز" },
      { key: "takeaway_quality", label: "جودة الأكل", hint: "الطعم والنضارة" },
      { key: "takeaway_packaging", label: "التغليف", hint: "متين ومحكم" },
      { key: "takeaway_services", label: "الخدمات", hint: "سلطات ومقبلات" },
      { key: "takeaway_time", label: "الوقت", hint: "سرعة التجهيز" },
    ],
  },
  dinein: {
    label: "الصالة", icon: GiForkKnifeSpoon,
    fields: [
      { key: "dinein_cleanliness", label: "نظافة الصالة", hint: "أرضيات وطاولات" },
      { key: "dinein_quality", label: "جودة الأكل", hint: "طعم ونضارة" },
      { key: "dinein_presentation", label: "طريقة التقديم", hint: "شكل وتنسيق" },
      { key: "dinein_services", label: "الخدمات", hint: "سلطات ومقبلات" },
      { key: "dinein_time", label: "الوقت", hint: "سرعة التحضير" },
      { key: "dinein_comfort", label: "الإضاءة والتكييف", hint: "راحة" },
      { key: "dinein_staff", label: "أسلوب الويتر", hint: "احترام وابتسامة" },
    ],
  },
  delivery: {
    label: "الدليفري", icon: FiTruck,
    fields: [
      { key: "delivery_cleanliness", label: "نظافة الأكل", hint: "نظيف وخالي من شوائب" },
      { key: "delivery_quality", label: "جودة الأكل", hint: "طعم ونضارة" },
      { key: "delivery_packaging", label: "التغليف", hint: "محكم" },
      { key: "delivery_services", label: "الخدمات", hint: "سلطات ومقبلات" },
      { key: "delivery_time", label: "الوقت", hint: "سرعة التوصيل" },
      { key: "delivery_condition", label: "سلامة الأكل", hint: "وصل سليم؟" },
      { key: "delivery_driver", label: "أسلوب الطيار", hint: "احترام" },
    ],
  },
};

const MOODS = ["ممتاز", "جيد", "مقبول", "سيئ", "رائع", "مخيب", "مستوى"];

function StarRating({ value, onChange, large }) {
  return (
    <div className="flex flex-row-reverse gap-1 w-fit" dir="ltr">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`${large ? "text-4xl" : "text-3xl"} transition hover:scale-110 ${
            value >= n ? "text-brand-gold" : "text-gray-600"
          }`}
        >★</button>
      ))}
    </div>
  );
}

export default function Ratings() {
  const [service, setService] = useState("takeaway");
  const [scores, setScores] = useState({});
  const [general, setGeneral] = useState({
    rating: 0, comment: "", suggestions: "", mood: "",
    name: "", phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const fields = SERVICES[service].fields;

  async function submit(e) {
    e.preventDefault();
    for (const f of fields) {
      if (!scores[f.key]) return toast.error(`قيّم "${f.label}" أولاً`);
    }
    if (!general.rating) return toast.error("اختر التقييم العام");
    if (!general.comment.trim()) return toast.error("اكتب رأيك");
    if (!general.mood) return toast.error("اختر كلمة تصف تجربتك");

    setLoading(true);
    try {
      const rating_data = {
        service_type: service,
        ...scores,
        general_rating: general.rating,
        general_comment: general.comment,
        general_suggestions: general.suggestions,
        general_mood: general.mood,
      };

      const { data, error } = await supabase.from("ratings").insert([{
        customer_name: general.name || "زائر",
        customer_phone: general.phone || "",
        rating: general.rating,
        comment: general.comment,
        category: service,
        service_type: service,
        status: "pending",
        rating_data,
      }]).select();

      if (error) throw error;

      const details = {};
      fields.forEach((f) => { details[f.key] = scores[f.key]; });
      details.general_mood = general.mood;
      details.general_suggestions = general.suggestions;

      if (data?.[0]) {
        await supabase.from("rating_details").insert([{ rating_id: data[0].id, ...details }]);
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("حصل خطأ، جرب تاني");
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="card-glass p-12 text-center max-w-md"
        >
          <FiCheckCircle className="text-green-400 text-7xl mx-auto mb-6" />
          <h2 className="text-3xl font-arabic text-brand-gold mb-4">شكراً لك!</h2>
          <p className="text-gray-400 mb-6">تم إرسال تقييمك بنجاح. رأيك يساعدنا على التحسين.</p>
          <Link to="/" className="btn-gold inline-flex items-center gap-2">
            <FiArrowRight /> العودة للرئيسية
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-brand-gold mb-6 hover:gap-3 transition-all">
          <FiArrowRight /> العودة للرئيسية
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-arabic text-brand-gold mb-2">⭐ رأيك يهمنا</h1>
          <p className="text-gray-400">شاركنا تجربتك في عبدالحي الكبابجي</p>
        </motion.div>

        {/* Service Tabs */}
        <div className="grid grid-cols-3 gap-3 mb-8 bg-brand-card p-2 rounded-2xl border border-brand-gold/20">
          {Object.entries(SERVICES).map(([key, s]) => {
            const Icon = s.icon;
            const active = service === key;
            return (
              <button
                key={key}
                onClick={() => { setService(key); setScores({}); }}
                className={`py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                  active
                    ? "bg-brand-maroon text-white shadow-lg border border-brand-gold/30"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <Icon /> {s.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Service Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.key} className="bg-brand-card border border-brand-gold/20 rounded-xl p-4 flex flex-col justify-between">
                <div className="mb-3">
                  <div className="flex items-center gap-2 text-brand-gold font-bold mb-1">
                    <FiStar />
                    <span>{f.label}</span>
                  </div>
                  <p className="text-xs text-gray-400">{f.hint}</p>
                </div>
                <StarRating
                  value={scores[f.key] || 0}
                  onChange={(v) => setScores({ ...scores, [f.key]: v })}
                />
              </div>
            ))}
          </div>

          {/* General */}
          <div className="bg-brand-card border border-brand-gold/20 rounded-xl p-6 space-y-6">
            <h3 className="text-2xl font-arabic text-brand-gold border-b border-brand-gold/20 pb-3">رأيك العام</h3>

            <div>
              <label className="block text-sm text-gray-400 mb-2">التقييم العام *</label>
              <StarRating large value={general.rating} onChange={(v) => setGeneral({ ...general, rating: v })} />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">شاركنا تجربتك *</label>
              <textarea
                rows={4} value={general.comment}
                onChange={(e) => setGeneral({ ...general, comment: e.target.value })}
                className="input-field" placeholder="اكتب رأيك هنا..."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">اقتراحاتك للتطوير</label>
              <textarea
                rows={3} value={general.suggestions}
                onChange={(e) => setGeneral({ ...general, suggestions: e.target.value })}
                className="input-field" placeholder="إيه اللي تحب نطوره؟"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">كيف تصف تجربتك بكلمة؟ *</label>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m} type="button"
                    onClick={() => setGeneral({ ...general, mood: m })}
                    className={`px-5 py-2 rounded-full border-2 transition ${
                      general.mood === m
                        ? "border-brand-gold bg-brand-gold/15 text-brand-gold"
                        : "border-white/10 text-gray-400 hover:border-brand-gold/50"
                    }`}
                  >{m}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-sm text-gray-400 mb-1">الاسم (اختياري)</label>
                <input className="input-field" placeholder="اسمك"
                  value={general.name} onChange={(e) => setGeneral({ ...general, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">رقم الهاتف (اختياري)</label>
                <input className="input-field" placeholder="01xxxxxxxxx" type="tel"
                  value={general.phone} onChange={(e) => setGeneral({ ...general, phone: e.target.value })} />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-gold w-full text-lg py-4">
            {loading ? "جاري الإرسال..." : "إرسال التقييم"}
          </button>
        </form>
      </div>
    </div>
  );
}