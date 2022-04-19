<template>
  <div>
    <Tabs value="全部" @on-click="selectItem">
      <TabPane label="全部" name="全部"></TabPane>
      <TabPane label="快递代取" name="快递代取"></TabPane>
      <TabPane label="外卖代取" name="外卖代取"></TabPane>
      <TabPane label="热水代打" name="热水代打"></TabPane>
      <TabPane label="其他" name="其他"></TabPane>
      <TabPane label="发布信息" name="pubdata"></TabPane>
    </Tabs>

    <!-- 搜索过滤区域 -->
    <div v-if="getIsShowSearch">
      <div style="display: flex">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="fuzzyParam"
          @keyup.enter.native="regetItems"
        >
        </el-input>
        <el-button plain @click="regetItems">搜索</el-button>
        <el-button plain @click="dialogVisible = true">设置过滤属性</el-button>
      </div>

      <el-dialog title="设置过滤属性" :visible.sync="dialogVisible" width="30%">
        <div style="margin-top: 30px">
          <el-switch
            v-model="isHiddenAchieve"
            active-text="隐藏已完成订单"
            inactive-text="显示已完成订单"
          >
          </el-switch>
        </div>

        <div style="margin-top: 30px">
          <el-switch
            v-model="isHiddenTakeOrders"
            active-text="隐藏已接单订单"
            inactive-text="显示已接单订单"
          >
          </el-switch>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="regetItems">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { base_url } from "@/config";
export default {
  data() {
    return {
      // 是否显示过滤选择器
      dialogVisible: false,
      // 是否显示搜索栏
      isShowSearch: true,
      // 模糊搜素参数
      fuzzyParam: "",
      // 是否隐藏已完成订单
      isHiddenAchieve: false,
      // 是隐藏已接单的订单
      isHiddenTakeOrders: false,
    };
  },
  components: {},
  methods: {
    // 更新跑腿种类信息
    selectItem(id) {
      // 点击发布信息按钮
      if (id == "pubdata") {
        this.$store.state.isShowSearch = false;
        this.$router.replace({
          path: "/indexView/indexDeliveryBody/errandPublishData",
          query: {
            timestamp: Date.now(),
          },
        });
      } else {
        this.$store.state.isShowSearch = true;
        this.$router.replace({
          path: "/indexView/IndexDeliveryBody/ErrandComp",
          query: {
            timestamp: Date.now(),
            category: id,
          },
        });
        this.$store.state.queryCondition.category = id;
        this.regetItems();
      }
    },
    /**
     * 条件查询 并赋值给相关变量
     */
    queryByCondition() {
      let condition = this.$store.state.queryCondition;
      this.axios
        .post(base_url + "/errand/queryByCondition", {
          category: condition.category,
          page: condition.page,
          fuzzyParam: condition.fuzzyParam,
          isHiddenAchieve: condition.isHiddenAchieve,
          isHiddenTakeOrders: condition.isHiddenTakeOrders,
        })
        .then((resp) => {
          this.$store.state.allItems = resp.data.object;
        });
    },

    /**
     * 条件查询符合条件的信息数目 并赋值给相关变量
     */
    queryCountByCondition() {
      this.axios
        .post(base_url + "/errand/queryCountByCondition", {
          category: this.$store.state.queryCondition.category,
          page: this.$store.state.queryCondition.page,
          fuzzyParam: this.$store.state.queryCondition.fuzzyParam,
          isHiddenAchieve: this.$store.state.queryCondition.isHiddenAchieve,
          isHiddenTakeOrders: this.$store.state.queryCondition.isHiddenTakeOrders,
        })
        .then((resp) => {
          this.$store.state.itemsCount = resp.data.object;
        });
    },
    /**
     * 重新查询符合条件的项目的数量及项目的本体
     */
    regetItems() {
      this.queryByCondition();
      this.queryCountByCondition();
      this.dialogVisible = false;
    },
  },
  mounted() {
    this.$router.push({
      path: "/indexView/IndexDeliveryBody/ErrandComp",
      query: {
        timestamp: Date.now(),
      },
    });
    // 进入跑腿界面初始化过滤条件
    this.$store.state.queryCondition = {
      page: "1", // 所查询的页码
      category: "全部", // 所查询的种类
      fuzzyParam: "", // 模糊查询参数
      isHiddenAchieve: 0, // 是否隐藏已完成项目 true隐藏 false不隐藏
      isHiddenTakeOrders: 0, // 是否隐藏已被接单项目
    };
  },
  watch: {
    // 检测过滤属性的变化 并赋值给vuex
    fuzzyParam: {
      handler(newVal) {
        this.$store.state.queryCondition.fuzzyParam = newVal;
      },
    },
    isHiddenAchieve: {
      handler(newVal) {
        this.$store.state.queryCondition.isHiddenAchieve = newVal ? 1 : 0;
      },
    },
    isHiddenTakeOrders: {
      handler(newVal) {
        this.$store.state.queryCondition.isHiddenTakeOrders = newVal ? 1 : 0;
      },
    },
  },
  computed: {
    /**
     * 获取是否显示搜索框参数
     */
    getIsShowSearch() {
      return this.$store.state.isShowSearch;
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