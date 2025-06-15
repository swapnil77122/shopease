import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-4">Welcome to ShopEase</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Your one-stop destination for affordable, high-quality tech accessories. Discover gadgets that make life easier, more fun, and more connected.
        </p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
        >
          Explore Products
        </Link>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
            <img src="/images/earbuds.jpeg" alt="Earbuds" className="rounded-lg h-40 mx-auto mb-4 object-cover" />
            <h2 className="text-xl font-semibold mb-2">Top Audio Gear</h2>
            <p className="text-gray-600">Experience premium sound with our wireless earbuds and speakers.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
            <img src="/images/smartwatch.jpeg" alt="Smartwatch" className="rounded-lg h-40 mx-auto mb-4 object-cover" />
            <h2 className="text-xl font-semibold mb-2">Smart Wearables</h2>
            <p className="text-gray-600">Stay fit, get notifications, and track your health with our smartwatches.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
            <img src="/images/charger.jpeg" alt="Charger" className="rounded-lg h-40 mx-auto mb-4 object-cover" />
            <h2 className="text-xl font-semibold mb-2">Fast Charging</h2>
            <p className="text-gray-600">Need speed? Our USB-C chargers get your device powered fast and safe.</p>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Shop With Us?</h3>
          <ul className="text-gray-700 text-lg space-y-2">
            <li>🚚 Free Delivery on Orders Over ₹999</li>
            <li>🛡️ 7-Day Replacement Guarantee</li>
            <li>💳 Secure Payment Gateway</li>
            <li>🎁 Exclusive Member Discounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
