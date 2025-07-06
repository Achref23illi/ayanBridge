import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Sparkles,
  Heart,
  Star
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Footer = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <footer className="w-full relative overflow-hidden">
      {/* Hero CTA Section */}
      <div className="w-full bg-secondary relative overflow-hidden">
        {/* Sophisticated Background Pattern */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03]"></div>
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-600/10"></div>
          
          {/* Animated Geometric Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-purple-600/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Decorative Lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-600/20 to-transparent"></div>
        </div>
        
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white font-medium">Rejoignez +10k créateurs</span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Transformez votre passion en <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                revenus durables
              </span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Créez, apprenez, investissez et monétisez vos compétences sur la plateforme tout-en-un qui révolutionne l'économie créative.
            </motion.p>
            
                         <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <Button 
                 size="lg" 
                 className="bg-primary text-white hover:bg-primary/90 text-lg font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group border-0"
                 onClick={handleSignUp}
               >
                 Commencer gratuitement
                 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform text-white" />
               </Button>
               <div className="flex items-center gap-2 text-white">
                 <div className="flex -space-x-2">
                   <div className="w-8 h-8 bg-primary/30 rounded-full border-2 border-primary/50"></div>
                   <div className="w-8 h-8 bg-primary/30 rounded-full border-2 border-primary/50"></div>
                   <div className="w-8 h-8 bg-primary/30 rounded-full border-2 border-primary/50"></div>
                 </div>
                 <span className="text-sm text-white">+10k créateurs nous font confiance</span>
               </div>
             </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="w-full bg-secondary text-white">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {/* Brand Column */}
            <motion.div variants={itemVariants} className="xl:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center p-2">
                  <img 
                    src="/logo.png" 
                    alt="AyanBridge Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold">AyanBridge</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                La plateforme qui connecte créateurs, apprenants et investisseurs pour façonner l'avenir de l'économie numérique.
              </p>
              
                             {/* Newsletter */}
               <div className="mb-6">
                 <h4 className="font-semibold mb-3 text-white">Restez informé</h4>
                 <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                   <div className="flex-1 relative">
                     <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                     <input 
                       type="email" 
                       placeholder="votre@email.com" 
                       className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors text-sm"
                     />
                   </div>
                   <Button className="bg-primary hover:bg-primary/90 px-8 py-4 rounded-xl whitespace-nowrap text-white border-0 font-semibold text-sm min-w-[120px] flex items-center justify-center">
                     S'abonner
                   </Button>
                 </div>
               </div>

              {/* Social Media */}
              <div>
                <h4 className="font-semibold mb-3 text-white">Suivez-nous</h4>
                <div className="flex gap-3">
                  {[
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: Instagram, href: "#", label: "Instagram" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                    { icon: Youtube, href: "#", label: "YouTube" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary transition-colors duration-300 group"
                    >
                      <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-lg mb-4 text-white">Plateforme</h4>
              <ul className="space-y-3">
                {[
                  { to: "/marketplace", label: "Marketplace" },
                  { to: "/learn", label: "Learn Hub" },
                  { to: "/invest", label: "Club Investisseur" },
                  { to: "/studio", label: "Studio Créatif" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.to} 
                      className="text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      {item.label}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Community */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-lg mb-4 text-white">Communauté</h4>
              <ul className="space-y-3">
                {[
                  { href: "#", label: "Blog & Actualités" },
                  { href: "#", label: "Discord" },
                  { href: "#", label: "Événements" },
                  { href: "#", label: "Partenaires" },
                ].map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href} 
                      className="text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      {item.label}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-lg mb-4 text-white">Support</h4>
              <ul className="space-y-3 mb-6">
                {[
                  { href: "#", label: "Centre d'aide" },
                  { href: "#", label: "Guides" },
                  { href: "#", label: "API Documentation" },
                  { href: "#", label: "Statut des services" },
                ].map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href} 
                      className="text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      {item.label}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">contact@ayanbridge.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Paris, France</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Footer Bottom */}
          <motion.div 
            className="pt-8 border-t border-gray-700"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <p className="text-gray-300">
                  &copy; {new Date().getFullYear()} AyanBridge. Tous droits réservés.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-6">
                <Link to="#" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Conditions d'utilisation
                </Link>
                <Link to="#" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Politique de confidentialité
                </Link>
                <Link to="#" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Cookies
                </Link>
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants} className="mt-4 text-center">
              <p className="text-gray-400 text-sm flex items-center justify-center gap-1">
                Fait avec <Heart className="w-4 h-4 text-red-500" /> par l'équipe AyanBridge
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 