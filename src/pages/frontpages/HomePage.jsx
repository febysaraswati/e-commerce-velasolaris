import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  ShieldCheck,
  ArrowRight,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { CATEGORIES } from "../../data/velasolarisData";
import { formatRupiah } from "../../utils/formatters";

const ITEMS_PER_PAGE = 3;

export default function HomePage() {
  const { products, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category_name === selectedCategory;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      (p.name && p.name.toLowerCase().includes(query)) ||
      (p.summary && p.summary.toLowerCase().includes(query)) ||
      (p.system_type && p.system_type.toLowerCase().includes(query)) ||
      String(p.capacity_wp ?? "").toLowerCase().includes(query) ||
      (p.specs?.panels && p.specs.panels.toLowerCase().includes(query)) ||
      (p.specs?.battery && p.specs.battery.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  // Reset ke halaman 1 jika filter kategori atau kata kunci berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    const clamped = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(clamped);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-slate-900 p-6 text-white sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
          VelaSolaris • Smart Energy Architect
        </p>
        <h1 className="mt-2 max-w-2xl text-2xl font-bold sm:text-4xl">
          Paket PLTS Off-Grid & Hybrid dari 2600 Wp hingga 7800 Wp
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Pilih kapasitas sistem tenaga surya sesuai kebutuhan daya rumah,
          villa, atau area operasional Anda tanpa ribet.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/consultation"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-400"
          >
            Konsultasi Kebutuhan Daya <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-900">Katalog Paket PLTS</h2>
          <div className="flex flex-wrap gap-2">
            {["All", ...CATEGORIES.map((c) => c.name)].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-slate-950"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {cat === "All" ? `Semua Paket (${products.length})` : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Kolom Pencarian */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama paket, kapasitas (cth: 3900), tipe (Hybrid/Off-Grid), panel, atau baterai..."
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
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-base font-bold text-slate-900">
            Paket PLTS tidak ditemukan
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Tidak ada paket yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Reset Filter & Pencarian
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              Menampilkan {startIndex + 1}–
              {Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)} dari{" "}
              {filtered.length} paket
            </span>
            <span>
              Halaman {safePage} dari {totalPages}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedProducts.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                      {pkg.capacity_wp} Wp • {pkg.system_type}
                    </span>
                    <span className="text-xs text-slate-500">
                      Stok: {pkg.stock}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-slate-900">
                    {pkg.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600">{pkg.summary}</p>

                  <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-700">
                    <li className="flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-amber-500" />
                      <span>{pkg.specs.panels}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span>{pkg.specs.battery}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-lg font-bold text-slate-900">
                    {formatRupiah(pkg.price)}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => addToCart(pkg, 1)}
                      className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      + Keranjang
                    </button>
                    <Link
                      to={`/packages/${pkg.id}`}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Detail
                    </Link>
                  </div>
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