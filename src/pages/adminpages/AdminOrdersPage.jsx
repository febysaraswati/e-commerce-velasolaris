import { useEffect, useState } from "react";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { formatRupiah } from "../../utils/formatters";

const ORDERS_PER_PAGE = 3;

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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "Semua" || order.status === filterStatus;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      String(order.id ?? "").toLowerCase().includes(query) ||
      (order.customer_name &&
        order.customer_name.toLowerCase().includes(query)) ||
      (order.phone && order.phone.toLowerCase().includes(query)) ||
      (order.address && order.address.toLowerCase().includes(query)) ||
      (order.notes && order.notes.toLowerCase().includes(query)) ||
      (Array.isArray(order.items) &&
        order.items.some((item) =>
          (item.name || "").toLowerCase().includes(query)
        ));

    return matchesStatus && matchesSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ORDERS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ORDERS_PER_PAGE;
  const paginatedOrders = filtered.slice(
    startIndex,
    startIndex + ORDERS_PER_PAGE
  );

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

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

      {/* Kolom Pencarian */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari ID order, nama pelanggan, no. HP, alamat, catatan teknis, atau nama paket..."
          className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            title="Hapus pencarian"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          {searchQuery || filterStatus !== "Semua"
            ? "Tidak ada pesanan yang cocok dengan filter atau kata kunci pencarian."
            : "Belum ada pesanan untuk filter ini."}
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              Menampilkan {startIndex + 1}–
              {Math.min(startIndex + ORDERS_PER_PAGE, filtered.length)} dari{" "}
              {filtered.length} pesanan
            </span>
            <span>
              Halaman {safePage} dari {totalPages}
            </span>
          </div>

          <div className="space-y-4">
            {paginatedOrders.map((order) => (
              <div
                key={order.id}
                className="space-y-4 rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-base font-bold text-slate-900">
                      Order #{order.id}
                    </span>
                    <span className="ml-2 text-xs text-slate-500">
                      • {order.created_at}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                        STATUS_STYLE[order.status] ||
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {order.status}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
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
                    Pelanggan:{" "}
                    <strong className="text-slate-900">
                      {order.customer_name}
                    </strong>{" "}
                    ({order.phone})
                  </p>
                  <p>
                    Alamat:{" "}
                    <strong className="text-slate-900">{order.address}</strong>
                  </p>
                  {order.notes && (
                    <p className="sm:col-span-2">
                      Catatan Teknis:{" "}
                      <strong className="text-amber-700">{order.notes}</strong>
                    </p>
                  )}
                </div>

                <ul className="divide-y divide-slate-100 rounded-lg bg-slate-50 px-4 py-2 text-sm">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between py-1.5">
                      <span>
                        {item.name} ({item.capacity_wp} Wp) × {item.qty}
                      </span>
                      <span className="font-medium">
                        {formatRupiah(item.price * item.qty)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-end text-sm font-bold text-slate-900">
                  Total: {formatRupiah(order.total_price)}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Sebelumnya
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                      safePage === page
                        ? "bg-amber-500 text-slate-950"
                        : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Berikutnya
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}