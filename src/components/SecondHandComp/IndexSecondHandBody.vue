<template>
  <div>
      <Tabs value="all" @on-click="clickme" >
        <TabPane label="全部" name="all"></TabPane>
        <TabPane label="交通工具" name="vehicle"></TabPane>
        <TabPane label="书本资料" name="book"></TabPane>
        <TabPane label="生活用品" name="supplies"></TabPane>
        <TabPane label="电脑配件" name="computer_device"></TabPane>
        <TabPane label="其他" name="other"></TabPane>
      </Tabs>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>