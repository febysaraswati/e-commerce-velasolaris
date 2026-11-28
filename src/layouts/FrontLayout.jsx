import { Link, NavLink, Outlet } from "react-router-dom";
import { Sun, ShoppingCart, Phone, Mail, MapPin } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function FrontLayout() {
  const { cartCount } = useStore();

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-amber-600" : "text-slate-700 hover:text-amber-600"
    }`;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-white">
              <Sun className="h-5 w-5" />
            </span>
            <div>
              <span className="block text-base leading-none">VelaSolaris</span>
              <span className="text-[11px] font-medium text-amber-600">
                Smart Energy Architect
              </span>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-700">
            <NavLink to="/" end className={navLinkClass}>
              Katalog
            </NavLink>
            <NavLink to="/consultation" className={navLinkClass}>
              Konsultasi
            </NavLink>
            <NavLink to="/orders" className={navLinkClass}>
              Riwayat
            </NavLink>
            <Link to="/admin" className="text-slate-500 hover:text-amber-600">
              Admin
            </Link>
            <Link
              to="/cart"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-white transition hover:bg-slate-800"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Keranjang ({cartCount})</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-300">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-slate-950">
                <Sun className="h-4 w-4" />
              </span>
              <span className="text-base font-bold text-white">VelaSolaris</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Solusi paket Pembangkit Listrik Tenaga Surya (PLTS) Off-Grid dan
              Hybrid untuk kebutuhan rumah tinggal, villa, dan operasional usaha.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigasi
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400">
                  Katalog Paket PLTS
                </Link>
              </li>
              <li>
                <Link to="/consultation" className="hover:text-amber-400">
                  Konsultasi Daya
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-amber-400">
                  Riwayat Pesanan
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-amber-400">
                  Keranjang Belanja
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Kontak & Layanan
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-400" />
                <span>Bali — Indonesia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-400" />
                <span>+62 823 1000 1567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-400" />
                <span>sales.velasolaris@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} VelaSolaris • Smart Energy Architect. All
          rights reserved.
        </div>
      </footer>
    </div>
  );
}