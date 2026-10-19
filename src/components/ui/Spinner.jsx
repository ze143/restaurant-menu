export default function Spinner({ size = "md", text = "جاري التحميل..." }) {
  const sizes = { sm: "w-5 h-5", md: "w-10 h-10", lg: "w-16 h-16" };
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div
        className={`${sizes[size]} border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin`}
      />
      {text && <p className="text-gray-400 text-sm">{text}</p>}
    </div>
  );
}