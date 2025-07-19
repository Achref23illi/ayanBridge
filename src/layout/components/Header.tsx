import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { href: '/learn', text: 'Learn Hub' },
  { href: '/invest', text: 'Club Investisseur' },
  { href: '/studio', text: 'Studio' },
];

const magasinDropdownItems = [
  { href: '/magasin/ebooks', text: 'Ebooks' },
  { href: '/magasin/videos', text: 'Videos' },
  { href: '/magasin/lives', text: 'Lives' },
  { href: '/magasin/formation', text: 'Formation' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMagasinDropdownOpen, setIsMagasinDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

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
          {/* Magasin Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsMagasinDropdownOpen(true)}
            onMouseLeave={() => setIsMagasinDropdownOpen(false)}
          >
            <button className="flex items-center space-x-1 text-white hover:text-primary transition-colors">
              <span>Magasin</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {isMagasinDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  {magasinDropdownItems.map(item => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                    >
                      {item.text}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map(link => (
            <Link key={link.href} to={link.href} className="text-white hover:text-primary transition-colors">
              {link.text}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" className="text-white hover:bg-white/10">Dashboard</Button>
              </Link>
              <div className="flex items-center space-x-3">
                <span className="text-white text-sm">Bonjour, {user?.name}</span>
                <Button 
                  onClick={logout} 
                  variant="ghost" 
                  className="text-white hover:bg-white/10"
                >
                  Déconnexion
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">Connexion</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary">Inscription</Button>
              </Link>
            </>
          )}
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
                {/* Magasin Section */}
                <div>
                  <div className="text-xl text-white font-semibold mb-3">Magasin</div>
                  <div className="pl-4 space-y-2">
                    {magasinDropdownItems.map(item => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="block text-lg text-white/80 hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.text}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {navLinks.map(link => (
                  <Link key={link.href} to={link.href} className="text-xl text-white hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                    {link.text}
                  </Link>
                ))}
                <div className="border-t border-white/20 pt-6 flex flex-col space-y-4">
                  {isAuthenticated ? (
                    <>
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="text-white hover:bg-white/10 w-full">Dashboard</Button>
                      </Link>
                      <div className="text-white text-sm mb-2">Bonjour, {user?.name}</div>
                      <Button 
                        onClick={() => { logout(); setIsMenuOpen(false); }} 
                        variant="ghost" 
                        className="text-white hover:bg-white/10 w-full"
                      >
                        Déconnexion
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="text-white hover:bg-white/10 w-full">Connexion</Button>
                      </Link>
                      <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="primary" className="w-full">Inscription</Button>
                      </Link>
                    </>
                  )}
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
