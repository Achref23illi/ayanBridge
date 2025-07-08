import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Video, 
  Users, 
  Star,
  Heart,
  User,
  Compass,
  Award,
  Monitor
} from 'lucide-react';
import { Button } from '../components/ui/Button';

// Types
interface Product {
  id: number;
  title: string;
  creator: string;
  type: string;
  level: string;
  category: string;
  image: string;
  rating: number;
  students: number;
  isLive: boolean;
  badge?: string;
  liveStartTime?: string;
  description: string;
}

// Expanded showcase content for scrolling animation
const showcaseContent: Product[] = [
  {
    id: 1,
    title: "Maîtrise complète du Marketing Digital",
    creator: "Sarah Johnson",
    type: "formation",
    level: "intermédiaire",
    category: "marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    students: 1205,
    isLive: false,
    badge: "Populaire",
    description: "Apprenez les stratégies marketing les plus efficaces pour développer votre présence en ligne."
  },
  {
    id: 2,
    title: "Sessions LIVE : Stratégies d'Investissement",
    creator: "Marc Dubois",
    type: "live",
    level: "expert",
    category: "finance",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    students: 342,
    isLive: true,
    liveStartTime: "Sessions régulières",
    description: "Participez à des sessions interactives avec des experts en investissement."
  },
  {
    id: 3,
    title: "Guide Complet du Développement Web",
    creator: "Alex Chen",
    type: "ebook",
    level: "débutant",
    category: "développement",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    students: 2834,
    isLive: false,
    badge: "Ressource",
    description: "Découvrez les fondamentaux du développement web avec ce guide complet."
  },
  {
    id: 4,
    title: "Masterclass Photographie Professionnelle",
    creator: "Emma Wilson",
    type: "vidéo",
    level: "expert",
    category: "créatif",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    students: 687,
    isLive: false,
    badge: "Premium",
    description: "Perfectionnez vos techniques photographiques avec des professionnels du secteur."
  },
  {
    id: 5,
    title: "Entrepreneuriat Digital : De l'idée au succès",
    creator: "Pierre Martin",
    type: "formation",
    level: "intermédiaire",
    category: "business",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    students: 1456,
    isLive: false,
    badge: "Tendance",
    description: "Transformez vos idées en business prospère avec nos méthodes éprouvées."
  },
  {
    id: 6,
    title: "Workshop Design Thinking",
    creator: "Julie Moreau",
    type: "workshop",
    level: "intermédiaire",
    category: "design",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    students: 234,
    isLive: false,
    description: "Explorez les méthodologies créatives pour résoudre des problèmes complexes."
  },
  {
    id: 7,
    title: "Intelligence Artificielle pour Entrepreneurs",
    creator: "David Kim",
    type: "formation",
    level: "expert",
    category: "tech",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    students: 892,
    isLive: false,
    badge: "Innovation",
    description: "Maîtrisez l'IA pour révolutionner votre business et automatiser vos processus."
  },
  {
    id: 8,
    title: "Session LIVE : Négociation Commerciale",
    creator: "Sophie Laurent",
    type: "live",
    level: "intermédiaire",
    category: "vente",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    students: 567,
    isLive: true,
    liveStartTime: "Chaque semaine",
    description: "Techniques avancées de négociation pour maximiser vos ventes."
  },
  {
    id: 9,
    title: "Guide Complet de la Blockchain",
    creator: "Antoine Rousseau",
    type: "ebook",
    level: "expert",
    category: "tech",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    students: 1123,
    isLive: false,
    badge: "Technique",
    description: "Comprenez la technologie blockchain et ses applications business."
  },
  {
    id: 10,
    title: "Masterclass Leadership & Management",
    creator: "Marie Dupont",
    type: "vidéo",
    level: "expert",
    category: "management",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    students: 2145,
    isLive: false,
    badge: "Leadership",
    description: "Développez vos compétences de leader et motivez vos équipes."
  },
  {
    id: 11,
    title: "E-commerce : De 0 à 1M€ de CA",
    creator: "Thomas Garcia",
    type: "formation",
    level: "intermédiaire",
    category: "ecommerce",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    students: 1876,
    isLive: false,
    badge: "Succès",
    description: "Stratégies éprouvées pour lancer et développer votre e-commerce."
  },
  {
    id: 12,
    title: "Workshop Data Science Appliquée",
    creator: "Lina Chen",
    type: "workshop",
    level: "expert",
    category: "data",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    students: 743,
    isLive: false,
    description: "Analysez vos données pour prendre des décisions stratégiques."
  }
];

const MarketplacePage = () => {
  const navigate = useNavigate();
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

  const ContentCard = ({ product }: { product: Product }) => (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 group hover:border-primary/30 transition-all duration-300 mb-6">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title}
          loading="eager"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          style={{ 
            minHeight: '192px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
          onLoad={(e) => {
            (e.target as HTMLImageElement).style.backgroundColor = 'transparent';
          }}
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
          aria-label="Ajouter aux favoris"
          title="Ajouter aux favoris"
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

        <p className="text-sm text-white/70 mb-3 line-clamp-2">
          {product.description}
        </p>

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
            <span className="text-sm text-white/60">{product.students} apprenants</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="flex-1 text-white hover:bg-white/10 transition-all"
          >
            Découvrir
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-primary hover:bg-primary/90 transition-all"
          >
            {product.isLive ? 'Voir les sessions' : 'En savoir plus'}
          </Button>
        </div>
      </div>
    </div>
  );

  // Create column data for scrolling animation
  const leftColumnContent = showcaseContent.filter((_, index) => index % 3 === 0);
  const middleColumnContent = showcaseContent.filter((_, index) => index % 3 === 1);
  const rightColumnContent = showcaseContent.filter((_, index) => index % 3 === 2);

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
            <Compass className="w-5 h-5 text-primary mr-2" />
            <span className="text-primary font-medium">Découvrez AyanBridge</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Explorez un univers de
            <span className="text-primary"> contenus</span>
            <br />
            créés par des experts
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Découvrez la richesse de notre plateforme : formations approfondies, eBooks exclusifs, 
            vidéos expertes et sessions live interactives pour accélérer votre développement.
          </motion.p>
        </div>
      </motion.section>

      {/* Content Categories */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Types de contenus disponibles</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Notre plateforme offre une variété de formats d'apprentissage pour s'adapter à vos préférences et objectifs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div 
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <Monitor className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Formations</h3>
              <p className="text-sm text-white/60">Programmes complets avec suivi personnalisé</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <Video className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Vidéos</h3>
              <p className="text-sm text-white/60">Masterclass et tutoriels de qualité</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">eBooks</h3>
              <p className="text-sm text-white/60">Guides approfondis et ressources exclusives</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Sessions Live</h3>
              <p className="text-sm text-white/60">Interactions directes avec les experts</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Showcase with Scrolling Animation */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Content Showcase Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Aperçu de nos contenus</h2>
            <p className="text-white/70">Exemples de la qualité et diversité disponibles sur notre plateforme</p>
          </div>

          {/* Scrolling Content Container */}
          <div className="relative h-[1600px] overflow-hidden rounded-2xl">
            {/* Gradient overlays for fade effect */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-secondary to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary to-transparent z-10 pointer-events-none"></div>
            
            {/* Scrolling columns */}
            <div className="grid grid-cols-3 gap-6 h-full">
              {/* Left Column */}
              <div className="relative">
                <div className="animate-scroll-down">
                  {/* Original content */}
                  {leftColumnContent.map((product) => (
                    <ContentCard key={`left-${product.id}`} product={product} />
                  ))}
                  {/* Duplicated content for seamless loop */}
                  {leftColumnContent.map((product) => (
                    <ContentCard key={`left-dup-${product.id}`} product={product} />
                  ))}
                </div>
              </div>

              {/* Middle Column */}
              <div className="relative">
                <div className="animate-scroll-down-delayed">
                  {/* Original content */}
                  {middleColumnContent.map((product) => (
                    <ContentCard key={`middle-${product.id}`} product={product} />
                  ))}
                  {/* Duplicated content for seamless loop */}
                  {middleColumnContent.map((product) => (
                    <ContentCard key={`middle-dup-${product.id}`} product={product} />
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="relative">
                <div className="animate-scroll-down-slow">
                  {/* Original content */}
                  {rightColumnContent.map((product) => (
                    <ContentCard key={`right-${product.id}`} product={product} />
                  ))}
                  {/* Duplicated content for seamless loop */}
                  {rightColumnContent.map((product) => (
                    <ContentCard key={`right-dup-${product.id}`} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate('/signup')}
            >
              Rejoindre AyanBridge pour explorer tous les contenus
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketplacePage; 