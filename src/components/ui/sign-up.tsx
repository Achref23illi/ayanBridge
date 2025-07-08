import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle } from 'lucide-react';

// --- HELPER COMPONENTS (ICONS) ---

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
    </svg>
);

// --- TYPE DEFINITIONS ---

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

interface SignUpPageProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  heroImageSrc?: string;
  testimonials?: Testimonial[];
  onSignUp?: (event: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSignUp?: () => void;
  onSignIn?: () => void;
}

// --- SUB-COMPONENTS ---

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl border border-border bg-foreground/5 backdrop-blur-sm transition-all duration-200 focus-within:border-gray-400 focus-within:bg-gray-200">
    {children}
  </div>
);

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial, delay: string }) => (
  <div className={`animate-testimonial ${delay} flex items-start gap-3 rounded-3xl bg-card/40 dark:bg-zinc-800/40 backdrop-blur-xl border border-white/10 p-5 w-64`}>
    <img src={testimonial.avatarSrc} className="h-10 w-10 object-cover rounded-2xl" alt="avatar" />
    <div className="text-sm leading-snug">
      <p className="flex items-center gap-1 font-medium text-white">{testimonial.name}</p>
      <p className="text-white/70">{testimonial.handle}</p>
      <p className="mt-1 text-white/90">{testimonial.text}</p>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export const SignUpPage: React.FC<SignUpPageProps> = ({
  title = <span className="font-light text-foreground tracking-tighter">Créer votre compte</span>,
  description = "Rejoignez AyanBridge et commencez votre parcours de création",
  heroImageSrc,
  testimonials = [],
  onSignUp,
  onGoogleSignUp,
  onSignIn,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-geist">
      {/* Left column: sign-up form */}
      <section className="flex-1 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-4">
            <h1 className="animate-element animate-delay-100 text-3xl lg:text-4xl font-semibold leading-tight">{title}</h1>
            <p className="animate-element animate-delay-200 text-muted-foreground text-sm">{description}</p>

            <button onClick={onGoogleSignUp} className="animate-element animate-delay-250 w-full flex items-center justify-center gap-3 border border-border rounded-xl py-3 hover:bg-secondary transition-colors text-white">
                <GoogleIcon />
                S'inscrire avec Google
            </button>

            <div className="animate-element animate-delay-300 relative flex items-center justify-center">
              <span className="w-full border-t border-border"></span>
              <span className="px-3 text-xs text-muted-foreground bg-background absolute">Ou créer un compte</span>
            </div>

            <form className="space-y-3" onSubmit={onSignUp}>
              {/* Name fields in a grid */}
              <div className="animate-element animate-delay-300 grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="text-xs font-medium text-muted-foreground">Prénom</label>
                  <GlassInputWrapper>
                    <input 
                      id="firstName"
                      name="firstName" 
                      type="text" 
                      placeholder="Prénom" 
                      className="w-full bg-transparent text-sm p-3 rounded-xl focus:outline-none text-foreground" 
                      required
                    />
                  </GlassInputWrapper>
                </div>
                <div>
                  <label htmlFor="lastName" className="text-xs font-medium text-muted-foreground">Nom</label>
                  <GlassInputWrapper>
                    <input 
                      id="lastName"
                      name="lastName" 
                      type="text" 
                      placeholder="Nom" 
                      className="w-full bg-transparent text-sm p-3 rounded-xl focus:outline-none text-foreground" 
                      required
                    />
                  </GlassInputWrapper>
                </div>
              </div>

              <div className="animate-element animate-delay-350">
                <label htmlFor="email" className="text-xs font-medium text-muted-foreground">Email</label>
                <GlassInputWrapper>
                  <input 
                    id="email"
                    name="email" 
                    type="email" 
                    placeholder="votre@email.com" 
                    className="w-full bg-transparent text-sm p-3 rounded-xl focus:outline-none text-foreground" 
                    required
                  />
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-400">
                <label htmlFor="password" className="text-xs font-medium text-muted-foreground">Mot de passe</label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input 
                      id="password"
                      name="password" 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Créez un mot de passe" 
                      className="w-full bg-transparent text-sm p-3 pr-10 rounded-xl focus:outline-none text-foreground" 
                      required
                      minLength={8}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg p-1 w-6 h-6 transition-colors"
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showPassword ? 
                        <EyeOff className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" /> : 
                        <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                      }
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-450">
                <label htmlFor="confirmPassword" className="text-xs font-medium text-muted-foreground">Confirmer le mot de passe</label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input 
                      id="confirmPassword"
                      name="confirmPassword" 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      placeholder="Confirmez votre mot de passe" 
                      className="w-full bg-transparent text-sm p-3 pr-10 rounded-xl focus:outline-none text-foreground" 
                      required
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                      className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg p-1 w-6 h-6 transition-colors"
                      aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showConfirmPassword ? 
                        <EyeOff className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" /> : 
                        <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                      }
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-500 flex items-start gap-2 text-xs">
                <input 
                  type="checkbox" 
                  id="acceptTerms"
                  name="acceptTerms" 
                  className="custom-checkbox mt-1" 
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                />
                <label htmlFor="acceptTerms" className="text-foreground/90 leading-relaxed">
                  J'accepte les <a href="#" className="text-violet-400 hover:underline">conditions d'utilisation</a> et la <a href="#" className="text-violet-400 hover:underline">politique de confidentialité</a>
                </label>
              </div>

              <button 
                type="submit" 
                className="animate-element animate-delay-550 w-full rounded-xl bg-primary py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!acceptTerms}
              >
                Créer mon compte
              </button>
            </form>

            <p className="animate-element animate-delay-600 text-center text-xs text-muted-foreground">
              Déjà un compte ? <a href="#" onClick={(e) => { e.preventDefault(); onSignIn?.(); }} className="text-violet-400 hover:underline transition-colors">Se connecter</a>
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image + testimonials */}
      {heroImageSrc && (
        <section className="hidden lg:block flex-1 relative p-4">
          <div className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${heroImageSrc})` }}></div>
          {testimonials.length > 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
              <TestimonialCard testimonial={testimonials[0]} delay="animate-delay-1000" />
              {testimonials[1] && <div className="hidden xl:flex"><TestimonialCard testimonial={testimonials[1]} delay="animate-delay-1200" /></div>}
              {testimonials[2] && <div className="hidden 2xl:flex"><TestimonialCard testimonial={testimonials[2]} delay="animate-delay-1400" /></div>}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

// Default export for convenience
export default SignUpPage; 