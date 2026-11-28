import { Trash2 } from "lucide-react";
import { useStore } from "../../context/StoreContext";

const CONSULT_STATUSES = ["Baru", "Sudah Dihubungi", "Selesai"];

export default function AdminConsultationsPage() {
  const { consultations, feedbacks, updateConsultationStatus, deleteFeedback } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Konsultasi & Feedback</h1>
        <p className="text-sm text-slate-600">
          Tindak lanjuti permintaan konsultasi daya pelanggan dan kelola masukan yang masuk.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-base font-bold text-slate-900">
            Permintaan Konsultasi ({consultations.length})
          </h2>

          {consultations.length === 0 ? (
            <p className="text-sm text-slate-500">Belum ada permintaan konsultasi.</p>
          ) : (
            <div className="space-y-3">
              {consultations.map((c) => {
                const status = c.status || "Baru";
                return (
                  <div key={c.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-slate-900">{c.name}</span>
                        <span className="ml-2 text-xs text-slate-400">{c.created_at}</span>
                      </div>
                      <select
                        value={status}
                        onChange={(e) => updateConsultationStatus(c.id, e.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium"
                      >
                        {CONSULT_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-xs text-slate-600">Kontak: {c.contact}</p>
                    {c.monthly_bill && (
                      <p className="text-xs font-medium text-amber-700">Kebutuhan: {c.monthly_bill}</p>
                    )}
                    <p className="text-slate-700">{c.message}</p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-base font-bold text-slate-900">
            Kotak Masuk Feedback ({feedbacks.length})
          </h2>

          {feedbacks.length === 0 ? (
            <p className="text-sm text-slate-500">Belum ada feedback dari pengguna.</p>
          ) : (
            <div className="space-y-3">
              {feedbacks.map((fb) => (
                <div key={fb.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900">{fb.name}</span>
                      <span className="ml-2 text-xs text-slate-400">{fb.created_at}</span>
                    </div>
                    <button
                      onClick={() => deleteFeedback(fb.id)}
                      className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50"
                      title="Hapus feedback"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-1.5 text-slate-700">{fb.message}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
