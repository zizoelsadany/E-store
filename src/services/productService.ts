import { api } from './api';
import { Product, ProductFilters } from '@/types';

export const getProducts = async (filters?: ProductFilters): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.rating) params.append('rating', filters.rating.toString());
    if (filters?.search) params.append('q', filters.search);

    const response = await api.get<Product[]>(`/products?${params.toString()}`);
    return response.data;
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      // Return mock products if API is not available
      return getMockProducts();
    }
    throw error;
  }
};

export const getProduct = async (id: string): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      const products = getMockProducts();
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error('Product not found');
      return product;
    }
    throw error;
  }
};

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
  try {
    const response = await api.post<Product>('/products', product);
    return response.data;
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK' || error.response?.status === 0) {
      throw new Error(
        'Unable to connect to the server. Please make sure the backend is running on port 3001. Run "npm run server" in another terminal.'
      );
    }
    throw error;
  }
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};

// Mock products for development
const getMockProducts = (): Product[] => {
  return [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      category: 'Electronics',
      stock: 50,
      rating: 4.5,
      reviews: 234,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Smart Watch Pro',
      description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and GPS.',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      category: 'Electronics',
      stock: 30,
      rating: 4.7,
      reviews: 189,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Laptop Backpack',
      description: 'Durable laptop backpack with multiple compartments and USB charging port.',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      category: 'Accessories',
      stock: 75,
      rating: 4.3,
      reviews: 156,
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
      category: 'Electronics',
      stock: 100,
      rating: 4.4,
      reviews: 312,
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard with Cherry MX switches and customizable keys.',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
      category: 'Electronics',
      stock: 40,
      rating: 4.6,
      reviews: 278,
      createdAt: new Date().toISOString(),
    },
    {
      id: '6',
      name: 'USB-C Hub',
      description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500',
      category: 'Accessories',
      stock: 60,
      rating: 4.2,
      reviews: 145,
      createdAt: new Date().toISOString(),
    },
  ];
};
