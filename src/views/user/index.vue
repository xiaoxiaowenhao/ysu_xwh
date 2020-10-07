<template>
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
  },
  created() {
    this.userData()
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