import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Calendar, Clock, Users, Star, Ticket, Video, Eye, TrendingUp, Award, Zap, Globe } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useState, useEffect } from 'react';

const LivesPage = () => {
  const [currentLiveIndex, setCurrentLiveIndex] = useState(0);

  const allLives = [
    {
      id: 1,
      title: "Analyse de Marché Crypto en Direct",
      presenter: "Expert AyanBridge",
      date: "2024-11-25",
      time: "20:00",
      duration: "1h 30min",
      type: "upcoming",
      maxParticipants: 100,
      registered: 78,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop&crop=center",
      description: "Analyse complète des tendances du marché crypto avec insights en temps réel.",
      topics: ["Bitcoin & Ethereum", "Altcoins prometteurs", "Analyse technique", "Q&A en direct"],
      category: "Analyse",
      rating: 4.8,
      viewers: "2.1K",
      level: "Intermédiaire"
    },
    {
      id: 2,
      title: "Session Trading DeFi Pratique",
      presenter: "DeFi Expert AyanBridge",
      date: "2024-11-28",
      time: "19:00",
      duration: "2h 00min",
      type: "upcoming",
      maxParticipants: 50,
      registered: 42,
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=225&fit=crop&crop=center",
      description: "Session pratique de trading DeFi avec démonstrations en direct.",
      topics: ["Yield farming", "Liquidity mining", "Stratégies avancées", "Gestion des risques"],
      category: "DeFi",
      rating: 4.7,
      viewers: "1.8K",
      level: "Avancé"
    },
    {
      id: 3,
      title: "Masterclass NFT & Métaverse",
      presenter: "NFT Expert AyanBridge",
      date: "2024-11-15",
      duration: "1h 45min",
      type: "replay",
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=225&fit=crop&crop=center",
      description: "Découverte complète de l'écosystème NFT et métaverse.",
      topics: ["Création NFT", "Marketplaces", "Gaming", "Opportunités"],
      category: "NFT",
      viewers: "3.2K",
      level: "Débutant"
    },
    {
      id: 4,
      title: "Analyse Fondamentale Crypto",
      presenter: "Analyst AyanBridge",
      date: "2024-11-10",
      duration: "2h 15min",
      type: "replay",
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop&crop=center",
      description: "Méthodologie complète d'analyse fondamentale des projets crypto.",
      topics: ["Due diligence", "Tokenomics", "Équipe", "Roadmap"],
      category: "Analyse",
      viewers: "2.7K",
      level: "Intermédiaire"
    },
    {
      id: 5,
      title: "Sécurité Crypto et Wallets",
      presenter: "Security Expert AyanBridge",
      date: "2024-11-05",
      duration: "1h 20min",
      type: "replay",
      rating: 4.9,
      reviews: 287,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=225&fit=crop&crop=center",
      description: "Session essentielle sur la sécurité des actifs crypto.",
      topics: ["Cold wallets", "Seed phrases", "Phishing", "Best practices"],
      category: "Sécurité",
      viewers: "4.1K",
      level: "Tous niveaux"
    },
    {
      id: 6,
      title: "Trading Psychologie et Mindset",
      presenter: "Trading Coach AyanBridge",
      date: "2024-12-02",
      time: "18:30",
      duration: "1h 45min",
      type: "upcoming",
      maxParticipants: 75,
      registered: 23,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop&crop=center",
      description: "Développez le mindset gagnant des traders professionnels.",
      topics: ["Contrôle émotionnel", "Discipline", "Plan de trading", "Gestion stress"],
      category: "Psychologie",
      rating: 4.8,
      viewers: "1.9K",
      level: "Tous niveaux"
    },
    {
      id: 7,
      title: "Altcoins Hidden Gems 2024",
      presenter: "Research Team AyanBridge",
      date: "2024-12-05",
      time: "20:30",
      duration: "2h 30min",
      type: "upcoming",
      maxParticipants: 60,
      registered: 45,
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop&crop=center",
      description: "Découverte des altcoins prometteurs pour 2024-2025.",
      topics: ["Research méthodologie", "Hidden gems", "Low cap analysis", "Timing"],
      category: "Research",
      rating: 4.6,
      viewers: "2.3K",
      level: "Avancé"
    },
    {
      id: 8,
      title: "Portfolio Crypto Diversification",
      presenter: "Investment Expert AyanBridge",
      date: "2024-10-28",
      duration: "1h 55min",
      type: "replay",
      rating: 4.7,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=225&fit=crop&crop=center",
      description: "Stratégies de diversification pour un portfolio crypto optimal.",
      topics: ["Allocation d'actifs", "Rebalancing", "Risk management", "DCA strategies"],
      category: "Investissement",
      viewers: "2.8K",
      level: "Intermédiaire"
    },
    {
      id: 9,
      title: "Smart Contracts et Web3",
      presenter: "Blockchain Dev AyanBridge",
      date: "2024-10-20",
      duration: "2h 40min",
      type: "replay",
      rating: 4.5,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=225&fit=crop&crop=center",
      description: "Compréhension technique des smart contracts et Web3.",
      topics: ["Solidity basics", "dApps", "Web3 integration", "Security"],
      category: "Blockchain",
      viewers: "1.6K",
      level: "Avancé"
    },
    {
      id: 10,
      title: "Fiscalité Crypto France 2024",
      presenter: "Tax Expert AyanBridge",
      date: "2024-12-10",
      time: "19:30",
      duration: "2h 00min",
      type: "upcoming",
      maxParticipants: 120,
      registered: 89,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop&crop=center",
      description: "Guide complet de la fiscalité crypto française mise à jour 2024.",
      topics: ["Déclarations", "Plus-values", "Optimisation", "Nouveautés 2024"],
      category: "Fiscalité",
      rating: 4.9,
      viewers: "3.8K",
      level: "Tous niveaux"
    }
  ];

  // Auto-rotate lives every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLiveIndex((prev) => (prev + 1) % allLives.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [allLives.length]);

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
              <Video className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Studio Live & Replays
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Rejoignez nos sessions interactives en direct pour apprendre avec nos experts. Participez aux discussions, 
              posez vos questions en temps réel et accédez aux replays pour réviser quand vous le souhaitez. 
              Une expérience d'apprentissage communautaire unique.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Rotating Live Showcase */}
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
                  Expérience Live
                  <span className="block text-primary mt-2">Immersive et Interactive</span>
                </h2>
                <p className="text-lg text-white/80 leading-relaxed">
                  Chaque session live est une opportunité unique d'apprendre directement de nos experts. 
                  Interactions en temps réel, analyses de marché instantanées et communauté engagée 
                  pour maximiser votre apprentissage.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Radio className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Live Interactif</h4>
                    <p className="text-white/60 text-sm">Q&A en temps réel</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Communauté</h4>
                    <p className="text-white/60 text-sm">Échanges enrichissants</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-3">Votre expérience d'apprentissage :</h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Participez en direct : posez vos questions aux experts
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Échangez avec la communauté en temps réel
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Revisionnez avec les replays haute qualité
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Approfondissez avec les ressources complémentaires
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right: Rotating Live Display */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentLiveIndex}
                    initial={{ opacity: 0, y: 20, rotateY: -15 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    exit={{ opacity: 0, y: -20, rotateY: 15 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20">
                      <img
                        src={allLives[currentLiveIndex].image}
                        alt={allLives[currentLiveIndex].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="bg-primary/90 rounded-full p-4 hover:scale-110 transition-transform">
                          <Radio className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {allLives[currentLiveIndex].duration}
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                          allLives[currentLiveIndex].type === 'upcoming' ? 'bg-red-500' : 'bg-blue-500'
                        }`}>
                          {allLives[currentLiveIndex].type === 'upcoming' ? 'LIVE' : 'REPLAY'}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-primary px-3 py-1 rounded-full text-white text-sm font-medium">
                          {allLives[currentLiveIndex].category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary font-medium">
                          {allLives[currentLiveIndex].level}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white ml-1 text-sm">{allLives[currentLiveIndex].rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {allLives[currentLiveIndex].title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        par {allLives[currentLiveIndex].presenter}
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {allLives[currentLiveIndex].description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-white/60">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {allLives[currentLiveIndex].date}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {allLives[currentLiveIndex].viewers} vues
                        </span>
                        {allLives[currentLiveIndex].type === 'upcoming' && (
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {allLives[currentLiveIndex].registered} inscrits
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Live Indicator Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {allLives.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentLiveIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentLiveIndex ? 'bg-primary w-8' : 'bg-white/30'
                      }`}
                      aria-label={`Voir la session ${index + 1}`}
                      title={`Voir la session ${index + 1}`}
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
              Aperçu de Notre Collection
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Découvrez quelques-unes de nos sessions live et replays organisés par spécialité
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {allLives.map((live, index) => (
              <motion.div
                key={live.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                    <img
                      src={live.image}
                      alt={live.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="bg-primary/80 rounded-full p-3 group-hover:scale-110 transition-transform">
                        <Radio className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-lg text-white text-xs font-medium">
                        {live.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {live.duration}
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className={`px-2 py-1 rounded-lg text-white text-xs font-medium ${
                        live.type === 'upcoming' ? 'bg-red-500/90' : 'bg-blue-500/90'
                      }`}>
                        {live.type === 'upcoming' ? 'LIVE' : 'REPLAY'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-white text-xs">{live.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-primary text-xs font-medium">{live.level}</span>
                      <span className="text-white/50 text-xs">{live.viewers} vues</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {live.title}
                    </h3>
                    <p className="text-white/60 text-xs mb-3">{live.presenter}</p>
                    
                    <div className="flex items-center justify-between text-xs text-white/50">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {live.date}
                      </span>
                      {live.type === 'upcoming' ? (
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {live.registered} inscrits
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {live.reviews} avis
                        </span>
                      )}
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
                Et bien plus de sessions...
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
                <Video className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">10+</h3>
              <p className="text-white/70">Sessions Live & Replays</p>
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
              <h3 className="text-3xl font-bold text-white mb-2">18h+</h3>
              <p className="text-white/70">Heures de Contenu</p>
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
              <h3 className="text-3xl font-bold text-white mb-2">25K+</h3>
              <p className="text-white/70">Participants</p>
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
                Rejoignez Notre Communauté
                <span className="block text-primary">d'Apprentissage Live</span>
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Participez à l'expérience d'apprentissage la plus interactive du monde crypto
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="bg-primary hover:bg-primary/90">
                Découvrir Toutes les Sessions
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Explorer le Programme
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LivesPage;