<template>
  <el-container>
    <el-header>
      <el-menu
        :router="true"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="booking">预约中心</el-menu-item>
        <el-menu-item index="orderlist">我的预约</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Order",
};
</script>

<style scoped>
</style>