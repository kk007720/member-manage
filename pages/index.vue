<template>
  <section class="p-2 sm:p-16">
    <el-table
      v-loading="orderListIsLoading"
      :data="orderList"
      height="450"
      style="width: 100%"
      resizable
      border
      :default-sort="{ prop: 'depart_date', order: 'ascending' }"
      :summary-method="getSummaries"
      show-summary
    >
      <el-table-column prop="depart_date" sortable label="日期" width="120" />
      <el-table-column prop="name" label="姓名">
        <template #default="scope">
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手機" />
      <el-table-column prop="address" show-overflow-tooltip label="地址" />
      <el-table-column prop="content" label="項目" width="200" />
      <el-table-column prop="price" sortable label="價格">
        <template #default="scope">
          {{ formatPrice(scope.row.price) }}
        </template>
      </el-table-column>

      <el-table-column width="150" fixed="right">
        <template #default="scope">
          <div class="flex flex-row">
            <el-button size="small" type="primary" round @click="showOrder(scope.row.id)"
              >查看</el-button
            >
            <el-button size="small" type="danger" round @click="deleteOrder(scope.row.id)"
              >刪除</el-button
            ></div
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="mt-5 text-center">
      <el-button type="primary" round color="#00353a" @click="drawer = true"
        >輸入預約</el-button
      ></div
    >
    <!-- 輸入抽屜 -->
    <el-drawer v-model="drawer" class="min-w-[20rem]">
      <template #header>
        <div class="text-xl font-bold">輸入預約資訊</div>
      </template>
      <template #default>
        <el-form label-width="auto" :model="formInfo">
          <el-form-item label="姓名" label-position="top">
            <el-input v-model="formInfo.name" />
          </el-form-item>
          <el-form-item label="預約日期" label-position="top">
            <el-input v-model="formInfo.depart_date" type="date" />
          </el-form-item>
          <el-form-item label="手機" label-position="top">
            <el-input v-model="formInfo.mobile" show-word-limit maxlength="10" />
          </el-form-item>
          <el-form-item label="價錢" label-position="top">
            <el-input v-model="formInfo.price" />
          </el-form-item>
          <el-form-item label="地址" label-position="top">
            <el-input v-model="formInfo.address" />
          </el-form-item>
          <el-form-item label="項目" label-position="top">
            <el-input
              maxlength="100"
              :rows="5"
              v-model="formInfo.content"
              type="textarea"
              show-word-limit
              placeholder="請輸入服務項目"
            />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick" color="#00353a">確定新增</el-button>
        </div>
      </template>
    </el-drawer>
  </section>
</template>

<script setup>
import { useMain } from '../hooks/useMain';

const { state, actions } = useMain();

const { formInfo, drawer, orderList, orderListIsLoading } = state;
const { cancelClick, confirmClick, deleteOrder, getSummaries, showOrder, formatPrice } = actions;
</script>

<style scoped>
/* Home Page 的樣式 */
</style>
