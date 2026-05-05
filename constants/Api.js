export const BASE_URL = "https://eqply-backend.onrender.com/api";

export const API = {
  // ── AUTH ──
  login:           `${BASE_URL}/auth/login`,
  signup:          `${BASE_URL}/auth/signup`,
  verifyAccount:   `${BASE_URL}/auth/verify-account`,
  forgotPassword:  `${BASE_URL}/auth/forgot-password`,
  resetPassword:   `${BASE_URL}/auth/reset-password`,
  profile:         `${BASE_URL}/auth/profile`,
  updateProfile:   `${BASE_URL}/users/profile`,
  uploadPhoto:     `${BASE_URL}/users/profile/photo`,

  // ── CART & ORDERS ──
  cart:            `${BASE_URL}/cart`,
  checkout:        `${BASE_URL}/orders/checkout`,
  paymentStatus:   `${BASE_URL}/orders/payment-status`,

  // ── USER ──
  address:         `${BASE_URL}/user/address`,
  subscribe:       `${BASE_URL}/subscribe`,

  // ── PAYMENT ──
  cards:           `${BASE_URL}/payment/cards`,
  addCard:         `${BASE_URL}/payment/add-card`,

  // ── LISTINGS ──
  createListing:   `${BASE_URL}/listing/create`,
  uploadImage:     `${BASE_URL}/upload-image`,

  // ── FAVORITES ──
  favorites:       `${BASE_URL}/favorites`,

  // ── REVIEWS ──
  review:          `${BASE_URL}/review`,
  getReview:       `${BASE_URL}/get-review`,

  // ── CHAT ──
  messages:        `${BASE_URL}/messages`,
};