import { api } from './api';
import { AuthResponse, User } from '@/types';

// Mock JWT token generator (in production, this comes from backend)
const generateToken = (userId: string, role: string): string => {
  // Simple mock token - in production, backend generates real JWT
  return btoa(JSON.stringify({ userId, role, exp: Date.now() + 86400000 }));
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    // Try API first
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    // Fallback to mock data if API fails
    if (error.code === 'ERR_NETWORK' || error.response?.status >= 500) {
      // Mock users for development
      const mockUsers = [
        { 
          id: '1', 
          email: 'admin@example.com', 
          password: 'admin123', 
          name: 'Admin User', 
          role: 'admin' as const 
        },
        { 
          id: '2', 
          email: 'user@example.com', 
          password: 'user123', 
          name: 'John Doe', 
          role: 'user' as const 
        },
      ];

      const user = mockUsers.find((u) => u.email === email && u.password === password);
      if (!user) {
        throw new Error(`Invalid email or password. Please check your credentials and try again.`);
      }

      const { password: _, ...userWithoutPassword } = user;
      console.log('✅ Login successful for:', user.email, '| Role:', user.role);
      
      return {
        token: generateToken(user.id, user.role),
        user: { ...userWithoutPassword, createdAt: new Date().toISOString() },
      };
    }
    throw error;
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    // Fallback to mock registration
    if (error.code === 'ERR_NETWORK' || error.response?.status >= 500) {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      return {
        token: generateToken(newUser.id, newUser.role),
        user: newUser,
      };
    }
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get<User>('/auth/me');
    return response.data;
  } catch (error: any) {
    // Fallback: parse token to get user info
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const { state } = JSON.parse(authStorage);
      if (state?.token) {
        try {
          const decoded = JSON.parse(atob(state.token));
          // Return mock user based on token
          return {
            id: decoded.userId,
            email: decoded.userId === '1' ? 'admin@example.com' : 'user@example.com',
            name: decoded.userId === '1' ? 'Admin User' : 'John Doe',
            role: decoded.role,
            createdAt: new Date().toISOString(),
          };
        } catch {
          throw new Error('Invalid token');
        }
      }
    }
    throw new Error('Not authenticated');
  }
};
