import { useState } from "react";
import { useStore } from "../context/StoreContext";

export default function ConsultationPage() {
  const { addConsultation, addFeedback } = useStore();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [message, setMessage] = useState("");
  const [consultSaved, setConsultSaved] = useState(false);

  const [fbName, setFbName] = useState("");
  const [fbMessage, setFbMessage] = useState("");
  const [fbSaved, setFbSaved] = useState(false);

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    addConsultation({ name, contact, monthly_bill: monthlyBill, message });
    setName("");
    setContact("");
    setMonthlyBill("");
    setMessage("");
    setConsultSaved(true);
    setTimeout(() => setConsultSaved(false), 2500);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    addFeedback({ name: fbName, message: fbMessage });
    setFbName("");
    setFbMessage("");
    setFbSaved(true);
    setTimeout(() => setFbSaved(false), 2500);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-bold text-slate-900">Konsultasi Sistem PLTS</h1>
        <p className="mt-1 text-sm text-slate-600">
          Sampaikan kebutuhan beban listrik atau kondisi lokasi untuk dicocokkan dengan paket 2600–7800 Wp.
        </p>

        <form onSubmit={handleConsultSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Nama</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">Kontak (WA / Email)</label>
            <input
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">Perkiraan Tagihan / Kebutuhan Daya</label>
            <input
              type="text"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(e.target.value)}
              placeholder="Contoh: ± Rp 1.500.000/bulan atau 2 AC + kulkas"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">Detail Kebutuhan</label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-400"
          >
            Kirim Konsultasi
          </button>
          {consultSaved && (
            <p className="text-xs font-medium text-emerald-700">Permintaan konsultasi tercatat di Riwayat.</p>
          )}
        </form>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold text-slate-900">Kirim Feedback</h2>
        <p className="mt-1 text-sm text-slate-600">
          Ada saran atau masukan soal katalog dan layanan VelaSolaris? Tulis di sini.
        </p>

        <form onSubmit={handleFeedbackSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Nama</label>
            <input
              type="text"
              required
              value={fbName}
              onChange={(e) => setFbName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">Pesan Feedback</label>
            <textarea
              rows={4}
              required
              value={fbMessage}
              onChange={(e) => setFbMessage(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Kirim Feedback
          </button>
          {fbSaved && <p className="text-xs font-medium text-emerald-700">Feedback berhasil dikirim!</p>}
        </form>
      </div>
    </div>
  );
}