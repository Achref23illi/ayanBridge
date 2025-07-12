import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Lightbulb, BookOpen, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';
import type { ChatMessage } from '../../types/studio';

interface LessonAIChatProps {
  lessonTitle: string;
}

const LessonAIChat: React.FC<LessonAIChatProps> = ({ lessonTitle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: `Bonjour ! Je suis votre assistant IA pour la leçon "${lessonTitle}". Je peux répondre à vos questions, clarifier des concepts ou donner des exemples. Comment puis-je vous aider ?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickReplies = [
    { id: 'define', label: 'Définir un concept', icon: BookOpen },
    { id: 'explain', label: 'Expliquer plus', icon: Lightbulb },
    { id: 'example', label: 'Donner un exemple', icon: Sparkles },
    { id: 'help', label: 'Comment faire ?', icon: HelpCircle }
  ];

  // Mock AI responses
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('machine learning') || message.includes('ml')) {
      return "Le machine learning est une branche de l'IA qui permet aux machines d'apprendre automatiquement à partir de données. Il existe trois types principaux : supervisé (avec données étiquetées), non supervisé (découverte de patterns) et par renforcement (apprentissage par récompenses).";
    }
    
    if (message.includes('régression linéaire') || message.includes('regression')) {
      return "La régression linéaire modélise la relation entre variables en trouvant la meilleure ligne droite. Formule : y = mx + b. Elle's idéale pour prédire des valeurs numériques continues comme les prix immobiliers ou les ventes.";
    }
    
    if (message.includes('algorithme') || message.includes('algorithm')) {
      return "Un algorithme ML est une méthode mathématique qui trouve des patterns dans les données. Exemples : Decision Trees (arbres de décision), SVM (Support Vector Machines), ou Neural Networks (réseaux de neurones).";
    }
    
    if (message.includes('exemple') || message.includes('example')) {
      return "Voici un exemple concret : Netflix utilise le ML pour recommander des films. L'algorithme analyse vos visionnages passés, les compare à d'autres utilisateurs similaires, et prédit quels films vous pourriez aimer. C'est de l'apprentissage supervisé !";
    }
    
    if (message.includes('différence') || message.includes('difference')) {
      return "Principales différences :\n• **Supervisé** : On donne les bonnes réponses (ex: emails spam/non-spam)\n• **Non supervisé** : On laisse l'IA découvrir les patterns (ex: segmentation client)\n• **Renforcement** : L'IA apprend par essai-erreur avec des récompenses (ex: jeux vidéo)";
    }
    
    if (message.includes('comment') || message.includes('how')) {
      return "Pour commencer avec le ML :\n1. **Apprenez Python** (langage le plus utilisé)\n2. **Maîtrisez les maths** (statistiques, algèbre linéaire)\n3. **Pratiquez avec des datasets** (Kaggle, UCI)\n4. **Utilisez des librairies** (scikit-learn, TensorFlow)\n5. **Participez à des projets** pour acquérir de l'expérience !";
    }
    
    // Default responses
    const defaultResponses = [
      "Excellente question ! En relation avec notre leçon sur le machine learning, pourriez-vous être plus spécifique sur l'aspect qui vous intéresse ?",
      "C'est un point important à clarifier. Dans le contexte de cette leçon, quel aspect particulier souhaitez-vous approfondir ?",
      "Je vois que vous vous questionnez sur ce sujet. Pouvez-vous me donner plus de contexte pour que je puisse vous aider au mieux ?",
      "Très bonne réflexion ! Pour mieux vous répondre, pourriez-vous préciser quel concept de la leçon vous pose question ?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (type: string) => {
    const quickMessages = {
      define: "Peux-tu définir le machine learning ?",
      explain: "Peux-tu expliquer la différence entre les types d'apprentissage ?",
      example: "Peux-tu donner un exemple concret d'utilisation ?",
      help: "Comment puis-je commencer à apprendre le machine learning ?"
    };
    
    setInputValue(quickMessages[type as keyof typeof quickMessages] || '');
    inputRef.current?.focus();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-primary/5 p-4 cursor-pointer hover:bg-primary/10 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                Assistant IA Q&A
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                  Intelligent
                </span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Posez vos questions sur la leçon
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {messages.length} messages
            </span>
            <MessageCircle className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>

      {/* Chat Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : 'order-2'}`}>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground ml-auto' 
                        : 'bg-muted text-foreground'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {message.content}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-2">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1 order-2">
                      <User className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply.id)}
                    className="flex items-center gap-2 p-3 bg-muted/50 hover:bg-muted/80 rounded-lg transition-colors text-sm"
                  >
                    <reply.icon className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{reply.label}</span>
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LessonAIChat;