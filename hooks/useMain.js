import { ref, reactive, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { OrderApi } from '@/api/orderApi';

export function useMain() {
  const formInfo = reactive({
    name: '',
    mobile: '',
    content: '',
    price: '',
    depart_date: '',
    address: ''
  });

  const initFormInfo = {
    name: '',
    mobile: '',
    content: '',
    price: '',
    depart_date: '',
    address: ''
  };

  const drawer = ref(false);

  const queryClient = useQueryClient();
  const router = useRouter();

  const showOrder = (id) => {
    router.push(`/order/${id}`);
  };

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
      console.log('刪除error:', error);
    }
  };

  //計算總和
  const getSummaries = (param) => {
    const { columns, data } = param;
    const sums = [];

    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = h('div', { style: { textDecoration: 'underline' } }, ['總計']);
        return;
      }

      if (column.property === 'price') {
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => Number.isNaN(value))) {
          const total = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!Number.isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);

          const formattedTotal = new Intl.NumberFormat('zh-TW', {
            style: 'currency',
            currency: 'TWD',
            minimumFractionDigits: 0
          }).format(total);

          sums[index] = formattedTotal;
        } else {
          sums[index] = 'N/A';
        }
      } else {
        sums[index] = '';
      }
    });
    return sums;
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return {
    state: { formInfo, drawer, orderList, orderListIsLoading },
    actions: { cancelClick, confirmClick, deleteOrder, getSummaries, showOrder, formatPrice }
  };
}
