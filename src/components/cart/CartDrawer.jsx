import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, checkout, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    if (!isAuthenticated) {
      setIsCartOpen(false);
      navigate('/login');
      return;
    }

    try {
      await checkout();
      setSuccessMsg('Order placed successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to place order');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" style={{zIndex:"2000"}}>
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity cursor-pointer" 
        onClick={() => setIsCartOpen(false)} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col relative z-10">
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="text-lg font-bold text-stone-900">Your Cart</h2>
            </div>
            
            <button 
              type="button"
              onClick={() => setIsCartOpen(false)} 
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-colors"
              title="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {errorMsg && <div className="m-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">{errorMsg}</div>}
          {successMsg && <div className="m-4 p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl border border-emerald-200">{successMsg}</div>}

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-stone-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto stroke-1" />
                <p className="text-sm">Your cart is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id || item._id} className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="flex-1 min-w-0 pr-3">
                    <h4 className="font-semibold text-stone-900 text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-stone-500 font-medium">${Number(item.price).toFixed(2)}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button onClick={() => updateQuantity(item.id || item._id, -1)} className="p-1 rounded-lg bg-white border border-stone-200 hover:bg-stone-100">
                      <Minus className="w-3.5 h-3.5 text-stone-600" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id || item._id, 1)} className="p-1 rounded-lg bg-white border border-stone-200 hover:bg-stone-100">
                      <Plus className="w-3.5 h-3.5 text-stone-600" />
                    </button>
                    <button onClick={() => removeFromCart(item.id || item._id)} className="p-1 text-red-500 hover:text-red-700 ml-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              <div className="flex items-center justify-between text-base font-bold text-stone-900">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                disabled={loading}
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-semibold rounded-2xl transition duration-200 shadow-md text-sm cursor-pointer"
              >
                {loading ? 'Processing Order...' : isAuthenticated ? 'Place Order' : 'Login to Order'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;