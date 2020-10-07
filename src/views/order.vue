<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="18" :offset="2">
          <el-form-item label="预约教室">
            <div>
              <el-select
                @change="getEquipment()"
                v-model="form.room"
                placeholder="请选择房间"
              >
                <el-option
                  v-for="item in Room"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="2">
          <el-form-item label="预约设备">
            <div>
              <el-select
                @change="getOrderTime()"
                v-model="form.equipment"
                placeholder="请选择设备"
              >
                <el-option
                  v-for="item in Equipment"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="2">
          <el-form-item label="预约日期">
            <div>
              <el-date-picker
                @change="getOrderTime()"
                v-model="form.date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="2">
          <el-form-item label="预约时间">
            <div>
              <el-select
                v-model="form.time"
                :clearable="true"
                multiple
                placeholder="请选择时间"
              >
                <el-option
                  v-for="item in Time"
                  :key="item.id"
                  :label="
                    item.name + '(' + item.timeFrom + '-' + item.timeTo + ')'
                  "
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="2">
          <el-form-item label="预约耗材">
            <div>
              <el-select
                v-model="form.consumable"
                :clearable="true"
                multiple
                placeholder="请选择耗材"
              >
                <el-option
                  v-for="item in Consumeable"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="2">
          <el-form-item label="审批教师">
            <div>
              <el-select v-model="form.teacher" placeholder="请选择审批老师">
                <el-option
                  v-for="item in Teacher"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="2">
          <el-form-item label="预约详情">
            <div>
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="form.detail"
              >
              </el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="2">
          <el-form-item>
            <el-button type="primary" @click="order">立即预约</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      Room: [{ id: 1, name: "101" }],
      Equipment: [{ id: 1, name: "激光炮" }],
      Time: [{ id: 1, name: "第一节课" }],
      Consumeable: [{ id: 1, name: "A4纸" }],
      Teacher: [{ id: 1, name: "黄老师" }],
      form: {
        room: "",
        equipment: "",
        date: "",
        consumable: "",
        time: "",
        teacher: "",
        detail: "",
      },
    };
  },
  methods: {
    getEquipment() {
      this.axios.get(
        "/room-equipment/listEquByRoomId",
        (response) => {
          if (response.obj != null) {
            this.Equipment = response.obj;
          }
        },
        {
          roomId: this.form.room,
        }
      );
    },
    getOrderTime() {
      if (this.form.orderDate != null && this.form.equipmentId != null) {
        this.axios.get(
          "/order-time/listFreeTime",
          (response) => {
            this.Time = response.obj;
          },
          {
            equipmentId: this.form.equipment,
            orderDate: this.form.date,
          }
        );
      }
    },
    getRoom() {
      this.axios.get(
        "/room/list",
        (response) => {
          this.Room = response.obj;
        },
        {
          active: 1,
          withPage: 0,
        }
      );
    },
    order() {
      this.axios.post(
        "/order/add",
        (response) => {
          console.log(response);
        },
        this.form
      );
    },
  },
  created() {
    this.getRoom()
  },
};
</script>

<style scoped>
.el-form {
  margin-top: 70px;
}
</style>