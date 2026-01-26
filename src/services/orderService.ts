import { api } from './api';
import { Order, OrderItem, Address } from '@/types';

export const createOrder = async (
  items: OrderItem[],
  shippingAddress: Address,
  paymentMethod: string
): Promise<Order> => {
  try {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order: Omit<Order, 'id' | 'createdAt'> = {
      userId: 'current-user-id', // Will be set by backend
      items,
      total,
      status: 'pending',
      shippingAddress,
      paymentMethod,
    };

    const response = await api.post<Order>('/orders', order);
    return response.data;
  } catch (error: any) {
    // Fallback to mock order creation
    if (error.code === 'ERR_NETWORK') {
      const mockOrder: Order = {
        id: Date.now().toString(),
        userId: 'current-user-id',
        items,
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        status: 'pending',
        shippingAddress,
        paymentMethod,
        createdAt: new Date().toISOString(),
      };
      return mockOrder;
    }
    throw error;
  }
};

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get<Order[]>('/orders');
    return response.data;
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      return [];
    }
    throw error;
  }
};

export const getOrder = async (id: string): Promise<Order> => {
  try {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Order not found');
    }
    throw error;
  }
};

export const updateOrderStatus = async (id: string, status: Order['status']): Promise<Order> => {
  const response = await api.patch<Order>(`/orders/${id}`, { status });
  return response.data;
};
