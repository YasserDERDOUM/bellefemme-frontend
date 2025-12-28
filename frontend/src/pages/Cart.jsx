import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../App';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6" data-testid="empty-cart">
        <ShoppingBag size={64} className="text-gray-300 mb-6" />
        <h1 className="font-serif text-3xl text-[#1A1A1A] mb-4">Votre panier est vide</h1>
        <p className="text-gray-500 mb-8">Découvrez notre collection pour trouver votre bonheur.</p>
        <Link to="/shop" className="btn-primary" data-testid="continue-shopping-empty">Continuer mes achats</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20" data-testid="cart-page">
      <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-12 text-center">Votre Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 p-6 bg-[#F5F5F0]"
              data-testid={`cart-item-${item.product.id}`}
            >
              <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-32 object-cover" />
              </Link>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">
                    {item.product.category === 'sacs' ? 'Sac' : 'Bijou'}
                  </span>
                  <Link to={`/product/${item.product.id}`} className="block font-serif text-lg text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{item.product.price.toFixed(2)} € / unité</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-[#E5E5E5] bg-white">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 hover:bg-[#F5F5F0] transition-colors" data-testid={`decrease-${item.product.id}`}>
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 hover:bg-[#F5F5F0] transition-colors" disabled={item.quantity >= item.product.stock} data-testid={`increase-${item.product.id}`}>
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-medium text-[#1A1A1A]">{(item.product.price * item.quantity).toFixed(2)} €</span>
                    <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" data-testid={`remove-${item.product.id}`}>
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <Link to="/shop" className="inline-flex items-center text-sm font-medium text-[#1A1A1A] hover:text-[#D4AF37] transition-colors mt-4" data-testid="continue-shopping">
            <ArrowRight size={16} className="mr-2 rotate-180" />
            Continuer mes achats
          </Link>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#1A1A1A] text-white p-8 sticky top-28" data-testid="order-summary">
            <h2 className="font-serif text-2xl mb-6">Récapitulatif</h2>

            <div className="space-y-4 border-b border-gray-700 pb-6 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Sous-total ({cartCount} articles)</span>
                <span>{cartTotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Livraison</span>
                <span>{cartTotal >= 100 ? 'Gratuite' : '9.90 €'}</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-medium mb-8">
              <span>Total</span>
              <span>{(cartTotal + (cartTotal >= 100 ? 0 : 9.90)).toFixed(2)} €</span>
            </div>

            {cartTotal < 100 && (
              <p className="text-sm text-[#D4AF37] mb-6">
                Plus que {(100 - cartTotal).toFixed(2)} € pour bénéficier de la livraison gratuite !
              </p>
            )}

            <Link to="/checkout" className="btn-primary w-full bg-[#D4AF37] hover:bg-white hover:text-[#1A1A1A] text-center block" data-testid="checkout-btn">
              Passer commande
            </Link>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-xs text-gray-400 text-center">Paiement sécurisé par Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;