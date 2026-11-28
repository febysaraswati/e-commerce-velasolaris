import { useStore } from "../../context/StoreContext";
import { formatRupiah } from "../../utils/formatters";

export default function OrdersHistoryPage() {
  const { orders, consultations, feedbacks } = useStore();

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Riwayat Pesanan</h1>
        {orders.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
            Belum ada pesanan yang dibuat.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-slate-200 bg-white p-5 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-sm font-bold text-slate-900">
                    Order #{order.id}
                  </span>
                  <span className="ml-2 text-xs text-slate-500">
                    • {order.created_at}
                  </span>
                </div>
                <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                  {order.status}
                </span>
              </div>

              <p className="text-xs text-slate-600">
                Pemesan:{" "}
                <strong className="text-slate-800">
                  {order.customer_name}
                </strong>{" "}
                ({order.phone}) — {order.address}
              </p>

              <ul className="divide-y divide-slate-100 text-sm">
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

              <div className="flex justify-end border-t border-slate-100 pt-2.5 text-sm font-bold text-slate-900">
                Total: {formatRupiah(order.total_price)}
              </div>
            </div>
          ))
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            Konsultasi Terkirim ({consultations.length})
          </h2>
          {consultations.length === 0 ? (
            <p className="text-sm text-slate-500">Belum ada konsultasi.</p>
          ) : (
            consultations.map((c) => (
              <div key={c.id} className="rounded-xl bg-slate-50 p-4 text-sm">
                <div className="flex justify-between font-semibold text-slate-900">
                  <span>{c.name}</span>
                  <span className="text-xs text-slate-400">{c.created_at}</span>
                </div>
                <p className="text-xs text-slate-500">{c.contact}</p>
                {c.monthly_bill && (
                  <p className="mt-1 text-xs font-medium text-amber-700">
                    Kebutuhan: {c.monthly_bill}
                  </p>
                )}
                <p className="mt-1.5 text-slate-700">{c.message}</p>
              </div>
            ))
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            Feedback Terkirim ({feedbacks.length})
          </h2>
          {feedbacks.length === 0 ? (
            <p className="text-sm text-slate-500">Belum ada feedback.</p>
          ) : (
            feedbacks.map((f) => (
              <div key={f.id} className="rounded-xl bg-slate-50 p-4 text-sm">
                <div className="flex justify-between font-semibold text-slate-900">
                  <span>{f.name}</span>
                  <span className="text-xs text-slate-400">{f.created_at}</span>
                </div>
                <p className="mt-1.5 text-slate-700">{f.message}</p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
