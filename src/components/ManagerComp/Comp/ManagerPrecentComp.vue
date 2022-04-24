<template>
  <div style="padding: 10px 10px 10px 10px; overflow: auto">
    <div style="width: 100%; height: 50px; font-size: 2em; text-align: center">
      数据总览
    </div>
    <div id="preBox">
      <div class="pre">
        <el-progress
          type="circle"
          :percentage="getDont"
          color="orange"
        ></el-progress>
        <div class="small_title">未完成</div>
      </div>
      <div
        class="pre"
        v-if="
          this.$store.state.manager.methodName == 'errand' ||
          this.$store.state.manager.methodName == 'second'
        "
      >
        <el-progress type="circle" :percentage="getTake"></el-progress>
        <div class="small_title">已被接单</div>
      </div>
      <div class="pre">
        <el-progress
          type="circle"
          :percentage="getAchieve"
          color="green"
        ></el-progress>
        <div class="small_title">已完成</div>
      </div>
    </div>
  </div>
</template>

<script>
import { base_url } from "@/config";
export default {
  data() {
    return {
      manager: this.$store.state.manager,
    };
  },
  methods: {
    /**
     * 查询百分比
     */
    queryPercentage(methodName) {
      this.axios
        .get(base_url + "/manager/" + methodName + "/queryPercentage")
        .then((resp) => {
          let info = resp.data.object;
          this.manager.pre_take = Number(info.take);
          this.manager.pre_dont = Number(info.dont);
          this.manager.pre_achieve = Number(info.achieve);
        });
    },
  },
  computed: {
    getTake() {
      return this.manager.pre_take;
    },
    getDont() {
      return this.manager.pre_dont;
    },
    getAchieve() {
      return this.manager.pre_achieve;
    },
    /**
     * 监听参数改变
     */
    listenerChange() {
      return (
        this.$store.state.manager.itemTable,
        this.$store.state.manager.methodName
      );
    },
  },
  mounted() {
    // 查询
    this.queryPercentage(this.manager.methodName);
  },
  watch: {
    listenerChange: {
      handler() {
        this.queryPercentage(this.$store.state.manager.methodName);
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped>
#preBox {
  display: flex;
  justify-content: space-around;
}
.pre {
  width: 33.3%;
  text-align: center;
}

.small_title {
  width: 100%;
}
</style>