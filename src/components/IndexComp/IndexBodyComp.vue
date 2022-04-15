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
      this.axios.post(base_url + '/study/test', {
        uid: 1,
        name: "测试",
      }, {params: {
        page: 100
      }})
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