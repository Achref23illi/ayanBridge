import React, { useState } from 'react';
import { SignInPage } from '../components/ui/sign-in';
import type { Testimonial } from '../components/ui/sign-in';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// AyanBridge-specific testimonials
const ayanBridgeTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://images.unsplash.com/photo-1494790108755-2616c640e4e8?w=400&h=400&fit=crop&crop=face",
    name: "Sarah Dubois",
    handle: "@sarahcreates",
    text: "AyanBridge a transformé ma façon de créer du contenu. L'IA me fait gagner un temps précieux !"
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    name: "Marc Laurent",
    handle: "@marcteach",
    text: "J'ai développé ma première formation en ligne en quelques heures. Incroyable plateforme !"
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    name: "Élodie Martin",
    handle: "@elodielearn",
    text: "L'écosystème Bridge m'a permis de monétiser mes connaissances. Plus de 50k€ en 6 mois !"
  },
];

function LoginPage(): React.ReactElement {
  const navigate = useNavigate();
  const { login, googleAuth, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    setError(null);
    
    try {
      await login(data.email as string, data.password as string);
      navigate('/dashboard');
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    
    try {
      await googleAuth();
      navigate('/dashboard');
    } catch (err) {
      setError('Erreur lors de la connexion avec Google');
    }
  };
  
  const handleResetPassword = () => {
    alert("Un email de réinitialisation a été envoyé à votre adresse email.");
  };

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <div className="bg-background text-foreground">
      <SignInPage
        title={
          <span className="font-light text-foreground tracking-tighter">
            Bienvenue sur <span className="text-primary font-semibold">AyanBridge</span>
          </span>
        }
        description="Accédez à votre compte et continuez votre parcours de création et d'apprentissage"
        heroImageSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop&crop=center"
        testimonials={ayanBridgeTestimonials}
        onSignIn={handleSignIn}
        onGoogleSignIn={handleGoogleSignIn}
        onResetPassword={handleResetPassword}
        onCreateAccount={handleCreateAccount}
      />
    </div>
  );
}

export { LoginPage };
export default LoginPage; 