import MenuCard from "./MenuCard";
import { motion } from "framer-motion";

export default function CategorySection({ category, items }) {
  if (!items?.length) return null;

  return (
    <section id={category.slug} className="scroll-mt-24">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-arabic text-brand-gold mb-6 flex items-center gap-3"
      >
        <span className="text-4xl">{category.icon}</span>
        {category.name}
        <span className="text-sm text-gray-500 font-sans font-normal">
          ({items.length} صنف)
        </span>
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}