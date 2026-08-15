import React, { createContext, useContext, useState, useEffect } from 'react';
import ordersApi from '../api/ordersApi';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items));
  }, [items]);

  const addToCart = (dish) => {
    const dishId = dish.id || dish._id;
    setItems((prev) => {
      const existing = prev.find((item) => (item.id || item._id) === dishId);
      if (existing) {
        return prev.map((item) =>
          (item.id || item._id) === dishId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const updateQuantity = (dishId, amount) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if ((item.id || item._id) === dishId) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (dishId) => {
    setItems((prev) => prev.filter((item) => (item.id || item._id) !== dishId));
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = async () => {
    if (!items.length) return;
    if (!isAuthenticated) {
      throw new Error('Please login to place your order.');
    }

    setLoading(true);
    try {
      const response = await ordersApi.placeOrder(items);
      clearCart();
      setIsCartOpen(false);
      return response;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCount,
        totalPrice,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};