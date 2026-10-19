import { motion } from "framer-motion";

export default function MenuCard({ item }) {
  // لو فيه أحجام نعرضها، لو مفيش نعرض السعر الأساسي
  const hasVariants = item.variants && item.variants.length > 0;
  const lowestPrice = hasVariants 
    ? Math.min(...item.variants.map(v => v.price)) 
    : item.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-glass overflow-hidden hover:border-brand-gold/60 hover:shadow-brand-gold/10 transition-all duration-300 group flex flex-col"
    >
      {/* الصورة أو الأيقونة */}
      <div className="h-44 overflow-hidden relative">
        {item.image_url ? (
          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-maroon to-brand-dark flex items-center justify-center">
            <span className="text-6xl opacity-50 group-hover:scale-110 transition">🍖</span>
          </div>
        )}
        {item.is_featured && (
          <span className="absolute top-3 right-3 bg-brand-gold text-brand-dark text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            ⭐ مميز
          </span>
        )}
      </div>

      {/* المحتوى */}
      <div className="p-5 relative flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-brand-white mb-2 group-hover:text-brand-gold transition-colors">{item.name}</h3>
        
        {item.description && (
          <p className="text-sm text-gray-300 mb-3 line-clamp-2 leading-relaxed">{item.description}</p>
        )}

        {/* المكونات */}
        {item.ingredients && item.ingredients.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.ingredients.map((ing, idx) => (
              <span key={idx} className="text-[10px] bg-brand-maroon text-brand-gold px-2 py-0.5 rounded border border-brand-gold/20">
                {ing}
              </span>
            ))}
          </div>
        )}

        {/* السعر أو الأحجام */}
        <div className="mt-auto pt-3 border-t border-brand-gold/10">
          {hasVariants ? (
            <div className="space-y-1">
              {item.variants.map((v, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{v.name}</span>
                  <span className="text-brand-gold font-bold">{v.price} ج.م</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-brand-gold text-2xl font-black">
                {item.price} <span className="text-sm font-normal">ج.م</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}