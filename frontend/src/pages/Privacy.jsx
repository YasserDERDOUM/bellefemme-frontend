import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div data-testid="privacy-page">
      <section className="bg-[#F5F5F0] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Légal</span>
            <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A]">Politique de Confidentialité</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : Janvier 2024</p>

            <p className="text-gray-600 leading-relaxed mb-8">Belle Femme s'engage à protéger la vie privée de ses clients. Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD.</p>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-4">1. Données collectées</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Nous collectons les données suivantes :</p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Données d'identification : nom, prénom, adresse email</li>
              <li>Données de livraison : adresse postale, numéro de téléphone</li>
              <li>Données de paiement : traitées de manière sécurisée par Stripe</li>
            </ul>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-4">2. Utilisation des données</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Traiter et suivre vos commandes</li>
              <li>Assurer la livraison de vos achats</li>
              <li>Gérer le service client et les retours</li>
            </ul>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-4">3. Vos droits</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li><strong>Accès :</strong> obtenir une copie de vos données</li>
              <li><strong>Rectification :</strong> corriger des données inexactes</li>
              <li><strong>Effacement :</strong> supprimer vos données</li>
              <li><strong>Opposition :</strong> vous opposer au traitement marketing</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-6">Pour exercer ces droits, contactez-nous à privacy@bellefemme.fr.</p>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-4">4. Contact</h2>
            <p className="text-gray-600 leading-relaxed mb-6">Pour toute question concernant la protection de vos données :<br />Email : privacy@bellefemme.fr</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;