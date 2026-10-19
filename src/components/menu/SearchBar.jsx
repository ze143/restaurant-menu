import { FiSearch, FiX } from "react-icons/fi";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gold" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ابحث بالاسم أو بالمكونات (مثال: مشوي، جبنة، حار...)"
        className="input-field pr-12 pl-12 py-4 text-lg border-2 border-brand-gold/30 focus:border-brand-gold shadow-lg"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
        >
          <FiX />
        </button>
      )}
    </div>
  );
}