import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Clock, Users, Star, Award, CheckCircle, BookOpen, Lightbulb, TrendingUp, Eye } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useState, useEffect } from 'react';

const FormationPage = () => {
  const [currentFormationIndex, setCurrentFormationIndex] = useState(0);
  
  const formations = [
    {
      id: 1,
      title: "Formation Trading Crypto Complète",
      instructor: "Expert AyanBridge Team",
      rating: 4.9,
      reviews: 1247,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center",
      duration: "12 semaines",
      modules: 8,
      videos: 45,
      level: "Débutant à Avancé",
      certificate: true,
      description: "La formation la plus complète sur le trading crypto, de zéro à expert en 12 semaines.",
      highlights: [
        "Analyse technique et fondamentale",
        "Stratégies de trading avancées",
        "Gestion des risques",
        "Psychologie du trading",
        "Portfolio management",
        "DeFi et yield farming"
      ],
      curriculum: [
        "Module 1 : Fondamentaux des cryptomonnaies",
        "Module 2 : Analyse technique",
        "Module 3 : Analyse fondamentale",
        "Module 4 : Stratégies de trading",
        "Module 5 : Gestion des risques",
        "Module 6 : Psychologie du trading",
        "Module 7 : DeFi et applications",
        "Module 8 : Portfolio et fiscalité"
      ]
    },
    {
      id: 2,
      title: "Formation Investissement DeFi",
      instructor: "DeFi Expert AyanBridge",
      rating: 4.8,
      reviews: 856,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center",
      duration: "8 semaines",
      modules: 6,
      videos: 32,
      level: "Intermédiaire",
      certificate: true,
      description: "Maîtrisez l'investissement en finance décentralisée et optimisez vos rendements.",
      highlights: [
        "Protocoles DeFi majeurs",
        "Yield farming et staking",
        "Liquidity mining",
        "Gestion des risques DeFi",
        "Stratégies d'optimisation",
        "Fiscalité DeFi"
      ],
      curriculum: [
        "Module 1 : Introduction à la DeFi",
        "Module 2 : Protocoles de prêt/emprunt",
        "Module 3 : DEX et liquidity mining",
        "Module 4 : Yield farming avancé",
        "Module 5 : Gestion des risques",
        "Module 6 : Stratégies et optimisation"
      ]
    },
    {
      id: 3,
      title: "Formation NFT & Métaverse",
      instructor: "NFT Expert AyanBridge",
      rating: 4.7,
      reviews: 634,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center",
      duration: "6 semaines",
      modules: 5,
      videos: 28,
      level: "Débutant",
      certificate: true,
      description: "Découvrez l'univers des NFTs et du métaverse, créez et investissez intelligemment.",
      highlights: [
        "Création de NFT",
        "Marketplaces NFT",
        "Investissement NFT",
        "Gaming et métaverse",
        "Stratégies de collection",
        "Aspects légaux"
      ],
      curriculum: [
        "Module 1 : Comprendre les NFTs",
        "Module 2 : Création et mint",
        "Module 3 : Investissement et trading",
        "Module 4 : Gaming et métaverse",
        "Module 5 : Stratégies avancées"
      ]
    },
    {
      id: 4,
      title: "Formation Sécurité Blockchain",
      instructor: "Security Expert AyanBridge",
      rating: 4.9,
      reviews: 445,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&crop=center",
      duration: "4 semaines",
      modules: 4,
      videos: 22,
      level: "Tous niveaux",
      certificate: true,
      description: "Apprenez à protéger vos actifs crypto et maîtrisez les bonnes pratiques de sécurité blockchain.",
      highlights: [
        "Types de wallets et sécurité",
        "Protection contre les attaques",
        "Backup et récupération",
        "Authentification multi-facteurs",
        "Smart contracts audit",
        "Protocoles de sécurité"
      ],
      curriculum: [
        "Module 1 : Fondamentaux sécurité crypto",
        "Module 2 : Wallets et stockage sécurisé",
        "Module 3 : Protection contre les menaces",
        "Module 4 : Audit et bonnes pratiques"
      ]
    },
    {
      id: 5,
      title: "Formation Analyse Technique Avancée",
      instructor: "Technical Analyst AyanBridge",
      rating: 4.8,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
      duration: "10 semaines",
      modules: 7,
      videos: 38,
      level: "Intermédiaire à Avancé",
      certificate: true,
      description: "Maîtrisez l'analyse technique avec des méthodes professionnelles et des stratégies éprouvées.",
      highlights: [
        "Patterns avancés",
        "Indicateurs techniques",
        "Analyse multi-timeframes",
        "Psychologie des marchés",
        "Backtesting stratégies",
        "Risk management"
      ],
      curriculum: [
        "Module 1 : Patterns chartistes avancés",
        "Module 2 : Indicateurs et oscillateurs",
        "Module 3 : Analyse volumes et momentum",
        "Module 4 : Confluence et confirmations",
        "Module 5 : Timeframes et corrélations",
        "Module 6 : Backtesting et optimisation",
        "Module 7 : Psychologie et discipline"
      ]
    },
    {
      id: 6,
      title: "Formation Portfolio Management Crypto",
      instructor: "Investment Expert AyanBridge",
      rating: 4.7,
      reviews: 389,
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center",
      duration: "6 semaines",
      modules: 5,
      videos: 26,
      level: "Intermédiaire",
      certificate: true,
      description: "Construisez et gérez un portfolio crypto diversifié avec des stratégies d'allocation efficaces.",
      highlights: [
        "Théorie moderne du portfolio",
        "Diversification optimale",
        "Rebalancing stratégique",
        "Gestion des corrélations",
        "Allocation tactique",
        "Performance tracking"
      ],
      curriculum: [
        "Module 1 : Fondements du portfolio management",
        "Module 2 : Diversification et allocation",
        "Module 3 : Stratégies de rebalancing",
        "Module 4 : Gestion des risques",
        "Module 5 : Optimisation et performance"
      ]
    }
  ];

  // Auto-rotate formations every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFormationIndex((prev) => (prev + 1) % formations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [formations.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/95 to-primary/10">
      {/* Header */}
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <GraduationCap className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Formations Premium
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Découvrez nos programmes de formation structurés qui vous accompagnent dans votre parcours d'apprentissage. 
              Du débutant à l'expert, explorez les concepts clés à votre rythme avec notre approche pédagogique progressive.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="py-12 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Apprentissage</h3>
              <p className="text-white/70">Parcours structuré et progressif</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Communauté</h3>
              <p className="text-white/70">Échanges et partage d'expériences</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Flexibilité</h3>
              <p className="text-white/70">Apprenez à votre rythme</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Qualité</h3>
              <p className="text-white/70">Contenu expertisé et actualisé</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Rotating Formation Showcase */}
      <div className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Apprentissage Structuré
                  <span className="block text-primary mt-2">Progression Garantie</span>
                </h2>
                <p className="text-lg text-white/80 leading-relaxed">
                  Nos programmes de formation vous accompagnent dans une progression méthodique. 
                  De la théorie à la pratique, chaque module est conçu pour construire 
                  vos compétences de manière durable et efficace.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Progressif</h4>
                    <p className="text-white/60 text-sm">Étapes logiques</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Reconnu</h4>
                    <p className="text-white/60 text-sm">Certification officielle</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-3">Votre parcours d'apprentissage :</h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Modules progressifs adaptés à votre niveau
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Exercices pratiques et cas d'étude réels
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Suivi personnalisé et retours d'experts
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Certification reconnue en fin de parcours
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right: Rotating Formation Display */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFormationIndex}
                    initial={{ opacity: 0, y: 20, rotateY: -15 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    exit={{ opacity: 0, y: -20, rotateY: 15 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20">
                      <img
                        src={formations[currentFormationIndex].image}
                        alt={formations[currentFormationIndex].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="bg-primary/90 rounded-full p-4 hover:scale-110 transition-transform">
                          <GraduationCap className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {formations[currentFormationIndex].duration}
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-primary px-3 py-1 rounded-full text-white text-sm font-medium">
                          {formations[currentFormationIndex].level}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary font-medium">
                          {formations[currentFormationIndex].modules} modules
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white ml-1 text-sm">{formations[currentFormationIndex].rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {formations[currentFormationIndex].title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        par {formations[currentFormationIndex].instructor}
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {formations[currentFormationIndex].description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-white/60">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formations[currentFormationIndex].videos} vidéos
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {formations[currentFormationIndex].reviews} retours
                        </span>
                        <span className="flex items-center">
                          <Award className="h-3 w-3 mr-1" />
                          Certificat
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Formation Indicator Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {formations.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFormationIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentFormationIndex ? 'bg-primary w-8' : 'bg-white/30'
                      }`}
                      aria-label={`Voir la formation ${index + 1}`}
                      title={`Voir la formation ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Creative Collection Grid */}
      <div className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Aperçu de Nos Programmes
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Découvrez nos formations structurées pour développer vos compétences en crypto et trading
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {formations.map((formation, index) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                    <img
                      src={formation.image}
                      alt={formation.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="bg-primary/80 rounded-full p-3 group-hover:scale-110 transition-transform">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-lg text-white text-xs font-medium">
                        {formation.level}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {formation.duration}
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-white text-xs">{formation.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-primary text-xs font-medium">{formation.modules} modules</span>
                      <span className="text-white/50 text-xs">{formation.reviews} retours</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {formation.title}
                    </h3>
                    <p className="text-white/60 text-xs mb-3">{formation.instructor}</p>
                    
                    <div className="flex items-center justify-between text-xs text-white/50">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formation.videos} vidéos
                      </span>
                      <span className="flex items-center">
                        <Award className="h-3 w-3 mr-1" />
                        Certificat
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Text below gradient */}
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center space-x-2 text-white/40">
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
              <p className="text-white/50 text-sm">
                Et bien plus de programmes...
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Full-width bottom gradient overlay covering 70% of last row */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-secondary via-secondary/90 via-secondary/70 to-transparent pointer-events-none z-20"></div>
      </div>

      {/* Gradient Stats Section */}
      <div className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(66,153,225,0.1),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">6+</h3>
              <p className="text-white/70">Programmes Complets</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">50h+</h3>
              <p className="text-white/70">Heures de Formation</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">5K+</h3>
              <p className="text-white/70">Étudiants Formés</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">4.8</h3>
              <p className="text-white/70">Note Moyenne</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-t from-primary/10 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Découvrez Votre Potentiel
                <span className="block text-primary">d'Apprentissage</span>
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Explorez nos programmes structurés et trouvez celui qui correspond à vos objectifs d'apprentissage
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="bg-primary hover:bg-primary/90">
                Explorer Tous les Programmes
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Découvrir Notre Approche
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FormationPage;