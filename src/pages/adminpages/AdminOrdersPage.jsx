import { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { formatRupiah } from "../../utils/formatters";

const ORDER_STATUSES = [
  "Menunggu Konfirmasi Teknis",
  "Survei Lokasi",
  "Proses Instalasi",
  "Selesai",
  "Dibatalkan",
];

const STATUS_STYLE = {
  "Menunggu Konfirmasi Teknis": "bg-amber-100 text-amber-800",
  "Survei Lokasi": "bg-sky-100 text-sky-800",
  "Proses Instalasi": "bg-indigo-100 text-indigo-800",
  Selesai: "bg-emerald-100 text-emerald-800",
  Dibatalkan: "bg-rose-100 text-rose-700",
};

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore();
  const [filterStatus, setFilterStatus] = useState("Semua");

  const filtered =
    filterStatus === "Semua"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Pesanan</h1>
          <p className="text-sm text-slate-600">
            Pantau pesanan masuk dan perbarui status pengerjaan teknis.
          </p>
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        >
          <option value="Semua">Semua Status ({orders.length})</option>
          {ORDER_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Belum ada pesanan untuk filter ini.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div key={order.id} className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-base font-bold text-slate-900">Order #{order.id}</span>
                  <span className="ml-2 text-xs text-slate-500">• {order.created_at}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                      STATUS_STYLE[order.status] || "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {order.status}
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium"
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-2 text-xs text-slate-600 sm:grid-cols-2">
                <p>
                  Pelanggan: <strong className="text-slate-900">{order.customer_name}</strong> ({order.phone})
                </p>
                <p>
                  Alamat: <strong className="text-slate-900">{order.address}</strong>
                </p>
                {order.notes && (
                  <p className="sm:col-span-2">
                    Catatan Teknis: <strong className="text-amber-700">{order.notes}</strong>
                  </p>
                )}
              </div>

              <ul className="divide-y divide-slate-100 rounded-lg bg-slate-50 px-4 py-2 text-sm">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between py-1.5">
                    <span>
                      {item.name} ({item.capacity_wp} Wp) × {item.qty}
                    </span>
                    <span className="font-medium">{formatRupiah(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-end text-sm font-bold text-slate-900">
                Total: {formatRupiah(order.total_price)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
