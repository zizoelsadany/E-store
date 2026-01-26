import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function ProfileContent() {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-amazon-orange focus:border-amazon-orange"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-amazon-orange focus:border-amazon-orange"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  disabled
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                  value={user?.role.toUpperCase()}
                />
              </div>
              <button
                type="submit"
                className="bg-amazon-orange text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="space-y-2">
              <Link
                to="/orders"
                className="block text-amazon-orange hover:underline font-semibold"
              >
                Order History
              </Link>
              <Link
                to="/cart"
                className="block text-amazon-orange hover:underline font-semibold"
              >
                Shopping Cart
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="block text-amazon-orange hover:underline font-semibold"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
