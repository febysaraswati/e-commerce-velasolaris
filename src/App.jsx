import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import FrontLayout from "./layouts/FrontLayout";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/frontpages/HomePage";
import PackageDetailPage from "./pages/frontpages/PackageDetailPage";
import CartCheckoutPage from "./pages/frontpages/CartCheckoutPage";
import ConsultationPage from "./pages/frontpages/ConsultationPage";
import OrdersHistoryPage from "./pages/frontpages/OrdersHistoryPage";
import AdminDashboardPage from "./pages/adminpages/AdminDashboardPage";
import AdminProductsPage from "./pages/adminpages/AdminProductsPage";
import AdminOrdersPage from "./pages/adminpages/AdminOrdersPage";
import AdminConsultationsPage from "./pages/adminpages/AdminConsultationsPage";
import AdminReviewsPage from "./pages/adminpages/AdminReviewsPage";

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<FrontLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/packages/:id" element={<PackageDetailPage />} />
            <Route path="/cart" element={<CartCheckoutPage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/orders" element={<OrdersHistoryPage />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="consultations" element={<AdminConsultationsPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
