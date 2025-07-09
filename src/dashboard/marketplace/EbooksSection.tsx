import React from 'react';
import { Star, Download, Eye, ShoppingCart } from 'lucide-react';
import { assets } from '../../config/assets';
import { useCart } from '../../contexts/CartContext';

interface Ebook {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  description: string;
  pages: number;
  category: string;
  pdfUrl?: string;
}

const EbooksSection: React.FC = () => {
  const { addToCart, isItemPurchased } = useCart();
  
  // Mock data for ebooks
  const ebooks: Ebook[] = [
    {
      id: '1',
      title: 'AI-Driven Business Transformation',
      author: 'Sarah Johnson',
      cover: assets.ebook1,
      rating: 4.8,
      reviews: 234,
      price: 29.99,
      originalPrice: 49.99,
      description: 'Learn how to leverage artificial intelligence to transform your business operations and drive innovation.',
      pages: 320,
      category: 'Business & AI',
      pdfUrl: assets.ebook1Pdf
    },
    {
      id: '2',
      title: 'Machine Learning for Entrepreneurs',
      author: 'David Chen',
      cover: assets.ebook2,
      rating: 4.6,
      reviews: 187,
      price: 24.99,
      description: 'A practical guide to implementing machine learning solutions in startup environments.',
      pages: 280,
      category: 'Technology',
      pdfUrl: assets.ebook2Pdf
    },
    {
      id: '3',
      title: 'Digital Marketing Revolution',
      author: 'Maria Rodriguez',
      cover: assets.ebook3,
      rating: 4.9,
      reviews: 312,
      price: 19.99,
      originalPrice: 34.99,
      description: 'Master the latest digital marketing strategies and AI-powered tools to grow your business.',
      pages: 250,
      category: 'Marketing',
      pdfUrl: assets.ebook3Pdf
    },
    {
      id: '4',
      title: 'Startup Success Blueprint',
      author: 'Alex Turner',
      cover: assets.ebook4,
      rating: 4.7,
      reviews: 156,
      price: 34.99,
      description: 'Essential strategies and frameworks for building and scaling successful startups.',
      pages: 380,
      category: 'Entrepreneurship',
      pdfUrl: assets.ebook4Pdf
    },
    {
      id: '5',
      title: 'The Future of Work: AI & Automation',
      author: 'Dr. Emily Wang',
      cover: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=400&fit=crop',
      rating: 4.9,
      reviews: 428,
      price: 32.99,
      originalPrice: 54.99,
      description: 'Explore how artificial intelligence and automation are reshaping the future workplace.',
      pages: 294,
      category: 'Future of Work'
    },
    {
      id: '6',
      title: 'Blockchain for Business Leaders',
      author: 'Michael Roberts',
      cover: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=400&fit=crop',
      rating: 4.5,
      reviews: 192,
      price: 27.99,
      description: 'Understand blockchain technology and its practical applications for modern businesses.',
      pages: 356,
      category: 'Blockchain'
    },
    {
      id: '7',
      title: 'Data Science for Decision Makers',
      author: 'Jennifer Liu',
      cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=400&fit=crop',
      rating: 4.8,
      reviews: 341,
      price: 39.99,
      originalPrice: 69.99,
      description: 'Learn to leverage data science insights for strategic business decision-making.',
      pages: 445,
      category: 'Data Science'
    },
    {
      id: '8',
      title: 'Cybersecurity Essentials for Executives',
      author: 'Robert Kim',
      cover: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=400&fit=crop',
      rating: 4.6,
      reviews: 267,
      price: 25.99,
      description: 'Essential cybersecurity knowledge every business leader needs to protect their organization.',
      pages: 312,
      category: 'Cybersecurity'
    },
    {
      id: '9',
      title: 'Remote Team Leadership Mastery',
      author: 'Lisa Martinez',
      cover: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=400&fit=crop',
      rating: 4.7,
      reviews: 389,
      price: 21.99,
      originalPrice: 41.99,
      description: 'Master the art of leading and managing high-performing remote teams.',
      pages: 287,
      category: 'Leadership'
    },
    {
      id: '10',
      title: 'E-commerce Growth Strategies',
      author: 'Carlos Rodriguez',
      cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=400&fit=crop',
      rating: 4.8,
      reviews: 445,
      price: 28.99,
      description: 'Proven strategies to scale your e-commerce business and maximize revenue.',
      pages: 334,
      category: 'E-commerce'
    },
    {
      id: '11',
      title: 'UX Design Psychology',
      author: 'Anna Thompson',
      cover: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&h=400&fit=crop',
      rating: 4.9,
      reviews: 523,
      price: 33.99,
      originalPrice: 52.99,
      description: 'Understanding user psychology to create compelling and effective user experiences.',
      pages: 298,
      category: 'UX Design'
    },
    {
      id: '12',
      title: 'Financial Technology Revolution',
      author: 'James Foster',
      cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop',
      rating: 4.4,
      reviews: 234,
      price: 36.99,
      description: 'Explore how fintech is disrupting traditional financial services and creating new opportunities.',
      pages: 376,
      category: 'FinTech'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-white/20'
        }`}
      />
    ));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">E-books Library</h1>
        <p className="text-white/70">Discover knowledge that transforms your business</p>
      </div>

      {/* Filters Bar */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select className="bg-secondary-light border border-white/20 rounded-lg px-4 py-2 text-white text-sm" aria-label="Filter by category">
            <option>All Categories</option>
            <option>Business & AI</option>
            <option>Technology</option>
            <option>Marketing</option>
            <option>Entrepreneurship</option>
          </select>
          <select className="bg-secondary-light border border-white/20 rounded-lg px-4 py-2 text-white text-sm" aria-label="Sort books">
            <option>Sort by Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Highest Rated</option>
            <option>Newest</option>
          </select>
        </div>
        <div className="text-white/60 text-sm">
          Showing {ebooks.length} books
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ebooks.map((book) => (
          <div key={book.id} className="bg-secondary-light rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-200 group">
            {/* Book Cover */}
            <div className="relative aspect-[3/4] bg-white/5 overflow-hidden">
              <img 
                src={book.cover} 
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" fill="%23374151"><rect width="200" height="300" fill="%23374151"/><text x="100" y="150" text-anchor="middle" fill="%23ffffff" font-family="Arial" font-size="48">📖</text></svg>';
                }}
              />
              {book.originalPrice && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Save ${(book.originalPrice - book.price).toFixed(0)}
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-200">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
              </div>
            </div>

            {/* Book Info */}
            <div className="p-4">
              <div className="mb-2">
                <span className="text-xs text-primary font-medium">{book.category}</span>
              </div>
              
              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                {book.title}
              </h3>
              
              <p className="text-white/60 text-xs mb-2">by {book.author}</p>
              
              <p className="text-white/70 text-xs mb-3 line-clamp-2">
                {book.description}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center space-x-1">
                  {renderStars(book.rating)}
                </div>
                <span className="text-white text-xs font-medium">{book.rating}</span>
                <span className="text-white/50 text-xs">({book.reviews})</span>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-primary font-bold text-lg">${book.price}</span>
                  {book.originalPrice && (
                    <span className="text-white/50 text-sm line-through">${book.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {isItemPurchased(book.id) ? (
                    <button className="p-2 bg-green-500/20 text-green-400 rounded-lg" title="Already Purchased">
                      <Download className="w-4 h-4" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => addToCart({
                        id: book.id,
                        title: book.title,
                        author: book.author,
                        cover: book.cover,
                        price: book.price,
                        originalPrice: book.originalPrice,
                        type: 'ebook',
                        pdfUrl: book.pdfUrl
                      })}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors" 
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-4 h-4 text-white" />
                    </button>
                  )}
                  <button className="p-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors" title="Download">
                    <Download className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/50">
                {book.pages} pages
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-colors">
          Load More Books
        </button>
      </div>
    </div>
  );
};

export default EbooksSection; 