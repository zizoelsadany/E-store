import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await login(formData.email, formData.password);
      
      // Get the updated user info after login
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const { state } = JSON.parse(authStorage);
        if (state?.user?.role === 'admin') {
          toast.success('Welcome Admin! 🎉');
          navigate('/admin');
        } else {
          toast.success('Login successful!');
          navigate('/');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-dark-lg p-8 space-y-6 animate-fade-in">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-amazon-orange mb-2">E-Store</h1>
            <h2 className="text-2xl font-bold text-primary mb-2">
              Welcome Back
            </h2>
            <p className="text-secondary text-sm">
              Sign in to your account to continue
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-orange focus:border-transparent transition duration-250"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-orange focus:border-transparent transition duration-250"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-amazon-orange to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amazon-orange focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400">or</span>
              </div>
            </div>

            <Link
              to="/register"
              className="w-full py-2.5 px-4 border-2 border-amazon-orange text-amazon-orange font-bold rounded-lg hover:bg-orange-50 dark:hover:bg-slate-700 transition duration-300 block text-center"
            >
              Create New Account
            </Link>
          </form>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700 dark:to-slate-700 rounded-lg p-4 border-2 border-amber-200 dark:border-orange-500">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">🔑</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-amber-900 dark:text-amber-100 mb-2">Demo Credentials:</p>
                <div className="space-y-1.5 text-xs">
                  <p className="text-amber-800 dark:text-amber-200">
                    <span className="font-semibold">👨‍💼 Admin:</span> 
                    <code className="bg-amber-100 dark:bg-slate-800 px-2 py-1 rounded ml-1 font-mono">admin@example.com</code>
                    <code className="bg-amber-100 dark:bg-slate-800 px-2 py-1 rounded ml-1 font-mono">/</code>
                    <code className="bg-amber-100 dark:bg-slate-800 px-2 py-1 rounded ml-1 font-mono">admin123</code>
                  </p>
                  <p className="text-amber-800 dark:text-amber-200">
                    <span className="font-semibold">👤 User:</span> 
                    <code className="bg-amber-100 dark:bg-slate-800 px-2 py-1 rounded ml-1 font-mono">user@example.com</code>
                    <code className="bg-amber-100 dark:bg-slate-800 px-2 py-1 rounded ml-1 font-mono">/</code>
                    <code className="bg-amber-100 dark:bg-slate-800 px-2 py-1 rounded ml-1 font-mono">user123</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
