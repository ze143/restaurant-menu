import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FiStar, FiCheck } from "react-icons/fi";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CategoryNav from "../components/menu/CategoryNav";
import CategorySection from "../components/menu/CategorySection";
import SearchBar from "../components/menu/SearchBar";
import Spinner from "../components/ui/Spinner";
import { useCategories } from "../hooks/useCategories";
import { useItems } from "../hooks/useItems";

export default function Menu() {
  const { categories, loading: catLoading } = useCategories();
  const { items, loading: itemLoading, getUniqueIngredients } = useItems();

  // States
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  
  // State للمكونات المختارة
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // جلب المكونات الفريدة من الداتا بيز
  const allIngredients = useMemo(() => getUniqueIngredients(), [items]);

  // الفلترة والترتيب
  const filtered = useMemo(() => {
    const searchTerms = query.trim().toLowerCase().split(" ").filter(Boolean);

    let result = items.filter((i) => {
      // دمج الاسم + الوصف + المكونات في نص واحد
      const ingredientsText = i.ingredients ? i.ingredients.join(" ") : "";
      const searchableText = `${i.name} ${i.description || ""} ${ingredientsText}`.toLowerCase();

      const matchQuery = searchTerms.every((term) =>
        searchableText.includes(term),
      );

      const matchCat = activeCat === "all" || i.category_id === activeCat;
      const matchFeatured = showFeaturedOnly ? i.is_featured : true;

      // فلترة المكونات المختارة (لازم الصنف يكون فيه كل المكونات اللي اختارها الزبون)
      const itemIngredients = (i.ingredients || []).map(ing => ing.toLowerCase());
      const matchIngredients = selectedIngredients.length === 0 || 
        selectedIngredients.every(selected => itemIngredients.includes(selected.toLowerCase()));

      return matchQuery && matchCat && matchFeatured && matchIngredients && i.is_available;
    });

    // الترتيب
    if (sortOrder === "priceAsc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "priceDesc") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => a.sort_order - b.sort_order);
    }

    return result;
  }, [items, query, activeCat, showFeaturedOnly, sortOrder, selectedIngredients]);

  // تجميع الأصناف حسب القسم
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((item) => {
      if (!map[item.category_id]) map[item.category_id] = [];
      map[item.category_id].push(item);
    });
    return map;
  }, [filtered]);

  // دالة للتعامل مع اختيار/إلغاء اختيار مكون
  const toggleIngredient = (ing) => {
    setSelectedIngredients((prev) =>
      prev.includes(ing) 
        ? prev.filter((item) => item !== ing) 
        : [...prev, ing]
    );
  };

  const loading = catLoading || itemLoading;

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-arabic text-center text-brand-gold mb-10"
        >
          المنيو
        </motion.h1>

        {/* شريط البحث */}
        <div className="mb-6">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {/* المكونات الديناميكية (Checkboxes) */}
        {allIngredients.length > 0 && (
          <div className="mb-6 bg-brand-card p-4 rounded-2xl border border-brand-gold/20">
            <h3 className="text-sm text-brand-gold font-bold mb-3 flex items-center gap-2">
              🍽️ اختر المكونات اللي تحبها:
            </h3>
            <div className="flex flex-wrap gap-3">
              {allIngredients.map((ing) => {
                const isSelected = selectedIngredients.includes(ing);
                return (
                  <label
                    key={ing}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all border ${
                      isSelected
                        ? "bg-brand-gold/15 border-brand-gold text-brand-gold"
                        : "bg-brand-dark/50 border-gray-600 text-gray-300 hover:border-brand-gold/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isSelected}
                      onChange={() => toggleIngredient(ing)}
                    />
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-brand-gold border-brand-gold"
                          : "border-gray-500"
                      }`}
                    >
                      {isSelected && <FiCheck className="text-brand-dark text-xs" />}
                    </div>
                    <span className="text-sm">{ing}</span>
                  </label>
                );
              })}
            </div>
            
            {/* زرار مسح المكونات المختارة */}
            {selectedIngredients.length > 0 && (
              <button
                onClick={() => setSelectedIngredients([])}
                className="mt-3 text-xs text-red-400 hover:text-red-300 hover:underline"
              >
                مسح المكونات المختارة ❌
              </button>
            )}
          </div>
        )}

        {/* شريط الفلاتر (الترتيب + المميز) */}
        <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                showFeaturedOnly
                  ? "bg-brand-gold text-brand-dark shadow-lg"
                  : "bg-brand-card text-gray-400 border border-brand-gold/20 hover:border-brand-gold"
              }`}
            >
              <FiStar /> المميز فقط
            </button>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-brand-card text-gray-300 text-sm border border-brand-gold/20 rounded-xl px-4 py-2 focus:outline-none focus:border-brand-gold cursor-pointer"
            >
              <option value="default">الترتيب الافتراضي</option>
              <option value="priceAsc">السعر: من الأقل للأعلى</option>
              <option value="priceDesc">السعر: من الأعلى للأقل</option>
            </select>
          </div>

          <div className="text-sm text-gray-400">
            تم العثور على{" "}
            <span className="text-brand-gold font-bold">{filtered.length}</span>{" "}
            صنف
          </div>
        </div>

        {/* أقسام المنيو */}
        <div className="mb-10">
          <CategoryNav
            categories={categories}
            active={activeCat}
            onChange={setActiveCat}
          />
        </div>

        {/* عرض الأصناف */}
        {loading ? (
          <Spinner size="lg" />
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500 mb-4">
              لا توجد أصناف مطابقة لبحثك 😔
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActiveCat("all");
                setShowFeaturedOnly(false);
                setSortOrder("default");
                setSelectedIngredients([]);
              }}
              className="text-brand-gold hover:underline"
            >
              مسح كل الفلاتر
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {categories
              .filter((c) => grouped[c.id]?.length)
              .map((cat) => (
                <CategorySection
                  key={cat.id}
                  category={cat}
                  items={grouped[cat.id]}
                />
              ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}