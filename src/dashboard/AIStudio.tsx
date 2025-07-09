import React, { useState, useRef, useCallback } from 'react';
import {
  BookOpen,
  Target,
  Radio,
  FileText,
  Lightbulb,
  Wand2,
  Edit3,
  Upload,
  Save,
  ArrowLeft,
  ArrowRight,
  Share2,
  Eye,
  Play,
  Image,
  Video,
  Type,
  HelpCircle,
  Download,
  Calendar,
  Store,
  Lock,
  Plus,
  Trash2,
  Move,
  Copy,
  Palette,
  Settings,
  Sparkles,
  Clock,
  Check,
  X,
  Grid3X3,
  Layers,
  MousePointer,
  Zap,
  Award,
  ChevronRight,
  ChevronLeft,
  Mouse
} from 'lucide-react';

interface CreationStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
  active: boolean;
}

interface ProductType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface Widget {
  id: string;
  type: 'text' | 'image' | 'video' | 'quiz' | 'button' | 'pdf';
  title: string;
  icon: React.ReactNode;
  content?: any;
  position?: { x: number; y: number };
}

interface AIState {
  isGenerating: boolean;
  suggestions: string[];
  lastGenerated: Date | null;
}

// Product types and widgets data moved outside component
const productTypes: ProductType[] = [
  {
    id: 'ebook',
    title: 'eBook',
    description: 'Livre numérique interactif avec chapitres et ressources',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'bg-blue-500/20 text-blue-400 border-blue-400/30'
  },
  {
    id: 'formation',
    title: 'Mini-Formation',
    description: 'Cours structuré avec modules et exercices',
    icon: <Target className="w-8 h-8" />,
    color: 'bg-green-500/20 text-green-400 border-green-400/30'
  },
  {
    id: 'live',
    title: 'Session Live',
    description: 'Webinaire interactif en temps réel',
    icon: <Radio className="w-8 h-8" />,
    color: 'bg-red-500/20 text-red-400 border-red-400/30'
  },
  {
    id: 'fiche',
    title: 'Fiche Pratique',
    description: 'Guide concis avec étapes et conseils',
    icon: <FileText className="w-8 h-8" />,
    color: 'bg-purple-500/20 text-purple-400 border-purple-400/30'
  }
];

const availableWidgets: Widget[] = [
  {
    id: 'text',
    type: 'text',
    title: 'Texte',
    icon: <Type className="w-5 h-5" />
  },
  {
    id: 'image',
    type: 'image',
    title: 'Image',
    icon: <Image className="w-5 h-5" />
  },
  {
    id: 'video',
    type: 'video',
    title: 'Vidéo',
    icon: <Video className="w-5 h-5" />
  },
  {
    id: 'quiz',
    type: 'quiz',
    title: 'Quiz',
    icon: <HelpCircle className="w-5 h-5" />
  },
  {
    id: 'button',
    type: 'button',
    title: 'Bouton',
    icon: <MousePointer className="w-5 h-5" />
  },
  {
    id: 'pdf',
    type: 'pdf',
    title: 'PDF',
    icon: <Download className="w-5 h-5" />
  }
];

// IdeaInput component moved outside to prevent re-creation
interface IdeaInputProps {
  productIdea: string;
  setProductIdea: (idea: string) => void;
  learningObjectives: string;
  setLearningObjectives: (objectives: string) => void;
  setCurrentStep: (step: string) => void;
  setIsDirty: (dirty: boolean) => void;
}

const IdeaInput: React.FC<IdeaInputProps> = React.memo(({ 
  productIdea, 
  setProductIdea, 
  learningObjectives, 
  setLearningObjectives, 
  setCurrentStep,
  setIsDirty 
}) => {
  const handleProductIdeaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProductIdea(e.target.value);
    setIsDirty(true);
  }, [setProductIdea, setIsDirty]);

  const handleLearningObjectivesChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLearningObjectives(e.target.value);
    setIsDirty(true);
  }, [setLearningObjectives, setIsDirty]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Décrivez votre idée</h2>
        <p className="text-white/60">Plus vous êtes précis, meilleure sera la génération IA</p>
      </div>

      <div className="max-w-2xl">
        <div className="mb-6">
          <label className="block text-white font-medium mb-3">Thème principal *</label>
          <textarea
            value={productIdea}
            onChange={handleProductIdeaChange}
            placeholder="Ex: Guide complet du marketing digital pour les entrepreneurs débutants..."
            className="w-full h-32 bg-secondary-light border border-white/10 rounded-lg p-4 text-white placeholder-white/40 resize-none focus:border-primary focus:outline-none"
          />
        </div>

        <div className="mb-8">
          <label className="block text-white font-medium mb-3">Objectifs d'apprentissage (optionnel)</label>
          <textarea
            value={learningObjectives}
            onChange={handleLearningObjectivesChange}
            placeholder="Ex: Comprendre les bases du SEO, maîtriser les réseaux sociaux, créer des campagnes publicitaires..."
            className="w-full h-24 bg-secondary-light border border-white/10 rounded-lg p-4 text-white placeholder-white/40 resize-none focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setCurrentStep('product-type')}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
          <button
            onClick={() => setCurrentStep('ai-generation')}
            disabled={!productIdea.trim()}
            className="px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Wand2 className="w-4 h-4" />
            Générer avec l'IA
          </button>
        </div>
      </div>
    </div>
  );
});

const AIStudio: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<string>('product-type');
  const [selectedProductType, setSelectedProductType] = useState<string>('');
  const [productIdea, setProductIdea] = useState<string>('');
  const [editorWidgets, setEditorWidgets] = useState<Widget[]>([]);
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [aiState, setAiState] = useState<AIState>({
    isGenerating: false,
    suggestions: [],
    lastGenerated: null
  });
  const [draggedWidget, setDraggedWidget] = useState<Widget | null>(null);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [learningObjectives, setLearningObjectives] = useState<string>('');

  const editorRef = useRef<HTMLDivElement>(null);

  // Memoized handler for product type selection
  const handleProductTypeSelect = useCallback((typeId: string) => {
    setSelectedProductType(typeId);
  }, []);

  const creationSteps: CreationStep[] = [
    {
      id: 'product-type',
      title: 'Choisir type de produit',
      icon: <Target className="w-5 h-5" />,
      completed: selectedProductType !== '',
      active: currentStep === 'product-type'
    },
    {
      id: 'idea-input',
      title: 'Saisir l\'idée / thème',
      icon: <Lightbulb className="w-5 h-5" />,
      completed: productIdea !== '',
      active: currentStep === 'idea-input'
    },
    {
      id: 'ai-generation',
      title: 'Génération automatique par IA',
      icon: <Wand2 className="w-5 h-5" />,
      completed: editorWidgets.length > 0,
      active: currentStep === 'ai-generation'
    },
    {
      id: 'manual-edit',
      title: 'Modification manuelle',
      icon: <Edit3 className="w-5 h-5" />,
      completed: false,
      active: currentStep === 'manual-edit'
    },
    {
      id: 'publication',
      title: 'Publication',
      icon: <Upload className="w-5 h-5" />,
      completed: false,
      active: currentStep === 'publication'
    }
  ];

  const aiSuggestions = [
    "Ajouter une introduction captivante",
    "Structurer en 5 chapitres principaux",
    "Inclure des exemples pratiques",
    "Ajouter des quiz interactifs",
    "Proposer des exercices d'application"
  ];

  // Auto-save simulation
  React.useEffect(() => {
    if (isDirty) {
      const timer = setTimeout(() => {
        setLastSaved(new Date());
        setIsDirty(false);
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(timer);
    }
  }, [isDirty]);

  const generateWithAI = useCallback(async () => {
    setAiState(prev => ({ ...prev, isGenerating: true }));
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedWidgets: Widget[] = [
        {
          id: `text-${Date.now()}-1`,
          type: 'text',
          title: 'Introduction',
          icon: <Type className="w-5 h-5" />,
          content: `Introduction à ${productIdea}`,
          position: { x: 50, y: 50 }
        },
        {
          id: `text-${Date.now()}-2`,
          type: 'text',
          title: 'Chapitre 1',
          icon: <Type className="w-5 h-5" />,
          content: 'Contenu du premier chapitre...',
          position: { x: 50, y: 150 }
        },
        {
          id: `quiz-${Date.now()}`,
          type: 'quiz',
          title: 'Quiz d\'évaluation',
          icon: <HelpCircle className="w-5 h-5" />,
          content: 'Quiz interactif généré automatiquement',
          position: { x: 50, y: 250 }
        }
      ];

      setEditorWidgets(generatedWidgets);
      setAiState({
        isGenerating: false,
        suggestions: aiSuggestions,
        lastGenerated: new Date()
      });
      setCurrentStep('manual-edit');
      setIsDirty(true);
    }, 2000);
  }, [productIdea]);

  const handleDragStart = (widget: Widget) => {
    setDraggedWidget(widget);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedWidget || !editorRef.current) return;

    const rect = editorRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newWidget: Widget = {
      ...draggedWidget,
      id: `${draggedWidget.type}-${Date.now()}`,
      position: { x, y }
    };

    setEditorWidgets(prev => [...prev, newWidget]);
    setDraggedWidget(null);
    setIsDirty(true);
  };

  const removeWidget = (widgetId: string) => {
    setEditorWidgets(prev => prev.filter(w => w.id !== widgetId));
    setIsDirty(true);
  };

  const ProductTypeSelection = () => (
    <div className="p-8 min-h-full bg-gradient-to-br from-secondary/50 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-2xl border border-primary/30 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold">Étape 1 sur 5</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Quel type de produit voulez-vous créer ?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Choisissez le format qui correspond le mieux à votre idée et laissez l'IA vous guider
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {productTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => {
                handleProductTypeSelect(type.id);
                setCurrentStep('idea-input');
              }}
              className={`group relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 ${
                selectedProductType === type.id 
                  ? `${type.color} shadow-2xl shadow-current/20` 
                  : 'bg-gradient-to-br from-secondary-light/80 to-secondary-light/40 border-white/10 text-white hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 hover:border-white/20 hover:shadow-2xl'
              }`}
            >
              {/* Background Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Selection Indicator */}
              {selectedProductType === type.id && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              <div className="relative flex items-start gap-6">
                <div className={`p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                  selectedProductType === type.id 
                    ? 'bg-white/20 shadow-lg' 
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}>
                  {type.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {type.title}
                  </h3>
                  <p className="text-base opacity-80 leading-relaxed">
                    {type.description}
                  </p>
                  
                  {/* Feature indicators */}
                  <div className="flex items-center gap-2 mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-current rounded-full"></div>
                    <span className="text-sm">IA intégrée</span>
                    <div className="w-2 h-2 bg-current rounded-full ml-2"></div>
                    <span className="text-sm">Templates inclus</span>
                  </div>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Helper Text */}
        <div className="text-center mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-white/60 text-sm">
            💡 <strong>Conseil :</strong> Vous pourrez toujours modifier votre choix plus tard. 
            Chaque format inclut des templates et une assistance IA personnalisée.
          </p>
        </div>
      </div>
    </div>
  );



  const AIGeneration = () => (
    <div className="p-8 min-h-full bg-gradient-to-br from-secondary/30 to-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-2xl border border-primary/30 mb-6">
            <Wand2 className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold">Étape 3 sur 5</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Génération automatique par IA
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Notre IA analyse votre idée et crée un contenu structuré et professionnel
          </p>
        </div>

        {aiState.isGenerating ? (
          <div className="text-center py-16">
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-500 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-2 bg-gradient-to-r from-primary/30 to-orange-500/30 rounded-full animate-pulse"></div>
                <Sparkles className="w-16 h-16 text-primary relative z-10 animate-spin" />
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">Génération en cours...</h3>
            <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
              L'IA analyse votre idée <strong>"{productIdea.slice(0, 50)}..."</strong> et crée le contenu structuré
            </p>
            
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-white/10 rounded-2xl h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-orange-500 h-full rounded-2xl animate-pulse transition-all duration-1000" style={{ width: '70%' }}></div>
              </div>
              <p className="text-white/60 text-sm mt-3">Création du contenu adapté au format {selectedProductType}...</p>
            </div>

            {/* Generation Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Target, title: "Analyse", desc: "Structure du contenu" },
                { icon: Wand2, title: "Génération", desc: "Création par IA" },
                { icon: Check, title: "Finalisation", desc: "Optimisation" }
              ].map((step, index) => (
                <div key={index} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    index === 1 ? 'bg-primary/30 animate-pulse' : index === 0 ? 'bg-green-500/30' : 'bg-white/10'
                  }`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-white/60 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-secondary-light/80 to-secondary-light/40 rounded-3xl p-8 border border-white/10 mb-8 shadow-2xl">
              <div className="flex items-start gap-6 mb-6">
                <div className="p-4 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-2xl">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Contenu à générer</h3>
                  <p className="text-white/70">Voici ce que l'IA va créer pour votre {selectedProductType}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Target, title: "Structure automatique", desc: "Basée sur votre thème et les meilleures pratiques" },
                  { icon: Type, title: "Contenu textuel", desc: `Adapté au format ${selectedProductType} avec ton professionnel` },
                  { icon: HelpCircle, title: "Éléments interactifs", desc: "Quiz, exercices et activités engageantes" },
                  { icon: Lightbulb, title: "Suggestions d'amélioration", desc: "Recommandations personnalisées pour optimiser" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-white/70 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentStep('idea-input')}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-medium transition-all duration-300 hover:scale-105 border border-white/10"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span>Modifier l'idée</span>
              </button>
              <button
                onClick={generateWithAI}
                className="group flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
              >
                <Zap className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Générer maintenant</span>
                <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
              </button>
            </div>

            {/* Benefits */}
            <div className="mt-12 p-6 bg-gradient-to-r from-white/5 to-transparent rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-primary" />
                <h4 className="text-white font-semibold">Pourquoi utiliser l'IA ?</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span>Gain de temps considérable</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span>Structure optimisée</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Contenu professionnel</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const ManualEditor = () => {
    const [widgetsSidebarCollapsed, setWidgetsSidebarCollapsed] = useState<boolean>(false);
    const [propertiesSidebarCollapsed, setPropertiesSidebarCollapsed] = useState<boolean>(false);
    const [draggedWidget, setDraggedWidget] = useState<Widget | null>(null);
    const [dragIndicator, setDragIndicator] = useState<{ x: number; y: number } | null>(null);
    
    const handleDragStartImproved = (widget: Widget, e: React.DragEvent) => {
      setDraggedWidget(widget);
      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('text/plain', '');
    };

    const handleDragOverImproved = (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      
      if (editorRef.current) {
        const rect = editorRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setDragIndicator({ x, y });
      }
    };

    const handleDragLeaveImproved = () => {
      setDragIndicator(null);
    };

    const handleDropImproved = (e: React.DragEvent) => {
      e.preventDefault();
      setDragIndicator(null);
      
      if (draggedWidget && editorRef.current) {
        const rect = editorRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const newWidget: Widget = {
          ...draggedWidget,
          id: `${draggedWidget.id}-${Date.now()}`,
          position: { x, y },
          content: `Nouveau ${draggedWidget.type}`
        };
        
        setEditorWidgets(prev => [...prev, newWidget]);
        setDraggedWidget(null);
        setIsDirty(true);
      }
    };
    
    return (
      <div className="flex h-full relative">
        {/* Widgets Sidebar - Compact */}
        <div className={`${
          widgetsSidebarCollapsed ? 'w-10' : 'w-56'
        } bg-gradient-to-b from-secondary-light/90 to-secondary-light transition-all duration-300 border-r border-white/10 flex flex-col shadow-lg`}>
          {/* Widgets Header - Compact */}
          <div className="p-2 border-b border-white/10 flex items-center justify-between">
            {!widgetsSidebarCollapsed && (
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-white">Widgets</h3>
              </div>
            )}
            <button
              onClick={() => setWidgetsSidebarCollapsed(!widgetsSidebarCollapsed)}
              className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white"
              aria-label={widgetsSidebarCollapsed ? "Expand widgets sidebar" : "Collapse widgets sidebar"}
            >
              {widgetsSidebarCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
            </button>
          </div>

          {/* Widgets Content - Compact */}
          {!widgetsSidebarCollapsed && (
            <div className="flex-1 p-2 overflow-y-auto">
              <div className="space-y-2">
                {availableWidgets.map((widget) => (
                  <div
                    key={widget.id}
                    draggable
                    onDragStart={(e) => handleDragStartImproved(widget, e)}
                    className="group flex items-center gap-2 p-2 bg-gradient-to-r from-white/5 to-white/10 rounded-lg cursor-move hover:from-white/10 hover:to-white/15 transition-all duration-200 border border-white/10 hover:border-white/20 hover:scale-[1.01]"
                  >
                    <div className="p-1.5 bg-primary/20 rounded-md group-hover:bg-primary/30 transition-colors">
                      {React.cloneElement(widget.icon as React.ReactElement, { className: "w-3 h-3" })}
                    </div>
                    <span className="text-white text-xs font-medium group-hover:text-primary transition-colors">{widget.title}</span>
                  </div>
                ))}
              </div>

              {/* AI Suggestions - Compact */}
              {aiState.suggestions.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-white text-xs font-bold mb-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-primary" />
                    Suggestions IA
                  </h4>
                  <div className="space-y-1">
                    {aiState.suggestions.slice(0, 2).map((suggestion, index) => (
                      <div key={index} className="p-2 bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-lg border border-primary/20 hover:border-primary/30 transition-colors">
                        <p className="text-primary text-xs leading-snug">{suggestion.slice(0, 50)}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Collapsed Widgets Icons */}
          {widgetsSidebarCollapsed && (
            <div className="flex-1 p-1 space-y-1">
              {availableWidgets.map((widget) => (
                <div
                  key={widget.id}
                  draggable
                  onDragStart={(e) => handleDragStartImproved(widget, e)}
                  className="p-1.5 hover:bg-white/10 rounded-md cursor-move transition-colors flex items-center justify-center"
                  title={widget.title}
                >
                  {React.cloneElement(widget.icon as React.ReactElement, { className: "w-3 h-3" })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Editor Canvas */}
        <div className="flex-1 relative bg-gradient-to-br from-white/5 to-transparent">
          {/* Canvas Header - Compact */}
          <div className="h-12 bg-gradient-to-r from-secondary-light/50 to-transparent border-b border-white/10 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/20 rounded-md">
                <Edit3 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-white text-sm font-semibold">Éditeur de contenu</h3>
                <p className="text-white/60 text-xs">{editorWidgets.length} widget(s)</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md text-xs transition-colors">
                Grille
              </button>
              <button className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md text-xs transition-colors">
                Aperçu
              </button>
            </div>
          </div>

          {/* Canvas Area - Improved */}
          <div
            ref={editorRef}
            onDragOver={handleDragOverImproved}
            onDragLeave={handleDragLeaveImproved}
            onDrop={handleDropImproved}
            className="h-[calc(100%-3rem)] relative overflow-auto"
            style={{ 
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
              backgroundSize: '16px 16px'
            }}
          >
            {/* Drag Indicator */}
            {dragIndicator && (
              <div
                className="absolute w-4 h-4 bg-primary/50 border-2 border-primary rounded-full pointer-events-none animate-pulse z-50"
                style={{
                  left: dragIndicator.x - 8,
                  top: dragIndicator.y - 8
                }}
              />
            )}

            {editorWidgets.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/10 max-w-sm">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Grid3X3 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Canvas vide</h3>
                  <p className="text-white/60 text-sm mb-4">Glissez des widgets depuis la sidebar</p>
                  <div className="flex items-center justify-center gap-2 text-primary text-xs">
                    <Mouse className="w-3 h-3" />
                    <span>Drag & Drop amélioré</span>
                  </div>
                </div>
              </div>
            ) : (
              editorWidgets.map((widget) => (
                <div
                  key={widget.id}
                  className="absolute bg-gradient-to-r from-white/10 to-white/15 border border-white/20 rounded-xl p-4 min-w-48 group hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 backdrop-blur-sm cursor-move"
                  style={{
                    left: widget.position?.x || 0,
                    top: widget.position?.y || 0
                  }}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', widget.id);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary/20 rounded-md group-hover:bg-primary/30 transition-colors">
                        {React.cloneElement(widget.icon as React.ReactElement, { className: "w-3 h-3" })}
                      </div>
                      <span className="text-white text-sm font-semibold">{widget.title}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white"
                        aria-label="Edit widget"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        className="p-1 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white"
                        aria-label="Move widget"
                      >
                        <Move className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeWidget(widget.id)}
                        className="p-1 hover:bg-red-500/20 rounded-md transition-colors text-red-400 hover:text-red-300"
                        aria-label="Remove widget"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-white/80 text-xs leading-relaxed">
                    {widget.content || `Contenu du ${widget.type}. Cliquez pour éditer...`}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Properties Sidebar - Compact */}
        <div className={`${
          propertiesSidebarCollapsed ? 'w-10' : 'w-56'
        } bg-gradient-to-b from-secondary-light/90 to-secondary-light transition-all duration-300 border-l border-white/10 flex flex-col shadow-lg`}>
          {/* Properties Header - Compact */}
          <div className="p-2 border-b border-white/10 flex items-center justify-between">
            <button
              onClick={() => setPropertiesSidebarCollapsed(!propertiesSidebarCollapsed)}
              className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white"
              aria-label={propertiesSidebarCollapsed ? "Expand properties sidebar" : "Collapse properties sidebar"}
            >
              {propertiesSidebarCollapsed ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
            {!propertiesSidebarCollapsed && (
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Propriétés</h3>
                <Settings className="w-4 h-4 text-primary" />
              </div>
            )}
          </div>

          {/* Properties Content - Compact */}
          {!propertiesSidebarCollapsed && (
            <div className="flex-1 p-2 overflow-y-auto space-y-4">
              <div>
                <label className="block text-white text-xs font-semibold mb-2">Style</label>
                <div className="grid grid-cols-2 gap-1">
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center gap-1" aria-label="Change colors">
                    <Palette className="w-3 h-3 text-white" />
                    <span className="text-xs text-white">Couleurs</span>
                  </button>
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center gap-1" aria-label="Widget settings">
                    <Settings className="w-3 h-3 text-white" />
                    <span className="text-xs text-white">Réglages</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white text-xs font-semibold mb-2">Modèles</label>
                <div className="space-y-2">
                  <div className="p-2 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10 cursor-pointer hover:border-white/20 hover:from-white/10 hover:to-white/15 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 bg-blue-400 rounded"></div>
                      <p className="text-white font-medium text-xs">Modèle Modern</p>
                    </div>
                    <p className="text-white/60 text-xs">Design épuré et moderne</p>
                  </div>
                  <div className="p-2 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10 cursor-pointer hover:border-white/20 hover:from-white/10 hover:to-white/15 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 bg-purple-400 rounded"></div>
                      <p className="text-white font-medium text-xs">Modèle Classic</p>
                    </div>
                    <p className="text-white/60 text-xs">Style traditionnel et élégant</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white text-xs font-semibold mb-2">Actions rapides</label>
                <div className="space-y-1">
                  <button className="w-full p-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors flex items-center gap-1 justify-center">
                    <Copy className="w-3 h-3" />
                    <span className="text-xs font-medium">Dupliquer</span>
                  </button>
                  <button className="w-full p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors flex items-center gap-1 justify-center">
                    <Eye className="w-3 h-3" />
                    <span className="text-xs font-medium">Prévisualiser</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Publication = () => (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Publier votre création</h2>
        <p className="text-white/60">Choisissez comment partager votre produit</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Store className="w-8 h-8 text-green-400" />
            <h3 className="text-lg font-bold text-white">Publier en boutique</h3>
          </div>
          <p className="text-white/60 text-sm mb-4">Vendez votre produit sur la marketplace AyanBridge</p>
          <button className="w-full bg-green-500/20 text-green-400 border border-green-400/30 py-3 rounded-lg font-medium hover:bg-green-500/30 transition-colors">
            Publier
          </button>
        </div>

        <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Planifier session live</h3>
          </div>
          <p className="text-white/60 text-sm mb-4">Programmez une session en direct basée sur votre contenu</p>
          <button className="w-full bg-blue-500/20 text-blue-400 border border-blue-400/30 py-3 rounded-lg font-medium hover:bg-blue-500/30 transition-colors">
            Planifier
          </button>
        </div>

        <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-8 h-8 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Enregistrer en privé</h3>
          </div>
          <p className="text-white/60 text-sm mb-4">Gardez votre création privée pour l'améliorer plus tard</p>
          <button className="w-full bg-purple-500/20 text-purple-400 border border-purple-400/30 py-3 rounded-lg font-medium hover:bg-purple-500/30 transition-colors">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 'product-type':
        return <ProductTypeSelection />;
      case 'idea-input':
        return (
          <IdeaInput
            productIdea={productIdea}
            setProductIdea={setProductIdea}
            learningObjectives={learningObjectives}
            setLearningObjectives={setLearningObjectives}
            setCurrentStep={setCurrentStep}
            setIsDirty={setIsDirty}
          />
        );
      case 'ai-generation':
        return <AIGeneration />;
      case 'manual-edit':
        return <ManualEditor />;
      case 'publication':
        return <Publication />;
      default:
        return <ProductTypeSelection />;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-secondary via-secondary to-secondary-light flex flex-col">
      {/* Creation Steps Top Bar */}
      <div className="bg-gradient-to-r from-secondary-light/90 to-secondary-light backdrop-blur-sm border-b border-white/10 shadow-lg overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 py-2">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-2 min-h-[2rem]">
            {/* Left: Title */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="p-1.5 bg-primary/20 rounded-lg">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="hidden sm:block">
                <h2 className="text-sm font-bold text-white">Création guidée</h2>
                <p className="text-white/70 text-xs">Assistant IA pour votre produit</p>
              </div>
              <div className="sm:hidden">
                <h2 className="text-xs font-bold text-white">AI Studio</h2>
              </div>
            </div>
            
            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 flex-shrink-0 overflow-x-auto scrollbar-hide">
              {/* Back Button - Always visible */}
              <button className="group flex items-center gap-1 px-2 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md transition-all duration-300 hover:scale-105 border border-white/10 flex-shrink-0">
                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                <span className="font-medium text-xs hidden sm:inline">Retour</span>
              </button>
              
              {/* Status Indicator - Compact */}
              <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white/5 rounded-md border border-white/10 flex-shrink-0">
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isDirty ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'
                }`}></div>
                <span className="text-white/70 text-xs font-medium hidden lg:inline">
                  {isDirty ? 'Non sauvé' : 'Sauvé'}
                </span>
              </div>

              {/* Save Button */}
              <button className="group flex items-center gap-1 px-2 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md transition-all duration-300 hover:scale-105 border border-white/10 flex-shrink-0">
                <Save className="w-3 h-3 transition-transform group-hover:scale-110" />
                <span className="font-medium text-xs hidden md:inline">Enregistrer</span>
              </button>
              
              {/* Preview Button */}
              <button
                onClick={() => setShowPreview(true)}
                className="group flex items-center gap-1 px-2 py-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-400/30 rounded-md hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 hover:scale-105 flex-shrink-0"
              >
                <Eye className="w-3 h-3 transition-transform group-hover:scale-110" />
                <span className="font-medium text-xs hidden lg:inline">Aperçu</span>
              </button>
              
              {/* Publish Button - Primary */}
              <button
                onClick={() => setShowPublishModal(true)}
                className="group flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 font-medium flex-shrink-0"
              >
                <Share2 className="w-3 h-3 transition-transform group-hover:scale-110" />
                <span className="text-xs">Publier</span>
              </button>
            </div>
          </div>

          {/* Progress Steps Row */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 min-w-max pb-1">
              {creationSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  {/* Step */}
                  <div
                    onClick={() => step.completed && setCurrentStep(step.id)}
                    className={`group relative flex items-center gap-1.5 p-1.5 lg:p-2 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.01] min-w-0 ${
                      step.active
                        ? 'bg-gradient-to-r from-primary/20 to-orange-500/20 border-primary/50 text-primary shadow-lg shadow-primary/10'
                        : step.completed
                        ? 'bg-gradient-to-r from-green-500/15 to-emerald-500/15 border-green-400/40 text-green-400'
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    }`}
                    style={{ minWidth: '120px', maxWidth: '160px' }}
                  >
                    {step.active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-lg animate-pulse"></div>
                    )}
                    
                    <div className={`relative p-1 lg:p-1.5 rounded-md transition-all duration-300 flex-shrink-0 ${
                      step.active 
                        ? 'bg-primary/30 shadow-lg' 
                        : step.completed 
                        ? 'bg-green-500/30 shadow-lg' 
                        : 'bg-white/10 group-hover:bg-white/20'
                    }`}>
                      {step.completed && !step.active ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        React.cloneElement(step.icon as React.ReactElement, { className: "w-3 h-3" })
                      )}
                      {step.active && (
                        <div className="absolute inset-0 bg-primary/20 rounded-md animate-ping"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-xs truncate">{step.title}</h3>
                      <div className="flex items-center gap-0.5">
                        <span className="text-xs opacity-70">Étape {index + 1}</span>
                        {step.completed && (
                          <Check className="w-2.5 h-2.5" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Connector */}
                  {index < creationSteps.length - 1 && (
                    <div className="flex items-center px-0.5 lg:px-1 flex-shrink-0">
                      <div className={`w-3 lg:w-6 h-0.5 transition-all duration-300 ${
                        creationSteps[index + 1].completed || creationSteps[index + 1].active 
                          ? 'bg-primary' 
                          : 'bg-white/20'
                      }`}></div>
                      <ChevronRight className={`w-2.5 h-2.5 ml-0.5 transition-colors ${
                        creationSteps[index + 1].completed || creationSteps[index + 1].active 
                          ? 'text-primary' 
                          : 'text-white/40'
                      }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderStepContent()}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-secondary-light rounded-xl border border-white/10 w-5/6 h-5/6 flex flex-col">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Aperçu</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-white/60 hover:text-white"
                aria-label="Close preview"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 p-8 overflow-auto">
              <div className="bg-white rounded-lg p-8 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{productIdea || 'Votre produit'}</h1>
                <div className="space-y-4">
                  {editorWidgets.map((widget) => (
                    <div key={widget.id} className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-gray-700">{widget.title}</h3>
                      <p className="text-gray-600">{widget.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-secondary-light rounded-xl border border-white/10 w-2/3 max-w-2xl">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">Publier votre création</h3>
            </div>
            <div className="p-6">
              <Publication />
            </div>
            <div className="p-6 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIStudio; 