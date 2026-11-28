import { Star, Trash2 } from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function AdminReviewsPage() {
  const { reviews, products, deleteReview } = useStore();

  const getProductName = (productId) => {
    const found = products.find((p) => p.id === Number(productId));
    return found ? found.name : `Paket #${productId}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Moderasi Ulasan</h1>
        <p className="text-sm text-slate-600">
          Pantau ulasan pelanggan pada setiap paket PLTS dan hapus ulasan yang tidak sesuai.
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Belum ada ulasan pelanggan.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((rev) => (
            <div key={rev.id} className="rounded-xl border border-slate-200 bg-white p-5 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-amber-700">
                    {getProductName(rev.product_id)}
                  </p>
                  <p className="text-sm font-bold text-slate-900">{rev.author}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    {rev.rating}/5
                  </span>
                  <button
                    onClick={() => deleteReview(rev.id)}
                    className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50"
                    title="Hapus ulasan"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-slate-700">{rev.comment}</p>
              <p className="text-[11px] text-slate-400">{rev.created_at}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
