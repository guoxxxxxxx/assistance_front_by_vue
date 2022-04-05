<template>
  <div>
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

</style>