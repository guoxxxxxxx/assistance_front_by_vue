<template>
  <div>
    <Tabs value="all" @on-click="this_router">
      <TabPane label="全部" name="all"></TabPane>
      <TabPane label="快递代取" name="快递代取"></TabPane>
      <TabPane label="外卖代取" name="外卖代取"></TabPane>
      <TabPane label="热水代打" name="热水代打"></TabPane>
      <TabPane label="其他" name="其他"></TabPane>
      <TabPane label="发布信息" name="pubdata"></TabPane>
    </Tabs>

    <!-- 搜索过滤区域 -->
    <div v-if="isShowSearch">
      <div style="display: flex">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="errandFilterType.searchFilter"
        >
        </el-input>
        <el-button plain>搜索</el-button>
        <el-button plain @click="dialogVisible = true">设置过滤属性</el-button>
      </div>

      <el-dialog title="设置过滤属性" :visible.sync="dialogVisible" width="30%">
        <div style="margin-top: 30px">
          <el-switch
            v-model="errandFilterType.isSeeAchieve"
            active-text="显示已完成订单"
            inactive-text="隐藏已完成订单"
          >
          </el-switch>
        </div>

        <div style="margin-top: 30px">
          <el-switch
            v-model="errandFilterType.isSeeTakeOrder"
            active-text="显示已接单订单"
            inactive-text="隐藏已接单订单"
          >
          </el-switch>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>

    <router-view
      :dontShowSearch="dontShowSearch"
      :showSearch="showSearch"
    ></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否显示过滤选择器
      dialogVisible: false,
      // 从Vuex组件获取过滤器配置对象
      errandFilterType: this.$store.getters.getErrandFilterType,
      // 是否显示搜索栏
      isShowSearch: true,
    };
  },
  components: {},
  methods: {
    // 更新跑腿种类信息
    this_router(id) {
      // 点击发布信息按钮
      if (id == "pubdata") {
        this.isShowSearch = false;
        this.$router.replace({
          path: "/indexView/indexDeliveryBody/errandPublishData",
          query: {
            timestamp: Date.now(),
          },
        });
      } else {
        this.isShowSearch = true;
        this.$router.replace({
          path: "/indexView/IndexDeliveryBody/ErrandComp",
          query: {
            timestamp: Date.now(),
          },
        });
        this.errandFilterType.category = id;
      }
    },
    // 隐藏搜索框
    dontShowSearch() {
      this.isShowSearch = false;
    },
    showSearch(){
      this.isShowSearch = true;
    }
  },
  mounted() {
    this.$router.push("/indexView/IndexDeliveryBody/ErrandComp");
  },
  watch: {
    // 设置监听属性
    value(newVal) {
      this.errandFilterType.category = newVal;
    },
  },
};
</script>

<style scoped>
#page_box {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
}
</style>