<template>
  <div class="p-10">
    <!-- <h1>Dynamic Component: {{ id }}</h1> -->
    <div v-if="orderIsLoading">
      <el-skeleton :rows="5" animated />
    </div>
    <div v-else-if="isError">
      <p>無法載入: {{ error.message }}</p>
    </div>
    <div v-else>
      <el-descriptions
        v-loading="orderIsLoading"
        class="text-red-600"
        :title="`出發日期: ${order[0]?.depart_date}`"
        :column="columns"
        size="default"
        border
      >
        <!-- <template #extra>
        <el-button type="primary">Operation</el-button>
      </template> -->
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <user />
              </el-icon>
              編號
            </div>
          </template>
          {{ order[0]?.id }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <user />
              </el-icon>
              姓名
            </div>
          </template>
          {{ order[0]?.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <iphone />
              </el-icon>
              手機
            </div>
          </template>
          {{ order[0]?.mobile }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <location />
              </el-icon>
              地址
            </div>
          </template>
          {{ order[0]?.address }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <tickets />
              </el-icon>
              價錢
            </div>
          </template>
          <el-tag type="warning" size="large">{{ order[0]?.price }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <office-building />
              </el-icon>
              項目
            </div>
          </template>
          {{ order[0]?.content }}
        </el-descriptions-item>
      </el-descriptions>

      <div class="mt-4">
        <div>處理情況：</div>
        <el-input v-model="textarea" type="textarea" class="mt-2" :rows="10"></el-input>
      </div>

      <div class="mt-4 flex flex-row justify-center gap-2">
        <el-button plain @click="$router.go(-1)">回上一頁</el-button>

        <el-button type="primary" color="#00353a" @click="updateSituation">送出</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrder } from '@/hooks/useOrder';
import { Iphone, Location, OfficeBuilding, Tickets, User } from '@element-plus/icons-vue';

const { state, actions } = useOrder();
const { columns, textarea, orderIsLoading, isError, order } = state;
const { updateSituation } = actions;

console.log('**specific order**', order);
</script>

<style scoped>
/* DynamicComponent styles */
</style>
