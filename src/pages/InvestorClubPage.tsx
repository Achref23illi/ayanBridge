import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  BarChart3, 
  Eye, 
  Users, 
  Calendar,
  Play,
  MessageCircle,
  Target,
  Zap,
  ArrowUpRight,
  PieChart,
  Star,
  Bell,
  Wallet,
  Clock,
  CheckCircle,
  PlayCircle,
  Heart,
  Lightbulb,
  Award,
  Globe
} from 'lucide-react';
import { Button } from '../components/ui/Button';

// Mock data for investment opportunities showcase
const showcaseOpportunities = [
  {
    id: 1,
    title: "Masterclass Entrepreneuriat Digital",
    creator: "Sophie Moreau",
    category: "Formation",
    description: "Une formation complète pour lancer son business digital",
    expectedReturn: "Rendements attractifs",
    collaborators: 12,
    status: "live",
    trend: "trending",
    creatorRating: 4.8,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    launchDate: "Lancement récent",
    community: "Communauté active"
  },
  {
    id: 2,
    title: "Guide Investissement Crypto 2024",
    creator: "Alexandre Dubois",
    category: "eBook",
    description: "Stratégies d'investissement crypto pour débutants et experts",
    expectedReturn: "Potentiel élevé",
    collaborators: 24,
    status: "preparation",
    trend: "new",
    creatorRating: 4.9,
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    launchDate: "Bientôt disponible",
    community: "En développement"
  },
  {
    id: 3,
    title: "Série de Lives - Trading Avancé",
    creator: "Marina Lopez",
    category: "Live",
    description: "Sessions live hebdomadaires sur les stratégies de trading",
    expectedReturn: "Performance suivie",
    collaborators: 18,
    status: "launched",
    trend: "hot",
    creatorRating: 4.7,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    launchDate: "Déjà actif",
    community: "Groupe établi"
  }
];

// Mock showcase metrics
const showcaseMetrics = {
  successRate: "Taux de succès élevé",
  activeProjects: "156+ projets",
  community: "Communauté engagée",
  totalValue: "Valeur créée ensemble",
  examples: [
    { title: "Formation Marketing Digital", description: "Collaboration réussie", status: "Succès" },
    { title: "eBook Développement Web", description: "Impact positif", status: "Actif" },
    { title: "Masterclass Design UX", description: "Croissance continue", status: "Développement" },
    { title: "Lives Trading Crypto", description: "Engagement fort", status: "Populaire" },
    { title: "Formation IA Business", description: "Innovation", status: "Émergent" }
  ]
};

const InvestorClubPage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('opportunities');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showOpportunityModal, setShowOpportunityModal] = useState(false);
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [showNotification, setShowNotification] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'text-green-400 bg-green-400/10';
      case 'preparation': return 'text-yellow-400 bg-yellow-400/10';
      case 'launched': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'En cours';
      case 'preparation': return 'En préparation';
      case 'launched': return 'Actif';
      default: return 'Disponible';
    }
  };

  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case 'trending': return { text: 'Tendance', color: 'bg-orange-500' };
      case 'new': return { text: 'Nouveau', color: 'bg-green-500' };
      case 'hot': return { text: 'Populaire', color: 'bg-red-500' };
      default: return null;
    }
  };

  const OpportunityCard = ({ opportunity }: { opportunity: any }) => {
    const trendBadge = getTrendBadge(opportunity.trend);

    return (
      <motion.div
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 group hover:border-primary/30 transition-all duration-300"
      >
        <div className="relative">
          <img 
            src={opportunity.image} 
            alt={opportunity.title}
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
            {trendBadge && (
              <span className={`${trendBadge.color} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
                {trendBadge.text}
              </span>
            )}
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(opportunity.status)}`}>
              {getStatusText(opportunity.status)}
            </span>
          </div>

          {/* Success Badge */}
          <div className="absolute top-3 right-3 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {opportunity.expectedReturn}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
              {opportunity.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-white/60">{opportunity.creatorRating}</span>
            </div>
          </div>

          <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {opportunity.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white/60">{opportunity.creator}</span>
          </div>

          <p className="text-sm text-white/70 mb-4 line-clamp-2">{opportunity.description}</p>

          {/* Community Info */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/60">Collaboration</span>
              <span className="text-white">{opportunity.community}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `75%` }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary to-green-400 rounded-full h-2"
              ></motion.div>
            </div>
            <div className="flex justify-between text-xs text-white/60 mt-1">
              <span>{opportunity.launchDate}</span>
              <span>{opportunity.collaborators} collaborateurs</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              className="flex-1 text-white hover:bg-white/10"
              onClick={() => {
                setSelectedOpportunity(opportunity);
                setShowOpportunityModal(true);
              }}
            >
              <Eye className="w-4 h-4 mr-1" />
              Explorer
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={() => {
                setSelectedOpportunity(opportunity);
                setShowOpportunityModal(true);
              }}
            >
              <Heart className="w-4 h-4 mr-1" />
              Découvrir
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };

  const ShowcaseChart = () => {
    const circumference = 2 * Math.PI * 45; // radius of 45

    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-6">Impact de la communauté</h3>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-36 h-36">
            {/* SVG Donut Chart */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="#22c55e"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * 0.25}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference * 0.25 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div 
                  className="text-3xl font-bold text-green-400 mb-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  75%
                </motion.div>
                <div className="text-sm text-white/60">Succès</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <div className="text-2xl font-bold text-white">156+</div>
            <div className="text-sm text-white/60">Projets</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <div className="text-2xl font-bold text-green-400">2.3M</div>
            <div className="text-sm text-white/60">Valeur créée</div>
          </motion.div>
        </div>
      </div>
    );
  };

  // Modal Components
  const InfoModal = () => (
    showInfoModal && (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-secondary rounded-2xl p-6 max-w-2xl w-full border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Comment ça marche</h3>
            <button
              onClick={() => setShowInfoModal(false)}
              className="text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="space-y-4 text-white/80">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div>
                <h4 className="font-semibold text-white mb-1">Explorez les opportunités</h4>
                <p>Découvrez des projets de contenus éducatifs avec un fort potentiel de croissance.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div>
                <h4 className="font-semibold text-white mb-1">Participez aux sessions</h4>
                <p>Assistez aux présentations live des créateurs et posez vos questions.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div>
                <h4 className="font-semibold text-white mb-1">Rejoignez la communauté</h4>
                <p>Collaborez avec d'autres investisseurs et accompagnez les projets vers le succès.</p>
              </div>
            </div>
          </div>
                     <div className="mt-6 flex gap-4">
             <Button 
               className="flex-1 bg-primary hover:bg-primary/90" 
               onClick={() => navigate('/signup')}
             >
               Rejoindre maintenant
             </Button>
            <Button variant="ghost" className="flex-1 border-white/20" onClick={() => setShowInfoModal(false)}>
              Continuer l'exploration
            </Button>
          </div>
        </div>
      </div>
    )
  );

  const OpportunityModal = () => (
    showOpportunityModal && selectedOpportunity && (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-secondary rounded-2xl p-6 max-w-4xl w-full border border-white/10 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">{selectedOpportunity.title}</h3>
            <button
              onClick={() => setShowOpportunityModal(false)}
              className="text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <img 
                src={selectedOpportunity.image} 
                alt={selectedOpportunity.title}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">À propos du projet</h4>
                  <p className="text-white/80">{selectedOpportunity.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Créateur</h4>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-white/60" />
                    <span className="text-white/80">{selectedOpportunity.creator}</span>
                    <div className="flex items-center gap-1 ml-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white/60">{selectedOpportunity.creatorRating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-3">Détails de la collaboration</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Statut</span>
                    <span className="text-white">{getStatusText(selectedOpportunity.status)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Catégorie</span>
                    <span className="text-white">{selectedOpportunity.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Collaborateurs</span>
                    <span className="text-white">{selectedOpportunity.collaborators}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Potentiel</span>
                    <span className="text-green-400">{selectedOpportunity.expectedReturn}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button className="bg-green-500 hover:bg-green-600" onClick={() => setShowJoinModal(true)}>
                  <Heart className="w-4 h-4 mr-2" />
                  Rejoindre ce projet
                </Button>
                <Button variant="ghost" className="border-white/20" onClick={() => setShowPitchModal(true)}>
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Voir présentation
                </Button>
                <Button variant="ghost" className="border-white/20">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contacter le créateur
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const JoinModal = () => (
    showJoinModal && (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-secondary rounded-2xl p-6 max-w-md w-full border border-white/10">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Rejoindre Bridge Capital</h3>
            <p className="text-white/70 mb-6">
              Connectez-vous ou créez un compte pour accéder à toutes les fonctionnalités de notre plateforme.
            </p>
                         <div className="space-y-3">
               <Button 
                 className="w-full bg-primary hover:bg-primary/90"
                 onClick={() => navigate('/login')}
               >
                 Se connecter
               </Button>
               <Button 
                 variant="ghost" 
                 className="w-full border-white/20"
                 onClick={() => navigate('/signup')}
               >
                 Créer un compte
               </Button>
              <Button 
                variant="ghost" 
                className="w-full text-white/60 hover:text-white"
                onClick={() => setShowJoinModal(false)}
              >
                Continuer la visite
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const PitchModal = () => (
    showPitchModal && (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-secondary rounded-2xl p-6 max-w-3xl w-full border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Présentation du projet</h3>
            <button
              onClick={() => setShowPitchModal(false)}
              className="text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="aspect-video bg-black/50 rounded-xl flex items-center justify-center mb-6">
            <div className="text-center">
              <PlayCircle className="w-16 h-16 text-white/60 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Vidéo de présentation</h4>
              <p className="text-white/60 mb-4">Découvrez le projet en détail avec le créateur</p>
              <Button className="bg-red-500 hover:bg-red-600">
                <Play className="w-4 h-4 mr-2" />
                Lancer la vidéo
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Points clés</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white/80">Vision claire du projet</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white/80">Expertise du créateur</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white/80">Potentiel de croissance</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Prochaines étapes</h4>
              <div className="space-y-3">
                <Button className="w-full bg-green-500 hover:bg-green-600" onClick={() => setShowJoinModal(true)}>
                  <Heart className="w-4 h-4 mr-2" />
                  Soutenir ce projet
                </Button>
                <Button variant="ghost" className="w-full border-white/20">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Poser une question
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const NotificationToast = () => (
    showNotification && (
      <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4" />
          <span>Notification activée ! Vous serez alerté des prochaines sessions.</span>
        </div>
      </div>
    )
  );

  const handleNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="w-full bg-secondary text-white">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="w-full py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-green-400/10"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-blue-400 font-medium">Bridge Capital</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Rejoignez notre
                <span className="text-green-400"> communauté</span>
                <br />
                d'investisseurs
              </h1>
              
              <p className="text-lg sm:text-xl text-white/80 mb-8">
                Découvrez comment participer au financement collaboratif de contenus éducatifs 
                innovants et contribuer à l'écosystème digital de demain.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">75%</div>
                  <div className="text-xs text-white/60">Taux de succès</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">156+</div>
                  <div className="text-xs text-white/60">Projets soutenus</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2.3M</div>
                  <div className="text-xs text-white/60">Valeur créée</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4"
                  onClick={() => navigate('/signup')}
                >
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Découvrir les opportunités
                </Button>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4"
                  onClick={() => setShowInfoModal(true)}
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Voir comment ça marche
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <ShowcaseChart />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-500/20 rounded-full blur-lg"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Comment fonctionne Bridge Capital</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Découvrez les différentes façons de participer à notre écosystème d'investissement collaboratif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div 
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Opportunités</h3>
              <p className="text-sm text-white/60">Explorez les projets à fort potentiel</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <PlayCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Pitchs Live</h3>
              <p className="text-sm text-white/60">Sessions de présentation en direct</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Communauté</h3>
              <p className="text-sm text-white/60">Réseau d'investisseurs engagés</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Suivi</h3>
              <p className="text-sm text-white/60">Accompagnement des projets</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="w-full px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-2">
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'opportunities', label: 'Opportunités', icon: Target },
                { id: 'live-pitch', label: 'Pitch Live', icon: PlayCircle },
                { id: 'community', label: 'Communauté', icon: Users }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    selectedTab === tab.id 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {selectedTab === 'opportunities' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Aperçu des opportunités</h2>
                <p className="text-white/70">Exemples de projets soutenus par notre communauté</p>
              </div>

              {/* Opportunities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {showcaseOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            </motion.div>
          )}

          {selectedTab === 'live-pitch' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <div className="aspect-video bg-black/50 flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="w-16 h-16 text-white/60 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Sessions Pitch Live</h3>
                    <p className="text-white/60 mb-4">Découvrez comment les créateurs présentent leurs projets</p>
                    <Button 
                      className="bg-red-500 hover:bg-red-600"
                      onClick={handleNotification}
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Voir les prochaines sessions
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h3 className="text-lg font-semibold text-white mb-4">Format des sessions</h3>
                      <div className="space-y-4">
                        {showcaseOpportunities.slice(0, 2).map((opportunity) => (
                          <div key={opportunity.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                            <img src={opportunity.image} alt={opportunity.title} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-1">
                              <h4 className="font-medium text-white">{opportunity.title}</h4>
                              <p className="text-sm text-white/60">{opportunity.creator}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="text-sm text-primary">Sessions interactives</span>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-primary hover:bg-primary/90"
                              onClick={() => {
                                setSelectedOpportunity(opportunity);
                                setShowOpportunityModal(true);
                              }}
                            >
                              En savoir plus
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Échanges communauté</h3>
                      <div className="bg-black/20 rounded-lg p-4 h-64 overflow-y-auto">
                        <div className="space-y-2 text-sm">
                          <div className="text-blue-400">Membre: Format très intéressant !</div>
                          <div className="text-green-400">Investisseur: Questions pertinentes</div>
                          <div className="text-primary">Créateur: Merci pour vos retours</div>
                          <div className="text-purple-400">Mentor: Excellent potentiel</div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-white/60">
                          Échanges en temps réel lors des sessions de présentation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'community' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">Collaboration</div>
                      <div className="text-sm text-white/60">Projets soutenus</div>
                    </div>
                  </div>
                  <div className="text-xs text-blue-400">Approche communautaire</div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">Impact</div>
                      <div className="text-sm text-white/60">Valeur créée</div>
                    </div>
                  </div>
                  <div className="text-xs text-green-400">Croissance durable</div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">Réseau</div>
                      <div className="text-sm text-white/60">Communauté active</div>
                    </div>
                  </div>
                  <div className="text-xs text-primary">Connexions mondiales</div>
                </div>
              </div>

              {/* Community Examples */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-white">Exemples de collaborations</h3>
                </div>
                <div className="divide-y divide-white/10">
                  {showcaseMetrics.examples.map((example, index) => (
                    <div key={index} className="p-6 hover:bg-white/5 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-white mb-1">{example.title}</h4>
                          <div className="text-sm text-white/60">
                            {example.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-400">
                            {example.status}
                          </div>
                          <div className="text-sm text-white/60">Statut</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-12">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setShowJoinModal(true)}
                >
                  Rejoindre Bridge Capital pour découvrir toutes les opportunités
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

             <InfoModal />
       <OpportunityModal />
       <PitchModal />
       <JoinModal />
       <NotificationToast />
    </div>
  );
};

export default InvestorClubPage; 