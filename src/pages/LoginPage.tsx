import React from 'react';
import { SignInPage } from '../components/ui/sign-in';
import type { Testimonial } from '../components/ui/sign-in';
import { useNavigate } from 'react-router-dom';

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

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    console.log("Sign In submitted:", data);
    
    // Simulate successful login
    alert("Connexion réussie ! Redirection vers le tableau de bord...");
    // Navigate to home page or dashboard
    navigate('/');
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign In clicked");
    alert("Connexion avec Google en cours...");
    // Implement Google OAuth integration here
    navigate('/');
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