import { useSupabase } from '@/composables/useSupabase';

export const SituationApi = {
  async fetchSpecificSituation(orderId) {
    const supabase = useSupabase();
    try {
      const response = await supabase.from('situation').select('*').eq('order_id', orderId);
      if (response.error) throw error;
      return response.data;
    } catch (error) {
      console.error('Error fetching specific situation:', error);
      throw error;
    }
  },

  async addSituation({ content, orderId }) {
    const supabase = useSupabase();
    try {
      const { data, error } = await supabase.from('situation').insert([
        {
          order_id: orderId,
          content: content
        }
      ]);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding situation:', error);
      throw error;
    }
  }
};
