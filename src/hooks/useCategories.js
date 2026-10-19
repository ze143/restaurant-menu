import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetch() {
    setLoading(true);
    const { data } = await supabase
      .from("menu_categories")
      .select("*")
      .order("sort_order");
    setCategories(data || []);
    setLoading(false);
  }

  async function create(values) {
    const { error } = await supabase.from("menu_categories").insert([values]);
    if (error) return toast.error(error.message);
    toast.success("تم إضافة القسم");
    fetch();
  }

  async function update(id, values) {
    const { error } = await supabase
      .from("menu_categories")
      .update(values)
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم التعديل");
    fetch();
  }

  async function remove(id) {
    if (!confirm("حذف القسم وكل أصنافه؟")) return;
    const { error } = await supabase
      .from("menu_categories")
      .delete()
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    fetch();
  }

  useEffect(() => { fetch(); }, []);

  return { categories, loading, create, update, remove, refetch: fetch };
}