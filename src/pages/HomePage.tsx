import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import Testimonials from '../components/testimonial/Testimonials';

const videoUrl = "https://videos.pexels.com/video-files/6985691/6985691-uhd_2560_1440_25fps.mp4";

const HeroSection = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: heroRef,
      offset: ['start start', 'end start'],
    });

    const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  return (
      <motion.section ref={heroRef} style={{ opacity: heroOpacity }} className="w-full h-screen sticky top-0 flex flex-col justify-center items-center text-center overflow-hidden">
        <motion.div style={{ scale: videoScale }} className="absolute inset-0 z-0 w-full h-full">
          <video className="w-full h-full object-cover" src={videoUrl} autoPlay loop muted playsInline/>
          <div className="absolute inset-0 bg-black/60 w-full h-full"/>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="relative z-10 px-4 w-full max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter">
            Apprends. Crée. Investis. <span className="text-primary">Gagne.</span>
          </h1>
          <p className="max-w-3xl mx-auto mt-6 text-base sm:text-lg md:text-xl text-white/80">
            La première plateforme tout-en-un qui connecte les créateurs de contenu, les apprenants et les investisseurs pour façonner le futur du savoir.
          </p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="absolute bottom-10 z-10">
            <ChevronDown className="w-8 h-8 text-white animate-bounce" />
        </motion.div>
      </motion.section>
  );
};

const AboutUsSection = () => {
  const navigate = useNavigate();

  const handleDiscoverVision = () => {
    navigate('/learn');
  };

  const handleJoinCommunity = () => {
    navigate('/signup');
  };

  return (
    <section className="w-full py-16 md:py-24 bg-secondary px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent w-full h-full"></div>
      
      <div className="w-full mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-primary font-medium text-sm">À propos d'AyanBridge</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Révolutionner l'écosystème de la 
              <span className="text-primary"> création numérique</span>
            </h2>
            
            <p className="text-lg text-white/80 leading-relaxed">
              AyanBridge est née d'une vision simple mais ambitieuse : créer un pont entre les créateurs, 
              les apprenants et les investisseurs pour démocratiser l'accès au savoir et à l'innovation numérique.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                <p className="text-white/70">
                  <span className="text-white font-semibold">Notre mission :</span> Connecter les talents 
                  et démultiplier les opportunités dans l'économie créative.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                <p className="text-white/70">
                  <span className="text-white font-semibold">Notre vision :</span> Devenir la référence 
                  mondiale pour l'apprentissage et la monétisation de contenus numériques.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                <p className="text-white/70">
                  <span className="text-white font-semibold">Nos valeurs :</span> Innovation, collaboration, 
                  excellence et accessibilité pour tous.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={handleDiscoverVision}
              >
                Découvrir notre vision
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-white hover:bg-white/10"
                onClick={handleJoinCommunity}
              >
                Rejoindre la communauté
              </Button>
            </div>
          </motion.div>
        
        {/* Right side - Visual Gallery */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Créateurs collaborant"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-sm font-semibold">Créateurs actifs</div>
                <div className="text-xs text-white/70">Communauté créative</div>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 group mt-8"
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Formation en ligne"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-sm font-semibold">Formations créées</div>
                <div className="text-xs text-white/70">Apprentissage continu</div>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 group -mt-4"
            >
              <img 
                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Investissement et croissance"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-sm font-semibold">Revenus générés</div>
                <div className="text-xs text-white/70">Croissance économique</div>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 group mt-4"
            >
              <img 
                src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Satisfaction client"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-sm font-semibold">Satisfaction clients</div>
                <div className="text-xs text-white/70">Expérience exceptionnelle</div>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        </motion.div>
        
      </div>
    </div>
  </section>
  );
};

/*
// Nouveau composant pour afficher les informations de chaque produit
const ProductInfo = ({ product, onInView }: { product: Product, onInView: (url: string) => void }) => {
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      onInView(product.imageUrl);
    }
  }, [inView, product.imageUrl, onInView]);

  return (
    <div ref={ref} className="h-screen flex flex-col justify-center pl-8 md:pl-16">
      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <h3 className="text-4xl lg:text-5xl font-bold text-white">{product.name}</h3>
        <p className="text-xl text-white/70 mt-3">{product.creator}</p>
        <p className="text-lg text-white/80 mt-6 max-w-md">{product.description}</p>
        <div className="flex items-center mt-8 space-x-8">
          <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
          <Button size="lg">Ajouter au panier</Button>
        </div>
      </motion.div>
    </div>
  );
};


const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeImageUrl, setActiveImageUrl] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
      if (allProducts.length > 0) {
        setActiveImageUrl(allProducts[0].imageUrl);
      }
    };
    fetchProducts();
  }, []);

  if (products.length === 0) {
    return null;
  }

 return (
    <section className="bg-secondary relative z-10">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center py-20">
            <h2 className="text-4xl font-bold text-white">Nos Créations Exceptionnelles</h2>
            <p className="text-lg text-white/70 mt-4">Chaque produit est une porte vers une nouvelle compétence.</p>
         </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:sticky top-0 h-screen flex items-center justify-center">
            <div className="w-full max-w-md aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence>
                <motion.img
                  key={activeImageUrl}
                  src={activeImageUrl}
                  alt="Product Image"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
          <div>
            {products.map((product) => (
              <ProductInfo key={product.id} product={product} onInView={setActiveImageUrl} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
*/

const HomePage = () => {
  return (
    <div className="w-full bg-background text-white">
      <HeroSection />
      <AboutUsSection />
      {/* <ProductsSection /> */}
      <Testimonials />
    </div>
  );
};

export default HomePage;
