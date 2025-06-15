import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-xl font-bold text-blue-600">ShopEase</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/products" className="hover:text-blue-500">Products</Link>
        <Link to="/cart" className="hover:text-blue-500">Cart</Link>
        <Link to="/checkout" className="hover:text-blue-500">Checkout</Link>
        <Link to="/invoices" className="hover:text-blue-500">Invoices</Link>
      </div>
    </nav>
  );
};

export default Navbar;
