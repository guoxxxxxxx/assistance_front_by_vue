<template>
  <div id="index_border">
    <div id="index_container">
        <button @click="test">测试按钮</button>
    </div>
  </div>
</template>

<script>
import { base_url } from '@/config';
export default {
  methods:{
    test(){
      this.axios.post(base_url + '/errand/queryByCondition', {
        category: "测试",
        page: 2,
        fuzzyParam: "fuzzyParam",
        isHiddenAchieve: "true",
        isHiddenTakeOrders: "false"
      })
    }
  }
};
</script>

<style scoped>
#index_border {
  display: flex;
  justify-content: center;
}

#index_container {
  width: 80%;
}
</style>