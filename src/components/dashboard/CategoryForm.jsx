import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function CategoryForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "🍖",
    sort_order: 0,
  });

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  function submit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      sort_order: Number(form.sort_order) || 0,
    });
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input
        label="اسم القسم"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="مثال: قسم الدجاج"
      />
      <Input
        label="Slug (بالإنجليزي)"
        required
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
        placeholder="chicken"
        hint="يستخدم في الرابط"
      />
      <Input
        label="أيقونة (emoji)"
        value={form.icon}
        onChange={(e) => setForm({ ...form, icon: e.target.value })}
        placeholder="🍖"
      />
      <Input
        type="number"
        label="ترتيب العرض"
        value={form.sort_order}
        onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
      />
      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={loading} className="flex-1">
          {initial ? "حفظ التعديلات" : "إضافة القسم"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}