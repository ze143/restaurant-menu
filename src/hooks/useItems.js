import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

export function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetch() {
    setLoading(true);
    // الترتيب هنا: أولاً حسب القسم، ثم حسب الترتيب الداخلي للقسم
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("category_id", { ascending: true })
      .order("sort_order", { ascending: true });
      
    if (error) console.error("Error fetching items:", error);
    else setItems(data || []);
    setLoading(false);
  }

  async function uploadImage(file) {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("menu-images").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("menu-images").getPublicUrl(path);
    return data.publicUrl;
  }

  async function create(values, imageFile) {
    let image_url = null;
    if (imageFile) image_url = await uploadImage(imageFile);
    const { error } = await supabase.from("menu_items").insert([{ ...values, image_url }]);
    if (error) return toast.error(error.message);
    toast.success("تم إضافة الصنف");
    fetch();
  }

  async function update(id, values, imageFile) {
    let payload = { ...values };
    if (imageFile) payload.image_url = await uploadImage(imageFile);
    const { error } = await supabase.from("menu_items").update(payload).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم التعديل");
    fetch();
  }

  async function remove(id) {
    if (!confirm("حذف الصنف؟")) return;
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    fetch();
  }

  async function updateSortOrder(id, newOrder) {
    // تحديث مؤقت في الواجهة عشان يبان سريع
    setItems(prev => 
      prev.map(i => i.id === id ? { ...i, sort_order: newOrder } : i)
           .sort((a, b) => a.category_id - b.category_id || a.sort_order - b.sort_order)
    );

    const { error } = await supabase.from("menu_items").update({ sort_order: newOrder }).eq("id", id);
    if (error) {
      toast.error("فشل حفظ الترتيب");
      fetch(); // رجع البيانات القديمة لو فشل
    } else {
      fetch();
    }
  }

  function getUniqueIngredients() {
    const allIngredients = items.flatMap((item) => item.ingredients || []);
    return [...new Set(allIngredients)].sort();
  }

  useEffect(() => { fetch(); }, []);

  return { 
    items, 
    loading, 
    create, 
    update, 
    remove, 
    updateSortOrder, 
    refetch: fetch, 
    getUniqueIngredients 
  };
}