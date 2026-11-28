import { Link } from "react-router-dom";
import { Zap, ShieldCheck, Star } from "lucide-react";
import { formatRupiah } from "../utils/formatters";

export default function PackageCard({ pkg, reviews = [], onAddToCart }) {
  const productReviews = reviews.filter(
    (rev) => Number(rev.product_id) === Number(pkg.id)
  );
  const reviewCount = productReviews.length;
  const avgRating =
    reviewCount > 0
      ? (
          productReviews.reduce((sum, rev) => sum + Number(rev.rating || 0), 0) /
          reviewCount
        ).toFixed(1)
      : null;

  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
            {pkg.capacity_wp} Wp • {pkg.system_type}
          </span>
          <span className="text-xs text-slate-500">Stok: {pkg.stock}</span>
        </div>

        <h3 className="mt-3 text-lg font-bold text-slate-900">{pkg.name}</h3>

        {/* Rating & Jumlah Ulasan */}
        <div className="mt-1.5 flex items-center gap-1.5 text-xs">
          {avgRating ? (
            <>
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 font-semibold text-amber-700 ring-1 ring-amber-200">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {avgRating}
              </span>
              <span className="text-slate-500">
                ({reviewCount} {reviewCount === 1 ? "ulasan" : "ulasan"})
              </span>
            </>
          ) : (
            <span className="inline-flex items-center gap-1 text-slate-400">
              <Star className="h-3.5 w-3.5 text-slate-300" />
              Belum ada rating
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-slate-600">{pkg.summary}</p>

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
            type="button"
            onClick={() => onAddToCart(pkg, 1)}
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
  );
}