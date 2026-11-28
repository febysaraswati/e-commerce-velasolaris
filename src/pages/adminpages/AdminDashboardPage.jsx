import { Link } from "react-router-dom";
import { Package, ShoppingBag, MessageSquare, Wallet, AlertTriangle } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { formatRupiah } from "../../utils/formatters";

export default function AdminDashboardPage() {
  const { products, orders, consultations, feedbacks, reviews } = useStore();

  const totalRevenue = orders
    .filter((o) => o.status !== "Dibatalkan")
    .reduce((sum, o) => sum + o.total_price, 0);
  const pendingOrders = orders.filter((o) => o.status === "Menunggu Konfirmasi Teknis");
  const newConsultations = consultations.filter((c) => (c.status || "Baru") === "Baru");
  const lowStockProducts = products.filter((p) => p.stock <= 3);

  const stats = [
    {
      label: "Estimasi Omzet Aktif",
      value: formatRupiah(totalRevenue),
      sub: `${orders.length} total pesanan`,
      icon: Wallet,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Menunggu Konfirmasi",
      value: pendingOrders.length,
      sub: "Perlu tindak lanjut teknis",
      icon: ShoppingBag,
      color: "bg-amber-100 text-amber-700",
    },
    {
      label: "Paket PLTS Aktif",
      value: products.length,
      sub: `${lowStockProducts.length} stok menipis (≤ 3)`,
      icon: Package,
      color: "bg-sky-100 text-sky-700",
    },
    {
      label: "Konsultasi Baru",
      value: newConsultations.length,
      sub: `${feedbacks.length} feedback • ${reviews.length} ulasan`,
      icon: MessageSquare,
      color: "bg-violet-100 text-violet-700",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Admin</h1>
        <p className="text-sm text-slate-600">
          Ringkasan operasional katalog, pesanan, dan konsultasi VelaSolaris.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label}
              </span>
              <span className={`rounded-lg p-2 ${color}`}>
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
            <p className="mt-1 text-xs text-slate-500">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Pesanan Terbaru</h2>
            <Link to="/admin/orders" className="text-xs font-semibold text-amber-600 hover:underline">
              Kelola Semua
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">Belum ada pesanan masuk.</p>
          ) : (
            <div className="mt-3 divide-y divide-slate-100">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="font-semibold text-slate-900">
                      #{order.id} — {order.customer_name}
                    </p>
                    <p className="text-xs text-slate-500">{order.created_at} • {order.status}</p>
                  </div>
                  <span className="font-bold text-slate-900">{formatRupiah(order.total_price)}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Stok Paket Menipis
            </h2>
            <Link to="/admin/products" className="text-xs font-semibold text-amber-600 hover:underline">
              Atur Stok
            </Link>
          </div>
          {lowStockProducts.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">Semua stok paket PLTS dalam kondisi aman.</p>
          ) : (
            <div className="mt-3 divide-y divide-slate-100">
              {lowStockProducts.map((pkg) => (
                <div key={pkg.id} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="font-semibold text-slate-900">{pkg.name}</p>
                    <p className="text-xs text-slate-500">{pkg.capacity_wp} Wp • {pkg.system_type}</p>
                  </div>
                  <span className="rounded-md bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700">
                    Sisa {pkg.stock}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
