<template>
  <!-- <el-container>
    <el-header class="head">
      个人中心
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container> -->
  <router-view></router-view>
</template>

<script>
export default {
  name: "User",
  data() {
    return {};
  },
  methods: {
    userData() {
      this.$router.push("/userdata");
    },
    orderlist() {
      this.$router.push("/orderlist");
    },
  },
  created() {
    this.$router.push("/userdata");
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.head {
  line-height: 60px;
  text-align: center;
  margin: 0;
  padding: 0;
  display: flex;
}
/* .a {
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
} */
</style>