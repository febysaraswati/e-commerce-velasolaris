import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { formatRupiah } from "../data/velasolarisData";

export default function CartCheckoutPage() {
  const { cart, updateCartQty, createOrder } = useStore();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    createOrder({ customerName, phone, address, notes });
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <h1 className="text-xl font-bold text-slate-900">Keranjang Masih Kosong</h1>
        <p className="mt-2 text-sm text-slate-600">
          Pilih salah satu paket PLTS VelaSolaris untuk memulai pesanan.
        </p>
        <Link
          to="/"
          className="mt-5 inline-block rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-400"
        >
          Lihat Katalog Paket
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <h1 className="text-2xl font-bold text-slate-900">Keranjang Paket PLTS</h1>
        {cart.map(({ product, qty }) => (
          <div
            key={product.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4"
          >
            <div>
              <span className="text-xs font-semibold text-amber-700">{product.capacity_wp} Wp</span>
              <h2 className="text-base font-bold text-slate-900">{product.name}</h2>
              <p className="text-sm text-slate-600">{formatRupiah(product.price)} / unit</p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={product.stock}
                value={qty}
                onChange={(e) => updateCartQty(product.id, Number(e.target.value))}
                className="w-16 rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm"
              />
              <button
                onClick={() => updateCartQty(product.id, 0)}
                className="rounded-lg p-2 text-rose-600 hover:bg-rose-50"
                title="Hapus"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleCheckout}
        className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-6"
      >
        <h2 className="text-lg font-bold text-slate-900">Ringkasan & Checkout</h2>

        <div>
          <label className="block text-xs font-semibold text-slate-700">Nama Lengkap</label>
          <input
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700">No. WhatsApp / Telepon</label>
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700">Alamat Lokasi Pemasangan</label>
          <textarea
            rows={2}
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700">Catatan Daya / Atap (Opsional)</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Contoh: Daya PLN 2200 VA, atap genteng"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="text-sm font-semibold text-slate-700">Total Estimasi</span>
          <span className="text-lg font-bold text-slate-900">{formatRupiah(totalPrice)}</span>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-400"
        >
          Buat Pesanan
        </button>
      </form>
    </div>
  );
}