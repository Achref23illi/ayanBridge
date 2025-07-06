import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  GraduationCap, 
  Video, 
  Trophy, 
  Users, 
  Calendar,
  Play,
  Award,
  Target,
  Zap,
  ChevronRight,
  Clock,
  Star,
  TrendingUp
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import VideoModal from '../components/ui/VideoModal';
import BridgeInfoModal from '../components/ui/BridgeInfoModal';

const LearnHubPage = () => {
  const navigate = useNavigate();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeBridgeModal, setActiveBridgeModal] = useState<'school' | 'academy' | 'live' | null>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Button handlers
  const handleDiscoverHub = () => {
    // Scroll to features section
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchDemo = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const handleExploreSchool = () => {
    setActiveBridgeModal('school');
  };

  const handleDiscoverAcademy = () => {
    setActiveBridgeModal('academy');
  };

  const handleJoinLive = () => {
    setActiveBridgeModal('live');
  };

  const handleCloseBridgeModal = () => {
    setActiveBridgeModal(null);
  };

  const handleNavigateFromModal = (path: string) => {
    navigate(path);
  };

  const handleStartNow = () => {
    navigate('/signup');
  };

  const handlePlanDemo = () => {
    setIsVideoModalOpen(true);
  };

  return (
    <div className="w-full bg-secondary text-white">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="w-full min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <GraduationCap className="w-5 h-5 text-primary mr-2" />
            <span className="text-primary font-medium">Ayan Learn Hub</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Votre écosystème
            <span className="text-primary"> d'apprentissage</span>
            <br />
            personnalisé
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Découvrez une plateforme révolutionnaire qui combine éducation traditionnelle, 
            formation professionnelle et sessions live interactives pour transformer votre parcours d'apprentissage.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4" onClick={handleDiscoverHub}>
              Découvrir le Hub
            </Button>
            <Button size="lg" variant="ghost" className="border-white/20 text-white hover:bg-white/10 px-8 py-4" onClick={handleWatchDemo}>
              Voir la démo
            </Button>
          </motion.div>
        </div>
        
        {/* Floating Icons */}
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10 text-primary/30"
        >
          <BookOpen className="w-8 h-8" />
        </motion.div>
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-10 text-green-400/30"
        >
          <Trophy className="w-6 h-6" />
        </motion.div>
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute top-1/3 right-20 text-purple-400/30"
        >
          <Video className="w-7 h-7" />
        </motion.div>
      </motion.section>

      {/* Features Overview */}
      <section id="features-section" className="w-full py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Trois univers, une seule plateforme
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Chaque section est conçue pour répondre à vos besoins spécifiques d'apprentissage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bridge School */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-3xl p-8 h-full hover:border-blue-500/40 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400">Bridge School</h3>
                    <p className="text-white/60">École virtuelle</p>
                  </div>
                </div>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  Un environnement scolaire complet avec des cours structurés par niveau et matière, 
                  des exercices auto-corrigés et des certifications officielles.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-white/70">
                    <ChevronRight className="w-4 h-4 text-blue-400 mr-2" />
                    <span>Cours par niveau et matière</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <ChevronRight className="w-4 h-4 text-blue-400 mr-2" />
                    <span>Exercices auto-corrigés</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <ChevronRight className="w-4 h-4 text-blue-400 mr-2" />
                    <span>Tests et certificats</span>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full border-blue-500/20 text-blue-400 hover:bg-blue-500/10" onClick={handleExploreSchool}>
                  Explorer l'école
                </Button>
              </div>
            </motion.div>

            {/* Bridge Academy */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-3xl p-8 h-full hover:border-green-500/40 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-400">Bridge Academy</h3>
                    <p className="text-white/60">Formation professionnelle</p>
                  </div>
                </div>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  Des formations thématiques spécialisées pour développer vos compétences professionnelles 
                  avec des modules interactifs et des sessions pratiques.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-white/70">
                    <ChevronRight className="w-4 h-4 text-green-400 mr-2" />
                    <span>Formations business et dev perso</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <ChevronRight className="w-4 h-4 text-green-400 mr-2" />
                    <span>Modules avec leçons et quiz</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <ChevronRight className="w-4 h-4 text-green-400 mr-2" />
                    <span>Sessions interactives live</span>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full border-green-500/20 text-green-400 hover:bg-green-500/10" onClick={handleDiscoverAcademy}>
                  Découvrir l'académie
                </Button>
              </div>
            </motion.div>

            {/* Bridge Live */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-3xl p-8 h-full hover:border-purple-500/40 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Video className="w-8 h-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-purple-400">Bridge Live</h3>
                    <p className="text-white/60">Sessions en direct</p>
                  </div>
                </div>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  Participez à des sessions live interactives, accédez aux replays et profitez 
                  d'une chaîne continue de diffusion éducative.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-white/70">
                    <ChevronRight className="w-4 h-4 text-purple-400 mr-2" />
                    <span>Calendrier d'événements</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <ChevronRight className="w-4 h-4 text-purple-400 mr-2" />
                    <span>Replays classés par thème</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <ChevronRight className="w-4 h-4 text-purple-400 mr-2" />
                    <span>Chaîne continue TV éducative</span>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full border-purple-500/20 text-purple-400 hover:bg-purple-500/10" onClick={handleJoinLive}>
                  Rejoindre les lives
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Votre tableau de bord
                <span className="text-primary"> personnalisé</span>
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Suivez votre progression, découvrez des recommandations personnalisées 
                et ne manquez jamais une session importante.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Progression en temps réel</h3>
                    <p className="text-white/60">Visualisez vos progrès avec des barres animées et des badges de réussite</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Recommandations IA</h3>
                    <p className="text-white/60">Des suggestions personnalisées basées sur vos intérêts et performances</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Sessions programmées</h3>
                    <p className="text-white/60">Ne manquez jamais un cours avec des rappels automatiques</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Dashboard Mockup */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Mon Tableau de Bord</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Progression globale</span>
                    <span className="text-sm text-primary">75%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '75%' }}
                      transition={{ duration: 2, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-primary rounded-full h-2"
                    ></motion.div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-500/10 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-400">12</div>
                      <div className="text-xs text-white/60">Cours terminés</div>
                    </div>
                    <div className="bg-green-500/10 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-400">5</div>
                      <div className="text-xs text-white/60">Certificats</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-purple-500/20 rounded-full blur-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Pourquoi choisir
              <span className="text-primary"> Ayan Learn Hub</span> ?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Une expérience d'apprentissage révolutionnaire adaptée à vos besoins
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Communauté active",
                description: "Rejoignez une communauté d'apprenants passionnés"
              },
              {
                icon: Award,
                title: "Certifications",
                description: "Obtenez des certificats reconnus dans votre domaine"
              },
              {
                icon: Clock,
                title: "Apprentissage flexible",
                description: "Apprenez à votre rythme, où que vous soyez"
              },
              {
                icon: Star,
                title: "Contenu premium",
                description: "Accédez à des formations de qualité supérieure"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-white/60">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Prêt à transformer
              <span className="text-primary"> votre apprentissage</span> ?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Rejoignez dès maintenant la révolution éducative et commencez votre parcours personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4" onClick={handleStartNow}>
                Commencer maintenant
              </Button>
              <Button size="lg" variant="ghost" className="border-white/20 text-white hover:bg-white/10 px-8 py-4" onClick={handlePlanDemo}>
                Planifier une démo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideoModal}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Découvrez AyanBridge Learn Hub"
        description="Plongez dans l'écosystème d'apprentissage le plus avancé au monde"
      />

      {/* Bridge Info Modal */}
      <BridgeInfoModal
        isOpen={activeBridgeModal !== null}
        onClose={handleCloseBridgeModal}
        section={activeBridgeModal}
        onNavigate={handleNavigateFromModal}
      />
    </div>
  );
};

export default LearnHubPage; 