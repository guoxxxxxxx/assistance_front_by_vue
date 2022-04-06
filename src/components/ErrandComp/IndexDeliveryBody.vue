<template>
  <div>
    <Tabs value="all" @on-click="clickme">
      <TabPane label="全部" name="all"></TabPane>
      <TabPane label="快递代取" name="express"></TabPane>
      <TabPane label="外卖代取" name="takeaway"></TabPane>
      <TabPane label="热水代打" name="hotWater"></TabPane>
      <TabPane label="其他" name="other"></TabPane>
      <TabPane label="发布信息" name="pubdata"></TabPane>
    </Tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    clickme(id) {
      if (id == "all") {
        this.$router.push("/indexView/IndexDeliveryBody/ErrandComp");
      } else if (id == "pubdata") {
        this.$router.push("/indexView/IndexDeliveryBody/errandPublishData");
      }
    },
  },
  mounted() {
    this.$router.push("/indexView/IndexDeliveryBody/ErrandComp");
  },
};
</script>

<style scoped>
</style>