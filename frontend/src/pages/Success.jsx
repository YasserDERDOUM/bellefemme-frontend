import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { API, useCart } from '../App';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, ArrowRight, AlertCircle } from 'lucide-react';

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [status, setStatus] = useState('loading');
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await axios.get(`${API}/checkout/status/${sessionId}`);
        setPaymentInfo(response.data);

        if (response.data.payment_status === 'paid') {
          setStatus('success');
          clearCart();
        } else if (response.data.status === 'expired') {
          setStatus('expired');
        } else if (attempts < 5) {
          setTimeout(() => setAttempts(a => a + 1), 2000);
        } else {
          setStatus('pending');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        if (attempts < 5) {
          setTimeout(() => setAttempts(a => a + 1), 2000);
        } else {
          setStatus('error');
        }
      }
    };

    checkPaymentStatus();
  }, [sessionId, attempts, clearCart]);

  if (status === 'loading') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6" data-testid="loading-state">
        <div className="w-12 h-12 border-3 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-gray-600">Vérification du paiement...</p>
      </div>
    );
  }

  if (status === 'error' || status === 'expired') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center" data-testid="error-state">
        <AlertCircle size={64} className="text-red-500 mb-6" />
        <h1 className="font-serif text-3xl text-[#1A1A1A] mb-4">
          {status === 'expired' ? 'Session expirée' : 'Une erreur est survenue'}
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          {status === 'expired'
            ? 'Votre session de paiement a expiré. Veuillez réessayer.'
            : 'Nous n\'avons pas pu confirmer votre paiement. Veuillez vérifier votre email ou nous contacter.'}
        </p>
        <div className="flex gap-4">
          <Link to="/cart" className="btn-primary">Retour au panier</Link>
          <Link to="/contact" className="btn-secondary">Nous contacter</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20" data-testid="success-page">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="w-20 h-20 bg-[#D4AF37] flex items-center justify-center mb-8"
      >
        <CheckCircle size={40} className="text-white" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center max-w-xl">
        <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4" data-testid="success-title">
          Merci pour votre commande !
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Votre paiement a été confirmé. Vous recevrez un email de confirmation avec les détails de votre commande.
        </p>

        {paymentInfo && (
          <div className="bg-[#F5F5F0] p-6 mb-8 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#D4AF37] flex items-center justify-center">
                <Package size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Montant payé</p>
                <p className="font-serif text-2xl text-[#1A1A1A]">{(paymentInfo.amount_total / 100).toFixed(2)} €</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center">
                <Mail size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Confirmation</p>
                <p className="text-sm text-gray-600">Un email de confirmation vous a été envoyé</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/shop" className="btn-primary flex items-center justify-center gap-2" data-testid="continue-shopping">
            Continuer mes achats
            <ArrowRight size={18} />
          </Link>
          <Link to="/" className="btn-secondary" data-testid="back-home">Retour à l'accueil</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;