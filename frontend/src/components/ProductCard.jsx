import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product, index = 0 }) => {
  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card group"
      data-testid={`product-card-${product.id}`}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F0] mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} - vue alternative`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              loading="lazy"
            />
          )}

          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.featured && (
              <span className="bg-[#D4AF37] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                Populaire
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                Épuisé
              </span>
            )}
          </div>

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
            <span className="bg-white text-[#1A1A1A] text-xs font-bold uppercase tracking-widest px-6 py-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Voir le produit
            </span>
          </div>
        </div>

        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1 block">
            {product.category === 'sacs' ? 'Sac' : 'Bijou'}
          </span>
          <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 group-hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-[#1A1A1A] font-medium">
            {product.price.toFixed(2)} €
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;