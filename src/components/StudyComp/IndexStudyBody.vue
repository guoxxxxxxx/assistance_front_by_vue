<template>
  <div>
    <Tabs value="全部" @on-click="selectItem">
      <TabPane label="全部" name="全部"></TabPane>
      <TabPane label="数学" name="数学"></TabPane>
      <TabPane label="英语" name="英语"></TabPane>
      <TabPane label="物理" name="物理"></TabPane>
      <TabPane label="政治" name="政治"></TabPane>
      <TabPane label="化学" name="化学"></TabPane>
      <TabPane label="生物" name="生物"></TabPane>
      <TabPane label="计算机" name="计算机"></TabPane>
      <TabPane label="其他" name="其他"></TabPane>
      <TabPane label="发布信息" name="发布信息"></TabPane>
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
// import StudyComp from '@/components/StudyComp/StudyComp.vue'
export default {
  data() {
    return {
      base_url: base_url,
      // 过滤属性
      category: "全部", // 所查询的种类
      fuzzyParam: "", // 模糊查询参数
      isHiddenAchieve: true, // 是否隐藏已完成项目
      // 是否显示过滤选择器
      dialogVisible: false,
    };
  },
  components: {
    // StudyComp
  },
  methods: {
    /**
     * 点击发布信息按钮进入发布信息界面
     */
    selectItem(name) {
      if (name == "发布信息") {
        this.$router.replace({
          path: "/indexView/IndexStudyBody/studyPublishData",
          query: {
            timestamp: Date.now(),
          },
        });
        this.$store.state.isShowSearch = false;
      } else {
        this.$router.replace({
          path: "/indexView/IndexStudyBody/StudyComp",
          query: {
            timestamp: Date.now(),
          },
        });
        this.$store.state.isShowSearch = true;
        this.$store.state.queryCondition.category = name;
        this.getItemsByCondition(this.$store.state.queryCondition);
        this.selectItemsCount(this.$store.state.queryCondition);
      }
    },
    /**
     * 在输入框点击回车按钮将参数传递到vuex中
     */
    updateQueryConditionToVuex() {

      // 更新界面内容
      this.getItemsByCondition(this.$store.state.queryCondition);
      this.selectItemsCount(this.$store.state.queryCondition);
      // 隐藏对话框
      this.dialogVisible = false;
    },
    /**
     * 获取指定页码的信息
     * 条件查询
     */
    getItemsByCondition(condition) {
      this.axios
        .post(base_url + "/study/queryByCondition", {
          page: 1,
          category: condition.category,
          fuzzyParam: condition.fuzzyParam,
          isHiddenAchieve: this.$store.state.queryCondition.isHiddenAchieve,
        })
        .then((resp) => {
          this.$store.state.allItems = resp.data.object;
        });
    },
    /**
     * 查询study表中有多少记录查询itemsCount
     */
    selectItemsCount(condition) {
      this.axios
        .post(base_url + "/study/queryItemsCountByCondition", {
          category: condition.category,
          fuzzyParam: condition.fuzzyParam,
          isHiddenAchieve: condition.isHiddenAchieve,
        })
        .then((resp) => {
          this.$store.state.itemsCount = resp.data.object;
        });
    },
    /**
     * 清空
     *  1. 页码总数
     *  2. 条件查询条件
     */
    clearAll() {
      this.$store.state.itemsCount = 0;
      this.$store.state.queryCondition = {
        page: "1", // 所查询的页码
        category: "全部", // 所查询的种类
        fuzzyParam: "", // 模糊查询参数
        isHiddenAchieve: 0, // 是否隐藏已完成项目 true隐藏 false不隐藏
      };
    },
  },
  mounted() {
    // this.$router.replace({
    //   path: "/indexView/IndexStudyBody/studyComp",
    //   query: {
    //     timestamp: Date.now(),
    //   },
    // });

    // 进入该界面时将查询条件，项目总数清空
    this.clearAll();
  },
  computed: {
    /**
     * 返回是否显示搜索框
     */
    getIsShowSearch() {
      return this.$store.state.isShowSearch;
    },
  },
  watch: {
    category: {
      handler(newVal) {
        this.$store.state.queryCondition.category = newVal;
        this.selectItemsCount(this.$store.state.queryCondition);
        this.getItemsByCondition(this.$store.state.queryCondition);
      },
      immediate: true,
    },
    fuzzyParam: {
      handler(newVal) {
        this.$store.state.queryCondition.fuzzyParam = newVal;
        this.selectItemsCount(this.$store.state.queryCondition);
        this.getItemsByCondition(this.$store.state.queryCondition);
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
  },
};
</script>

<style scoped>
</style>