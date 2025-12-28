import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-2xl text-white">Belle Femme</span>
              <span className="block text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mt-1">
                Paris
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Découvrez notre collection exclusive de sacs et bijoux pour femmes. 
              L'élégance parisienne à portée de main.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-6">
              Boutique
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Tous les produits', path: '/shop' },
                { name: 'Sacs', path: '/shop/sacs' },
                { name: 'Bijoux', path: '/shop/bijoux' },
                { name: 'Nouveautés', path: '/shop?sort=newest' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-[#D4AF37] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-6">
              Informations
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'À propos', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'FAQ', path: '/faq' },
                { name: 'CGV', path: '/cgv' },
                { name: 'Politique de confidentialité', path: '/privacy' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-[#D4AF37] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Avenue des Champs-Élysées<br />
                  75008 Paris, France
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[#D4AF37] flex-shrink-0" />
                <a
                  href="tel:+33123456789"
                  className="text-gray-400 text-sm hover:text-[#D4AF37] transition-colors"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#D4AF37] flex-shrink-0" />
                <a
                  href="mailto:contact@bellefemme.fr"
                  className="text-gray-400 text-sm hover:text-[#D4AF37] transition-colors"
                >
                  contact@bellefemme.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Belle Femme Paris. Tous droits réservés.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/512px-Stripe_Logo%2C_revised_2016.svg.png"
              alt="Stripe"
              className="h-6 opacity-50"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;