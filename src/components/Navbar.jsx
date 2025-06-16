import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <NavLink to="/" className="text-xl font-bold text-blue-600 hover:underline">
        ShopEase
      </NavLink>
      <div className="space-x-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-100 text-blue-700 px-3 py-1 rounded shadow-sm'
              : 'hover:bg-blue-50 hover:text-blue-600 px-3 py-1 rounded'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-100 text-blue-700 px-3 py-1 rounded shadow-sm'
              : 'hover:bg-blue-50 hover:text-blue-600 px-3 py-1 rounded'
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-100 text-blue-700 px-3 py-1 rounded shadow-sm'
              : 'hover:bg-blue-50 hover:text-blue-600 px-3 py-1 rounded'
          }
        >
          Cart
        </NavLink>
        <NavLink
          to="/checkout"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-100 text-blue-700 px-3 py-1 rounded shadow-sm'
              : 'hover:bg-blue-50 hover:text-blue-600 px-3 py-1 rounded'
          }
        >
          Checkout
        </NavLink>
        <NavLink
          to="/invoices"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-100 text-blue-700 px-3 py-1 rounded shadow-sm'
              : 'hover:bg-blue-50 hover:text-blue-600 px-3 py-1 rounded'
          }
        >
          Invoices
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
