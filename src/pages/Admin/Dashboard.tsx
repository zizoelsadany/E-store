import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as productService from '@/services/productService';
import * as orderService from '@/services/orderService';
import * as userService from '@/services/userService';
import { Product, Order, User } from '@/types';
import Loading from '@/components/Loading';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [revenueData, setRevenueData] = useState<{ month: string; revenue: number }[]>([]);
  const [ordersData, setOrdersData] = useState<{ month: string; orders: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, orders, users] = await Promise.all([
          productService.getProducts(),
          orderService.getOrders(),
          userService.getUsers(),
        ]);

        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        
        // Mock monthly data for charts
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const revenueByMonth = months.map((month, i) => ({
          month,
          revenue: Math.floor(Math.random() * 10000) + 5000,
        }));
        const ordersByMonth = months.map((month, i) => ({
          month,
          orders: Math.floor(Math.random() * 50) + 20,
        }));

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalUsers: users.length,
          totalRevenue,
        });
        setRevenueData(revenueByMonth);
        setOrdersData(ordersByMonth);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-amazon-orange">{stats.totalProducts}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">${stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue by Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#ff9900" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Orders by Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#0284c7" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/products"
            className="bg-amazon-orange text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition text-center font-semibold"
          >
            Manage Products
          </Link>
          <Link
            to="/admin/categories"
            className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition text-center font-semibold"
          >
            Manage Categories
          </Link>
          <Link
            to="/admin/orders"
            className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition text-center font-semibold"
          >
            Manage Orders
          </Link>
          <Link
            to="/admin/users"
            className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition text-center font-semibold"
          >
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
}
