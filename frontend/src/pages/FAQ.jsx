import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Commandes',
      questions: [
        { q: 'Comment passer une commande ?', a: 'Pour passer une commande, parcourez notre boutique, ajoutez les articles souhaités au panier, puis procédez au paiement. Vous recevrez une confirmation par email une fois votre commande validée.' },
        { q: 'Puis-je modifier ou annuler ma commande ?', a: 'Vous pouvez modifier ou annuler votre commande dans les 2 heures suivant sa validation en nous contactant. Passé ce délai, votre commande sera en cours de préparation.' },
      ],
    },
    {
      category: 'Livraison',
      questions: [
        { q: 'Quels sont les délais de livraison ?', a: 'Les commandes sont expédiées sous 24-48h ouvrées. La livraison standard en France métropolitaine prend 2-3 jours ouvrés.' },
        { q: 'La livraison est-elle gratuite ?', a: 'Oui, la livraison est offerte pour toute commande supérieure à 100€. En dessous, les frais de port sont de 9,90€ pour la France métropolitaine.' },
      ],
    },
    {
      category: 'Retours & Échanges',
      questions: [
        { q: 'Quelle est votre politique de retour ?', a: 'Vous disposez de 30 jours après réception pour retourner un article dans son état d\'origine. Les retours sont gratuits pour la France métropolitaine.' },
        { q: 'Quand serai-je remboursé(e) ?', a: 'Le remboursement est effectué sous 5-7 jours ouvrés après réception et vérification de votre retour.' },
      ],
    },
    {
      category: 'Paiement',
      questions: [
        { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), Apple Pay et Google Pay. Tous les paiements sont sécurisés par Stripe.' },
        { q: 'Le paiement est-il sécurisé ?', a: 'Absolument. Toutes les transactions sont cryptées et sécurisées par Stripe, leader mondial du paiement en ligne.' },
      ],
    },
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div data-testid="faq-page">
      <section className="bg-[#F5F5F0] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Aide</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-4">Questions Fréquentes</h1>
            <p className="text-gray-600 max-w-xl mx-auto">Retrouvez les réponses aux questions les plus posées par nos clientes.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          {faqs.map((category, catIndex) => (
            <motion.div key={category.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: catIndex * 0.1 }} className="mb-12">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((item, qIndex) => {
                  const isOpen = openIndex === `${catIndex}-${qIndex}`;
                  return (
                    <div key={qIndex} className="border border-[#E5E5E5] bg-white">
                      <button onClick={() => toggleQuestion(catIndex, qIndex)} className="w-full flex items-center justify-between p-6 text-left hover:bg-[#F5F5F0] transition-colors" data-testid={`faq-${catIndex}-${qIndex}`}>
                        <span className="font-medium text-[#1A1A1A] pr-4">{item.q}</span>
                        {isOpen ? <ChevronUp size={20} className="text-[#D4AF37] flex-shrink-0" /> : <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />}
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                            <p className="px-6 pb-6 text-gray-600 leading-relaxed">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl text-white mb-4">Vous n'avez pas trouvé votre réponse ?</h2>
          <p className="text-gray-400 mb-8">Notre équipe est à votre disposition pour répondre à toutes vos questions.</p>
          <a href="/contact" className="btn-primary bg-[#D4AF37] hover:bg-white hover:text-[#1A1A1A] inline-block">Nous contacter</a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;