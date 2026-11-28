import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { formatRupiah } from "../../utils/formatters";

export default function PackageDetailPage() {
  const { id } = useParams();
  const { products, reviews, addReview, addToCart } = useStore();

  const pkg = products.find((item) => item.id === Number(id));
  const pkgReviews = reviews.filter((rev) => rev.product_id === Number(id));

  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [qty, setQty] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  if (!pkg) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <p className="font-semibold text-slate-800">
          Paket PLTS tidak ditemukan.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block text-sm font-semibold text-amber-600 hover:underline"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;
    addReview({ productId: pkg.id, author, rating, comment });
    setAuthor("");
    setRating(5);
    setComment("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke Katalog
      </Link>

      <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              {pkg.capacity_wp} Wp • {pkg.system_type}
            </span>
            <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {pkg.badge}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {pkg.name}
          </h1>
          <p className="text-sm leading-relaxed text-slate-600">
            {pkg.summary}
          </p>
          <p className="text-2xl font-bold text-slate-900">
            {formatRupiah(pkg.price)}
          </p>
          <p className="text-xs text-slate-500">
            Stok tersedia: {pkg.stock} unit
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <input
              type="number"
              min={1}
              max={pkg.stock}
              value={qty}
              onChange={(e) =>
                setQty(
                  Math.max(1, Math.min(pkg.stock, Number(e.target.value) || 1)),
                )
              }
              className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <button
              onClick={() => addToCart(pkg, qty)}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <ShoppingCart className="h-4 w-4" /> Tambah ke Keranjang
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-5">
          <h2 className="text-base font-bold text-slate-900">
            Spesifikasi Teknis Paket
          </h2>
          <dl className="mt-4 divide-y divide-slate-200 text-sm">
            <div className="flex justify-between py-2.5 gap-4">
              <dt className="text-slate-500">Panel Surya</dt>
              <dd className="text-right font-medium text-slate-900">
                {pkg.specs.panels}
              </dd>
            </div>
            <div className="flex justify-between py-2.5 gap-4">
              <dt className="text-slate-500">Inverter</dt>
              <dd className="text-right font-medium text-slate-900">
                {pkg.specs.inverter}
              </dd>
            </div>
            <div className="flex justify-between py-2.5 gap-4">
              <dt className="text-slate-500">Penyimpanan Baterai</dt>
              <dd className="text-right font-medium text-slate-900">
                {pkg.specs.battery}
              </dd>
            </div>
            <div className="flex justify-between py-2.5 gap-4">
              <dt className="text-slate-500">Estimasi Produksi</dt>
              <dd className="text-right font-medium text-emerald-700">
                {pkg.specs.daily_est}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Bagian Ulasan / Reviews */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Tulis Ulasan Paket
          </h2>
          <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Nama
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Contoh: Komang Ayu"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Rating (1–5)
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num} Bintang
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Komentar
              </label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ceritakan pengalaman atau pertanyaanmu soal paket ini..."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400"
            >
              Kirim Ulasan
            </button>
            {submitted && (
              <p className="text-xs font-medium text-emerald-700">
                Ulasan tersimpan!
              </p>
            )}
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Ulasan Pelanggan ({pkgReviews.length})
          </h2>
          <div className="mt-4 space-y-3">
            {pkgReviews.length === 0 ? (
              <p className="text-sm text-slate-500">
                Belum ada ulasan untuk paket ini.
              </p>
            ) : (
              pkgReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">
                      {rev.author}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />{" "}
                      {rev.rating}/5
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-slate-700">{rev.comment}</p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {rev.created_at}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
