import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole, UserRoleOption } from '../types';

const roleOptions: UserRoleOption[] = [
  {
    id: 'student',
    title: 'Student',
    description: 'Apprenez de nouvelles compétences et développez votre expertise',
    icon: '🎓',
    benefits: ['Accès aux formations', 'Communauté d\'apprentissage', 'Certificats']
  },
  {
    id: 'teacher',
    title: 'Teacher',
    description: 'Partagez votre expertise et formez la prochaine génération',
    icon: '👨‍🏫',
    benefits: ['Créer des cours', 'Monétiser vos connaissances', 'Communauté d\'experts']
  },
  {
    id: 'content_creator',
    title: 'Content Creator',
    description: 'Créez et monétisez votre contenu avec l\'IA',
    icon: '🎨',
    benefits: ['Outils IA avancés', 'Marketplace intégré', 'Analytics détaillés']
  },
  {
    id: 'investor',
    title: 'Investor',
    description: 'Investissez dans les talents et projets prometteurs',
    icon: '💼',
    benefits: ['Opportunités d\'investissement', 'Portfolio tracking', 'Réseau premium']
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneur',
    description: 'Développez votre business et scalez votre impact',
    icon: '🚀',
    benefits: ['Ressources business', 'Réseau d\'entrepreneurs', 'Outils de croissance']
  }
];

interface RoleCardProps {
  option: UserRoleOption;
  isSelected: boolean;
  onSelect: (role: UserRole) => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ option, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(option.id)}
      className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left w-full max-w-sm hover:scale-105 ${
        isSelected
          ? 'border-primary bg-primary/10 shadow-lg'
          : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
      }`}
    >
      <div className="text-4xl mb-4">{option.icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{option.title}</h3>
      <p className="text-muted-foreground mb-4 text-sm">{option.description}</p>
      <div className="space-y-2">
        {option.benefits.map((benefit, index) => (
          <div key={index} className="flex items-center text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
            {benefit}
          </div>
        ))}
      </div>
    </button>
  );
};

const RoleSelection: React.FC = () => {
  const { user, updateUserRole, isLoading } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setError(null);
  };

  const handleContinue = async () => {
    if (!selectedRole) {
      setError('Veuillez sélectionner un rôle pour continuer');
      return;
    }

    try {
      await updateUserRole(selectedRole);
      navigate('/dashboard');
    } catch (err) {
      setError('Erreur lors de la mise à jour du profil');
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Bienvenue sur <span className="text-primary">AyanBridge</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pour personnaliser votre expérience, dites-nous quel rôle vous correspond le mieux
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
            <span className="w-8 h-0.5 bg-primary rounded mr-2"></span>
            <span>Étape 1 sur 1</span>
            <span className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600 rounded ml-2"></span>
          </div>
        </div>

        {/* Role Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 justify-items-center">
          {roleOptions.map((option) => (
            <RoleCard
              key={option.id}
              option={option}
              isSelected={selectedRole === option.id}
              onSelect={handleRoleSelect}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center mb-6">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleContinue}
            disabled={isLoading}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium 
                     hover:bg-primary/90 transition-colors disabled:opacity-50 
                     disabled:cursor-not-allowed min-w-[200px]"
          >
            {isLoading ? 'Mise à jour...' : 'Continuer'}
          </button>
          
          <button
            onClick={handleSkip}
            disabled={isLoading}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm underline"
          >
            Passer cette étape
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="text-center mt-8 text-sm text-muted-foreground">
            Connecté en tant que <span className="font-medium">{user.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSelection;