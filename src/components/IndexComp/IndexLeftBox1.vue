<template>
  <div id="bx1">
    <div id="title">数据总览</div>
    <div id="box2">
      <div style="width: 150px">
        <el-progress
          type="circle"
          :percentage="dont"
          :stroke-width="10"
          :width="150"
          color="orange"
        ></el-progress>
        <div class="bottom_content">未被接单</div>
      </div>
      <div style="width: 150px">
        <el-progress
          type="circle"
          :percentage="take"
          :stroke-width="10"
          :width="150"
        ></el-progress>
        <div class="bottom_content">已被接单</div>
      </div>
      <div style="width: 150px">
        <el-progress
          type="circle"
          :percentage="achieve"
          :stroke-width="10"
          :width="150"
          color="green"
        ></el-progress>
        <div class="bottom_content">已完成</div>
      </div>
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
      dont: 0,
      take: 0,
      achieve: 0,
    };
  },
  methods: {
    /**
     * 向后端获取所要展示的百分比
     */
    queryPercentage(){
      this.axios.get(base_url + '/index/queryPercentage').then(resp=>{
        if(resp.data.status == 200){
          this.dont = Number(resp.data.object.dont);
          this.take = Number(resp.data.object.take);
          this.achieve = Number(resp.data.object.achieve);
        }
      })
    }
  },
  mounted(){
    this.queryPercentage();
  }
};
</script>

<style scoped>
#bx1 {
  margin-top: 40px;
  width: 100%;
  height: 380px;
  border-radius: 30px;
  box-shadow: 10px 10px 30px rgb(128, 128, 128);
}

#box2 {
  display: flex;
  justify-content: space-between;
  padding-top: 80px;
}

.bottom_content {
  width: 150px;
  text-align: center;
  font-size: 1.3em;
  padding-top: 20px;
}

#title {
  width: 100%;
  text-align: center;
  font-size: 2em;
  padding-top: 30px;
}
</style>