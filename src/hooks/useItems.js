import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

export function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetch() {
    setLoading(true);
    // استخدمنا * عشان نجيب كل الأعمدة (بما فيها variants و ingredients)
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("sort_order");
      
    if (error) {
      console.error("❌ Error fetching items:", error);
      toast.error("حدث خطأ في جلب الأصناف");
    } else {
      // console.log("✅ Data fetched successfully:", data);
      setItems(data || []);
    }
    setLoading(false);
  }

  async function uploadImage(file) {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("menu-images").upload(path, file);
    if (error) {
        console.error("❌ Upload Error:", error);
        throw error;
    }
    const { data } = supabase.storage.from("menu-images").getPublicUrl(path);
    return data.publicUrl;
  }

  async function create(values, imageFile) {
    let image_url = null;
    if (imageFile) image_url = await uploadImage(imageFile);
    
    // طباعة البيانات اللي رايحة للداتا بيز عشان نتأكد إن variants موجودة
    console.log("📤 Creating with values:", { ...values, image_url });

    const { error, data } = await supabase
      .from("menu_items")
      .insert([{ ...values, image_url }])
      .select();

    if (error) {
      console.error("❌ Insert Error:", error);
      return toast.error(error.message);
    }
    
    console.log("✅ Insert Success:", data);
    toast.success("تم إضافة الصنف");
    fetch();
  }

  async function update(id, values, imageFile) {
    let payload = { ...values };
    if (imageFile) payload.image_url = await uploadImage(imageFile);
    
    // طباعة البيانات اللي رايحة للتعديل
    console.log("📤 Updating with values:", payload);

    const { error, data } = await supabase
      .from("menu_items")
      .update(payload)
      .eq("id", id)
      .select();

    if (error) {
      console.error("❌ Update Error:", error);
      return toast.error(error.message);
    }

    console.log("✅ Update Success:", data);
    toast.success("تم التعديل");
    fetch();
  }

  async function remove(id) {
    if (!confirm("حذف الصنف؟")) return;
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) {
        console.error("❌ Delete Error:", error);
        return toast.error(error.message);
    }
    toast.success("تم الحذف");
    fetch();
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
    refetch: fetch, 
    getUniqueIngredients 
  };
}