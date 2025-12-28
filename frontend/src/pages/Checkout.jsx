import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API, useCart } from '../App';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ChevronLeft, Lock, CreditCard, Shield } from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    shipping_address: '',
    shipping_city: '',
    shipping_postal: '',
    shipping_country: 'France',
  });

  const shippingCost = cartTotal >= 100 ? 0 : 9.90;
  const total = cartTotal + shippingCost;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        ...form,
        items: cart.map((item) => ({ product_id: item.product.id, quantity: item.quantity })),
      };

      const orderRes = await axios.post(`${API}/orders`, orderData);
      const order = orderRes.data;

      const checkoutRes = await axios.post(`${API}/checkout/create-session`, {
        order_id: order.id,
        origin_url: window.location.origin,
      });

      if (checkoutRes.data.url) {
        window.location.href = checkoutRes.data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.detail || 'Erreur lors du paiement');
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        <p className="text-gray-500 mb-4">Votre panier est vide</p>
        <Link to="/shop" className="btn-primary">Retour à la boutique</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20" data-testid="checkout-page">
      <Link to="/cart" className="inline-flex items-center text-sm text-gray-500 hover:text-[#D4AF37] transition-colors mb-8" data-testid="back-to-cart">
        <ChevronLeft size={16} className="mr-1" />
        Retour au panier
      </Link>

      <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-12">Finaliser la commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <motion.form initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-6">Vos informations</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Nom complet *</label>
                <input type="text" name="customer_name" value={form.customer_name} onChange={handleChange} required className="w-full border border-[#E5E5E5] px-4 py-3 focus:border-[#D4AF37] focus:outline-none" data-testid="input-name" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Email *</label>
                <input type="email" name="customer_email" value={form.customer_email} onChange={handleChange} required className="w-full border border-[#E5E5E5] px-4 py-3 focus:border-[#D4AF37] focus:outline-none" data-testid="input-email" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-6">Adresse de livraison</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Adresse *</label>
                <input type="text" name="shipping_address" value={form.shipping_address} onChange={handleChange} required className="w-full border border-[#E5E5E5] px-4 py-3 focus:border-[#D4AF37] focus:outline-none" data-testid="input-address" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Ville *</label>
                  <input type="text" name="shipping_city" value={form.shipping_city} onChange={handleChange} required className="w-full border border-[#E5E5E5] px-4 py-3 focus:border-[#D4AF37] focus:outline-none" data-testid="input-city" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Code postal *</label>
                  <input type="text" name="shipping_postal" value={form.shipping_postal} onChange={handleChange} required className="w-full border border-[#E5E5E5] px-4 py-3 focus:border-[#D4AF37] focus:outline-none" data-testid="input-postal" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Pays *</label>
                <select name="shipping_country" value={form.shipping_country} onChange={handleChange} required className="w-full border border-[#E5E5E5] px-4 py-3 focus:border-[#D4AF37] focus:outline-none bg-white" data-testid="input-country">
                  <option value="France">France</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Suisse">Suisse</option>
                  <option value="Luxembourg">Luxembourg</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" data-testid="pay-btn">
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Redirection vers Stripe...
              </>
            ) : (
              <>
                <Lock size={18} />
                Payer {total.toFixed(2)} €
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2 text-xs">
              <Shield size={16} />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <CreditCard size={16} />
              <span>Stripe Checkout</span>
            </div>
          </div>
        </motion.form>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="bg-[#F5F5F0] p-8 sticky top-28" data-testid="checkout-summary">
            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6">Votre commande</h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-20 object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-[#1A1A1A]">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Qté: {item.quantity}</p>
                    <p className="text-sm text-[#1A1A1A] mt-1">{(item.product.price * item.quantity).toFixed(2)} €</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E5E5E5] pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sous-total</span>
                <span>{cartTotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Livraison</span>
                <span>{shippingCost === 0 ? 'Gratuite' : `${shippingCost.toFixed(2)} €`}</span>
              </div>
              <div className="flex justify-between text-lg font-medium pt-3 border-t border-[#E5E5E5]">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;