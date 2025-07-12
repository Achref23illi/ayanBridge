import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, FileText, Video, Clipboard, 
  Download, Upload, Settings, Zap, Target, BookOpen, 
  CheckSquare, PlayCircle, Brain, Sparkles 
} from 'lucide-react';

interface TrainerModePanelProps {
  onLoadTemplate: (template: string) => void;
}

const TrainerModePanel: React.FC<TrainerModePanelProps> = ({ onLoadTemplate }) => {
  const [activeTab, setActiveTab] = useState('templates');
  const [isGenerating, setIsGenerating] = useState(false);

  const templates = [
    {
      id: 'case-study',
      title: 'Étude de cas interactive',
      description: 'Analyse de problèmes réels avec décisions à prendre',
      icon: Target,
      category: 'Analyse',
      duration: '45-60 min',
      difficulty: 'Intermédiaire',
      preview: 'Cas Netflix : Comment l\'algorithme de recommandation a transformé l\'industrie du streaming'
    },
    {
      id: 'simulation',
      title: 'Simulation d\'environnement',
      description: 'Environnement virtuel pour pratiquer en conditions réelles',
      icon: PlayCircle,
      category: 'Pratique',
      duration: '30-90 min',
      difficulty: 'Avancé',
      preview: 'Simulateur ML : Entraînez vos propres modèles avec des datasets réels'
    },
    {
      id: 'checklist',
      title: 'Liste de vérification professionnelle',
      description: 'Guide étape par étape pour maîtriser une compétence',
      icon: CheckSquare,
      category: 'Guide',
      duration: '15-30 min',
      difficulty: 'Débutant',
      preview: 'Checklist ML : 12 étapes pour implémenter un projet machine learning'
    },
    {
      id: 'workshop',
      title: 'Atelier collaboratif',
      description: 'Exercices de groupe avec feedback en temps réel',
      icon: Users,
      category: 'Collaboration',
      duration: '60-120 min',
      difficulty: 'Tous niveaux',
      preview: 'Workshop : Construire ensemble un système de recommandation'
    }
  ];

  const aiTools = [
    {
      id: 'content-generator',
      title: 'Générateur de contenu adaptatif',
      description: 'Créez automatiquement du contenu personnalisé selon le niveau',
      icon: Brain,
      action: 'Générer contenu'
    },
    {
      id: 'quiz-builder',
      title: 'Créateur de quiz intelligent',
      description: 'Questions adaptées au contenu avec correction automatique',
      icon: Clipboard,
      action: 'Créer quiz'
    },
    {
      id: 'video-enhancer',
      title: 'Amélioration vidéo IA',
      description: 'Ajout automatique de sous-titres, chapitres et interactions',
      icon: Video,
      action: 'Améliorer vidéo'
    },
    // 'feedback-analyzer' supprimé car PresentationChart n'existe pas dans lucide-react
  ];

  const handleGenerateContent = async (toolId: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsGenerating(false);
    // Load demo content
    onLoadTemplate('generated-content');
  };

  const tabs = [
    { id: 'templates', label: 'Modèles', icon: FileText },
    { id: 'ai-tools', label: 'Outils IA', icon: Sparkles },
    { id: 'import', label: 'Import/Export', icon: Upload },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-6 shadow-lg border border-border"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Mode Formateur</h2>
          <p className="text-sm text-muted-foreground">
            Outils avancés pour créer des expériences d'apprentissage immersives
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 bg-muted/20 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
      <AnimatePresence>
      {activeTab === 'templates' && (
          <motion.div
            key="templates"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-foreground mb-4">Modèles pédagogiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border border-border rounded-lg bg-background/50 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => onLoadTemplate(template.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <template.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-foreground">{template.title}</h4>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                          {template.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {template.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                        <span>⏱️ {template.duration}</span>
                        <span>📊 {template.difficulty}</span>
                      </div>
                      <div className="text-xs text-primary bg-primary/10 p-2 rounded">
                        💡 {template.preview}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'ai-tools' && (
          <motion.div
            key="ai-tools"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-foreground mb-4">Outils d'IA pédagogique</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiTools.map((tool) => (
                <motion.div
                  key={tool.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border border-border rounded-lg bg-background/50 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg">
                      <tool.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-2">{tool.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {tool.description}
                      </p>
                      <button
                        onClick={() => handleGenerateContent(tool.id)}
                        disabled={isGenerating}
                        className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Génération...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4" />
                            {tool.action}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'import' && (
          <motion.div
            key="import"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Import & Export</h3>
            
            {/* Import Section */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Importer du contenu</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-dashed border-border rounded-lg text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground mb-1">Slides PowerPoint</p>
                  <p className="text-xs text-muted-foreground">Convertit automatiquement en leçon interactive</p>
                </div>
                <div className="p-4 border border-dashed border-border rounded-lg text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Video className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground mb-1">Vidéos existantes</p>
                  <p className="text-xs text-muted-foreground">Ajoute transcription et interactions</p>
                </div>
                <div className="p-4 border border-dashed border-border rounded-lg text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground mb-1">Cours SCORM</p>
                  <p className="text-xs text-muted-foreground">Compatible avec vos LMS existants</p>
                </div>
              </div>
            </div>

            {/* Export Section */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Exporter le contenu</h4>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  <Download className="w-4 h-4" />
                  Package SCORM
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  <Download className="w-4 h-4" />
                  PDF Interactif
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  <Download className="w-4 h-4" />
                  Site Web autonome
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Paramètres avancés</h3>
            
            <div className="space-y-4">
              {/* AI Configuration */}
              <div className="p-4 bg-background/50 rounded-lg border border-border">
                <h4 className="font-medium text-foreground mb-3">Configuration IA</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Niveau de personnalisation</label>
                    <select className="px-3 py-1 bg-background border border-border rounded text-sm">
                      <option>Standard</option>
                      <option>Avancé</option>
                      <option>Expert</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Génération automatique d'exercices</label>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Adaptation temps réel</label>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </div>

              {/* Analytics */}
              <div className="p-4 bg-background/50 rounded-lg border border-border">
                <h4 className="font-medium text-foreground mb-3">Analytics et suivi</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Tracking détaillé des apprenants</label>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Rapports automatiques</label>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Export données RGPD</label>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </div>

              {/* Collaboration */}
              <div className="p-4 bg-background/50 rounded-lg border border-border">
                <h4 className="font-medium text-foreground mb-3">Collaboration équipe</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Édition collaborative</label>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Commentaires en temps réel</label>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Gestion des versions</label>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TrainerModePanel;