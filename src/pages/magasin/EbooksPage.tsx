import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, FileText, BookOpen, Lightbulb, TrendingUp, Shield } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useState, useEffect } from 'react';

const EbooksPage = () => {
  const [currentEbookIndex, setCurrentEbookIndex] = useState(0);
  const ebooks = [
    {
      id: 1,
      title: "Guide Complet du Trading Crypto",
      author: "Expert AyanBridge",
      rating: 4.8,
      reviews: 142,
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=600&fit=crop&crop=center",
      description: "Un guide complet pour maîtriser le trading de cryptomonnaies, des bases aux stratégies avancées.",
      pages: 250,
      format: "PDF",
      category: "Trading",
      readTime: "6h"
    },
    {
      id: 2,
      title: "Investissement DeFi pour Débutants",
      author: "Équipe AyanBridge",
      rating: 4.6,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=600&fit=crop&crop=center",
      description: "Découvrez le monde de la finance décentralisée et apprenez à investir en toute sécurité.",
      pages: 180,
      format: "PDF + EPUB",
      category: "DeFi",
      readTime: "4h"
    },
    {
      id: 3,
      title: "Analyse Technique Avancée",
      author: "Pro Trader AyanBridge",
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=600&fit=crop&crop=center",
      description: "Maîtrisez l'analyse technique avec des stratégies professionnelles et des outils avancés.",
      pages: 320,
      format: "PDF",
      category: "Analyse",
      readTime: "8h"
    },
    {
      id: 4,
      title: "Stratégies de Portfolio Crypto",
      author: "Investment Expert AyanBridge",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop&crop=center",
      description: "Construisez et optimisez votre portfolio crypto avec des stratégies éprouvées.",
      pages: 220,
      format: "PDF",
      category: "Investissement",
      readTime: "5h"
    },
    {
      id: 5,
      title: "Psychologie du Trading",
      author: "Trading Coach AyanBridge",
      rating: 4.8,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center",
      description: "Maîtrisez vos émotions et développez une mentalité de trader gagnant.",
      pages: 190,
      format: "PDF + EPUB",
      category: "Psychologie",
      readTime: "4h"
    },
    {
      id: 6,
      title: "Smart Contracts et Blockchain",
      author: "Blockchain Expert AyanBridge",
      rating: 4.6,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=600&fit=crop&crop=center",
      description: "Comprendre et utiliser les smart contracts pour optimiser vos investissements.",
      pages: 280,
      format: "PDF",
      category: "Blockchain",
      readTime: "7h"
    },
    {
      id: 7,
      title: "NFT et Métaverse Investissement",
      author: "NFT Expert AyanBridge",
      rating: 4.5,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=600&fit=crop&crop=center",
      description: "Guide complet pour investir dans les NFT et l'économie du métaverse.",
      pages: 160,
      format: "PDF + EPUB",
      category: "NFT",
      readTime: "3h"
    },
    {
      id: 8,
      title: "Yield Farming Stratégies",
      author: "DeFi Specialist AyanBridge",
      rating: 4.7,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=600&fit=crop&crop=center",
      description: "Maximisez vos rendements avec des stratégies de yield farming optimisées.",
      pages: 200,
      format: "PDF",
      category: "DeFi",
      readTime: "5h"
    },
    {
      id: 9,
      title: "Sécurité Crypto et Wallets",
      author: "Security Expert AyanBridge",
      rating: 4.9,
      reviews: 223,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=600&fit=crop&crop=center",
      description: "Protégez vos actifs crypto avec les meilleures pratiques de sécurité.",
      pages: 150,
      format: "PDF + EPUB",
      category: "Sécurité",
      readTime: "3h"
    },
    {
      id: 10,
      title: "Fiscalité Crypto France",
      author: "Tax Expert AyanBridge",
      rating: 4.6,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=600&fit=crop&crop=center",
      description: "Guide complet de la fiscalité crypto en France pour optimiser vos déclarations.",
      pages: 180,
      format: "PDF",
      category: "Fiscalité",
      readTime: "4h"
    },
    {
      id: 11,
      title: "Altcoins Hidden Gems",
      author: "Research Team AyanBridge",
      rating: 4.8,
      reviews: 176,
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=600&fit=crop&crop=center",
      description: "Découvrez les altcoins prometteurs et les méthodes de recherche avancées.",
      pages: 240,
      format: "PDF",
      category: "Research",
      readTime: "6h"
    },
    {
      id: 12,
      title: "Trading Algorithmique Crypto",
      author: "Algo Trading Expert AyanBridge",
      rating: 4.7,
      reviews: 154,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=600&fit=crop&crop=center",
      description: "Automatisez votre trading avec des algorithmes et des bots performants.",
      pages: 300,
      format: "PDF + EPUB",
      category: "Algo Trading",
      readTime: "8h"
    }
  ];

  // Auto-rotate ebooks every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEbookIndex((prev) => (prev + 1) % ebooks.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ebooks.length]);

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
              <BookOpen className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Bibliothèque Ebooks
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Plongez dans notre univers de connaissances crypto et trading. 
              Une collection soigneusement élaborée pour élever votre expertise financière.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Rotating Ebook Showcase */}
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
                  Votre Voyage Vers l'Excellence
                  <span className="block text-primary mt-2">Commence Ici</span>
                </h2>
                <p className="text-lg text-white/80 leading-relaxed">
                  Chaque ebook de notre collection est une porte vers une nouvelle dimension 
                  de compréhension. Des stratégies de trading aux innovations DeFi, 
                  de la psychologie des marchés à la sécurité blockchain.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Innovation</h4>
                    <p className="text-white/60 text-sm">Contenu avant-gardiste</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Performance</h4>
                    <p className="text-white/60 text-sm">Stratégies éprouvées</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-3">Ce que vous découvrirez :</h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Techniques de trading professionnelles
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Analyse des marchés crypto en profondeur
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Stratégies d'investissement avancées
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Sécurité et gestion des risques
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right: Rotating Ebook Display */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentEbookIndex}
                    initial={{ opacity: 0, y: 20, rotateY: -15 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    exit={{ opacity: 0, y: -20, rotateY: 15 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl"
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6 overflow-hidden relative">
                      <img
                        src={ebooks[currentEbookIndex].image}
                        alt={ebooks[currentEbookIndex].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="bg-primary px-3 py-1 rounded-full text-white text-sm font-medium">
                          {ebooks[currentEbookIndex].category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {ebooks[currentEbookIndex].title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        par {ebooks[currentEbookIndex].author}
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {ebooks[currentEbookIndex].description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center space-x-4 text-xs text-white/60">
                          <span className="flex items-center">
                            <FileText className="h-3 w-3 mr-1" />
                            {ebooks[currentEbookIndex].pages}p
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {ebooks[currentEbookIndex].readTime}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white ml-1 text-sm">{ebooks[currentEbookIndex].rating}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Ebook Indicator Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {ebooks.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentEbookIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentEbookIndex ? 'bg-primary w-8' : 'bg-white/30'
                      }`}
                      aria-label={`Voir l'ebook ${index + 1}`}
                      title={`Voir l'ebook ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Creative Collection Grid */}
      <div className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
              Découvrez quelques-uns de nos ebooks soigneusement organisés par thématique
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative">
            {ebooks.map((ebook, index) => (
              <motion.div
                key={ebook.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                    <img
                      src={ebook.image}
                      alt={ebook.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-lg text-white text-xs font-medium">
                        {ebook.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-white text-xs">{ebook.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {ebook.title}
                    </h3>
                    <p className="text-white/60 text-xs mb-3">{ebook.author}</p>
                    
                    <div className="flex items-center justify-between text-xs text-white/50">
                      <span className="flex items-center">
                        <FileText className="h-3 w-3 mr-1" />
                        {ebook.pages}p
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {ebook.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Gradient overlay specifically on last row of ebooks */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-secondary via-secondary/80 to-transparent pointer-events-none z-30"></div>
          </div>
          
          {/* Text below grid */}
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
                Et bien plus encore...
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Full-width bottom gradient overlay for entire section */}
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-secondary via-secondary/80 via-secondary/50 to-transparent pointer-events-none z-20"></div>
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
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">12+</h3>
              <p className="text-white/70">Ebooks Premium</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">8</h3>
              <p className="text-white/70">Catégories</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">2500+</h3>
              <p className="text-white/70">Pages de Contenu</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
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
                Prêt à Transformer Votre
                <span className="block text-primary">Vision du Trading ?</span>
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Rejoignez des milliers de traders qui ont déjà élevé leur niveau grâce à notre contenu exclusif
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="bg-primary hover:bg-primary/90">
                Découvrir Tous les Ebooks
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Parler à un Expert
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EbooksPage;