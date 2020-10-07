<template>
  <el-container>
    <el-header class="head">
      <div class="a" @click="userData">个人信息</div>
      <div class="b" @click="orderlist">我的预约</div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "User",
  data() {
    return {};
  },
  methods: {
    userData() {
      this.$router.push('/userdata')
    },
    orderlist() {
      this.$router.push('/orderlist')
    },
  },
  created() {
    this.$router.push('/userdata')
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.head {
  margin: 0;
  padding: 0;
  display: flex;
}
.a {
  display: block;
  flex: 1;
  text-align: center;
  border-bottom: 1px solid slategrey;
  height: 5vh;
}
.b {
  display: block;
  flex: 1;
  text-align: center;
  border-left: 1px solid slategrey;
  border-bottom: 1px solid slategrey;
  height: 5vh;
}
</style>