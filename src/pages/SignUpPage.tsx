import React, { useState } from 'react';
import { SignUpPage } from '../components/ui/sign-up';
import type { Testimonial } from '../components/ui/sign-up';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// AyanBridge-specific testimonials for signup
const ayanBridgeSignupTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    name: "Thomas Moreau",
    handle: "@thomascreator",
    text: "Je suis passé de 0 à 100k€ de revenus en 8 mois grâce à AyanBridge. Une plateforme révolutionnaire !"
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1494790108755-2616c640e4e8?w=400&h=400&fit=crop&crop=face",
    name: "Claire Dubois",
    handle: "@claireeduque",
    text: "L'IA d'AyanBridge m'a aidée à créer des formations de qualité professionnelle en quelques heures."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    name: "Antoine Legrand",
    handle: "@antoineinvest",
    text: "Investir dans les créateurs via AyanBridge a été l'une de mes meilleures décisions financières."
  },
];

const SignUpPageComponent: React.FC = () => {
  const navigate = useNavigate();
  const { signup, googleAuth, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Basic password confirmation validation
    if (data.password !== data.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    
    // Combine first and last name
    const fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
    if (!fullName) {
      setError("Veuillez saisir votre nom et prénom.");
      return;
    }
    
    setError(null);
    
    try {
      await signup(data.email as string, data.password as string, fullName);
      navigate('/role-selection');
    } catch (err) {
      setError('Erreur lors de l\'inscription');
      console.error('Signup error:', err);
    }
  };

  const handleGoogleSignUp = async () => {
    setError(null);
    
    try {
      await googleAuth();
      navigate('/role-selection');
    } catch (err) {
      setError('Erreur lors de l\'inscription avec Google');
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div className="bg-background text-foreground">
      <SignUpPage
        title={
          <span className="font-light text-foreground tracking-tighter">
            Rejoignez <span className="text-primary font-semibold">AyanBridge</span>
          </span>
        }
        description="Créez votre compte et commencez votre parcours de création, d'apprentissage et d'investissement"
        heroImageSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&crop=center"
        testimonials={ayanBridgeSignupTestimonials}
        onSignUp={handleSignUp}
        onGoogleSignUp={handleGoogleSignUp}
        onSignIn={handleSignIn}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SignUpPageComponent; 