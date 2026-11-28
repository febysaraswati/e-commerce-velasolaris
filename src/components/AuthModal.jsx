import { useState } from "react";
import { X, Mail, Lock, User, Phone } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function AuthModal({ initialMode = "login", onClose }) {
  const { loginUser, registerUser } = useStore();
  const [mode, setMode] = useState(initialMode); // "login" | "register"
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      const res = loginUser({ email: form.email, password: form.password });
      if (!res.ok) return setError(res.message);
      onClose?.();
    } else {
      if (!form.name.trim() || !form.email.trim() || form.password.length < 6) {
        return setError("Lengkapi nama, email, dan password minimal 6 karakter.");
      }
      const res = registerUser(form);
      if (!res.ok) return setError(res.message);
      onClose?.();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setMode("login"); setError(""); }}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => { setMode("register"); setError(""); }}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold transition ${
                mode === "register"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Daftar
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {mode === "register" && (
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Contoh: Komang Ayu"
                  className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="nama@email.com"
                className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {mode === "register" && (
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                No. WhatsApp / Telepon
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Minimal 6 karakter"
                className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {mode === "login" ? "Masuk ke VelaSolaris" : "Buat Akun Baru"}
          </button>
        </form>
      </div>
    </div>
  );
}