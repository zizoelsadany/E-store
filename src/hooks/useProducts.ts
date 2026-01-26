import { useState, useEffect } from 'react';
import { Product, ProductFilters } from '@/types';
import * as productService from '@/services/productService';
import { useProductStore } from '@/store/productStore';

export function useProducts(filters?: ProductFilters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastUpdated = useProductStore((state) => state.lastUpdated);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProducts(filters);
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    filters?.category,
    filters?.minPrice,
    filters?.maxPrice,
    filters?.rating,
    filters?.search,
    lastUpdated,
  ]);

  return { products, loading, error };
}

