import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Languages, Lightbulb, X, Sparkles, Copy, Check } from 'lucide-react';

interface ContextualHelperMenuProps {
  selectedText: string;
  position: { x: number; y: number };
  onClose: () => void;
}

interface ContextualResponse {
  type: 'definition' | 'translation' | 'explanation' | 'example';
  content: string;
  language?: string;
}

const ContextualHelperMenu: React.FC<ContextualHelperMenuProps> = ({
  selectedText,
  position,
  onClose
}) => {
  const [activeResponse, setActiveResponse] = useState<ContextualResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isCopied, setIsCopied] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  // Mock responses based on selected text
  const getMockResponse = (type: string, text: string, language?: string): string => {
    const lowerText = text.toLowerCase();
    
    switch (type) {
      case 'definition':
        if (lowerText.includes('machine learning')) {
          return "Le Machine Learning est une branche de l'intelligence artificielle (IA) qui permet aux machines d'apprendre automatiquement à partir de données sans être explicitement programmées pour chaque tâche.";
        }
        if (lowerText.includes('algorithme')) {
          return "Un algorithme est une suite finie et non ambiguë d'opérations ou d'instructions permettant de résoudre un problème ou d'obtenir un résultat.";
        }
        if (lowerText.includes('régression linéaire')) {
          return "La régression linéaire est une méthode statistique qui modélise la relation entre une variable dépendante et une ou plusieurs variables indépendantes en utilisant une équation linéaire.";
        }
        return `Définition de "${text}" : Un concept clé en informatique et mathématiques appliquées, particulièrement important dans le contexte de cette leçon.`;
        
      case 'translation': {
        const translations: { [key: string]: { [key: string]: string } } = {
          'machine learning': {
            en: 'Machine Learning',
            es: 'Aprendizaje Automático',
            de: 'Maschinelles Lernen',
            it: 'Apprendimento Automatico',
            pt: 'Aprendizado de Máquina',
            zh: '机器学习'
          },
          'algorithme': {
            en: 'Algorithm',
            es: 'Algoritmo',
            de: 'Algorithmus',
            it: 'Algoritmo',
            pt: 'Algoritmo',
            zh: '算法'
          },
          'régression linéaire': {
            en: 'Linear Regression',
            es: 'Regresión Lineal',
            de: 'Lineare Regression',
            it: 'Regressione Lineare',
            pt: 'Regressão Linear',
            zh: '线性回归'
          }
        };
        
        const translation = translations[lowerText]?.[language || 'en'];
        return translation || `"${text}" translated to ${languages.find(l => l.code === language)?.name}: [Translation]`;
      }
        
      case 'explanation':
        if (lowerText.includes('machine learning')) {
          return "Le Machine Learning fonctionne en trois étapes principales : 1) Collecte et préparation des données d'entraînement, 2) Entraînement d'un modèle qui trouve des patterns dans ces données, 3) Utilisation du modèle pour faire des prédictions sur de nouvelles données.";
        }
        if (lowerText.includes('algorithme')) {
          return "En contexte ML, un algorithme définit comment le modèle apprend des données. Par exemple, l'algorithme de régression linéaire cherche la meilleure ligne droite qui passe au plus près de tous les points de données.";
        }
        return `Explication détaillée de "${text}" : Ce concept est fondamental car il établit les bases théoriques nécessaires pour comprendre les applications pratiques dans le domaine.`;
        
      case 'example': {
        if (lowerText.includes('machine learning')) {
          return "Exemple concret : Spotify utilise le ML pour créer vos playlists personnalisées. L'algorithme analyse vos écoutes passées, les compare à celles d'utilisateurs similaires, et recommande de nouvelles chansons que vous pourriez aimer.";
        }
        if (lowerText.includes('régression linéaire')) {
          return "Exemple pratique : Pour prédire le prix d'une maison, la régression linéaire utilise des variables comme la superficie, le nombre de chambres, et la localisation pour calculer une estimation de prix basée sur des ventes passées.";
        }
        return `Exemple d'application de "${text}" : Dans un contexte réel, ce concept est utilisé pour optimiser les processus et améliorer les performances des systèmes intelligents.`;
      }
        
      default:
        return `Information sur "${text}" : Concept important dans le contexte de cette leçon.`;
    }
  };

  const handleAction = async (type: string) => {
    setIsLoading(true);
    setActiveResponse(null);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    
    const response: ContextualResponse = {
      type: type as 'definition' | 'translation' | 'explanation' | 'example',
      content: getMockResponse(type, selectedText, selectedLanguage),
      language: type === 'translation' ? selectedLanguage : undefined
    };
    
    setActiveResponse(response);
    setIsLoading(false);
  };

  const handleCopy = async () => {
    if (activeResponse) {
      await navigator.clipboard.writeText(activeResponse.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Adjust position to stay within viewport
  const adjustedPosition = {
    x: Math.min(position.x, window.innerWidth - 320),
    y: Math.max(position.y, 10)
  };

  const menuActions = [
    {
      id: 'definition',
      label: 'Définition',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      hoverColor: 'hover:bg-blue-100 dark:hover:bg-blue-900/30'
    },
    {
      id: 'translation',
      label: 'Traduire',
      icon: Languages,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      hoverColor: 'hover:bg-green-100 dark:hover:bg-green-900/30'
    },
    {
      id: 'explanation',
      label: 'Expliquer',
      icon: Lightbulb,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      hoverColor: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
    },
    {
      id: 'example',
      label: 'Exemple',
      icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      hoverColor: 'hover:bg-purple-100 dark:hover:bg-purple-900/30'
    }
  ];

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      style={{
        position: 'fixed',
        left: adjustedPosition.x,
        top: adjustedPosition.y,
        zIndex: 1000
      }}
      className="bg-white dark:bg-gray-800 border border-border rounded-xl shadow-xl p-4 max-w-sm backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground text-sm">Aide contextuelle</h3>
          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
            "{selectedText}"
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted rounded-lg transition-colors"
          title="Fermer le menu d'aide"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {menuActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleAction(action.id)}
            className={`flex items-center gap-2 p-3 rounded-lg transition-all ${action.bgColor} ${action.hoverColor}`}
          >
            <action.icon className={`w-4 h-4 ${action.color}`} />
            <span className={`text-sm font-medium ${action.color}`}>
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* Language Selector for Translation */}
      {activeResponse?.type === 'translation' && (
        <div className="mb-4">
          <label className="text-xs font-medium text-muted-foreground mb-2 block">
            Langue cible
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full p-2 bg-background border border-border rounded-lg text-sm"
            title="Sélectionner la langue de traduction"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg"
        >
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
          <span className="text-sm text-muted-foreground">
            Analyse en cours...
          </span>
        </motion.div>
      )}

      {/* Response */}
      <AnimatePresence>
        {activeResponse && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-muted/30 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {activeResponse.type === 'definition' && <BookOpen className="w-4 h-4 text-blue-600" />}
                {activeResponse.type === 'translation' && <Languages className="w-4 h-4 text-green-600" />}
                {activeResponse.type === 'explanation' && <Lightbulb className="w-4 h-4 text-yellow-600" />}
                {activeResponse.type === 'example' && <Sparkles className="w-4 h-4 text-purple-600" />}
                <span className="text-sm font-medium text-foreground capitalize">
                  {activeResponse.type === 'definition' && 'Définition'}
                  {activeResponse.type === 'translation' && 'Traduction'}
                  {activeResponse.type === 'explanation' && 'Explication'}
                  {activeResponse.type === 'example' && 'Exemple'}
                </span>
              </div>
              
              <button
                onClick={handleCopy}
                className="p-1 hover:bg-muted rounded transition-colors"
                title="Copier"
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
            
            <p className="text-sm text-foreground leading-relaxed">
              {activeResponse.content}
            </p>
            
            {activeResponse.language && (
              <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <Languages className="w-3 h-3" />
                <span>
                  Traduit en {languages.find(l => l.code === activeResponse.language)?.name}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="mt-4 text-xs text-muted-foreground text-center">
        💡 Sélectionnez du texte pour obtenir de l'aide
      </div>
    </motion.div>
  );
};

export default ContextualHelperMenu;