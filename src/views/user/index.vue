<template>
  <div>
    <section>
      <el-table class="table"
        :show-header="false"
        :data="tableData"
        border
        :cell-style="columnStyle"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column width="180" prop="name"></el-table-column>
        <el-table-column prop="amount1"></el-table-column>
      </el-table>
    </section>
    <el-row>
      <el-button type="danger" @click="logout">登出</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      userdata: {},
    };
  },
  computed: {
    //因为数据用到了dataform中的数据，所以写在了computed中
    tableData() {
      return [
        {
          name: "用户名",
          amount1: this.userdata.name,
        },
        {
          name: "学号",
          amount1: this.userdata.idno,
        },
        {
          name: "邮箱",
          amount1: this.userdata.mail,
        },
      ];
    },
  },
  methods: {
    getData() {
      
    },
    //自定义列背景色
    columnStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        //第三第四列的背景色就改变了2和3都是列数的下标
        return "background:#f3f6fc;";
      } else {
        return "background:#ffffff;";
      }
    },
    getById(){
     this.axios.get(
        "/ums-user/getmyuser",
        (response) => {
          // console.log(response.obj)
          this.userdata=response.obj
        }
      );
    },
    logout() {
      //清空服务器端的登录状态
      if(this.getRole() == 'admin')
      {
        this.axios.post('/ums-admin/logout',response => {
          this.axios.setToken(null,null)
          this.setRole(null)
          this.setToken(null)
          this.$router.push({
            path: '/index'
          })
        },{id: this.myuser.id})
      }
      else if(this.getRole() == 'user')
      {
        this.axios.setToken(null,null)
        this.setRole(null)
        this.setToken(null)
        window.location.href = 'https://cer.ysu.edu.cn/authserver/logout?service=http://39.96.6.126:38005/logout'
      }
      else{
        this.$router.push({
            path: '/index'
          })
      }
    },
  },
  
  created(){
    this.getById()
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
</style>