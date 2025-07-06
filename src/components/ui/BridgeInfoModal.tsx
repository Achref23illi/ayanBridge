import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Star, Users, Clock, Award, Target, Video, BookOpen } from 'lucide-react';
import { Button } from './Button';

interface BridgeInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: 'school' | 'academy' | 'live' | null;
  onNavigate: (path: string) => void;
}

interface SectionData {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgGradient: string;
  borderColor: string;
  features: {
    title: string;
    description: string;
    icon: React.ComponentType<any>;
  }[];
  stats: {
    label: string;
    value: string;
    icon: React.ComponentType<any>;
  }[];
  benefits: string[];
  navigationPath: string;
  ctaText: string;
}

const sectionData: Record<string, SectionData> = {
  school: {
    title: "Bridge School",
    subtitle: "École virtuelle complète",
    description: "Un environnement d'apprentissage structuré qui reproduit l'expérience scolaire traditionnelle avec tous les avantages du numérique.",
    icon: BookOpen,
    color: "blue",
    bgGradient: "from-blue-500/10 to-blue-600/5",
    borderColor: "border-blue-500/20",
    features: [
      {
        title: "Cours structurés",
        description: "Programmes organisés par niveau et matière avec progression logique",
        icon: BookOpen
      },
      {
        title: "Exercices interactifs",
        description: "Milliers d'exercices auto-corrigés avec feedback immédiat",
        icon: Target
      },
      {
        title: "Certifications",
        description: "Diplômes et certificats reconnus officiellement",
        icon: Award
      }
    ],
    stats: [
      { label: "Matières", value: "25+", icon: BookOpen },
      { label: "Niveaux", value: "12", icon: Target },
      { label: "Exercices", value: "10k+", icon: Star }
    ],
    benefits: [
      "Apprentissage adaptatif basé sur vos performances",
      "Suivi personnalisé avec tableaux de bord détaillés",
      "Accès aux ressources 24h/24 et 7j/7",
      "Communauté d'étudiants pour l'entraide",
      "Enseignants qualifiés disponibles en ligne"
    ],
    navigationPath: "/signup",
    ctaText: "Commencer mes cours"
  },
  academy: {
    title: "Bridge Academy",
    subtitle: "Formation professionnelle avancée",
    description: "Développez vos compétences avec des formations spécialisées conçues par des experts de l'industrie.",
    icon: Target,
    color: "green",
    bgGradient: "from-green-500/10 to-green-600/5",
    borderColor: "border-green-500/20",
    features: [
      {
        title: "Formations métier",
        description: "Programmes spécialisés dans les domaines les plus demandés",
        icon: Target
      },
      {
        title: "Projets pratiques",
        description: "Mise en application immédiate avec des cas réels",
        icon: Users
      },
      {
        title: "Mentorat expert",
        description: "Accompagnement personnalisé par des professionnels",
        icon: Star
      }
    ],
    stats: [
      { label: "Formations", value: "150+", icon: Target },
      { label: "Experts", value: "50+", icon: Users },
      { label: "Projets", value: "300+", icon: Star }
    ],
    benefits: [
      "Certifications reconnues par les entreprises",
      "Réseau professionnel et opportunités d'emploi",
      "Mise à jour continue des contenus",
      "Apprentissage par projet avec portfolio",
      "Sessions de coaching personnalisées"
    ],
    navigationPath: "/signup",
    ctaText: "Découvrir les formations"
  },
  live: {
    title: "Bridge Live",
    subtitle: "Sessions en direct interactives",
    description: "Participez à des événements éducatifs en temps réel avec des experts et une communauté active.",
    icon: Video,
    color: "purple",
    bgGradient: "from-purple-500/10 to-purple-600/5",
    borderColor: "border-purple-500/20",
    features: [
      {
        title: "Événements live",
        description: "Conférences, ateliers et masterclasses en direct",
        icon: Video
      },
      {
        title: "Interaction temps réel",
        description: "Q&A, polls et discussions avec les experts",
        icon: Users
      },
      {
        title: "Replays premium",
        description: "Accès illimité aux enregistrements des sessions",
        icon: Clock
      }
    ],
    stats: [
      { label: "Sessions/mois", value: "100+", icon: Video },
      { label: "Participants", value: "5k+", icon: Users },
      { label: "Heures replay", value: "500+", icon: Clock }
    ],
    benefits: [
      "Accès direct aux experts de l'industrie",
      "Networking avec des professionnels",
      "Contenu exclusif et avant-première",
      "Certificats de participation",
      "Chaîne éducative continue 24h/24"
    ],
    navigationPath: "/signup",
    ctaText: "Rejoindre les lives"
  }
};

const BridgeInfoModal: React.FC<BridgeInfoModalProps> = ({ 
  isOpen, 
  onClose, 
  section,
  onNavigate 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const data = section ? sectionData[section] : null;

  if (!data) return null;

  const IconComponent = data.icon;
  const colorClasses = {
    blue: { text: 'text-blue-400', bg: 'bg-blue-500/20' },
    green: { text: 'text-green-400', bg: 'bg-green-500/20' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-500/20' }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto mx-auto bg-secondary rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`p-6 bg-gradient-to-r ${data.bgGradient} border-b border-white/10`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${colorClasses[data.color as keyof typeof colorClasses].bg} rounded-2xl flex items-center justify-center`}>
                    <IconComponent className={`w-8 h-8 ${colorClasses[data.color as keyof typeof colorClasses].text}`} />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${colorClasses[data.color as keyof typeof colorClasses].text}`}>
                      {data.title}
                    </h2>
                    <p className="text-white/70">{data.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
                  aria-label="Fermer la modal"
                  title="Fermer la modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Description */}
              <div className="mb-8">
                <p className="text-lg text-white/80 leading-relaxed">
                  {data.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {data.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`text-center p-4 rounded-lg bg-gradient-to-br ${data.bgGradient} border ${data.borderColor}`}
                  >
                    <stat.icon className={`w-6 h-6 ${colorClasses[data.color as keyof typeof colorClasses].text} mx-auto mb-2`} />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Fonctionnalités principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center mb-2">
                        <feature.icon className={`w-5 h-5 ${colorClasses[data.color as keyof typeof colorClasses].text} mr-2`} />
                        <h4 className="font-medium text-white">{feature.title}</h4>
                      </div>
                      <p className="text-white/60 text-sm">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Avantages exclusifs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <ChevronRight className={`w-4 h-4 ${colorClasses[data.color as keyof typeof colorClasses].text} mt-1 flex-shrink-0`} />
                      <span className="text-white/80">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className={`bg-${data.color}-500 hover:bg-${data.color}-600 text-white px-8 py-3`}
                  onClick={() => {
                    onNavigate(data.navigationPath);
                    onClose();
                  }}
                >
                  {data.ctaText}
                </Button>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
                  onClick={onClose}
                >
                  Fermer
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BridgeInfoModal; 