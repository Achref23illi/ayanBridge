import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, Users, Star, BookOpen, TrendingUp, Award, Monitor, Zap, Eye } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useState, useEffect } from 'react';

const VideosPage = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  const videos = [
    {
      id: 1,
      title: "Masterclass Trading Crypto Avancé",
      instructor: "Expert AyanBridge",
      rating: 4.9,
      reviews: 256,
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop&crop=center",
      duration: "3h 45min",
      lessons: 12,
      level: "Intermédiaire",
      category: "Trading",
      description: "Une masterclass complète sur le trading de cryptomonnaies avec des stratégies avancées et des cas pratiques réels.",
      highlights: ["Analyse technique avancée", "Gestion des risques", "Psychologie du trading", "Stratégies DeFi"],
      viewCount: "12.5K",
      completed: "89%"
    },
    {
      id: 2,
      title: "Formation NFT et Métaverse",
      instructor: "Équipe AyanBridge",
      rating: 4.7,
      reviews: 189,
      thumbnail: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=225&fit=crop&crop=center",
      duration: "2h 30min",
      lessons: 8,
      level: "Débutant",
      category: "NFT",
      description: "Découvrez l'univers des NFTs et du métaverse, apprenez les concepts fondamentaux et les opportunités.",
      highlights: ["Création de NFT", "Marketplaces", "Investissement NFT", "Métaverse gaming"],
      viewCount: "8.2K",
      completed: "92%"
    },
    {
      id: 3,
      title: "Analyse Fondamentale Crypto",
      instructor: "Pro Analyst AyanBridge",
      rating: 4.8,
      reviews: 167,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop&crop=center",
      duration: "4h 20min",
      lessons: 15,
      level: "Avancé",
      category: "Analyse",
      description: "Maîtrisez l'analyse fondamentale des projets crypto pour prendre des décisions d'investissement éclairées.",
      highlights: ["Évaluation de projets", "Tokenomics", "Roadmap analysis", "Due diligence"],
      viewCount: "15.7K",
      completed: "76%"
    },
    {
      id: 4,
      title: "DeFi Yield Farming Masterclass",
      instructor: "DeFi Expert AyanBridge",
      rating: 4.6,
      reviews: 134,
      thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=225&fit=crop&crop=center",
      duration: "2h 15min",
      lessons: 9,
      level: "Intermédiaire",
      category: "DeFi",
      description: "Apprenez les techniques de yield farming et de liquidity mining pour comprendre l'écosystème DeFi.",
      highlights: ["Pools de liquidité", "Yield farming", "Staking", "Gestion des risques"],
      viewCount: "9.8K",
      completed: "85%"
    },
    {
      id: 5,
      title: "Sécurité Blockchain et Wallets",
      instructor: "Security Expert AyanBridge",
      rating: 4.9,
      reviews: 298,
      thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=225&fit=crop&crop=center",
      duration: "3h 10min",
      lessons: 11,
      level: "Tous niveaux",
      category: "Sécurité",
      description: "Formation essentielle sur la sécurité des actifs crypto et les meilleures pratiques de protection.",
      highlights: ["Types de wallets", "Sécurité avancée", "Récupération de fonds", "Authentification 2FA"],
      viewCount: "18.3K",
      completed: "94%"
    },
    {
      id: 6,
      title: "Smart Contracts et Web3",
      instructor: "Blockchain Dev AyanBridge",
      rating: 4.5,
      reviews: 156,
      thumbnail: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=225&fit=crop&crop=center",
      duration: "5h 30min",
      lessons: 18,
      level: "Avancé",
      category: "Blockchain",
      description: "Comprenez le fonctionnement des smart contracts et leur impact sur l'écosystème Web3.",
      highlights: ["Solidity basics", "Smart contracts", "dApps", "Web3 integration"],
      viewCount: "7.4K",
      completed: "68%"
    },
    {
      id: 7,
      title: "Psychologie du Trading",
      instructor: "Trading Coach AyanBridge",
      rating: 4.8,
      reviews: 221,
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop&crop=center",
      duration: "2h 45min",
      lessons: 10,
      level: "Tous niveaux",
      category: "Psychologie",
      description: "Développez un mindset de trader professionnel et maîtrisez vos émotions sur les marchés.",
      highlights: ["Contrôle émotionnel", "Discipline", "Gestion du stress", "Mindset gagnant"],
      viewCount: "13.6K",
      completed: "91%"
    },
    {
      id: 8,
      title: "Portfolio Management Crypto",
      instructor: "Investment Expert AyanBridge",
      rating: 4.7,
      reviews: 187,
      thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=225&fit=crop&crop=center",
      duration: "3h 20min",
      lessons: 13,
      level: "Intermédiaire",
      category: "Investissement",
      description: "Construisez et gérez un portfolio crypto diversifié avec des stratégies d'allocation efficaces.",
      highlights: ["Diversification", "Allocation d'actifs", "Rebalancing", "Risk management"],
      viewCount: "11.2K",
      completed: "87%"
    },
    {
      id: 9,
      title: "Altcoins Research et Analysis",
      instructor: "Research Team AyanBridge",
      rating: 4.6,
      reviews: 143,
      thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop&crop=center",
      duration: "4h 15min",
      lessons: 16,
      level: "Intermédiaire",
      category: "Research",
      description: "Méthodologie complète pour rechercher et analyser les altcoins prometteurs du marché.",
      highlights: ["Due diligence", "Market cap analysis", "Tech fundamentals", "Community assessment"],
      viewCount: "6.9K",
      completed: "73%"
    },
    {
      id: 10,
      title: "Trading Algorithmique Introduction",
      instructor: "Algo Expert AyanBridge",
      rating: 4.4,
      reviews: 98,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop&crop=center",
      duration: "6h 00min",
      lessons: 20,
      level: "Avancé",
      category: "Algo Trading",
      description: "Introduction au trading algorithmique et à l'automatisation des stratégies de trading.",
      highlights: ["Algorithmes de base", "Backtesting", "API trading", "Risk management automatisé"],
      viewCount: "4.1K",
      completed: "58%"
    },
    {
      id: 11,
      title: "Fiscalité Crypto France 2024",
      instructor: "Tax Expert AyanBridge",
      rating: 4.8,
      reviews: 312,
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop&crop=center",
      duration: "2h 50min",
      lessons: 14,
      level: "Tous niveaux",
      category: "Fiscalité",
      description: "Guide complet de la fiscalité crypto en France avec les dernières réglementations 2024.",
      highlights: ["Déclarations fiscales", "Plus-values crypto", "Optimisation légale", "Régimes spéciaux"],
      viewCount: "22.1K",
      completed: "96%"
    },
    {
      id: 12,
      title: "Métaverse et Gaming Crypto",
      instructor: "Gaming Expert AyanBridge",
      rating: 4.5,
      reviews: 176,
      thumbnail: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=225&fit=crop&crop=center",
      duration: "3h 35min",
      lessons: 12,
      level: "Débutant",
      category: "Gaming",
      description: "Explorez l'économie du gaming crypto et les opportunités du métaverse gaming.",
      highlights: ["Play-to-earn", "NFT gaming", "Métaverse économie", "Gaming guilds"],
      viewCount: "9.7K",
      completed: "83%"
    }
  ];

  // Auto-rotate videos every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [videos.length]);

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
              <Monitor className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Médiathèque Vidéos
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Immergez-vous dans notre collection de formations vidéo premium. 
              Des masterclasses structurées et du contenu éducatif de qualité pour enrichir vos connaissances.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Rotating Video Showcase */}
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
                  Apprentissage Visuel
                  <span className="block text-primary mt-2">Nouvelle Génération</span>
                </h2>
                <p className="text-lg text-white/80 leading-relaxed">
                  Chaque vidéo de notre collection est conçue pour maximiser votre compréhension. 
                  Des concepts complexes expliqués simplement, des démonstrations pratiques 
                  et des insights d'experts du domaine.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Qualité HD</h4>
                    <p className="text-white/60 text-sm">Contenu haute définition</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Expertise</h4>
                    <p className="text-white/60 text-sm">Formateurs reconnus</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-3">Ce que vous apprendrez :</h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Stratégies de trading avancées en vidéo
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Analyses de marché en temps réel
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Démonstrations pratiques et cas d'usage
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Masterclasses avec les meilleurs experts
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right: Rotating Video Display */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentVideoIndex}
                    initial={{ opacity: 0, y: 20, rotateY: -15 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    exit={{ opacity: 0, y: -20, rotateY: 15 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20">
                      <img
                        src={videos[currentVideoIndex].thumbnail}
                        alt={videos[currentVideoIndex].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="bg-primary/90 rounded-full p-4 hover:scale-110 transition-transform">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {videos[currentVideoIndex].duration}
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-primary px-3 py-1 rounded-full text-white text-sm font-medium">
                          {videos[currentVideoIndex].category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary font-medium">
                          {videos[currentVideoIndex].level}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white ml-1 text-sm">{videos[currentVideoIndex].rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {videos[currentVideoIndex].title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        par {videos[currentVideoIndex].instructor}
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {videos[currentVideoIndex].description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-white/60">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {videos[currentVideoIndex].lessons} leçons
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {videos[currentVideoIndex].viewCount} vues
                        </span>
                        <span className="flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {videos[currentVideoIndex].completed} terminé
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Video Indicator Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentVideoIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentVideoIndex ? 'bg-primary w-8' : 'bg-white/30'
                      }`}
                      aria-label={`Voir la vidéo ${index + 1}`}
                      title={`Voir la vidéo ${index + 1}`}
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
              Découvrez quelques-unes de nos formations vidéo soigneusement organisées par expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="bg-primary/80 rounded-full p-3 group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-lg text-white text-xs font-medium">
                        {video.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-white text-xs">{video.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-primary text-xs font-medium">{video.level}</span>
                      <span className="text-white/50 text-xs">{video.viewCount} vues</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-white/60 text-xs mb-3">{video.instructor}</p>
                    
                    <div className="flex items-center justify-between text-xs text-white/50">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {video.lessons} leçons
                      </span>
                      <span className="flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {video.completed}
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
                Et bien plus de formations...
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
                <Monitor className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">12+</h3>
              <p className="text-white/70">Formations Vidéo</p>
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
              <h3 className="text-3xl font-bold text-white mb-2">41h+</h3>
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
              <h3 className="text-3xl font-bold text-white mb-2">50K+</h3>
              <p className="text-white/70">Apprenants</p>
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
              <h3 className="text-3xl font-bold text-white mb-2">4.7</h3>
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
                Explorez Notre Univers
                <span className="block text-primary">Éducatif Complet</span>
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Rejoignez une communauté de passionnés qui transforment leurs connaissances en expertise pratique
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="bg-primary hover:bg-primary/90">
                Explorer Toutes les Vidéos
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Découvrir le Programme
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;