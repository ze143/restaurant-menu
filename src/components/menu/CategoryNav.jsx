import { motion } from "framer-motion";

export default function CategoryNav({ categories, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onChange("all")}
        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition ${
          active === "all"
            ? "bg-brand-gold text-brand-dark shadow-lg"
            : "bg-white/5 text-gray-400 hover:bg-white/10"
        }`}
      >
        🍽️ الكل
      </motion.button>
      {categories.map((c) => (
        <motion.button
          key={c.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(c.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition ${
            active === c.id
              ? "bg-brand-gold text-brand-dark shadow-lg"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          }`}
        >
          {c.icon} {c.name}
        </motion.button>
      ))}
    </div>
  );
}