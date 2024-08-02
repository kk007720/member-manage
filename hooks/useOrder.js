import { useQuery, useQueryClient, keepPreviousData } from '@tanstack/vue-query';
import { OrderApi } from '@/api/orderApi';
import { SituationApi } from '@/api/situationApi';
import { useRoute } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';

export function useOrder() {
  const textarea = ref(null);
  const route = useRoute();
  const id = computed(() => route.params.id);

  const columns = computed(() => {
    if (window.innerWidth >= 1200) {
      return 4;
    } else if (window.innerWidth >= 992) {
      return 3;
    } else if (window.innerWidth >= 768) {
      return 2;
    } else {
      return 1;
    }
  });

  //抓order
  const {
    isPending,
    isLoading: orderIsLoading,
    isError,
    data: order,
    error
  } = useQuery({
    queryKey: ['order'],
    queryFn: () => OrderApi.fetchSpecificOrder(id.value)
  });

  //抓處理情況
  const {
    isLoading: situationIsLoading,
    data: situation,
    isSuccess
  } = useQuery({
    queryKey: ['situation'],
    queryFn: () => SituationApi.fetchSpecificSituation(id.value),
    placeholderData: keepPreviousData
  });
  //監控proxy回來設給textarea
  watch([situation], () => {
    if (situation.value && situation.value.length > 0) {
      textarea.value = situation.value[0].content;
    }
  });

  const updateSituation = async () => {
    try {
      await ElMessageBox.confirm(`確定送出嗎？`, '', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
        draggable: true,
        overflow: true
      });

      console.log('**新增textarea**', textarea);

      await SituationApi.addSituation({
        content: textarea.value,
        orderId: id.value
      });
      ElMessage({
        message: '修改成功!',
        type: 'success'
      });
    } catch (error) {
      console.error('Error in confirmClick:', error);
    }
  };

  return {
    state: { columns, textarea, orderIsLoading, isError, order },
    actions: { updateSituation }
  };
}
