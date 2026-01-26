import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import ProtectedRoute from '@/components/ProtectedRoute';

function CartContent() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Your Cart is Empty</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Add some products to get started!</p>
        <Link
          to="/products"
          className="inline-block bg-amazon-orange text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition shadow-md hover:shadow-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-4 transition-colors"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full sm:w-32 h-32 object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500';
                }}
              />
              <div className="flex-1">
                <Link
                  to={`/products/${item.product.id}`}
                  className="text-xl font-semibold hover:text-amazon-orange transition text-gray-900 dark:text-white"
                >
                  {item.product.name}
                </Link>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.product.description}</p>
                <p className="text-amazon-orange font-bold text-lg mt-2">
                  ${item.product.price.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1 border dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-semibold w-8 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1 border dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-lg font-semibold mt-2 text-gray-900 dark:text-white">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 font-semibold transition"
          >
            Clear Cart
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-20 transition-colors">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t dark:border-gray-700 pt-2 mt-2">
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-amazon-orange">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-amazon-orange text-white text-center py-3 rounded-lg hover:bg-orange-600 transition font-semibold shadow-md hover:shadow-lg"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  return (
    <ProtectedRoute>
      <CartContent />
    </ProtectedRoute>
  );
}
