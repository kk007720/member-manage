<template>
  <div class="flex min-h-screen flex-col">
    <header>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#00353a"
        text-color="#fff"
        active-text-color="#FFCAC5"
        @select="handleSelect"
      >
        <el-menu-item index="1"><NuxtLink to="/">主頁</NuxtLink></el-menu-item>
        <el-menu-item index="5"><NuxtLink to="/about">關於</NuxtLink></el-menu-item>
        <!-- <el-menu-item index="6"><NuxtLink to="/order">輸入</NuxtLink></el-menu-item> -->
        <!-- <el-sub-menu index="2">
          <template #title>報表</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-sub-menu>
        </el-sub-menu> -->
        <!-- <el-menu-item index="3" disabled>Info</el-menu-item> -->
        <!-- <el-menu-item index="4">Orders</el-menu-item> -->
      </el-menu>
    </header>
    <main class="flex-grow">
      <ClientOnly> <slot /></ClientOnly>
    </main>
    <footer>
      <div class="flex items-center justify-end bg-[#00353a] p-5 text-white">made by kk.kuo</div>
    </footer>
  </div>
</template>

<script setup>
const activeIndex2 = ref('1');
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style></style>
