/**
 * API Client — Pit Coffee Frontend
 * Gestisce tutte le chiamate al backend
 */

const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/api'
  : '/api';

export const API = {
  // PRODUCTS
  async getProducts(category = null) {
    const url = category ? `${API_BASE}/products?category=${category}` : `${API_BASE}/products`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },

  // ORDERS
  async createOrder(items, totalAmount, customerEmail, deliveryAddress) {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items,
        totalAmount,
        customerEmail,
        deliveryAddress
      })
    });
    if (!res.ok) throw new Error('Order creation failed');
    return res.json();
  },

  async getOrder(orderId) {
    const res = await fetch(`${API_BASE}/orders/${orderId}`);
    if (!res.ok) throw new Error('Order not found');
    return res.json();
  },

  // STRIPE
  async createPaymentIntent(amount, orderId) {
    const res = await fetch(`${API_BASE}/stripe/payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, orderId })
    });
    if (!res.ok) throw new Error('Payment intent creation failed');
    return res.json();
  },

  async confirmPayment(orderId, paymentIntentId) {
    const res = await fetch(`${API_BASE}/stripe/confirm-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, paymentIntentId })
    });
    if (!res.ok) throw new Error('Payment confirmation failed');
    return res.json();
  }
};

export default API;
