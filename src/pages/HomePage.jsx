import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, ShieldCheck, ArrowRight } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { CATEGORIES, formatRupiah } from "../data/velasolarisData";

export default function HomePage() {
  const { products, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category_name === selectedCategory);

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
          Pilih kapasitas sistem tenaga surya sesuai kebutuhan daya rumah, villa, atau area operasional Anda tanpa ribet.
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
              {cat === "All" ? "Semua Paket (5)" : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((pkg) => (
          <div
            key={pkg.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                  {pkg.capacity_wp} Wp • {pkg.system_type}
                </span>
                <span className="text-xs text-slate-500">Stok: {pkg.stock}</span>
              </div>

              <h3 className="mt-3 text-lg font-bold text-slate-900">{pkg.name}</h3>
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
              <p className="text-lg font-bold text-slate-900">{formatRupiah(pkg.price)}</p>
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
    </div>
  );
}