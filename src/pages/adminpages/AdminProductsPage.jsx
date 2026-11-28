import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { CATEGORIES } from "../../data/velasolarisData";
import { formatRupiah } from "../../utils/formatters";

const EMPTY_FORM = {
  category_id: 1,
  name: "",
  capacity_wp: "",
  price: "",
  stock: "",
  badge: "",
  summary: "",
  inverter: "",
  battery: "",
  panels: "",
  daily_est: "",
};

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (pkg) => {
    setEditingId(pkg.id);
    setForm({
      category_id: pkg.category_id,
      name: pkg.name,
      capacity_wp: pkg.capacity_wp,
      price: pkg.price,
      stock: pkg.stock,
      badge: pkg.badge,
      summary: pkg.summary,
      inverter: pkg.specs.inverter,
      battery: pkg.specs.battery,
      panels: pkg.specs.panels,
      daily_est: pkg.specs.daily_est,
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = CATEGORIES.find((c) => c.id === Number(form.category_id)) || CATEGORIES[0];
    const payload = {
      category_id: category.id,
      category_name: category.name,
      system_type: category.id === 1 ? "Off-Grid" : "Hybrid",
      name: form.name.trim(),
      capacity_wp: Number(form.capacity_wp),
      price: Number(form.price),
      stock: Number(form.stock),
      badge: form.badge.trim() || "Paket PLTS",
      summary: form.summary.trim(),
      specs: {
        inverter: form.inverter.trim(),
        battery: form.battery.trim(),
        panels: form.panels.trim(),
        daily_est: form.daily_est.trim(),
      },
    };

    if (editingId) {
      updateProduct(editingId, payload);
    } else {
      addProduct(payload);
    }
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleDelete = (pkg) => {
    if (window.confirm(`Hapus paket "${pkg.name}" dari katalog?`)) {
      deleteProduct(pkg.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Paket PLTS</h1>
          <p className="text-sm text-slate-600">Tambah, ubah harga/stok, atau hapus paket di katalog.</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400"
        >
          <Plus className="h-4 w-4" /> Tambah Paket
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-6"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              {editingId ? "Edit Paket PLTS" : "Tambah Paket PLTS Baru"}
            </h2>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Nama Paket</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="VelaSolaris Smart 3900 Wp"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">Kategori Sistem</label>
              <select
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">Kapasitas (Wp)</label>
              <input
                type="number"
                required
                min={100}
                value={form.capacity_wp}
                onChange={(e) => setForm({ ...form, capacity_wp: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">Harga (IDR)</label>
              <input
                type="number"
                required
                min={0}
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">Stok Unit</label>
              <input
                type="number"
                required
                min={0}
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">Badge</label>
              <input
                type="text"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                placeholder="Terlaris Rumah Tangga"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Ringkasan Paket</label>
            <textarea
              rows={2}
              required
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Panel Surya</label>
              <input
                type="text"
                required
                value={form.panels}
                onChange={(e) => setForm({ ...form, panels: e.target.value })}
                placeholder="6x Solar Panel Monocrystalline 650 Wp"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">Inverter</label>
              <input
                type="text"
                required
                value={form.inverter}
                onChange={(e) => setForm({ ...form, inverter: e.target.value })}
                placeholder="5 kW Smart Hybrid Inverter"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">Baterai</label>
              <input
                type="text"
                required
                value={form.battery}
                onChange={(e) => setForm({ ...form, battery: e.target.value })}
                placeholder="LiFePO4 48V 100Ah (4.8 kWh)"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">Estimasi Produksi Harian</label>
              <input
                type="text"
                required
                value={form.daily_est}
                onChange={(e) => setForm({ ...form, daily_est: e.target.value })}
                placeholder="± 13–15 kWh / hari"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              {editingId ? "Simpan Perubahan" : "Simpan Paket"}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Paket</th>
              <th className="px-4 py-3">Tipe</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3">Stok</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-900">{pkg.name}</p>
                  <p className="text-xs text-slate-500">{pkg.capacity_wp} Wp • {pkg.badge}</p>
                </td>
                <td className="px-4 py-3 text-slate-700">{pkg.system_type}</td>
                <td className="px-4 py-3 font-medium text-slate-900">{formatRupiah(pkg.price)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                      pkg.stock <= 3 ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {pkg.stock} unit
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <button
                      onClick={() => openEdit(pkg)}
                      className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(pkg)}
                      className="rounded-lg p-2 text-rose-600 hover:bg-rose-50"
                      title="Hapus"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
