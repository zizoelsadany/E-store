import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success('Added to cart!');
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-dark-md overflow-hidden hover:shadow-xl dark:hover:shadow-dark-lg transition-all duration-350 ease-out hover:-translate-y-1 border border-gray-100 dark:border-slate-700 h-full flex flex-col"
    >
      <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-95 group-hover:brightness-110"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800';
          }}
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-bold text-base">Out of Stock</span>
          </div>
        )}
        {product.stock > 0 && product.stock <= 10 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            Limited Stock
          </div>
        )}
        {product.rating >= 4.5 && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold shadow-lg">
            ⭐ Top Rated
          </div>
        )}
      </div>
      <div className="p-4 bg-white dark:bg-slate-800 flex flex-col flex-grow">
        <h3 className="font-semibold text-base mb-2 line-clamp-2 text-gray-900 dark:text-slate-100 group-hover:text-amazon-orange transition-colors duration-250">{product.name}</h3>
        <p className="text-gray-600 dark:text-slate-400 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-slate-600'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-xs text-gray-600 dark:text-slate-400">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700 mt-auto">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-amazon-orange">
              ${product.price.toFixed(2)}
            </span>
            {product.stock > 0 && (
              <span className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">In Stock</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-amazon-orange text-white px-3 py-2 rounded-md hover:bg-orange-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
