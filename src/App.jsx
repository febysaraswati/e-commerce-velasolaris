import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PackageDetailPage from "./pages/PackageDetailPage";
import CartCheckoutPage from "./pages/CartCheckoutPage";
import ConsultationPage from "./pages/ConsultationPage";
import OrdersHistoryPage from "./pages/OrdersHistoryPage";

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/packages/:id" element={<PackageDetailPage />} />
              <Route path="/cart" element={<CartCheckoutPage />} />
              <Route path="/consultation" element={<ConsultationPage />} />
              <Route path="/orders" element={<OrdersHistoryPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}