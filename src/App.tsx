import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';

// Public pages
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import ProductDetails from '@/pages/ProductDetails';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

// Protected user pages
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Profile from '@/pages/Profile';
import Orders from '@/pages/Orders';

// Admin pages
import AdminDashboard from '@/pages/Admin/Dashboard';
import AdminProducts from '@/pages/Admin/Products';
import AdminCategories from '@/pages/Admin/Categories';
import AdminOrders from '@/pages/Admin/Orders';
import AdminUsers from '@/pages/Admin/Users';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected user routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute requireAdmin>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute requireAdmin>
              <AdminCategories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute requireAdmin>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requireAdmin>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
