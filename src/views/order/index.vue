<template>
  <el-container>
    <el-header>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
      >
        <el-menu-item index="orderlist">预约中心</el-menu-item>
        <el-menu-item index="booking">预约申请</el-menu-item>
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
  created() {},
};
</script>

<style scoped>
</style>