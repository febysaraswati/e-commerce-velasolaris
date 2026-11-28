import { Link } from "react-router-dom";
import { Sun, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
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
            Hybrid untuk kebutuhan residensial, villa, dan operasional bisnis.
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
              <span>Denpasar, Bali — Indonesia</span>
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
  );
}