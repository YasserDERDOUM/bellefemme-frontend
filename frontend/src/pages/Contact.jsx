import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../App';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success('Message envoyé avec succès !');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <section className="bg-[#F5F5F0] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Contactez-nous</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-4">Nous Sommes à Votre Écoute</h1>
            <p className="text-gray-600 max-w-xl mx-auto">Une question, une demande spéciale ? N'hésitez pas à nous contacter.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="font-serif text-3xl text-[#1A1A1A] mb-8">Nos Coordonnées</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F5F5F0] flex items-center justify-center flex-shrink-0"><MapPin size={20} className="text-[#D4AF37]" /></div>
                  <div>
                    <h3 className="font-medium text-[#1A1A1A] mb-1">Adresse</h3>
                    <p className="text-gray-600">123 Avenue des Champs-Élysées<br />75008 Paris, France</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F5F5F0] flex items-center justify-center flex-shrink-0"><Phone size={20} className="text-[#D4AF37]" /></div>
                  <div>
                    <h3 className="font-medium text-[#1A1A1A] mb-1">Téléphone</h3>
                    <a href="tel:+33123456789" className="text-gray-600 hover:text-[#D4AF37] transition-colors">+33 1 23 45 67 89</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F5F5F0] flex items-center justify-center flex-shrink-0"><Mail size={20} className="text-[#D4AF37]" /></div>
                  <div>
                    <h3 className="font-medium text-[#1A1A1A] mb-1">Email</h3>
                    <a href="mailto:contact@bellefemme.fr" className="text-gray-600 hover:text-[#D4AF37] transition-colors">contact@bellefemme.fr</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F5F5F0] flex items-center justify-center flex-shrink-0"><Clock size={20} className="text-[#D4AF37]" /></div>
                  <div>
                    <h3 className="font-medium text-[#1A1A1A] mb-1">Horaires</h3>
                    <p className="text-gray-600">Lundi - Vendredi: 9h - 18h<br />Samedi: 10h - 17h</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h2 className="font-serif text-3xl text-[#1A1A1A] mb-8">Envoyez-nous un Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Nom *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full border border-[#E5E5E5] px-4 py-3 focus:border-[#D4AF37] focus:outline-none" data-testid="contact-name" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border border-[#E5E5E5] px-4 py-3 focus:border-[#D4AF37] focus:outline-none" data-testid="contact-email" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Sujet *</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} required className="w-full border border-[#E5E5E5] px-4 py-3 focus:border-[#D4AF37] focus:outline-none" data-testid="contact-subject" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={6} className="w-full border border-[#E5E5E5] px-4 py-3 focus:border-[#D4AF37] focus:outline-none resize-none" data-testid="contact-message" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 disabled:opacity-50" data-testid="contact-submit">
                  {loading ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Envoi en cours...</>) : (<><Send size={18} />Envoyer le message</>)}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;