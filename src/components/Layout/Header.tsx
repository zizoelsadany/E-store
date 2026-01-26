import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useThemeStore } from '@/store/themeStore';
import { Search, ShoppingCart, User, LogOut, Moon, Sun } from 'lucide-react';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const { isDark, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const cartItemsCount = getTotalItems();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-amazon-dark dark:bg-slate-900 text-white sticky top-0 z-50 shadow-lg dark:shadow-dark-lg transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo and Admin Button */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity duration-300">
              <span className="text-2xl font-bold text-amazon-orange">E-Store</span>
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link
                to="/admin"
                className="bg-amazon-orange hover:bg-orange-600 text-white px-4 py-2 rounded-md transition duration-300 shadow-md hover:shadow-lg flex items-center gap-2 text-sm font-semibold hidden sm:flex transform hover:scale-105"
              >
                <User className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:flex">
            <div className="w-full flex shadow-md">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-4 py-2.5 text-gray-900 dark:text-slate-100 dark:bg-slate-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amazon-orange transition-all duration-250"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const query = (e.target as HTMLInputElement).value;
                    navigate(`/products?search=${encodeURIComponent(query)}`);
                  }
                }}
              />
              <button className="bg-amazon-orange hover:bg-orange-600 px-6 py-2 rounded-r-md transition duration-300 hover:shadow-lg">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-md hover:bg-gray-700 dark:hover:bg-slate-700 transition duration-300 text-yellow-400"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="relative flex items-center gap-1.5 hover:text-amazon-orange transition duration-300 p-2.5 rounded-md hover:bg-gray-700 dark:hover:bg-slate-700"
                  title="Shopping Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                      {cartItemsCount}
                    </span>
                  )}
                  <span className="hidden sm:inline text-sm">Cart</span>
                </Link>

                <div className="hidden sm:block w-px h-6 bg-gray-600"></div>

                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 hover:text-amazon-orange transition duration-300 p-2.5 rounded-md hover:bg-gray-700 dark:hover:bg-slate-700"
                  title={user?.name}
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm truncate max-w-[100px]">{user?.name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 hover:text-red-400 transition duration-300 p-2.5 rounded-md hover:bg-gray-700 dark:hover:bg-slate-700"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-amazon-orange transition duration-300 px-3 py-2.5 rounded-md hover:bg-gray-700 dark:hover:bg-slate-700 text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-amazon-orange hover:bg-orange-600 text-white px-4 py-2.5 rounded-md transition duration-300 shadow-md hover:shadow-lg text-sm font-semibold transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
