import { useEffect, useState } from "react";
import { FiStar, FiUsers, FiMessageSquare, FiTrendingUp } from "react-icons/fi";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS, ArcElement, BarElement, CategoryScale,
  LinearScale, Tooltip, Legend,
} from "chart.js";
import StatCard from "../../components/dashboard/StatCard";
import Spinner from "../../components/ui/Spinner";
import { useRatings } from "../../hooks/useRatings";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const chartOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { labels: { color: "#b8a99a" } } },
  scales: {
    x: { ticks: { color: "#6a5d52" }, grid: { color: "rgba(255,255,255,0.05)" } },
    y: { ticks: { color: "#6a5d52" }, grid: { color: "rgba(255,255,255,0.05)" } },
  },
};

export default function Overview() {
  const { analytics, stats, ratings, loading } = useRatings();
  const recent = ratings.slice(0, 5);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-arabic text-brand-gold">نظرة عامة</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={FiStar}
          label="متوسط التقييم"
          value={analytics?.avg_rating?.toFixed(1) || "0"}
        />
        <StatCard
          icon={FiMessageSquare}
          label="إجمالي التقييمات"
          value={analytics?.total_ratings || 0}
          color="text-blue-400"
        />
        <StatCard
          icon={FiUsers}
          label="عدد العملاء"
          value={analytics?.unique_customers || 0}
          color="text-green-400"
        />
        <StatCard
          icon={FiTrendingUp}
          label="تقييمات اليوم"
          value={analytics?.today_count || 0}
          color="text-purple-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-glass p-6 h-80">
          <h3 className="text-brand-gold mb-4">التقييمات حسب الخدمة</h3>
          <Bar
            data={{
              labels: ["تيك أواي", "صالة", "دليفري"],
              datasets: [{
                label: "عدد",
                data: [
                  analytics?.takeaway_count || 0,
                  analytics?.dinein_count || 0,
                  analytics?.delivery_count || 0,
                ],
                backgroundColor: ["#5DADE2", "#58D68D", "#F4D03F"],
                borderRadius: 8,
              }],
            }}
            options={chartOpts}
          />
        </div>

        <div className="card-glass p-6 h-80">
          <h3 className="text-brand-gold mb-4">توزيع النجوم</h3>
          <Pie
            data={{
              labels: ["1★", "2★", "3★", "4★", "5★"],
              datasets: [{
                data: [
                  stats?.rating_1 || 0,
                  stats?.rating_2 || 0,
                  stats?.rating_3 || 0,
                  stats?.rating_4 || 0,
                  stats?.rating_5 || 0,
                ],
                backgroundColor: ["#E74C3C", "#F39C12", "#F1C40F", "#2ECC71", "#27AE60"],
              }],
            }}
            options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "#b8a99a" } } } }}
          />
        </div>
      </div>

      <div className="card-glass p-6">
        <h3 className="text-brand-gold mb-4">آخر التقييمات</h3>
        {recent.length === 0 ? (
          <p className="text-gray-500">لا توجد تقييمات</p>
        ) : (
          <div className="space-y-3">
            {recent.map((r) => (
              <div key={r.id} className="flex justify-between items-center py-2 border-b border-white/5">
                <div>
                  <strong className="text-white">{r.customer_name}</strong>
                  <span className="text-xs text-gray-500 mr-2">({r.service_type})</span>
                  <span className="text-brand-gold mr-2">{"★".repeat(r.rating)}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(r.created_at).toLocaleDateString("ar-EG")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}