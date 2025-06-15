import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems = [], clearCart } = useCart(); // default empty array
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  const [error, setError] = useState('');

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!address.name || !address.email || !address.address || !address.phone) {
      setError('⚠️ Please fill in all the address fields');
      return;
    }

    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleString(),
      address,
      items: cartItems,
      total
    };

    const prev = JSON.parse(localStorage.getItem('invoices')) || [];
    localStorage.setItem('invoices', JSON.stringify([order, ...prev]));

    clearCart();
    navigate('/invoices');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address Form */}
        <div className="bg-white p-6 rounded shadow-lg border">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Shipping Details</h3>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={address.name}
              onChange={handleInput}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={address.email}
              onChange={handleInput}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={address.phone}
              onChange={handleInput}
            />
            <textarea
              name="address"
              placeholder="Full Address"
              rows="4"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={address.address}
              onChange={handleInput}
            />

            {error && <p className="text-red-600 font-medium">{error}</p>}

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition duration-200"
            >
              🛒 Place Order
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded shadow-lg border">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h3>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 italic">Your cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200 mb-4">
                {cartItems.map(item => (
                  <li key={item.id} className="py-2 flex justify-between text-gray-700">
                    <span>{item.name} <span className="text-sm text-gray-500">(x{item.quantity})</span></span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
