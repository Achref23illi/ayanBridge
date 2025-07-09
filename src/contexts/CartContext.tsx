import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  title: string;
  author: string;
  cover: string;
  price: number;
  originalPrice?: number;
  type: 'ebook' | 'video' | 'formation';
  pdfUrl?: string;
}

interface PurchasedItem extends CartItem {
  purchaseDate: string;
  accessExpiry?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  purchasedItems: PurchasedItem[];
  isCartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  purchaseItems: () => void;
  openCart: () => void;
  closeCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isItemPurchased: (itemId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev; // Item already in cart
      }
      return [...prev, item];
    });
    setIsCartOpen(true); // Open cart when item is added
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const purchaseItems = () => {
    const newPurchases: PurchasedItem[] = cartItems.map(item => ({
      ...item,
      purchaseDate: new Date().toISOString(),
      accessExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year access
    }));
    
    setPurchasedItems(prev => [...prev, ...newPurchases]);
    setCartItems([]);
    setIsCartOpen(false);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const getCartCount = () => cartItems.length;

  const isItemPurchased = (itemId: string) => {
    return purchasedItems.some(item => item.id === itemId);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      purchasedItems,
      isCartOpen,
      addToCart,
      removeFromCart,
      clearCart,
      purchaseItems,
      openCart,
      closeCart,
      getCartTotal,
      getCartCount,
      isItemPurchased,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 