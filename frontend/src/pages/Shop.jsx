import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { Slider } from '../components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const Shop = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popularity');
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `${API}/products?`;
        const params = new URLSearchParams();
        
        if (category) {
          params.append('category', category);
        }
        if (priceRange[0] > 0) {
          params.append('min_price', priceRange[0].toString());
        }
        if (priceRange[1] < 300) {
          params.append('max_price', priceRange[1].toString());
        }
        if (search) {
          params.append('search', search);
        }
        params.append('sort', sortBy);
        
        const response = await axios.get(`${url}${params.toString()}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, priceRange, sortBy, search]);

  const getCategoryTitle = () => {
    if (search) return `Recherche: "${search}"`;
    switch (category) {
      case 'sacs': return 'Nos Sacs';
      case 'bijoux': return 'Nos Bijoux';
      default: return 'Toute la Collection';
    }
  };

  const getCategoryDescription = () => {
    if (search) return `${products.length} résultat(s) trouvé(s)`;
    switch (category) {
      case 'sacs': return 'Découvrez notre collection de sacs en cuir, des classiques intemporels aux créations contemporaines.';
      case 'bijoux': return 'Une sélection de bijoux précieux pour sublimer chaque instant de votre vie.';
      default: return 'Explorez notre collection complète de sacs et bijoux de luxe.';
    }
  };

  const clearFilters = () => {
    setPriceRange([0, 300]);
    setSortBy('popularity');
    setSearchParams({});
  };

  return (
    <div data-testid="shop-page">
      <section className="bg-[#F5F5F0] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              Boutique
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-4">
              {getCategoryTitle()}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">{getCategoryDescription()}</p>
          </motion.div>

          {!search && (
            <div className="flex justify-center gap-4 mt-8">
              <Link
                to="/shop"
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  !category ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                }`}
                data-testid="filter-all"
              >
                Tout
              </Link>
              <Link
                to="/shop/sacs"
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  category === 'sacs' ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                }`}
                data-testid="filter-sacs"
              >
                Sacs
              </Link>
              <Link
                to="/shop/bijoux"
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  category === 'bijoux' ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                }`}
                data-testid="filter-bijoux"
              >
                Bijoux
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E5E5]">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#D4AF37] transition-colors"
                data-testid="toggle-filters"
              >
                <SlidersHorizontal size={18} />
                Filtres
              </button>
              {(priceRange[0] > 0 || priceRange[1] < 300) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#D4AF37] transition-colors"
                  data-testid="clear-filters"
                >
                  <X size={14} />
                  Effacer
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{products.length} produits</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] border-none bg-transparent text-sm font-medium" data-testid="sort-select">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularité</SelectItem>
                  <SelectItem value="price">Prix croissant</SelectItem>
                  <SelectItem value="price_desc">Prix décroissant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-[#F5F5F0] p-6 mb-8"
            >
              <div className="max-w-md">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A] mb-4">Prix</h4>
                <div className="mb-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={300}
                    step={10}
                    className="mb-2"
                    data-testid="price-slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{priceRange[0]} €</span>
                    <span>{priceRange[1]} €</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">Aucun produit trouvé.</p>
              <Link to="/shop" className="btn-primary inline-block">Voir tous les produits</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16" data-testid="products-grid">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;