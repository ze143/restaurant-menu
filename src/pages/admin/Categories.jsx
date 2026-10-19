import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useCategories } from "../../hooks/useCategories";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";
import CategoryForm from "../../components/dashboard/CategoryForm";

export default function Categories() {
  const { categories, loading, create, update, remove } = useCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-arabic text-brand-gold">الأقسام</h1>
          <p className="text-sm text-gray-500 mt-1">{categories.length} قسم</p>
        </div>
        <Button onClick={openCreate}>
          <FiPlus /> إضافة قسم
        </Button>
      </div>

      {loading ? (
        <Spinner />
      ) : categories.length === 0 ? (
        <div className="card-glass p-12 text-center text-gray-500">
          لا توجد أقسام. ابدأ بإضافة قسم جديد.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => (
            <div
              key={c.id}
              className="card-glass p-5 hover:border-brand-gold/40 transition group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-4xl mb-2">{c.icon}</div>
                  <h3 className="font-bold text-white text-lg">{c.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{c.slug}</p>
                  <p className="text-xs text-gray-600 mt-1">ترتيب: {c.sort_order}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => openEdit(c)}
                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                    title="تعديل"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => remove(c.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                    title="حذف"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "تعديل قسم" : "قسم جديد"}
      >
        <CategoryForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          loading={saving}
        />
      </Modal>
    </div>
  );
}