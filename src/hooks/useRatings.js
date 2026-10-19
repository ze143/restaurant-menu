import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

export function useRatings() {
  const [ratings, setRatings] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchRatings({ service = "all", search = "" } = {}) {
    setLoading(true);
    let q = supabase.from("ratings").select("*").order("created_at", { ascending: false });
    if (service !== "all") q = q.eq("service_type", service);
    if (search) q = q.ilike("customer_name", `%${search}%`);
    const { data } = await q;
    setRatings(data || []);
    setLoading(false);
  }

  async function fetchAnalytics() {
    const [{ data: a }, { data: s }] = await Promise.all([
      supabase.from("rating_analytics").select("*").maybeSingle(),
      supabase.from("rating_stats").select("*").maybeSingle(),
    ]);
    setAnalytics(a);
    setStats(s);
  }

  async function remove(id) {
    if (!confirm("حذف التقييم؟")) return;
    await supabase.from("rating_details").delete().eq("rating_id", id);
    const { error } = await supabase.from("ratings").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    fetchRatings();
    fetchAnalytics();
  }

  useEffect(() => {
    fetchRatings();
    fetchAnalytics();
  }, []);

  return {
    ratings,
    analytics,
    stats,
    loading,
    fetchRatings,
    fetchAnalytics,
    remove,
  };
}