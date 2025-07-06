import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Eye, 
  Users, 
  Calendar,
  Play,
  MessageCircle,
  Target,
  Zap,
  ChevronDown,
  Filter,
  ArrowUpRight,
  PieChart,
  Star,
  Bell,
  Wallet,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Heart,
  TrendingDown
} from 'lucide-react';
import { Button } from '../components/ui/Button';

// Mock data for investment opportunities
const investmentProducts = [
  {
    id: 1,
    title: "Masterclass Entrepreneuriat Digital",
    creator: "Sophie Moreau",
    category: "Formation",
    description: "Une formation complète pour lancer son business digital",
    estimatedReturn: 25,
    minInvestment: 100,
    totalNeeded: 5000,
    currentFunding: 3200,
    investors: 12,
    status: "live",
    trend: "trending",
    salesHistory: [120, 180, 250, 320, 450, 680],
    creatorRating: 4.8,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    launchDate: "2024-02-15",
    expectedCompletion: "2024-03-01"
  },
  {
    id: 2,
    title: "Guide Investissement Crypto 2024",
    creator: "Alexandre Dubois",
    category: "eBook",
    description: "Stratégies d'investissement crypto pour débutants et experts",
    estimatedReturn: 35,
    minInvestment: 50,
    totalNeeded: 2000,
    currentFunding: 1800,
    investors: 24,
    status: "preparation",
    trend: "new",
    salesHistory: [50, 80, 120, 180, 280, 400],
    creatorRating: 4.9,
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    launchDate: "2024-03-01",
    expectedCompletion: "2024-03-15"
  },
  {
    id: 3,
    title: "Série de Lives - Trading Avancé",
    creator: "Marina Lopez",
    category: "Live",
    description: "Sessions live hebdomadaires sur les stratégies de trading",
    estimatedReturn: 40,
    minInvestment: 200,
    totalNeeded: 8000,
    currentFunding: 6400,
    investors: 18,
    status: "launched",
    trend: "hot",
    salesHistory: [200, 350, 520, 750, 980, 1200],
    creatorRating: 4.7,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    launchDate: "2024-01-15",
    expectedCompletion: "2024-04-15"
  }
];

// Mock user portfolio data
const userPortfolio = {
  totalInvested: 1250,
  totalReturns: 340,
  activeInvestments: 5,
  roi: 27.2,
  investments: [
    { id: 1, title: "Formation Marketing Digital", invested: 300, returns: 120, roi: 40 },
    { id: 2, title: "eBook Développement Web", invested: 150, returns: 65, roi: 43 },
    { id: 3, title: "Masterclass Design UX", invested: 400, returns: 85, roi: 21 },
    { id: 4, title: "Lives Trading Crypto", invested: 250, returns: 70, roi: 28 },
    { id: 5, title: "Formation IA Business", invested: 150, returns: 0, roi: 0 }
  ]
};

const InvestorClubPage = () => {
  const [selectedTab, setSelectedTab] = useState('opportunities');
  const [sortBy, setSortBy] = useState('trending');
  const [filterType, setFilterType] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showLivePitch, setShowLivePitch] = useState(false);

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
      case 'live': return 'En live';
      case 'preparation': return 'En préparation';
      case 'launched': return 'Déjà lancé';
      default: return 'Inconnu';
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

  const InvestmentCard = ({ product }: { product: any }) => {
    const fundingPercentage = (product.currentFunding / product.totalNeeded) * 100;
    const trendBadge = getTrendBadge(product.trend);

    return (
      <motion.div
        whileHover={{ y: -5, scale: 1.01 }}
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
            {trendBadge && (
              <span className={`${trendBadge.color} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
                {trendBadge.text}
              </span>
            )}
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
              {getStatusText(product.status)}
            </span>
          </div>

          {/* ROI Badge */}
          <div className="absolute top-3 right-3 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
            +{product.estimatedReturn}% ROI
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-white/60">{product.creatorRating}</span>
            </div>
          </div>

          <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white/60">{product.creator}</span>
          </div>

          <p className="text-sm text-white/70 mb-4 line-clamp-2">{product.description}</p>

          {/* Funding Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/60">Financement</span>
              <span className="text-white">{fundingPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${fundingPercentage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary to-green-400 rounded-full h-2"
              ></motion.div>
            </div>
            <div className="flex justify-between text-xs text-white/60 mt-1">
              <span>{product.currentFunding}€ / {product.totalNeeded}€</span>
              <span>{product.investors} investisseurs</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="text-xs text-white/60">Mise min.</div>
              <div className="text-lg font-bold text-white">{product.minInvestment}€</div>
            </div>

            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                onClick={() => setSelectedProduct(product)}
              >
                <Eye className="w-4 h-4 mr-1" />
                Détails
              </Button>
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90"
              >
                <DollarSign className="w-4 h-4 mr-1" />
                Investir
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const PortfolioChart = () => {
    const circumference = 2 * Math.PI * 45; // radius of 45
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (userPortfolio.roi / 100) * circumference;

    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-6">Répartition du portefeuille</h3>
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
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: strokeDashoffset }}
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
                  +{userPortfolio.roi}%
                </motion.div>
                <div className="text-sm text-white/60">ROI Global</div>
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
            <div className="text-2xl font-bold text-white">{userPortfolio.totalInvested}€</div>
            <div className="text-sm text-white/60">Investi</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <div className="text-2xl font-bold text-green-400">+{userPortfolio.totalReturns}€</div>
            <div className="text-sm text-white/60">Gains</div>
          </motion.div>
        </div>
      </div>
    );
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
                Investissez dans le
                <span className="text-green-400"> futur digital</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-white/80 mb-8">
                Participez au financement de contenus éducatifs innovants et 
                partagez les revenus générés par leur succès.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">25%</div>
                  <div className="text-xs text-white/60">ROI Moyen</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">156</div>
                  <div className="text-xs text-white/60">Projets Actifs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">€2.3M</div>
                  <div className="text-xs text-white/60">Déjà Investis</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Commencer à investir
                </Button>
                <Button size="lg" variant="ghost" className="border-white/20 text-white hover:bg-white/10 px-8 py-4">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Voir une démo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <PortfolioChart />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-500/20 rounded-full blur-lg"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Navigation Tabs */}
      <section className="w-full px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-2">
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'opportunities', label: 'Opportunités', icon: Target },
                { id: 'live-pitch', label: 'Pitch Live', icon: PlayCircle },
                { id: 'portfolio', label: 'Mon Portfolio', icon: PieChart }
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
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1 flex flex-wrap gap-4">
                  <div className="relative">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 appearance-none cursor-pointer"
                      aria-label="Filtrer par type de contenu"
                    >
                      <option value="all" className="bg-secondary text-white">Tous types</option>
                      <option value="Formation" className="bg-secondary text-white">Formation</option>
                      <option value="eBook" className="bg-secondary text-white">eBook</option>
                      <option value="Live" className="bg-secondary text-white">Live</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 appearance-none cursor-pointer"
                      aria-label="Trier les opportunités"
                    >
                      <option value="trending" className="bg-secondary text-white">Tendance</option>
                      <option value="newest" className="bg-secondary text-white">Plus récent</option>
                      <option value="roi" className="bg-secondary text-white">ROI le plus élevé</option>
                      <option value="funding" className="bg-secondary text-white">Financement</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Investment Opportunities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {investmentProducts.map((product) => (
                  <InvestmentCard key={product.id} product={product} />
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
                    <h3 className="text-xl font-semibold text-white mb-2">Session Pitch Live</h3>
                    <p className="text-white/60 mb-4">Prochaine session dans 2h 15min</p>
                    <Button className="bg-red-500 hover:bg-red-600">
                      <Bell className="w-4 h-4 mr-2" />
                      M'alerter
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h3 className="text-lg font-semibold text-white mb-4">À venir aujourd'hui</h3>
                      <div className="space-y-4">
                        {investmentProducts.slice(0, 2).map((product) => (
                          <div key={product.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                            <img src={product.image} alt={product.title} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-1">
                              <h4 className="font-medium text-white">{product.title}</h4>
                              <p className="text-sm text-white/60">{product.creator}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="text-sm text-primary">14:30 - 15:15</span>
                              </div>
                            </div>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Rejoindre
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Chat Live</h3>
                      <div className="bg-black/20 rounded-lg p-4 h-64 overflow-y-auto">
                        <div className="space-y-2 text-sm">
                          <div className="text-blue-400">InvestorPro: Très intéressant ce projet !</div>
                          <div className="text-green-400">TechFan42: Quel est le ROI estimé ?</div>
                          <div className="text-primary">Sophie_Creator: Merci ! ROI estimé à 25%</div>
                          <div className="text-purple-400">CryptoKing: J'investis 500€</div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Tapez votre message..."
                          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:border-primary/50"
                        />
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'portfolio' && (
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
                      <div className="text-2xl font-bold text-white">{userPortfolio.totalInvested}€</div>
                      <div className="text-sm text-white/60">Total Investi</div>
                    </div>
                  </div>
                  <div className="text-xs text-blue-400">+12% ce mois</div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">+{userPortfolio.totalReturns}€</div>
                      <div className="text-sm text-white/60">Gains Totaux</div>
                    </div>
                  </div>
                  <div className="text-xs text-green-400">+{userPortfolio.roi}% ROI global</div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{userPortfolio.activeInvestments}</div>
                      <div className="text-sm text-white/60">Investissements Actifs</div>
                    </div>
                  </div>
                  <div className="text-xs text-primary">3 nouveaux ce mois</div>
                </div>
              </div>

              {/* Investment List */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-white">Mes Investissements</h3>
                </div>
                <div className="divide-y divide-white/10">
                  {userPortfolio.investments.map((investment) => (
                    <div key={investment.id} className="p-6 hover:bg-white/5 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-white mb-1">{investment.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span>Investi: {investment.invested}€</span>
                            <span>Gains: +{investment.returns}€</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${investment.roi > 0 ? 'text-green-400' : 'text-white/60'}`}>
                            {investment.roi > 0 ? '+' : ''}{investment.roi}%
                          </div>
                          <div className="text-sm text-white/60">ROI</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default InvestorClubPage; 