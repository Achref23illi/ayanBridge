import React from 'react';
import { X, ShoppingCart, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartSidebar: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    removeFromCart,
    closeCart,
    purchaseItems,
    getCartTotal,
    getCartCount,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-secondary-light shadow-2xl border-l border-white/10 z-50 transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
            <span className="bg-primary text-white text-sm px-2 py-1 rounded-full">
              {getCartCount()}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Close cart"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Your cart is empty</h3>
              <p className="text-white/60">Add some items to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-start space-x-3">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" fill="%23374151"><rect width="200" height="300" fill="%23374151"/><text x="100" y="150" text-anchor="middle" fill="%23ffffff" font-family="Arial" font-size="48">📖</text></svg>';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white text-sm line-clamp-2 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-white/60 text-xs mb-2">by {item.author}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-primary font-bold text-sm">${item.price}</span>
                          {item.originalPrice && (
                            <span className="text-white/50 text-xs line-through">
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                          title="Remove from cart"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-white/10">
            {/* Total */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-white">Total</span>
              <span className="text-2xl font-bold text-primary">${getCartTotal().toFixed(2)}</span>
            </div>

            {/* Purchase Button */}
            <button
              onClick={purchaseItems}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <CreditCard className="w-5 h-5" />
              <span>Purchase Now</span>
            </button>

            {/* Note */}
            <p className="text-xs text-white/50 text-center mt-3">
              Secure checkout • Instant access • 30-day money-back guarantee
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar; 