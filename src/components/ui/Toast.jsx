// ============================================================
// Toast Component — Wrapper حول react-hot-toast
// ============================================================

export { Toaster as Toast } from "react-hot-toast";
export { default as toast } from "react-hot-toast";

// ============================================================
// Helper functions — اختصارات سريعة لأنواع التوست
// ============================================================

import toast from "react-hot-toast";

export const showSuccess = (message) => {
  toast.success(message, {
    style: {
      background: "#2A1F18",
      color: "#58D68D",
      border: "1px solid rgba(88, 214, 141, 0.3)",
    },
    iconTheme: {
      primary: "#58D68D",
      secondary: "#1A1410",
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    style: {
      background: "#2A1F18",
      color: "#EC7063",
      border: "1px solid rgba(231, 76, 60, 0.3)",
    },
    iconTheme: {
      primary: "#EC7063",
      secondary: "#1A1410",
    },
  });
};

export const showInfo = (message) => {
  toast(message, {
    icon: "ℹ️",
    style: {
      background: "#2A1F18",
      color: "#5DADE2",
      border: "1px solid rgba(93, 173, 226, 0.3)",
    },
  });
};

export const showLoading = (message = "جاري التحميل...") => {
  return toast.loading(message, {
    style: {
      background: "#2A1F18",
      color: "#C9A84C",
      border: "1px solid rgba(201, 168, 76, 0.3)",
    },
  });
};

// ============================================================
// دوال مساعدة للـ Promise-based toasts
// ============================================================

export const showPromise = (promise, messages = {}) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading || "جاري المعالجة...",
      success: messages.success || "تم بنجاح ✅",
      error: messages.error || "حدث خطأ ❌",
    },
    {
      style: {
        background: "#2A1F18",
        color: "#f5ede6",
        border: "1px solid rgba(201, 168, 76, 0.3)",
      },
      success: {
        iconTheme: {
          primary: "#58D68D",
          secondary: "#1A1410",
        },
      },
      error: {
        iconTheme: {
          primary: "#EC7063",
          secondary: "#1A1410",
        },
      },
    }
  );
};

// ============================================================
// دوال مساعدة للـ CRUD operations
// ============================================================

export const toastCreate = (name = "العنصر") => showSuccess(`تم إضافة ${name} بنجاح`);
export const toastUpdate = (name = "العنصر") => showSuccess(`تم تحديث ${name} بنجاح`);
export const toastDelete = (name = "العنصر") => showSuccess(`تم حذف ${name} بنجاح`);
export const toastError = (err) => showError(err?.message || "حدث خطأ غير متوقع");