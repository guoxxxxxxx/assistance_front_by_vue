<template>
  <div class="border">
    <div class="container">
      <Tabs value="name1">
        <TabPane label="数学" name="name1"></TabPane>
        <TabPane label="英语" name="name2"></TabPane>
        <TabPane label="物理" name="name3"></TabPane>
        <TabPane label="其他" name="name4"></TabPane>
      </Tabs>
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
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