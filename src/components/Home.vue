<template>
  <el-container class="wrap">
    <el-header class="head">燕山大学双创基地预约系统</el-header>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
    <el-footer class="foot">
      <div class="a" @click="order"><i class="el-icon-bank-card"></i></div>
      <div class="a" @click="user"><i class="el-icon-user"></i></div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    order() {
      //console.log(123)
      this.$router.push('/order')
    },
    user() {
      //console.log(321)
      this.$router.push('/user')
    },
  },
  created() {
    this.$router.push('/order')
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.wrap {
  height: 100vh;
}
.head {
  line-height: 60px;
  text-align: center;
  
}
.main {
  /* background-color: cadetblue; */
  border: 1px solid slategrey;
}
.foot {
  margin: 0;
  padding: 0; 
  display: flex;
}
.a {
  display: block;
  flex: 1;
  text-align: center;
  border-right: 1px solid slategrey;
}
.a i {
  line-height: 60px;
  font-size: 300%;
}
</style>