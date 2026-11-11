import { useState, useEffect, useMemo } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { useItems } from "../../hooks/useItems";
import { useCategories } from "../../hooks/useCategories";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";
import ItemForm from "../../components/dashboard/ItemForm";

export default function Items() {
  const { items, loading, create, update, remove, updateSortOrder } = useItems();
  const { categories } = useCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  
  const [localSorts, setLocalSorts] = useState({});

  useEffect(() => {
    const sorts = {};
    items.forEach(i => sorts[i.id] = i.sort_order);
    setLocalSorts(sorts);
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const matchSearch = i.name.includes(search);
      const matchCat = filterCat === "all" || i.category_id === Number(filterCat);
      return matchSearch && matchCat;
    });
  }, [items, search, filterCat]);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    setModalOpen(true);
  }

  async function handleSubmit(values, imageFile) {
    setSaving(true);
    // لو بنضيف صنف جديد، نحسبله أول ترتيب فاضي في القسم ده
    if (!editing) {
      const catItems = items.filter(i => i.category_id === Number(values.category_id));
      const maxSort = catItems.reduce((max, i) => Math.max(max, i.sort_order || 0), 0);
      values.sort_order = maxSort + 1;
    }
    
    if (editing) await update(editing.id, values, imageFile);
    else await create(values, imageFile);
    setSaving(false);
    setModalOpen(false);
  }

  const handleSortChange = (id, value) => {
    const num = parseInt(value);
    if (!isNaN(num) && num !== localSorts[id]) {
      updateSortOrder(id, num);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-arabic text-brand-gold">الأصناف</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} صنف — معروض {filtered.length}</p>
        </div>
        <Button onClick={openCreate}><FiPlus /> إضافة صنف</Button>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap bg-brand-card p-4 rounded-xl border border-brand-gold/20">
        <div className="relative flex-1 min-w-[200px]">
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="بحث بالاسم..." className="input-field pr-12 py-2" />
        </div>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="input-field w-auto min-w-[180px] py-2">
          <option value="all">جميع الأقسام</option>
          {categories.map((c) => (<option key={c.id} value={c.id}>{c.icon} {c.name}</option>))}
        </select>
      </div>

      {/* تنبيه للأدمن عشان يعرف إن الترتيب جوه القسم */}
      {filterCat !== "all" && (
        <div className="mb-4 p-3 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-sm rounded-xl flex items-center gap-2">
          <span>💡</span>
          <span>الأرقام دي هي ترتيب الأصناف <strong>داخل هذا القسم فقط</strong>. اكتب 1 عشان يبقى الأول.</span>
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <div className="card-glass overflow-x-auto">
          <table className="w-full text-sm min-w-[750px]">
            <thead className="bg-brand-gold/10 text-brand-gold">
              <tr>
                <th className="p-4 text-center">الترتيب</th>
                <th className="p-4 text-right">الصنف</th>
                <th className="p-4 text-right">القسم</th>
                <th className="p-4 text-right">السعر</th>
                <th className="p-4 text-right">الحالة</th>
                <th className="p-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-gray-500">لا توجد أصناف مطابقة</td></tr>
              ) : (
                filtered.map((i) => {
                  const categoryObj = categories.find(c => c.id === i.category_id);
                  const categoryName = categoryObj?.name || "—";
                  const categoryIcon = categoryObj?.icon || "🍽️";

                  return (
                    <tr key={i.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="p-4 text-center">
                        <input
                          type="number"
                          min="0"
                          value={localSorts[i.id] ?? ""}
                          onChange={(e) => setLocalSorts({ ...localSorts, [i.id]: e.target.value })}
                          onBlur={(e) => handleSortChange(i.id, e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSortChange(i.id, e.target.value)}
                          className="w-16 bg-brand-dark border border-brand-gold/30 rounded-lg py-1 text-center text-white text-sm focus:border-brand-gold focus:outline-none"
                        />
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {i.image_url ? (
                            <img src={i.image_url} alt={i.name} className="w-12 h-12 rounded-lg object-cover" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-brand-maroon flex items-center justify-center text-2xl">{categoryIcon}</div>
                          )}
                          <div>
                            <div className="font-bold text-white">{i.name}</div>
                            <div className="text-xs text-gray-500 line-clamp-1">{i.description || "—"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-300">{categoryName}</td>
                      <td className="p-4 text-brand-gold font-bold whitespace-nowrap">{i.price} ج.م</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded ${i.is_available ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {i.is_available ? "متاح" : "غير متاح"}
                        </span>
                        {i.is_featured && <span className="text-xs bg-brand-gold/20 text-brand-gold px-2 py-1 rounded mr-1">⭐</span>}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1 justify-center">
                          <button onClick={() => openEdit(i)} className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition" title="تعديل"><FiEdit2 /></button>
                          <button onClick={() => remove(i.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition" title="حذف"><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "تعديل صنف" : "صنف جديد"} size="lg">
        <ItemForm initial={editing} categories={categories} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} loading={saving} />
      </Modal>
    </div>
  );
}