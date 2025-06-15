// src/pages/Cart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg mb-4">🛒 Your cart is feeling a bit lonely...</p>
          <p className="mb-6">Start exploring and add something you love!</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between items-center border p-4 rounded">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">₹{item.price} x {item.quantity}</p>
                  <div className="flex mt-2 items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 bg-gray-300 rounded-l"
                    >-</button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 bg-gray-300 rounded-r"
                    >+</button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center font-bold text-lg">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
