import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { useCart } from '../App';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Boutique', path: '/shop' },
    { name: 'Sacs', path: '/shop/sacs' },
    { name: 'Bijoux', path: '/shop/bijoux' },
    { name: 'À propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-nav shadow-sm' : 'bg-white'
        }`}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:text-[#D4AF37] transition-colors"
              data-testid="mobile-menu-btn"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link to="/" className="flex flex-col items-center" data-testid="logo">
              <span className="font-serif text-2xl md:text-3xl tracking-tight text-[#1A1A1A]">
                Belle Femme
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">
                Paris
              </span>
            </Link>

            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors hover:text-[#D4AF37] ${
                    location.pathname === link.path ? 'text-[#D4AF37]' : 'text-[#1A1A1A]'
                  }`}
                  data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:text-[#D4AF37] transition-colors"
                data-testid="search-btn"
                aria-label="Rechercher"
              >
                <Search size={20} />
              </button>

              <Link
                to="/cart"
                className="relative p-2 hover:text-[#D4AF37] transition-colors"
                data-testid="cart-btn"
                aria-label="Panier"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-white text-[10px] font-bold flex items-center justify-center"
                    data-testid="cart-count"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-[#E5E5E5] bg-white overflow-hidden"
            >
              <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
                <div className="flex items-center space-x-4">
                  <Search size={20} className="text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un produit..."
                    className="flex-1 border-none focus:ring-0 text-base"
                    data-testid="search-input"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-[#1A1A1A] transition-colors"
                    data-testid="search-submit"
                  >
                    Rechercher
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-80 bg-white pt-24 px-6">
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-[#D4AF37] ${
                      location.pathname === link.path ? 'text-[#D4AF37]' : 'text-[#1A1A1A]'
                    }`}
                    data-testid={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;