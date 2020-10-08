<template>
  <div>
    <el-row :gutter="20">
      <el-select 
      v-model="myst" 
      @change="getBySt()"
      placeholder="请选择审批状态">
        <el-option
        v-for="item in st"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        </el-option>
      </el-select>
      <!-- <el-button type="success" icon="el-icon-check" @click="batchpass()">批量通过</el-button> -->
    </el-row>
    <br>
    <el-table 
    :data="tableData" 
    style="width: 100%" 
    row-key="id"
    ref="tab"
    @select="select"
    @selection-change="handleSelectionChange"
    :row-class-name="tableRowClassName">
      <el-table-column width="40" type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="编号">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="申请人">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="房间名">
              <span>{{ props.row.roomname }}</span>
            </el-form-item>
            <el-form-item label="日期">
              <span>{{ props.row.orderDate }}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="时间ID" id="time">
              <span>{{ props.row.timename }}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="预约设备">
              <span>{{ props.row.equipmentname }}</span>
            </el-form-item>
            <el-form-item label="耗材使用">
              <span>{{ props.row.consumablename }}</span>
            </el-form-item>
            <el-form-item label="预约状态" prop="status">
              <span v-if="props.row.status === 5">已驳回</span>
              <span v-if="props.row.status === 1">等待老师审核</span>
              <span v-else-if="props.row.status === 2">等待管理员审核</span>
              <span v-else-if="props.row.status === 3">审核通过</span>
              <span v-else-if="props.row.status === 4">已取消</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- <el-table-column label="id" type="selection" ></el-table-column>
      <el-table-column label="编号" width="80" prop="id"></el-table-column>
      <el-table-column label="申请人" prop="username"></el-table-column> -->
      <el-table-column label="房间名" width="80" prop="roomname"></el-table-column>
      <el-table-column label="日期" prop="orderDate"></el-table-column>
      <el-table-column label="时间Id" width="175" prop="timename"></el-table-column>
      <!-- <el-table-column label="预约设备" prop="equipmentname"></el-table-column>
      <el-table-column label="耗材使用" prop="consumablename"></el-table-column>
      <el-table-column label="预约状态" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 5">已驳回</span>
          <span v-if="scope.row.status === 1">已提交申请</span>
          <span v-else-if="scope.row.status === 2">等待管理员审核</span>
          <span v-else-if="scope.row.status === 3">审核通过</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.status === 1">
            <!-- <el-button size="mini" type="success" @click="handleOk(scope.row.id)">通过</el-button>
            <el-button size="mini" type="danger" @click="handleNo(scope.row)">驳回</el-button> -->
            <el-button size="mini" type="danger" @click="handleCancel(scope.row)">取消</el-button>
          </template>
          <template v-else-if="scope.row.status === 2">
            <!-- <el-button size="mini" type="info" disabled @click="handleBack(scope.row.id)">等待</el-button> -->
            <el-button size="mini" disabled @click="handleCancel(scope.row)">等待中</el-button>
          </template>
          <template v-else-if="scope.row.status === 3">
            <el-button size="mini" disabled type="success" @click="void(0)">已成功</el-button>
          </template>
          <template v-else-if="scope.row.status === 4">
            <el-button size="mini" disabled type="info" @click="void(0)">已取消</el-button>
          </template>
          <template v-else-if="scope.row.status === 5">
            <el-button size="mini" disabled type="danger" @click="void(0)">已驳回</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:20px"
      background
      layout="prev, pager, next"
      :page-count="pages"
      :current-page.sync="query.pageNo"
      :page-size="query.pageSize"
      @current-change="getData"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'order-deal',
  data(){
    return {
      tableData: [],
      query:{
          name: '',
          pageSize: 7,
          pageNo: 1,
          withPage: 1,
          status:1
      },
      search:{
          name: ''
      },
      pages: 0,
      show: false,
      editid : null,
      multipleSelection: [],
      title: '',
      parentId: 0,
      myst:0,
      st:[{id:0,name:'全部'},{id:1,name:'待审批'},{id:2,name:'等待管理员审核'},{id:3,name:'已通过'},{id:5,name:'已驳回'},{id:4,name:'已取消'}]
    }
  },
  created() {
    this.getBySt()
  },
  methods: {
    getData(){
      this.axios.get('/order/list',response =>{
        this.tableData=response.obj.records
        this.pages=response.obj.pages
      },this.query)
    },
    select(selection, row) {
      if(row.status != 1){
        this.$refs['tab'].toggleRowSelection(row,false)
      }
    },
    getBySt()
    {
        if(this.myst == 0)
        {
            delete this.query['status']
            this.getData()
        }
        else{
            this.query.status = this.myst
              this.axios.get('/order/list',response =>{
              this.tableData=response.obj.records
              this.pages=response.obj.pages
          },this.query)
        }
    },
    dosearch(){
      this.query.name = this.search.name
      this.query.pageNo = 1
      this.getData()
    },
    handleSelectionChange(val)
    {
      this.multipleSelection = val
    },
    tableRowClassName({row, rowIndex}) {
        if (row.status === 1) {
          return 'waiting-row';
        } else if (row.status === 2) {
          return 'waiting-row';
        } else if (row.status === 3) {
          return 'success-row';
        } else if (row.status === 4) {
          return 'candel-row';
        } else if (row.status === 5) {
          return 'reject-row';
        }
        return '';
        // if (rowIndex === 1) {
        //   return 'waiting-row';
        // } else if (rowIndex === 2) {
        //   return 'waiting-row';
        // } else if (rowIndex === 3) {
        //   return 'success-row';
        // } else if (rowIndex === 4) {
        //   return 'candel-row';
        // } else if (rowIndex === 5) {
        //   return 'reject-row';
        // }
        // return '';
      }
  },
  components:{
      
  }
}

</script>

<style cell-style>
.el-table .cell {
  white-space: pre-line;
}

.el-table .waiting-row {
  background: rgba(255, 255, 0, 0.25);
}

.el-table .success-row {
  background: #09ff0040;
}

.el-table .candel-row {
  background: #6b6b6b40;
}

.el-table .reject-row {
  background: #ff000040;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.demo-table-expand #time{
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>