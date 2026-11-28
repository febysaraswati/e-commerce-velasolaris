import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useStore } from "../context/StoreContext";
import logoImg from "../assets/IMG_4221.JPG (1).jpeg";

export default function Navbar() {
  const { cartCount } = useStore();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-slate-900">
          <img
            src={logoImg}
            alt="Logo VelaSolaris"
            className="h-9 w-9 rounded-lg object-contain"
          />
          <div>
            <span className="block text-base leading-none">VelaSolaris</span>
            <span className="text-[11px] font-medium text-amber-600">Smart Energy Architect</span>
          </div>
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium text-slate-700">
          <Link to="/" className="hover:text-amber-600">Katalog</Link>
          <Link to="/consultation" className="hover:text-amber-600">Konsultasi</Link>
          <Link to="/orders" className="hover:text-amber-600">Riwayat</Link>
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
  );
}