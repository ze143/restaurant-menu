// تنسيق التاريخ بالعربي
export const formatDate = (date) =>
  new Date(date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// تنسيق السعر
export const formatPrice = (price) => `${Number(price).toLocaleString("ar-EG")} ج.م`;

// توليد slug من نص عربي أو إنجليزي
export const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

// تأخير
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// أسماء الخدمات
export const SERVICE_LABELS = {
  takeaway: "تيك أواي",
  dinein: "الصالة",
  delivery: "الدليفري",
};

export const SERVICE_ICONS = {
  takeaway: "🛍️",
  dinein: "🍽️",
  delivery: "🚚",
};