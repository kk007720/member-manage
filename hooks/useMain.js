import { ref, reactive, watchEffect } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { OrderApi } from '@/api/orderApi';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lrdcvyjbgukvmwazbgdq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZGN2eWpiZ3Vrdm13YXpiZ2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzOTMzNzQsImV4cCI6MjAzNzk2OTM3NH0.YdRleij6RHHMRg2A2gVtgF9cnxque_Lw2YYIb7niUok'
);

export function useMain() {
  const formInfo = reactive({
    name: '',
    mobile: '',
    content: '',
    price: '',
    depart_date: ''
  });

  const initFormInfo = {
    name: '',
    mobile: '',
    content: '',
    price: '',
    depart_date: ''
  };

  const drawer = ref(false);

  const queryClient = useQueryClient();

  const {
    isPending,
    isLoading: orderListIsLoading,
    isError,
    data: orderList,
    error
  } = useQuery({
    queryKey: ['order-list'],
    queryFn: OrderApi.fetchOrders
  });

  function cancelClick() {
    drawer.value = false;
  }

  const confirmClick = async () => {
    try {
      await ElMessageBox.confirm(`確定新增嗎？`, '', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
        draggable: true,
        overflow: true
      });

      drawer.value = false;
      console.log('**新增formInfo**', formInfo);

      await OrderApi.addOrder(formInfo);
      ElMessage({
        message: '新增成功!',
        type: 'success'
      });
      Object.assign(formInfo, initFormInfo);
      queryClient.invalidateQueries({ queryKey: ['order-list'] });
    } catch (error) {
      console.error('Error in confirmClick:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      console.log('**刪除orderId**', orderId);
      await ElMessageBox.confirm('確定刪除？', '訊息', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      });

      await OrderApi.deleteOrder(orderId);

      ElMessage({
        message: '已刪除!',
        type: 'success'
      });
      queryClient.invalidateQueries({ queryKey: ['order-list'] });
    } catch (error) {
      console.log('刪除error', error);
    }
  };

  return {
    state: { formInfo, drawer, orderList, orderListIsLoading },
    actions: { cancelClick, confirmClick, deleteOrder }
  };
}
