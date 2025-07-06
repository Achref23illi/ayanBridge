import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Layout, 
  Type, 
  Image, 
  Video, 
  HelpCircle, 
  MousePointer, 
  FileText,
  BookOpen,
  PlayCircle,
  Users,
  Grid,
  Lightbulb,
  Zap,
  Eye,
  Send,
  Save,
  Clock,
  Target,
  TrendingUp,
  Star,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Monitor,
  Tablet,
  Upload,
  Download,
  Settings,
  Palette,
  Layers,
  Move,
  RotateCcw,
  Share2,
  Award,
  Workflow,
  PenTool,
  Cpu,
  Wand2
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import VideoModal from '../components/ui/VideoModal';

const StudioPage = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState('ai-assistant');
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Button handlers
  const handleStartCreating = () => {
    navigate('/signup');
  };

  const handleWatchDemo = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const handleStartFree = () => {
    navigate('/signup');
  };

  const handleProductTypeClick = (typeId: string) => {
    // Navigate to signup with the selected content type
    navigate(`/signup?contentType=${typeId}`);
  };

  const features = [
    {
      id: 'ai-assistant',
      title: 'Assistant IA Intelligent',
      description: 'Créez du contenu en quelques clics avec notre IA avancée',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      details: [
        'Génération automatique de structures',
        'Suggestions de contenu contextuelles',
        'Optimisation SEO intelligente',
        'Correction grammaticale avancée'
      ]
    },
    {
      id: 'drag-drop',
      title: 'Éditeur Visuel',
      description: 'Interface intuitive avec glisser-déposer fluide',
      icon: Move,
      color: 'from-blue-500 to-cyan-500',
      details: [
        'Glisser-déposer sans effort',
        'Alignement automatique',
        'Redimensionnement intelligent',
        'Aperçu temps réel'
      ]
    },
    {
      id: 'widgets',
      title: 'Widgets Polyvalents',
      description: 'Tous les éléments dont vous avez besoin',
      icon: Grid,
      color: 'from-green-500 to-emerald-500',
      details: [
        'Texte enrichi et formatage',
        'Images et médias',
        'Vidéos interactives',
        'Quiz et sondages'
      ]
    },
    {
      id: 'templates',
      title: 'Modèles Professionnels',
      description: 'Démarrez rapidement avec nos templates',
      icon: Layout,
      color: 'from-orange-500 to-red-500',
      details: [
        'Templates prêts à l\'emploi',
        'Designs modernes',
        'Personnalisation complète',
        'Responsive automatique'
      ]
    }
  ];

  const productTypes = [
    {
      id: 'ebook',
      name: 'eBook Interactif',
      icon: BookOpen,
      description: 'Créez des livres numériques captivants avec médias intégrés',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Chapitres interactifs', 'Médias intégrés', 'Navigation fluide', 'Export PDF/EPUB']
    },
    {
      id: 'mini-course',
      name: 'Mini-Formation',
      icon: PlayCircle,
      description: 'Formations courtes et engageantes avec vidéos et quiz',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Vidéos HD', 'Quiz interactifs', 'Certificats', 'Suivi progression']
    },
    {
      id: 'live-session',
      name: 'Session Live',
      icon: Users,
      description: 'Webinaires et sessions en direct avec interaction',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Streaming HD', 'Chat en direct', 'Sondages live', 'Enregistrement']
    },
    {
      id: 'worksheet',
      name: 'Fiche Pratique',
      icon: FileText,
      description: 'Guides et worksheets téléchargeables',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Design professionnel', 'Champs interactifs', 'Impression optimisée', 'Multi-formats']
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Choisissez votre format',
      description: 'Sélectionnez le type de contenu que vous souhaitez créer',
      icon: Target,
      color: 'text-blue-500'
    },
    {
      number: '02',
      title: 'Décrivez votre idée',
      description: 'Expliquez votre concept et laissez l\'IA faire le reste',
      icon: Lightbulb,
      color: 'text-purple-500'
    },
    {
      number: '03',
      title: 'Personnalisez avec l\'IA',
      description: 'Modifiez et ajustez grâce aux suggestions intelligentes',
      icon: Wand2,
      color: 'text-green-500'
    },
    {
      number: '04',
      title: 'Publiez et partagez',
      description: 'Diffusez votre contenu sur toutes les plateformes',
      icon: Send,
      color: 'text-orange-500'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Contenus créés' },
    { value: '95%', label: 'Satisfaction utilisateurs' },
    { value: '3min', label: 'Temps moyen création' },
    { value: '24/7', label: 'Assistant IA disponible' }
  ];

  return (
    <div className="w-full bg-secondary text-white">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="w-full py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-purple-600/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                <Sparkles className="w-5 h-5 text-orange-400 mr-2" />
                <span className="text-orange-400 font-medium">Studio Intelligent</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Créez du contenu
                <span className="text-orange-400"> avec l'IA</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-white/80 mb-8">
                Notre studio intelligent vous guide étape par étape pour créer 
                des contenus professionnels en quelques minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4" onClick={handleStartCreating}>
                  <PenTool className="w-5 h-5 mr-2" />
                  Commencer à créer
                </Button>
                <Button size="lg" variant="ghost" className="border-white/20 text-white hover:bg-white/10 px-8 py-4" onClick={handleWatchDemo}>
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Voir la démo
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-orange-400">{stat.value}</div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Studio Interface Preview */}
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1 bg-white/10 rounded-full h-8 flex items-center px-4">
                    <span className="text-white/60 text-sm">Studio Intelligent</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1 bg-white/10 rounded-lg h-6"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Type className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                      <Image className="w-8 h-8 text-green-400" />
                    </div>
                  </div>
                  
                  <div className="bg-orange-500/20 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-orange-400 text-sm">Génération IA en cours...</span>
                    <div className="w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-purple-500/20 rounded-full blur-lg"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Fonctionnalités <span className="text-orange-400">Intelligentes</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Découvrez les outils qui rendent la création de contenu rapide et professionnelle
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Feature Cards */}
            <div className="space-y-4">
              {features.map((feature) => (
                <motion.div
                  key={feature.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeFeature === feature.id
                      ? 'bg-white/10 border-2 border-orange-500/50'
                      : 'bg-white/5 border-2 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-white/70 mb-4">{feature.description}</p>
                      {activeFeature === feature.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-2"
                        >
                          {feature.details.map((detail, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-sm text-white/80">{detail}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature Preview */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 bg-white/10 rounded-full h-8 flex items-center px-4">
                  <span className="text-white/60 text-sm">Aperçu - {features.find(f => f.id === activeFeature)?.title}</span>
                </div>
              </div>
              
                             <div className="aspect-video bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${features.find(f => f.id === activeFeature)?.color} flex items-center justify-center mx-auto mb-4`}>
                    {(() => {
                      const activeFeatureData = features.find(f => f.id === activeFeature);
                      if (activeFeatureData) {
                        const IconComponent = activeFeatureData.icon;
                        return <IconComponent className="w-8 h-8 text-white" />;
                      }
                      return null;
                    })()}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {features.find(f => f.id === activeFeature)?.title}
                  </h3>
                  <p className="text-white/60">
                    {features.find(f => f.id === activeFeature)?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Types Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Créez <span className="text-orange-400">Tout Type</span> de Contenu
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              De l'eBook interactif aux sessions live, notre studio s'adapte à vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden group hover:border-orange-500/30 transition-all duration-300 cursor-pointer"
                onClick={() => handleProductTypeClick(type.id)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={type.image} 
                    alt={type.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <type.icon className="w-5 h-5 text-orange-400" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{type.name}</h3>
                  <p className="text-white/70 mb-4 text-sm">{type.description}</p>
                  
                  <div className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-white/60">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Comment ça <span className="text-orange-400">Fonctionne</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Un processus simple en 4 étapes pour créer du contenu professionnel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <step.icon className={`w-8 h-8 ${step.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/70 text-sm">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-white/20 transform -translate-x-4"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600/10 to-purple-600/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Prêt à Créer du Contenu 
              <span className="text-orange-400"> Exceptionnel</span> ?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de créateurs qui utilisent déjà notre Studio Intelligent 
              pour produire du contenu professionnel en quelques minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4" onClick={handleStartFree}>
                <Sparkles className="w-5 h-5 mr-2" />
                Commencer Gratuitement
              </Button>
              <Button size="lg" variant="ghost" className="border-white/20 text-white hover:bg-white/10 px-8 py-4" onClick={handleWatchDemo}>
                <PlayCircle className="w-5 h-5 mr-2" />
                Voir Démo Complète
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
        title="Studio Intelligent AyanBridge"
        description="Découvrez comment créer du contenu professionnel en quelques minutes avec l'IA"
      />
    </div>
  );
};

export default StudioPage; 