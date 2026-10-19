import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, color = "text-brand-gold", subLabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-glass p-5 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-1 h-full bg-brand-gold/40" />
      <Icon className={`text-3xl mb-2 ${color}`} />
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
      {subLabel && <div className="text-xs text-gray-600 mt-1">{subLabel}</div>}
    </motion.div>
  );
}