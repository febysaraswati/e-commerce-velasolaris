import { createContext, useContext, useEffect, useState } from "react";
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from "../data/velasolarisData";

const StoreContext = createContext(null);

const loadStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [products] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState(() => loadStorage("vs_cart", []));
  const [reviews, setReviews] = useState(() => loadStorage("vs_reviews", INITIAL_REVIEWS));
  const [orders, setOrders] = useState(() => loadStorage("vs_orders", []));
  const [consultations, setConsultations] = useState(() => loadStorage("vs_consultations", []));
  const [feedbacks, setFeedbacks] = useState(() => loadStorage("vs_feedbacks", []));

  useEffect(() => localStorage.setItem("vs_cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("vs_reviews", JSON.stringify(reviews)), [reviews]);
  useEffect(() => localStorage.setItem("vs_orders", JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem("vs_consultations", JSON.stringify(consultations)), [consultations]);
  useEffect(() => localStorage.setItem("vs_feedbacks", JSON.stringify(feedbacks)), [feedbacks]);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: Math.min(product.stock, item.qty + qty) }
            : item
        );
      }
      return [...prev, { product, qty }];
    });
  };

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, qty: Math.min(item.product.stock, qty) }
          : item
      )
    );
  };

  const createOrder = ({ customerName, phone, address, notes }) => {
    const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    const newOrder = {
      id: "VS-" + Date.now().toString().slice(-6),
      customer_name: customerName,
      phone,
      address,
      notes,
      status: "Menunggu Konfirmasi Teknis",
      total_price: totalPrice,
      items: cart.map((item) => ({
        product_id: item.product.id,
        name: item.product.name,
        capacity_wp: item.product.capacity_wp,
        qty: item.qty,
        price: item.product.price,
      })),
      created_at: new Date().toLocaleDateString("id-ID"),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    return newOrder;
  };

  const addReview = ({ productId, author, rating, comment }) => {
    setReviews((prev) => [
      {
        id: Date.now(),
        product_id: Number(productId),
        author,
        rating: Number(rating),
        comment,
        created_at: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
  };

  const addConsultation = (payload) => {
    setConsultations((prev) => [
      { id: Date.now(), ...payload, created_at: new Date().toLocaleDateString("id-ID") },
      ...prev,
    ]);
  };

  const addFeedback = (payload) => {
    setFeedbacks((prev) => [
      { id: Date.now(), ...payload, created_at: new Date().toLocaleDateString("id-ID") },
      ...prev,
    ]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        cartCount,
        reviews,
        orders,
        consultations,
        feedbacks,
        addToCart,
        updateCartQty,
        createOrder,
        addReview,
        addConsultation,
        addFeedback,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);