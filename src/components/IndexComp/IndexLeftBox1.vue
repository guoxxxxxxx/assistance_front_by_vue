<template>
  <div id="bx1">
    <div id="box2">
      <el-progress
        type="circle"
        :percentage="60"
        :stroke-width="10"
        :width="150"
      ></el-progress>
      <el-progress
        type="circle"
        :percentage="60"
        :stroke-width="10"
        :width="150"
      ></el-progress>
      <el-progress
        type="circle"
        :percentage="60"
        :stroke-width="10"
        :width="150"
      ></el-progress>
    </div>
  </div>
</template>

<script>
import { base_url } from "@/config";
export default {
  data() {
    return {
      count: 0,
      base_url: base_url,
    };
  },
  methods: {
    load() {
      this.count += 2;
    },
  },
};
</script>

<style scoped>
#bx1 {
  width: 100%;
  height: 380px;
  border-radius: 30px;
  box-shadow: 10px 10px 30px rgb(128, 128, 128);
}

#box2 {
  display: flex;
  justify-content: space-between;
  padding-top: 120px;
}
</style>