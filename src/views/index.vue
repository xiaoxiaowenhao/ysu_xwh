<template>
  <div class="wrap">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="18" :offset="2">
          <el-form-item label="用户名">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="2">
          <el-form-item label="密码">
            <el-input
              placeholder="请输入密码"
              v-model="form.password"
              show-password
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="5">
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      console.log(this.form.username);
      console.log(this.form.password);
      this.$router.push({ path: "/home" });
    },
  },
  created() {},
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
/* .wrap {
  display: flex;
  align-items: center;
  justify-content: center;
} */
</style>