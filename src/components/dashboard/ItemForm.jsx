import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ItemForm({ initial, categories, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    category_id: "",
    is_available: true,
    is_featured: false,
    sort_order: 0,
    ingredients: "",
  });
  
  // State للأحجام (المقاسات)
  const [variants, setVariants] = useState([]);
  
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initial) {
      setForm({
        ...initial,
        category_id: initial.category_id || "",
        ingredients: initial.ingredients ? initial.ingredients.join(", ") : "",
      });
      // تحميل الأحجام لو موجودة
      setVariants(initial.variants || []);
      setPreview(initial.image_url || null);
    } else if (categories?.[0]) {
      setForm((f) => ({ ...f, category_id: categories[0].id }));
    }
  }, [initial, categories]);

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  // دوال إضافة ومسح الأحجام
  const addVariant = () => setVariants([...variants, { name: "", price: "" }]);
  const removeVariant = (index) => setVariants(variants.filter((_, i) => i !== index));
  const updateVariant = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  function submit(e) {
    e.preventDefault();
    
    const ingredientsArray = form.ingredients
      ? form.ingredients.split(",").map((i) => i.trim()).filter(Boolean)
      : [];

    // تنظيف الأحجام من اللي فاضي وتحويل السعر لرقم
    const cleanVariants = variants
      .filter(v => v.name.trim() !== "" && v.price !== "")
      .map(v => ({ name: v.name, price: Number(v.price) }));

    onSubmit(
      {
        ...form,
        price: Number(form.price) || 0,
        category_id: Number(form.category_id),
        sort_order: Number(form.sort_order) || 0,
        ingredients: ingredientsArray,
        variants: cleanVariants, // إرسال الأحجام للداتا بيز
      },
      imageFile
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input
        label="اسم الصنف"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="مثال: كفتة ضاني"
      />

      <div>
        <label className="block text-sm text-gray-400 mb-1.5">الوصف</label>
        <textarea
          rows={2}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="input-field"
          placeholder="تقدم مع عيش + سلطات"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1.5">المكونات</label>
        <input
          type="text"
          value={form.ingredients}
          onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
          className="input-field"
          placeholder="مثال: لحمة, عيش, طحينة"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          type="number"
          label="السعر الأساسي (ج.م)"
          required
          min={0}
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          hint="لو هتضيف أحجام تحت، ده هيكون سعر الحجم الافتراضي"
        />
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">القسم *</label>
          <select
            required
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            className="input-field"
          >
            <option value="">اختر قسم</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* قسم الأحجام (Variants) */}
      <div className="bg-brand-dark/50 p-4 rounded-xl border border-brand-gold/20">
        <div className="flex justify-between items-center mb-3">
          <label className="text-brand-gold font-bold text-sm">الأحجام / الأوزان (اختياري)</label>
          <button type="button" onClick={addVariant} className="text-xs bg-brand-gold text-brand-dark px-3 py-1 rounded-lg hover:bg-yellow-500 font-bold">
            + إضافة حجم
          </button>
        </div>
        
        {variants.length === 0 ? (
          <p className="text-xs text-gray-500">مفيش أحجام مضافة. هيتعرض السعر الأساسي بس.</p>
        ) : (
          <div className="space-y-2">
            {variants.map((v, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="اسم الحجم (مثال: ربع)"
                  value={v.name}
                  onChange={(e) => updateVariant(i, "name", e.target.value)}
                  className="input-field py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="السعر"
                  value={v.price}
                  onChange={(e) => updateVariant(i, "price", e.target.value)}
                  className="input-field py-2 text-sm w-32"
                />
                <button type="button" onClick={() => removeVariant(i)} className="text-red-400 p-2 hover:bg-red-500/10 rounded-lg">
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">صورة الصنف</label>
        {preview && (
          <img src={preview} alt="preview" className="w-full h-40 object-cover rounded-xl mb-3 border border-white/10" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-gold/20 file:text-brand-gold hover:file:bg-brand-gold/30 file:cursor-pointer"
        />
      </div>

      <div className="flex gap-4 py-2">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.is_available} onChange={(e) => setForm({ ...form, is_available: e.target.checked })} className="accent-brand-gold w-4 h-4" />
          متاح
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="accent-brand-gold w-4 h-4" />
          مميز ⭐
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={loading} className="flex-1">
          {initial ? "حفظ التعديلات" : "إضافة الصنف"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>إلغاء</Button>
      </div>
    </form>
  );
}