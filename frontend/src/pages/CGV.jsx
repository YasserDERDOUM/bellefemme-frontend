import React from 'react';
import { motion } from 'framer-motion';

const CGV = () => {
  return (
    <div data-testid="cgv-page">
      <section className="bg-[#F5F5F0] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Légal</span>
            <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A]">Conditions Générales de Vente</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : Janvier 2024</p>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-4">Article 1 - Objet</h2>
            <p className="text-gray-600 leading-relaxed mb-6">Les présentes conditions générales de vente régissent les relations contractuelles entre Belle Femme SARL et ses clients dans le cadre de la vente en ligne de sacs et bijoux pour femmes.</p>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-4">Article 2 - Prix</h2>
            <p className="text-gray-600 leading-relaxed mb-6">Les prix sont indiqués en euros toutes taxes comprises (TTC). Ils sont susceptibles d'être modifiés à tout moment. Cependant, les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.</p>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-4">Article 3 - Commande</h2>
            <p className="text-gray-600 leading-relaxed mb-6">Le client passe commande sur le site internet bellefemme.fr. La commande est définitive après validation du paiement. Un email de confirmation est envoyé au client avec le récapitulatif de sa commande.</p>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-4">Article 4 - Paiement</h2>
            <p className="text-gray-600 leading-relaxed mb-6">Le paiement s'effectue en ligne par carte bancaire (Visa, Mastercard, American Express), Apple Pay ou Google Pay. Toutes les transactions sont sécurisées par Stripe.</p>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-4">Article 5 - Livraison</h2>
            <p className="text-gray-600 leading-relaxed mb-6">Les commandes sont expédiées sous 24 à 48 heures ouvrées. Les délais de livraison varient selon la destination : 2-3 jours ouvrés pour la France métropolitaine, 5-7 jours pour les autres pays. La livraison est gratuite à partir de 100€ d'achat.</p>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-4">Article 6 - Droit de rétractation</h2>
            <p className="text-gray-600 leading-relaxed mb-6">Conformément à la législation en vigueur, le client dispose d'un délai de 14 jours à compter de la réception de sa commande pour exercer son droit de rétractation. Belle Femme étend ce délai à 30 jours.</p>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-4">Article 7 - Contact</h2>
            <p className="text-gray-600 leading-relaxed mb-6">Pour toute question concernant ces conditions, contactez-nous :<br />Email : contact@bellefemme.fr<br />Téléphone : +33 1 23 45 67 89</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CGV;