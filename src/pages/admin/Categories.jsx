import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useCategories } from "../../hooks/useCategories";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";
import CategoryForm from "../../components/dashboard/CategoryForm";

export default function Categories() {
  const { categories, loading, create, update, remove, updateSortOrder } = useCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  
  // State محلي لحفظ الأرقام أثناء الكتابة
  const [localSorts, setLocalSorts] = useState({});

  useEffect(() => {
    // تحديث الأرقام المحلية لما البيانات تيجي
    const sorts = {};
    categories.forEach(c => sorts[c.id] = c.sort_order);
    setLocalSorts(sorts);
  }, [categories]);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(cat) {
    setEditing(cat);
    setModalOpen(true);
  }

  async function handleSubmit(values) {
    setSaving(true);
    if (editing) await update(editing.id, values);
    else await create(values);
    setSaving(false);
    setModalOpen(false);
  }

  // حفظ الترتيب لما المستخدم يدوس Enter أو يخرج من الخانة
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
          <h1 className="text-3xl font-arabic text-brand-gold">الأقسام</h1>
          <p className="text-sm text-gray-500 mt-1">{categories.length} قسم</p>
        </div>
        <Button onClick={openCreate}><FiPlus /> إضافة قسم</Button>
      </div>

      {loading ? (
        <Spinner />
      ) : categories.length === 0 ? (
        <div className="card-glass p-12 text-center text-gray-500">
          لا توجد أقسام. ابدأ بإضافة قسم جديد.
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((c) => (
            <div key={c.id} className="card-glass p-4 flex items-center justify-between gap-4 hover:border-brand-gold/40 transition">
              
              <div className="flex items-center gap-4 flex-1">
                {/* خانة الترتيب */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-gray-500">ترتيب</span>
                  <input
                    type="number"
                    min="0"
                    value={localSorts[c.id] ?? ""}
                    onChange={(e) => setLocalSorts({ ...localSorts, [c.id]: e.target.value })}
                    onBlur={(e) => handleSortChange(c.id, e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSortChange(c.id, e.target.value)}
                    className="w-14 bg-brand-dark border border-brand-gold/30 rounded-lg py-1 text-center text-white text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div className="text-3xl">{c.icon}</div>
                <div>
                  <h3 className="font-bold text-white text-lg">{c.name}</h3>
                  <p className="text-xs text-gray-500">{c.slug}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => openEdit(c)} className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition" title="تعديل">
                  <FiEdit2 />
                </button>
                <button onClick={() => remove(c.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition" title="حذف">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "تعديل قسم" : "قسم جديد"}>
        <CategoryForm initial={editing} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} loading={saving} />
      </Modal>
    </div>
  );
}