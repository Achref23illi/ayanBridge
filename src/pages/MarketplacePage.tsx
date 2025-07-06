import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Play, 
  BookOpen, 
  Video, 
  Users, 
  Star,
  Heart,
  TrendingUp,
  Clock,
  User,
  ChevronDown,
  Grid,
  List,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from '../components/ui/Button';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    title: "Maîtrise complète du Marketing Digital",
    creator: "Sarah Johnson",
    price: 89.99,
    originalPrice: 129.99,
    type: "formation",
    level: "intermédiaire",
    category: "marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    students: 1205,
    isLive: false,
    badge: "Bestseller"
  },
  {
    id: 2,
    title: "Session LIVE : Stratégies d'Investissement 2024",
    creator: "Marc Dubois",
    price: 29.99,
    type: "live",
    level: "expert",
    category: "finance",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    students: 342,
    isLive: true,
    liveStartTime: "Dans 2h"
  },
  {
    id: 3,
    title: "Guide Complet du Développement Web",
    creator: "Alex Chen",
    price: 0,
    type: "ebook",
    level: "débutant",
    category: "développement",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    students: 2834,
    isLive: false,
    badge: "Gratuit"
  },
  {
    id: 4,
    title: "Masterclass Photographie Professionnelle",
    creator: "Emma Wilson",
    price: 149.99,
    type: "vidéo",
    level: "expert",
    category: "créatif",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    students: 687,
    isLive: false,
    badge: "Premium"
  },
  {
    id: 5,
    title: "Entrepreneuriat Digital : De l'idée au succès",
    creator: "Pierre Martin",
    price: 79.99,
    type: "formation",
    level: "intermédiaire",
    category: "business",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    students: 1456,
    isLive: false,
    badge: "Nouveau"
  },
  {
    id: 6,
    title: "Workshop LIVE : Design Thinking",
    creator: "Julie Moreau",
    price: 39.99,
    type: "live",
    level: "intermédiaire",
    category: "design",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    students: 234,
    isLive: true,
    liveStartTime: "En cours"
  }
];

const categories = [
  { id: 'all', name: 'Toutes catégories', count: 156 },
  { id: 'marketing', name: 'Marketing', count: 45 },
  { id: 'développement', name: 'Développement', count: 38 },
  { id: 'design', name: 'Design', count: 29 },
  { id: 'business', name: 'Business', count: 33 },
  { id: 'finance', name: 'Finance', count: 11 }
];

const MarketplacePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const ProductCard = ({ product }: { product: any }) => (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 group hover:border-primary/30 transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isLive && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
              🔴 LIVE
            </span>
          )}
          {product.badge && (
            <span className="bg-primary/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {product.badge}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          <Heart 
            className={`w-4 h-4 ${favorites.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-white'}`}
          />
        </button>

        {/* Live Timer */}
        {product.isLive && product.liveStartTime && (
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
            <span className="text-white text-xs">{product.liveStartTime}</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
            {product.type}
          </span>
          <span className="text-xs text-white/60">{product.level}</span>
        </div>

        <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <User className="w-4 h-4 text-white/60" />
          <span className="text-sm text-white/60">{product.creator}</span>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-white/80">{product.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white/60">{product.students}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.price === 0 ? (
              <span className="text-xl font-bold text-green-400">Gratuit</span>
            ) : (
              <>
                <span className="text-xl font-bold text-white">{product.price}€</span>
                {product.originalPrice && (
                  <span className="text-sm text-white/60 line-through">{product.originalPrice}€</span>
                )}
              </>
            )}
          </div>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Voir +
            </Button>
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {product.isLive ? 'Rejoindre' : 'Acheter'}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full bg-secondary text-white">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="w-full py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <ShoppingCart className="w-5 h-5 text-primary mr-2" />
            <span className="text-primary font-medium">Marketplace AyanBridge</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Explorez notre
            <span className="text-primary"> marketplace</span>
            <br />
            de contenus digitaux
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Découvrez des milliers de formations, eBooks, vidéos et sessions live 
            créés par des experts pour accélérer votre développement professionnel.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une formation, un eBook, une vidéo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Filters and Content */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 appearance-none cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id} className="bg-secondary text-white">
                      {cat.name} ({cat.count})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 appearance-none cursor-pointer"
                >
                  <option value="all" className="bg-secondary text-white">Tous types</option>
                  <option value="formation" className="bg-secondary text-white">Formation</option>
                  <option value="ebook" className="bg-secondary text-white">eBook</option>
                  <option value="vidéo" className="bg-secondary text-white">Vidéo</option>
                  <option value="live" className="bg-secondary text-white">Live</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
              </div>

              {/* Level Filter */}
              <div className="relative">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 appearance-none cursor-pointer"
                >
                  <option value="all" className="bg-secondary text-white">Tous niveaux</option>
                  <option value="débutant" className="bg-secondary text-white">Débutant</option>
                  <option value="intermédiaire" className="bg-secondary text-white">Intermédiaire</option>
                  <option value="expert" className="bg-secondary text-white">Expert</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
              </div>

              {/* Mobile Filter Button */}
              <Button 
                variant="ghost" 
                className="lg:hidden border-white/20 text-white hover:bg-white/10"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 appearance-none cursor-pointer"
                >
                  <option value="popularity" className="bg-secondary text-white">Popularité</option>
                  <option value="newest" className="bg-secondary text-white">Plus récent</option>
                  <option value="price-low" className="bg-secondary text-white">Prix croissant</option>
                  <option value="price-high" className="bg-secondary text-white">Prix décroissant</option>
                  <option value="rating" className="bg-secondary text-white">Mieux noté</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
              </div>

              <div className="flex border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white/10 text-white/60'} transition-colors`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white/10 text-white/60'} transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button size="lg" variant="ghost" className="border-white/20 text-white hover:bg-white/10">
              Charger plus de produits
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile Filters Panel */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-80 bg-secondary p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Filtres</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Prix</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="flex-1"
                  />
                  <span className="text-sm text-white/60">{priceRange[1]}€</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Créateur</label>
                <input
                  type="text"
                  placeholder="Nom du créateur"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => setShowFilters(false)}
              >
                Appliquer les filtres
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage; 