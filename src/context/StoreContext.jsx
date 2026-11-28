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

const syncProductsWithInitial = (savedProducts, initialProducts) => {
  if (!Array.isArray(savedProducts) || savedProducts.length === 0) {
    return initialProducts;
  }

  const initialMap = new Map(initialProducts.map((item) => [item.id, item]));
  const merged = savedProducts.map((savedItem) => {
    const initialItem = initialMap.get(savedItem.id);
    if (!initialItem) return savedItem;

    return {
      ...initialItem,
      ...savedItem,
      price: initialItem.price,
      stock: typeof savedItem.stock === "number" ? savedItem.stock : initialItem.stock,
    };
  });

  initialProducts.forEach((initialItem) => {
    if (!merged.some((item) => item.id === initialItem.id)) {
      merged.push(initialItem);
    }
  });

  return merged;
};

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = loadStorage("vs_products", INITIAL_PRODUCTS);
    return syncProductsWithInitial(saved, INITIAL_PRODUCTS);
  });
  const [cart, setCart] = useState(() => loadStorage("vs_cart", []));
  const [reviews, setReviews] = useState(() => loadStorage("vs_reviews", INITIAL_REVIEWS));
  const [orders, setOrders] = useState(() => loadStorage("vs_orders", []));
  const [consultations, setConsultations] = useState(() => loadStorage("vs_consultations", []));
  const [feedbacks, setFeedbacks] = useState(() => loadStorage("vs_feedbacks", []));
  const [users, setUsers] = useState(() => loadStorage("vs_users", []));
  const [currentUser, setCurrentUser] = useState(() => loadStorage("vs_auth_user", null));

  useEffect(() => localStorage.setItem("vs_products", JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem("vs_cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("vs_reviews", JSON.stringify(reviews)), [reviews]);
  useEffect(() => localStorage.setItem("vs_orders", JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem("vs_consultations", JSON.stringify(consultations)), [consultations]);
  useEffect(() => localStorage.setItem("vs_feedbacks", JSON.stringify(feedbacks)), [feedbacks]);
  useEffect(() => localStorage.setItem("vs_users", JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem("vs_auth_user", JSON.stringify(currentUser)), [currentUser]);

  const registerUser = ({ name, email, password, phone }) => {
    const cleanEmail = email.trim().toLowerCase();
    const exists = users.some((u) => u.email === cleanEmail);
    if (exists) {
      return { ok: false, message: "Email sudah terdaftar. Silakan masuk." };
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: cleanEmail,
      password,
      phone: phone?.trim() || "",
      role: "customer",
      created_at: new Date().toLocaleDateString("id-ID"),
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
    });

    return { ok: true, message: "Akun berhasil dibuat." };
  };

  const loginUser = ({ email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find(
      (u) => u.email === cleanEmail && u.password === password
    );

    if (!found) {
      return { ok: false, message: "Email atau password belum sesuai." };
    }

    const sessionUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      phone: found.phone,
      role: found.role,
    };
    setCurrentUser(sessionUser);
    return { ok: true, message: `Selamat datang kembali, ${found.name}!` };
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

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
    setProducts((prev) =>
      prev.map((p) => {
        const ordered = cart.find((item) => item.product.id === p.id);
        return ordered ? { ...p, stock: Math.max(0, p.stock - ordered.qty) } : p;
      })
    );
    setCart([]);
    return newOrder;
  };

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
      ...prev,
    ]);
  };

  const updateConsultationStatus = (consultationId, status) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === Number(consultationId) ? { ...c, status } : c))
    );
  };

  const addFeedback = (payload) => {
    setFeedbacks((prev) => [
      { id: Date.now(), ...payload, created_at: new Date().toLocaleDateString("id-ID") },
      ...prev,
    ]);
  };

  const deleteFeedback = (feedbackId) => {
    setFeedbacks((prev) => prev.filter((f) => f.id !== Number(feedbackId)));
  };

  const resetStoreData = () => {
    localStorage.removeItem("vs_products");
    localStorage.removeItem("vs_cart");
    localStorage.removeItem("vs_reviews");
    localStorage.removeItem("vs_orders");
    localStorage.removeItem("vs_consultations");
    localStorage.removeItem("vs_feedbacks");
    setProducts(INITIAL_PRODUCTS);
    setCart([]);
    setReviews(INITIAL_REVIEWS);
    setOrders([]);
    setConsultations([]);
    setFeedbacks([]);
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
        users,
        currentUser,
        addToCart,
        updateCartQty,
        createOrder,
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
        registerUser,
        loginUser,
        logoutUser,
        resetStoreData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);