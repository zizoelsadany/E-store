import { api } from './api';
import { Category } from '@/types';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      // Return mock categories
      return [
        { id: '1', name: 'Electronics', slug: 'electronics' },
        { id: '2', name: 'Accessories', slug: 'accessories' },
        { id: '3', name: 'Clothing', slug: 'clothing' },
        { id: '4', name: 'Home & Garden', slug: 'home-garden' },
        { id: '5', name: 'Sports', slug: 'sports' },
      ];
    }
    throw error;
  }
};

export const createCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
  const response = await api.post<Category>('/categories', category);
  return response.data;
};

export const updateCategory = async (id: string, category: Partial<Category>): Promise<Category> => {
  const response = await api.put<Category>(`/categories/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
