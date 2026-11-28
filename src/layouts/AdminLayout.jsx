import { Link, NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  MessageSquare,
  Star,
  ArrowLeft,
  Sun,
} from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Paket PLTS", icon: Package },
  { to: "/admin/orders", label: "Pesanan", icon: ShoppingBag },
  { to: "/admin/consultations", label: "Konsultasi & Feedback", icon: MessageSquare },
  { to: "/admin/reviews", label: "Ulasan", icon: Star },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 md:flex">
      <aside className="w-full border-b border-slate-800 bg-slate-900 text-slate-100 md:w-64 md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <Link to="/admin" className="flex items-center gap-2.5 font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-slate-950">
              <Sun className="h-4 w-4" />
            </span>
            <div>
              <span className="block text-sm leading-none">VelaSolaris</span>
              <span className="text-[11px] font-medium text-amber-400">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex gap-1 overflow-x-auto p-3 md:flex-col">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Toko</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-5 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
