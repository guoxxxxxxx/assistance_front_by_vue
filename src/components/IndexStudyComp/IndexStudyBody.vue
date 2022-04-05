<template>
  <div class="border">
    <div class="container">
      <Tabs value="all" @on-click="clickme" >
        <TabPane label="全部" name="all"></TabPane>
        <TabPane label="数学" name="math"></TabPane>
        <TabPane label="英语" name="english"></TabPane>
        <TabPane label="物理" name="physical"></TabPane>
        <TabPane label="政治" name="politics"></TabPane>
        <TabPane label="化学" name="chemistry"></TabPane>
        <TabPane label="生物" name="biology"></TabPane>
        <TabPane label="计算机" name="computer"></TabPane>
        <TabPane label="其他" name="other"></TabPane>
      </Tabs>
      <study-comp></study-comp>
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>

<script>
import StudyComp from '@/components/IndexStudyComp/StudyComp.vue'
export default {
  components: {
      StudyComp
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