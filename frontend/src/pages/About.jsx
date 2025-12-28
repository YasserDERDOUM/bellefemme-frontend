import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div data-testid="about-page">
      <section className="relative h-[60vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80" alt="Belle Femme Boutique" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Notre Histoire</span>
            <h1 className="font-serif text-5xl md:text-6xl text-white">À Propos</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Depuis 2020</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-8">L'Élégance au Féminin</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Belle Femme est née d'une passion pour l'artisanat d'exception et le design intemporel. Notre mission : sublimer chaque femme avec des accessoires de qualité, alliant tradition et modernité.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Chaque pièce de notre collection est soigneusement sélectionnée pour sa beauté, sa qualité de fabrication et son élégance naturelle.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Nos Valeurs</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A]">Ce Qui Nous Guide</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Qualité', description: 'Nous sélectionnons uniquement des matériaux nobles et des finitions impeccables pour garantir la durabilité de chaque création.' },
              { title: 'Élégance', description: 'Chaque pièce est pensée pour sublimer la femme qui la porte, avec un design intemporel et raffiné.' },
              { title: 'Service', description: 'Votre satisfaction est notre priorité. Notre équipe est à votre écoute pour vous accompagner dans vos choix.' },
            ].map((value, index) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.2 }} className="text-center">
                <span className="text-5xl font-serif text-[#D4AF37] mb-4 block">0{index + 1}</span>
                <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;