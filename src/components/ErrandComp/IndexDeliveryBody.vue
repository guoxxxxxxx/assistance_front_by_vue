<template>
  <div>
    <Tabs value="all" @on-click="this_router">
      <TabPane label="全部" name="all"></TabPane>
      <TabPane label="快递代取" name="express"></TabPane>
      <TabPane label="外卖代取" name="takeAway"></TabPane>
      <TabPane label="热水代打" name="hotWater"></TabPane>
      <TabPane label="其他" name="other"></TabPane>
      <TabPane label="发布信息" name="pubdata"></TabPane>
    </Tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  components: {},
  methods: {
    // 更新跑腿种类信息
    this_router(id) {
      if (id == 'all') {
        this.$router.replace({
          path:"/indexView/IndexDeliveryBody/ErrandComp",
          query:{
            category: 'all',
            timestamp: Date.now(),
          }
        })
      }
      else if(id == 'pubdata'){
        this.$router.replace({
          path:"/indexView/indexDeliveryBody/errandPublishData",
          query:{
            timestamp: Date.now()
          }
        })
      }
      else if (id == 'express') {
        this.$router.replace({
          path:"/indexView/IndexDeliveryBody/ErrandComp",
          query:{
            category: '快递代取',
            timestamp: Date.now()
          }
        })
      }
    },
  },
  mounted() {
    this.$router.push("/indexView/IndexDeliveryBody/ErrandComp");
  },
};
</script>

<style scoped>
#page_box {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
}
</style>