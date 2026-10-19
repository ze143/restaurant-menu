import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Ratings from "./pages/Ratings";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Overview from "./pages/admin/Overview";
import Categories from "./pages/admin/Categories";
import Items from "./pages/admin/Items";
import RatingsAdmin from "./pages/admin/RatingsAdmin";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="p-10 text-center text-brand-gold">جاري التحميل...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/ratings" element={<Ratings />} />
        
        {/* صفحة تسجيل الدخول */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* صفحات الإدارة (محمية) */}
        <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          {/* أول ما تفتح /admin هيروح أوتوماتيك لـ overview */}
          <Route index element={<Navigate to="overview" replace />} />
          
          {/* المسارات الفرعية */}
          <Route path="overview" element={<Overview />} />
          <Route path="categories" element={<Categories />} />
          <Route path="items" element={<Items />} />
          <Route path="ratings" element={<RatingsAdmin />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;