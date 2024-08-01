// src/api/supabaseApi.js
// import { supabase } from '@/src/supabaseClient';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lrdcvyjbgukvmwazbgdq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZGN2eWpiZ3Vrdm13YXpiZ2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzOTMzNzQsImV4cCI6MjAzNzk2OTM3NH0.YdRleij6RHHMRg2A2gVtgF9cnxque_Lw2YYIb7niUok'
);

export const OrderApi = {
  async fetchOrders() {
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
