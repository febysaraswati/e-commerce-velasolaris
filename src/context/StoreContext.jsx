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
<<<<<<< HEAD
  const [products, setProducts] = useState(() => loadStorage("vs_products", INITIAL_PRODUCTS));
=======
  const [products] = useState(INITIAL_PRODUCTS);
>>>>>>> 82cb463dda3116c662e9e9f125a0d225d919b2b0
  const [cart, setCart] = useState(() => loadStorage("vs_cart", []));
  const [reviews, setReviews] = useState(() => loadStorage("vs_reviews", INITIAL_REVIEWS));
  const [orders, setOrders] = useState(() => loadStorage("vs_orders", []));
  const [consultations, setConsultations] = useState(() => loadStorage("vs_consultations", []));
  const [feedbacks, setFeedbacks] = useState(() => loadStorage("vs_feedbacks", []));

<<<<<<< HEAD
  useEffect(() => localStorage.setItem("vs_products", JSON.stringify(products)), [products]);
=======
>>>>>>> 82cb463dda3116c662e9e9f125a0d225d919b2b0
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
<<<<<<< HEAD
    setProducts((prev) =>
      prev.map((p) => {
        const ordered = cart.find((item) => item.product.id === p.id);
        return ordered ? { ...p, stock: Math.max(0, p.stock - ordered.qty) } : p;
      })
    );
=======
>>>>>>> 82cb463dda3116c662e9e9f125a0d225d919b2b0
    setCart([]);
    return newOrder;
  };

<<<<<<< HEAD
  const addProduct = (payload) => {
    const newProduct = {
      ...payload,
      id: Date.now(),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (productId, payload) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === Number(productId) ? { ...p, ...payload } : p))
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== Number(productId)));
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

=======
>>>>>>> 82cb463dda3116c662e9e9f125a0d225d919b2b0
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

<<<<<<< HEAD
  const deleteReview = (reviewId) => {
    setReviews((prev) => prev.filter((rev) => rev.id !== Number(reviewId)));
  };

  const addConsultation = (payload) => {
    setConsultations((prev) => [
      {
        id: Date.now(),
        status: "Baru",
        ...payload,
        created_at: new Date().toLocaleDateString("id-ID"),
      },
=======
  const addConsultation = (payload) => {
    setConsultations((prev) => [
      { id: Date.now(), ...payload, created_at: new Date().toLocaleDateString("id-ID") },
>>>>>>> 82cb463dda3116c662e9e9f125a0d225d919b2b0
      ...prev,
    ]);
  };

<<<<<<< HEAD
  const updateConsultationStatus = (consultationId, status) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === Number(consultationId) ? { ...c, status } : c))
    );
  };

=======
>>>>>>> 82cb463dda3116c662e9e9f125a0d225d919b2b0
  const addFeedback = (payload) => {
    setFeedbacks((prev) => [
      { id: Date.now(), ...payload, created_at: new Date().toLocaleDateString("id-ID") },
      ...prev,
    ]);
  };

<<<<<<< HEAD
  const deleteFeedback = (feedbackId) => {
    setFeedbacks((prev) => prev.filter((f) => f.id !== Number(feedbackId)));
  };

=======
>>>>>>> 82cb463dda3116c662e9e9f125a0d225d919b2b0
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
<<<<<<< HEAD
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        addReview,
        deleteReview,
        addConsultation,
        updateConsultationStatus,
        addFeedback,
        deleteFeedback,
=======
        addReview,
        addConsultation,
        addFeedback,
>>>>>>> 82cb463dda3116c662e9e9f125a0d225d919b2b0
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);