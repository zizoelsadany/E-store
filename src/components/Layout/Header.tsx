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
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity duration-300">
              <span className="text-xl md:text-2xl font-bold text-amazon-orange">E-Store</span>
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link
                to="/admin"
                className="hidden md:flex items-center gap-1 bg-amazon-orange hover:bg-orange-600 px-3 py-1.5 rounded-md text-sm font-semibold transition duration-300"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 rounded-l-md text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Search Button */}
            <button className="md:hidden p-2 hover:bg-amazon-orange rounded-md transition duration-300">
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-amazon-orange rounded-md transition duration-300"
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="text-sm truncate max-w-20 md:max-w-32">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-amazon-orange rounded-md transition duration-300"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 hover:bg-amazon-orange px-3 py-2 rounded-md transition duration-300"
              >
                <User className="w-5 h-5" />
                <span className="text-sm">Login</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-amazon-orange rounded-md transition duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Admin Button */}
            {isAuthenticated && user?.role === 'admin' && (
              <Link
                to="/admin"
                className="md:hidden bg-amazon-orange hover:bg-orange-600 px-2 py-1.5 rounded-md text-xs font-semibold transition duration-300"
              >
                Admin
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 rounded-md text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
