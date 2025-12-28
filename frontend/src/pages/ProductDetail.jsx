mport React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API, useCart } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Minus, Plus, ShoppingBag, ChevronLeft, Star, ZoomIn, X } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ author: '', rating: 5, comment: '' });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productRes, reviewsRes] = await Promise.all([
          axios.get(`${API}/products/${id}`),
          axios.get(`${API}/reviews/${id}`),
        ]);
        setProduct(productRes.data);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error('Ce produit est épuisé');
      return;
    }
    addToCart(product, quantity);
    toast.success(`${product.name} ajouté au panier`);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/reviews`, { ...reviewForm, product_id: id });
      const reviewsRes = await axios.get(`${API}/reviews/${id}`);
      setReviews(reviewsRes.data);
      setShowReviewForm(false);
      setReviewForm({ author: '', rating: 5, comment: '' });
      toast.success('Merci pour votre avis !');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de l\'avis');
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">Produit non trouvé</p>
        <Link to="/shop" className="btn-primary">Retour à la boutique</Link>
      </div>
    );
  }

  return (
    <div data-testid="product-detail-page">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
        <Link to="/shop" className="inline-flex items-center text-sm text-gray-500 hover:text-[#D4AF37] transition-colors" data-testid="back-to-shop">
          <ChevronLeft size={16} className="mr-1" />
          Retour à la boutique
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-4">
            <motion.div
              className="aspect-[3/4] bg-[#F5F5F0] overflow-hidden cursor-zoom-in relative group"
              onClick={() => setIsZoomed(true)}
              data-testid="main-image"
            >
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
              </div>
            </motion.div>

            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-24 overflow-hidden transition-all ${selectedImage === index ? 'ring-2 ring-[#D4AF37]' : 'opacity-60 hover:opacity-100'}`}
                    data-testid={`thumbnail-${index}`}
                  >
                    <img src={image} alt={`${product.name} - vue ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-2 block">
                {product.category === 'sacs' ? 'Sac' : 'Bijou'}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-4" data-testid="product-name">
                {product.name}
              </h1>

              {reviews.length > 0 && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} className={star <= Math.round(averageRating) ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{averageRating} ({reviews.length} avis)</span>
                </div>
              )}

              <p className="text-3xl font-medium text-[#1A1A1A] mb-6" data-testid="product-price">
                {product.price.toFixed(2)} €
              </p>

              <p className="text-gray-600 leading-relaxed mb-8" data-testid="product-description">
                {product.description}
              </p>

              <div className="mb-6">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-2 text-sm text-green-600" data-testid="stock-status">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    En stock ({product.stock} disponibles)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-red-600" data-testid="stock-status">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    Épuisé
                  </span>
                )}
              </div>

              {product.stock > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center border border-[#E5E5E5]">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 hover:bg-[#F5F5F0] transition-colors" data-testid="decrease-quantity">
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                      className="w-16 text-center border-x border-[#E5E5E5] py-4 focus:outline-none"
                      data-testid="quantity-input"
                    />
                    <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-4 hover:bg-[#F5F5F0] transition-colors" data-testid="increase-quantity">
                      <Plus size={16} />
                    </button>
                  </div>

                  <button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2" data-testid="add-to-cart">
                    <ShoppingBag size={18} />
                    Ajouter au panier
                  </button>
                </div>
              )}

              <div className="border-t border-[#E5E5E5] pt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center"><span className="w-2 h-2 bg-[#D4AF37]" /></div>
                  <p className="text-sm text-gray-600">Livraison gratuite dès 100€ d'achat</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center"><span className="w-2 h-2 bg-[#D4AF37]" /></div>
                  <p className="text-sm text-gray-600">Retours gratuits sous 30 jours</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center"><span className="w-2 h-2 bg-[#D4AF37]" /></div>
                  <p className="text-sm text-gray-600">Paiement sécurisé 100% garanti</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-20 pt-20 border-t border-[#E5E5E5]" data-testid="reviews-section">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl text-[#1A1A1A]">Avis Clients ({reviews.length})</h2>
            <button onClick={() => setShowReviewForm(!showReviewForm)} className="btn-secondary" data-testid="write-review-btn">
              Écrire un avis
            </button>
          </div>

          <AnimatePresence>
            {showReviewForm && (
              <motion.form
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                onSubmit={handleSubmitReview}
                className="bg-[#F5F5F0] p-8 mb-8"
                data-testid="review-form"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#1A1A1A] mb-2">Votre nom</label>
                    <input
                      type="text"
                      value={reviewForm.author}
                      onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                      required
                      className="w-full border border-[#E5E5E5] px-4 py-3 focus:border-[#D4AF37] focus:outline-none"
                      data-testid="review-author"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#1A1A1A] mb-2">Note</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: star })} data-testid={`rating-${star}`}>
                          <Star size={24} className={star <= reviewForm.rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-gray-300'} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#1A1A1A] mb-2">Votre avis</label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    required
                    rows={4}
                    className="w-full border border-[#E5E5E5] px-4 py-3 focus:border-[#D4AF37] focus:outline-none resize-none"
                    data-testid="review-comment"
                  />
                </div>
                <button type="submit" className="btn-primary" data-testid="submit-review">Publier l'avis</button>
              </motion.form>
            )}
          </AnimatePresence>

          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucun avis pour le moment. Soyez le premier à donner votre avis !</p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-[#E5E5E5] pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[#1A1A1A]">{review.author}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={14} className={star <= review.rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-gray-300'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
            data-testid="zoom-modal"
          >
            <button className="absolute top-6 right-6 text-white hover:text-[#D4AF37] transition-colors" onClick={() => setIsZoomed(false)} data-testid="close-zoom">
              <X size={32} />
            </button>
            <img src={product.images[selectedImage]} alt={product.name} className="max-w-full max-h-full object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;