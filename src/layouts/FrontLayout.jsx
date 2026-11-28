import { Link, Outlet } from "react-router-dom";
import { Sun, ShoppingCart } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function FrontLayout() {
  const { cartCount } = useStore();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <Link to="/" className="flex items-center gap-2 font-bold text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-white">
              <Sun className="h-5 w-5" />
            </span>
            <div>
              <span className="block text-base leading-none">VelaSolaris</span>
              <span className="text-[11px] font-medium text-amber-600">Smart Energy Architect</span>
            </div>
          </Link>

          <nav className="flex items-center gap-5 text-sm font-medium text-slate-700">
            <Link to="/" className="hover:text-amber-600">Katalog</Link>
            <Link to="/consultation" className="hover:text-amber-600">Konsultasi</Link>
            <Link to="/orders" className="hover:text-amber-600">Riwayat</Link>
            <Link to="/admin" className="text-slate-500 hover:text-amber-600">Admin</Link>
            <Link
              to="/cart"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-white hover:bg-slate-800"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Keranjang ({cartCount})</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
