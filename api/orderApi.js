import { useSupabase } from '@/composables/useSupabase';

export const OrderApi = {
  async fetchOrders() {
    const supabase = useSupabase();
    try {
      const response = await supabase.from('order').select('*');
      if (response.error) throw error;
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },
  async addOrder(order) {
    const supabase = useSupabase();

    try {
      const { data, error } = await supabase.from('order').insert([
        {
          name: order.name,
          mobile: order.mobile,
          content: order.content,
          price: order.price,
          depart_date: order.depart_date
        }
      ]);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  },
  // 更新订单
  async updateOrder(orderId, order) {
    try {
      const { data, error } = await supabase.from('orders').update(order).eq('id', orderId);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },
  // 删除订单
  async deleteOrder(orderId) {
    const supabase = useSupabase();

    try {
      const { data, error } = await supabase.from('order').delete().eq('id', orderId);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
};
