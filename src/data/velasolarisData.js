export const CATEGORIES = [
  { id: 1, name: "Off-Grid System" },
  { id: 2, name: "Hybrid System" },
];

export const INITIAL_PRODUCTS = [
  {
    id: 1,
    category_id: 1,
    category_name: "Off-Grid System",
    name: "VelaSolaris Lite 2600 Wp",
    capacity_wp: 2600,
    system_type: "Off-Grid",
    price: 38500000,
    stock: 8,
    badge: "Hemat & Mandiri",
    summary: "Cocok untuk rumah tangga kecil, pondok, atau area tanpa jaringan PLN stabil.",
    specs: {
      inverter: "3 kW Pure Sine Wave Off-Grid",
      battery: "LiFePO4 48V 100Ah (4.8 kWh)",
      panels: "4x Solar Panel Monocrystalline 650 Wp",
      daily_est: "± 9–10 kWh / hari",
    },
  },
  {
    id: 2,
    category_id: 2,
    category_name: "Hybrid System",
    name: "VelaSolaris Home 3900 Wp",
    capacity_wp: 3900,
    system_type: "Hybrid",
    price: 54000000,
    stock: 6,
    badge: "Terlaris Rumah Tangga",
    summary: "Menyeimbangkan daya surya, baterai cadangan, dan grid PLN secara otomatis.",
    specs: {
      inverter: "5 kW Smart Hybrid Inverter",
      battery: "LiFePO4 48V 100Ah (4.8 kWh)",
      panels: "6x Solar Panel Monocrystalline 650 Wp",
      daily_est: "± 13–15 kWh / hari",
    },
  },
  {
    id: 3,
    category_id: 2,
    category_name: "Hybrid System",
    name: "VelaSolaris Plus 5200 Wp",
    capacity_wp: 5200,
    system_type: "Hybrid",
    price: 72500000,
    stock: 5,
    badge: "Kapasitas Menengah",
    summary: "Ideal untuk hunian dua lantai dengan AC, kulkas, pompa air, dan kerja WFH.",
    specs: {
      inverter: "6 kW Hybrid Inverter",
      battery: "LiFePO4 51.2V 200Ah (10.2 kWh)",
      panels: "8x Solar Panel Monocrystalline 650 Wp",
      daily_est: "± 18–20 kWh / hari",
    },
  },
  {
    id: 4,
    category_id: 2,
    category_name: "Hybrid System",
    name: "VelaSolaris Pro 6500 Wp",
    capacity_wp: 6500,
    system_type: "Hybrid",
    price: 89000000,
    stock: 4,
    badge: "Villa & Studio",
    summary: "Dirancang untuk villa, homestay, atau rumah besar dengan beban puncak tinggi.",
    specs: {
      inverter: "8 kW Smart Hybrid Inverter",
      battery: "LiFePO4 51.2V 280Ah (14.3 kWh)",
      panels: "10x Solar Panel Monocrystalline 650 Wp",
      daily_est: "± 23–26 kWh / hari",
    },
  },
  {
    id: 5,
    category_id: 1,
    category_name: "Off-Grid System",
    name: "VelaSolaris Max 7800 Wp",
    capacity_wp: 7800,
    system_type: "Off-Grid",
    price: 108000000,
    stock: 3,
    badge: "Performa Maksimal",
    summary: "Solusi daya besar untuk kebutuhan operasional intensif, resort, atau off-grid penuh.",
    specs: {
      inverter: "10 kW Heavy-Duty Inverter",
      battery: "LiFePO4 51.2V 300Ah (15.3 kWh)",
      panels: "12x Solar Panel Monocrystalline 650 Wp",
      daily_est: "± 28–31 kWh / hari",
    },
  },
];

export const INITIAL_REVIEWS = [
  {
    id: 1,
    product_id: 2,
    author: "Made Arya",
    rating: 5,
    comment: "Tagihan bulanan turun drastis dan pemadaman sebentar nggak terasa.",
    created_at: "2026-10-18",
  },
  {
    id: 2,
    product_id: 4,
    author: "Putu Sintya",
    rating: 5,
    comment: "Instalasi rapi dan backup baterai cukup buat malam hari di villa.",
    created_at: "2026-11-02",
  },
<<<<<<< HEAD
];
=======
];

export const formatRupiah = (amount) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
>>>>>>> 82cb463dda3116c662e9e9f125a0d225d919b2b0
