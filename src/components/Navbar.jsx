import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Sun } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Navbar() {
  const { cart } = useStore();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-amber-600" : "text-slate-700 hover:text-slate-950"
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-slate-950">
            <Sun className="h-5 w-5" />
          </span>
          <div>
            <p className="text-base font-bold leading-tight text-slate-900">
              VelaSolaris
            </p>
            <p className="text-[11px] font-medium text-amber-600">
              Smart Energy Architect
            </p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-5">
          <NavLink to="/" end className={navLinkClass}>
            Katalog
          </NavLink>
          <NavLink to="/consultation" className={navLinkClass}>
            Konsultasi
          </NavLink>
          <NavLink to="/orders" className={navLinkClass}>
            Riwayat
          </NavLink>
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Keranjang ({totalItems})</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}