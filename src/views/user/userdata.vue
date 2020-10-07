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
  </div>
</template>

<script>
export default {
  name: "UserData",
  data() {
    return {
      //请求回来的数据
      userdata: {
        username: "刘佳",
        usernum: "170120010235",
        usertel: "15389332481",
        usermail: "1033669061@qq.com",
      },
    };
  },
  computed: {
    //因为数据用到了dataform中的数据，所以写在了computed中
    tableData() {
      return [
        {
          name: "用户名",
          amount1: this.userdata.username,
        },
        {
          name: "学号",
          amount1: this.userdata.usernum,
        },
        {
          name: "电话号码",
          amount1: this.userdata.usertel,
        },
        {
          name: "邮箱",
          amount1: this.userdata.usermail,
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
  },
};
</script>

<style soped>
.table {
  padding: 10px;
}
</style>