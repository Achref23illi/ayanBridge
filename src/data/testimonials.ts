import type { Testimonial } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: 'test_1',
    name: 'Sophie Dubois',
    role: 'Créatrice de contenu',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b95e3d2c?w=150&h=150&fit=crop&crop=face',
    testimonial: "AyanBridge a transformé ma façon de monétiser mon contenu. La plateforme est intuitive et le support est incroyable.",
  },
  {
    id: 'test_2',
    name: 'Marc Lefebvre',
    role: 'Investisseur & Mentor',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    testimonial: "Enfin une plateforme qui comprend les besoins des investisseurs et des créateurs. Le Club Investisseur est une mine d'or.",
  },
  {
    id: 'test_3',
    name: 'Laura Petit',
    role: 'Étudiante en marketing',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    testimonial: "Le Learn Hub est génial. Les formations sont de haute qualité et m'ont permis d'acquérir de nouvelles compétences rapidement.",
  },
  {
    id: 'test_4',
    name: 'Kevin Moreau',
    role: 'Développeur Full-Stack',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    testimonial: "Le Studio est l'outil que j'attendais. Il simplifie le processus de création de produits numériques. Le gain de temps est phénoménal.",
  },
  {
    id: 'test_5',
    name: 'Emma Martin',
    role: 'Entrepreneureuse',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    testimonial: "Cette plateforme a révolutionné notre workflow créatif. L'interface est moderne et les fonctionnalités répondent parfaitement à nos besoins.",
  },
  {
    id: 'test_6',
    name: 'Thomas Bernard',
    role: 'Designer UX/UI',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    testimonial: "AyanBridge offre une expérience utilisateur exceptionnelle. Les outils de collaboration ont transformé notre façon de travailler en équipe.",
  },
  {
    id: 'test_7',
    name: 'Camille Durand',
    role: 'Chef de projet',
    avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    testimonial: "La facilité d'utilisation et la puissance des fonctionnalités font d'AyanBridge un outil indispensable pour notre équipe.",
  },
  {
    id: 'test_8',
    name: 'Lucas Rousseau',
    role: 'Consultant digital',
    avatarUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
    testimonial: "J'ai testé de nombreuses plateformes, mais AyanBridge se démarque par sa simplicité et son efficacité. Hautement recommandé !",
  },
  {
    id: 'test_9',
    name: 'Julie Moreau',
    role: 'Marketing Manager',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    testimonial: "Les résultats obtenus avec AyanBridge dépassent nos attentes. Notre productivité a augmenté de manière significative.",
  },
];

// Format pour le nouveau composant TestimonialsColumn
export const testimonialsForColumn = testimonials.map(t => ({
  text: t.testimonial,
  image: t.avatarUrl,
  name: t.name,
  role: t.role,
})); 