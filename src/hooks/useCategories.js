import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetch() {
    setLoading(true);
    const { data, error } = await supabase
      .from("menu_categories")
      .select("*")
      .order("sort_order", { ascending: true });
      
    if (error) console.error("Error fetching categories:", error);
    else setCategories(data || []);
    setLoading(false);
  }

  async function create(values) {
    const { error } = await supabase.from("menu_categories").insert([values]);
    if (error) return toast.error(error.message);
    toast.success("تم إضافة القسم");
    fetch();
  }

  async function update(id, values) {
    const { error } = await supabase.from("menu_categories").update(values).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم التعديل");
    fetch();
  }

  async function remove(id) {
    if (!confirm("حذف القسم وكل أصنافه؟")) return;
    const { error } = await supabase.from("menu_categories").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    fetch();
  }

  // دالة سريعة لتحديث الترتيب من خانة الرقم
  async function updateSortOrder(id, newOrder) {
    // تحديث تفاؤلي عشان يظهر فوراً
    setCategories(prev => 
      prev.map(c => c.id === id ? { ...c, sort_order: newOrder } : c)
           .sort((a, b) => a.sort_order - b.sort_order)
    );
    
    // الحفظ في الداتا بيز
    const { error } = await supabase.from("menu_categories").update({ sort_order: newOrder }).eq("id", id);
    if (error) {
      toast.error("فشل حفظ الترتيب");
      fetch(); // رجع البيانات القديمة لو فشل
    } else {
      fetch(); // عشان نرتب باقي العناصر لو فيه تعارض
    }
  }

  useEffect(() => { fetch(); }, []);

  return { 
    categories, loading, create, update, remove, 
    updateSortOrder, // الدالة الجديدة
    refetch: fetch 
  };
}