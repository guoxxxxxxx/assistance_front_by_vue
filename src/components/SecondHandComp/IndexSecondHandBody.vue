<template>
  <div>
    <Tabs value="全部" @on-click="selectItem">
      <TabPane label="全部" name="全部"></TabPane>
      <TabPane label="交通工具" name="交通工具"></TabPane>
      <TabPane label="书本资料" name="书本资料"></TabPane>
      <TabPane label="生活用品" name="生活用品"></TabPane>
      <TabPane label="电脑配件" name="电脑配件"></TabPane>
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
          @keyup.enter.native="updateQueryConditionToVuex"
        >
        </el-input>
        <el-button plain @click="updateQueryConditionToVuex">搜索</el-button>
        <el-button plain @click="dialogVisible = true">设置过滤属性</el-button>
      </div>

      <el-dialog title="设置过滤属性" :visible.sync="dialogVisible" width="30%">
        <div style="margin-top: 30px">
          <el-switch
            active-text="隐藏已完成订单"
            inactive-text="显示已完成订单"
            v-model="isHiddenAchieve"
          >
          </el-switch>
          <el-switch
            style="margin-top: 30px"
            active-text="隐藏已预定订单"
            inactive-text="显示已预定订单"
            v-model="isHiddenTakeOrders"
          >
          </el-switch>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateQueryConditionToVuex"
            >确 定</el-button
          >
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
      // 过滤属性
      category: "全部", // 所查询的种类
      fuzzyParam: "", // 模糊查询参数
      isHiddenAchieve: false, // 是否隐藏已完成项目
      isHiddenTakeOrders: false, // 是否隐藏已经被预定的项目
      dialogVisible: false,
    };
  },
  methods: {
    /**
     * 更新操作
     */
    updateQueryConditionToVuex() {
      this.dialogVisible = false;
      this.$store.state.fuzzyParam = this.fuzzyParam;
      this.$store.state.category = this.category;
      this.update();
    },
    /**
     * 更新
     */
    update() {
      this.queryItemsByCondtiton(this.$store.state.queryCondition);
      this.queryItemsCountByCondition(this.$store.state.queryCondition);
    },
    /**
     * 重新查询页面，项目数量
     */
    queryItemsCountByCondition(condition) {
      this.axios
        .post(base_url + "/trade/queryItemsCountByCondition", {
          category: condition.category,
          fuzzyParam: condition.fuzzyParam,
          isHiddenAchieve: condition.isHiddenAchieve,
          isHiddenTakeOrders: condition.isHiddenTakeOrders,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$store.state.itemsCount = resp.data.object;
          }
        });
    },
    /**
     * 根据条件获取查询信息
     */
    queryItemsByCondtiton(condition) {
      this.axios
        .post(base_url + "/trade/queryItemsByCondition", {
          page: condition.page,
          category: condition.category,
          fuzzyParam: condition.fuzzyParam,
          isHiddenAchieve: condition.isHiddenAchieve,
          isHiddenTakeOrders: condition.isHiddenTakeOrders,
        })
        .then((resp) => {
          this.$store.state.allItems = resp.data.object;
        });
    },
    /**
     * 选择所要显示的种类
     */
    selectItem(name) {
      if (name == "pubdata") {
        // 隐藏搜素框
        this.$store.state.isShowSearch = false;
        this.$router.push(
          "/indexView/indexSecondHandBody/secondHandPublishData"
        );
      } else {
        // 显示搜索框
        this.$store.state.isShowSearch = true;
        this.category = name;
        this.$router.replace({
          path: "/indexView/indexSecondHandBody/secondHandComp",
          query: {
            category: name,
          },
        });
      }
    },
  },
  created() {
    console.log("初始化工作进行了");
    this.$store.state.queryCondition.category = "全部";
    this.$store.state.queryCondition = {
      page: "1", // 所查询的页码
      category: "全部", // 所查询的种类
      fuzzyParam: "", // 模糊查询参数
      // 注意, 无法直接发送布尔值，只能用01来进行代替
      isHiddenAchieve: 0, // 是否隐藏已完成项目 1隐藏 0不隐藏
      isHiddenTakeOrders: 0, // 是否隐藏已被接单项目
    };
  },
  computed: {
    getIsShowSearch() {
      return this.$store.state.isShowSearch;
    },
  },
  watch: {
    category: {
      handler(newVal) {
        this.$store.state.queryCondition.category = newVal;
        this.update();
      },
      immediate: true,
    },
    fuzzyParam: {
      handler(newVal) {
        this.$store.state.queryCondition.fuzzyParam = newVal;
        this.update();
      },
      immediate: true,
    },
    isHiddenAchieve: {
      handler(newVal) {
        if (newVal == true) {
          this.$store.state.queryCondition.isHiddenAchieve = 1;
        } else {
          this.$store.state.queryCondition.isHiddenAchieve = 0;
        }
      },
    },
    isHiddenTakeOrders: {
      handler(newVal) {
        this.$store.state.queryCondition.isHiddenTakeOrders = newVal ? 1 : 0;
      },
    },
  },
};
</script>

<style>
</style>