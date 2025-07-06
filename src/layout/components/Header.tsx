import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/marketplace', text: 'Magasin' },
  { href: '/learn', text: 'Learn Hub' },
  { href: '/invest', text: 'Club Investisseur' },
  { href: '/studio', text: 'Studio' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${hasScrolled ? 'bg-secondary/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <nav className="w-full flex justify-between items-center p-4 px-4 sm:px-6 lg:px-8 mx-auto">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="AyanBridge Logo" 
            className="h-14 w-auto"
          />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <Link key={link.href} to={link.href} className="text-white hover:text-primary transition-colors">
              {link.text}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:bg-white/10">Connexion</Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary">Inscription</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button onClick={() => setIsMenuOpen(true)} variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-secondary p-8 z-60"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-end mb-8">
                <Button onClick={() => setIsMenuOpen(false)} variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex flex-col space-y-6">
                {navLinks.map(link => (
                  <Link key={link.href} to={link.href} className="text-xl text-white hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                    {link.text}
                  </Link>
                ))}
                <div className="border-t border-white/20 pt-6 flex flex-col space-y-4">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="text-white hover:bg-white/10 w-full">Connexion</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="primary" className="w-full">Inscription</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
