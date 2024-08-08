<template>
  <div class="p-10">
    <div class="font-bold">
      這是一個用來記錄訂單的系統
      <p>made by chia ming , kuo</p>
    </div>
  </div>
  <Card v-model="modelParent"></Card>
  <el-button type="primary" @click="handleSubmit">送出</el-button>
</template>

<script setup>
const modelParent = ref(0);
const handleSubmit = () => {
  console.log(modelParent.value);
};
</script>

<style></style>
