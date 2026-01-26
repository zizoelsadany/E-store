import { api } from './api';
import { User } from '@/types';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>('/users');
    return response.data;
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      return [];
    }
    throw error;
  }
};

export const getUser = async (id: string): Promise<User> => {
  try {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      throw new Error('User not found');
    }
    throw error;
  }
};

export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};
