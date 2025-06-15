import { useState } from 'react';
import products from '../data/products';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    const itemWithQuantity = { ...product, quantity: 1 };
    addToCart(itemWithQuantity);
    setAddedItems((prev) => ({
      ...prev,
      [product.id]: 1,
    }));
  };

  const handleQuantityChange = (productId, delta) => {
    setAddedItems((prev) => {
      const currentQty = prev[productId] || 1;
      const newQty = currentQty + delta;
      if (newQty < 1) return prev;

      const product = products.find((p) => p.id === productId);
      if (product) {
        addToCart({ ...product, quantity: newQty });
      }

      return {
        ...prev,
        [productId]: newQty,
      };
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md transition p-4 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 mt-2 text-sm text-center">{product.description}</p>
            <p className="text-blue-600 font-bold mt-3 text-lg">₹{product.price}</p>

            {addedItems[product.id] ? (
              <div className="mt-4 flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold">{addedItems[product.id]}</span>
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <span className="text-green-600 font-medium">✔ Added to Cart</span>
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
