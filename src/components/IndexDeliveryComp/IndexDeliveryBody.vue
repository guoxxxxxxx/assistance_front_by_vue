<template>
  <div>
      <Tabs value="all" @on-click="clickme" >
        <TabPane label="全部" name="all"></TabPane>
        <TabPane label="快递代取" name="express"></TabPane>
        <TabPane label="外卖代取" name="takeaway"></TabPane>
        <TabPane label="热水代打" name="hotWater"></TabPane>
        <TabPane label="其他" name="other"></TabPane>
      </Tabs>
      <errand-comp></errand-comp>
      <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import ErrandComp from '@/components/IndexDeliveryComp/ErrandComp.vue'
export default {
  components: {
      ErrandComp
  },
  methods:{
    clickme(id){
      console.log(id);
    }
  }
};
</script>

<style scoped>
.border {
  width: 100%;
  height: auto;
  background-color: #ecf0f3;
  border: none;
  outline: none;
}

.container {
  width: 80%;
  height: auto;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 14px 14px 20px #cbced1, 14px 14px 20px white;
  background-color: white;
  margin-top: 30px;
  margin-bottom: 30px;
  border: none;
  outline: none;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 40px;
}
</style>