import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bags, setBags] = useState([]);
  const [jewelry, setJewelry] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, bagsRes, jewelryRes] = await Promise.all([
          axios.get(`${API}/products/featured`),
          axios.get(`${API}/products?category=sacs`),
          axios.get(`${API}/products?category=bijoux`),
        ]);
        setFeaturedProducts(featuredRes.data);
        setBags(bagsRes.data.slice(0, 4));
        setJewelry(jewelryRes.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
            alt="Belle Femme Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              Nouvelle Collection
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              L'Élégance<br />
              <span className="gold-shimmer">Parisienne</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Découvrez notre sélection exclusive de sacs et bijoux pour sublimer chaque moment de votre vie.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="btn-primary bg-[#D4AF37] hover:bg-white hover:text-[#1A1A1A]"
                data-testid="hero-shop-btn"
              >
                Découvrir la collection
              </Link>
              <Link
                to="/about"
                className="btn-secondary border-white text-white hover:bg-white hover:text-[#1A1A1A]"
                data-testid="hero-about-btn"
              >
                Notre histoire
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-white/60 text-xs uppercase tracking-widest mb-2">Défiler</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </section>

      {/* Promo Banner */}
      <section className="bg-[#1A1A1A] py-4" data-testid="promo-banner">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center space-x-8 text-center overflow-hidden">
            <p className="text-white text-sm">
              <span className="text-[#D4AF37] font-bold">LIVRAISON OFFERTE</span> dès 100€ d'achat
            </p>
            <span className="hidden md:block w-px h-4 bg-gray-600" />
            <p className="hidden md:block text-white text-sm">
              <span className="text-[#D4AF37] font-bold">RETOURS GRATUITS</span> sous 30 jours
            </p>
            <span className="hidden lg:block w-px h-4 bg-gray-600" />
            <p className="hidden lg:block text-white text-sm">
              <span className="text-[#D4AF37] font-bold">PAIEMENT SÉCURISÉ</span> 100% garanti
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-20 lg:py-32 bg-[#F5F5F0]" data-testid="featured-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              Sélection
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">
              Nos Favoris
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Les pièces les plus prisées de notre collection, sélectionnées avec soin.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {featuredProducts.map((product, index) => (
                  <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <ProductCard product={product} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 bg-white hover:bg-[#D4AF37] hover:text-white border-none" />
              <CarouselNext className="hidden md:flex -right-12 bg-white hover:bg-[#D4AF37] hover:text-white border-none" />
            </Carousel>
          )}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 lg:py-32" data-testid="categories-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group overflow-hidden"
            >
              <Link to="/shop/sacs" className="block aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
                  alt="Collection Sacs"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                  <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-2 block">
                    Collection
                  </span>
                  <h3 className="font-serif text-4xl lg:text-5xl text-white mb-4">Sacs</h3>
                  <span className="inline-flex items-center text-white text-sm font-bold uppercase tracking-widest group-hover:text-[#D4AF37] transition-colors">
                    Découvrir <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group overflow-hidden"
            >
              <Link to="/shop/bijoux" className="block aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80"
                  alt="Collection Bijoux"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                  <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-2 block">
                    Collection
                  </span>
                  <h3 className="font-serif text-4xl lg:text-5xl text-white mb-4">Bijoux</h3>
                  <span className="inline-flex items-center text-white text-sm font-bold uppercase tracking-widest group-hover:text-[#D4AF37] transition-colors">
                    Découvrir <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bags Section */}
      <section className="py-20 lg:py-32 bg-white" data-testid="bags-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                Maroquinerie
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A]">Nos Sacs</h2>
            </div>
            <Link
              to="/shop/sacs"
              className="hidden md:inline-flex items-center text-sm font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#D4AF37] transition-colors"
            >
              Voir tout <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bags.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/shop/sacs" className="btn-secondary inline-block">
              Voir tous les sacs
            </Link>
          </div>
        </div>
      </section>

      {/* Jewelry Section */}
      <section className="py-20 lg:py-32 bg-[#F5F5F0]" data-testid="jewelry-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                Joaillerie
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A]">Nos Bijoux</h2>
            </div>
            <Link
              to="/shop/bijoux"
              className="hidden md:inline-flex items-center text-sm font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#D4AF37] transition-colors"
            >
              Voir tout <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {jewelry.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/shop/bijoux" className="btn-secondary inline-block">
              Voir tous les bijoux
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 lg:py-32 bg-[#1A1A1A]" data-testid="newsletter-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
            Newsletter
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Restez Informée</h2>
          <p className="text-gray-400 mb-8">
            Inscrivez-vous pour recevoir nos dernières nouveautés et offres exclusives.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 bg-white/10 border border-gray-700 text-white px-6 py-4 focus:border-[#D4AF37] focus:outline-none"
              data-testid="newsletter-email"
            />
            <button
              type="submit"
              className="btn-primary bg-[#D4AF37] hover:bg-white hover:text-[#1A1A1A]"
              data-testid="newsletter-submit"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;

