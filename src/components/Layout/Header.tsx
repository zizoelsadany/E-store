import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useThemeStore } from '@/store/themeStore';
import { Search, ShoppingCart, User, LogOut, Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const { isDark, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const cartItemsCount = getTotalItems();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-amazon-dark dark:bg-slate-900 text-white sticky top-0 z-50 shadow-lg dark:shadow-dark-lg transition-all duration-300">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-amazon-orange rounded-md transition duration-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <Link to="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity duration-300">
              <span className="text-xl md:text-2xl font-bold text-amazon-orange">E-Store</span>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2.5 pl-10 rounded-l-md text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-amazon-orange transition-all duration-250"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <button className="bg-amazon-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded-r-md transition duration-300 hover:shadow-lg">
              Search
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-md hover:bg-gray-700 dark:hover:bg-slate-700 transition duration-300 text-yellow-400"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <>
                {/* Cart */}
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
                  <span className="text-sm">Cart</span>
                </Link>

                {/* Profile */}
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 hover:text-amazon-orange transition duration-300 p-2.5 rounded-md hover:bg-gray-700 dark:hover:bg-slate-700"
                  title={user?.name}
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm truncate max-w-[100px]">{user?.name}</span>
                </Link>

                {/* Admin Button */}
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="bg-amazon-orange hover:bg-orange-600 text-white px-3 py-2 rounded-md transition duration-300 text-sm font-semibold"
                  >
                    Admin
                  </Link>
                )}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 hover:text-red-400 transition duration-300 p-2.5 rounded-md hover:bg-gray-700 dark:hover:bg-slate-700"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-amazon-orange transition duration-300 px-4 py-2.5 rounded-md hover:bg-gray-700 dark:hover:bg-slate-700 text-sm font-medium"
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

          {/* Mobile Cart & Theme */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-amazon-orange rounded-md transition duration-300"
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

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
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2.5 pl-10 rounded-md text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-700 dark:border-slate-700 py-4">
            <div className="space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-300">
                    Welcome, {user?.name}
                  </div>
                  
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-3 hover:bg-amazon-orange transition duration-300 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <Link
                    to="/profile"
                    className="block px-4 py-3 hover:bg-amazon-orange transition duration-300 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-red-600 transition duration-300 text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 hover:bg-amazon-orange transition duration-300 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 bg-amazon-orange hover:bg-orange-600 transition duration-300 text-sm font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
