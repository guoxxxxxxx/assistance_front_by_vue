<template>
  <div>
    <Tabs value="全部" @on-click="selectItem">
      <TabPane label="全部" name="全部"></TabPane>
      <TabPane label="找物品" name="找物品"></TabPane>
      <TabPane label="找失主" name="找失主"></TabPane>
      <TabPane label="发布信息" name="pubdata"></TabPane>
    </Tabs>

    <!-- 搜索过滤区域 -->
    <div v-if="getIsShowSearch">
      <div style="display: flex">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="fuzzyParam"
        >
        </el-input>
        <el-button plain @click="updateQueryCondition">搜索</el-button>
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
          <el-button
            type="primary"
            @click="updateQueryCondition"
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
      base_url: base_url,
      // 搜索过滤区域参数
      fuzzyParam: "",
      isHiddenAchieve: false,
      category: "",
      // 显示过滤属性对话框
      dialogVisible: false,
    };
  },
  methods: {
    /**
     * 更新过滤属性，并搜索
     */
    updateQueryCondition() {
      this.$store.state.isHiddenAchieve = this.isHiddenAchieve;
      this.queryByCondition(this.$store.state.queryCondition)
      this.dialogVisible = false;
    },
    /**
     * 选择类别标签
     */
    selectItem(name) {
      this.$store.state.isShowSearch = false;
      if (name == "pubdata") {
        this.$router.push({
          path: "/indexView/indexMissAndFindBody/lostPropertyPublishComp",
          query: {
            timestamp: Date.now(),
          },
        });
      } else {
        this.$store.state.isShowSearch = true;
        this.$router.push({
          path: "/indexView/indexMissAndFindBody/lostPropertyComp",
          query: {
            category: name,
            timestamp: Date.now(),
          },
        });
        this.category = name;
      }
    },
    /**
     * 从后台获取符合条件的信息
     */
    queryByCondition(condition) {
      this.axios
        .post(base_url + "/lostProperty/queryByCondition", {
          page: condition.page,
          category: condition.category,
          fuzzyParam: condition.fuzzyParam,
          isHiddenAchieve: condition.isHiddenAchieve,
        })
        .then((resp) => {
          this.$store.state.allItems = resp.data.object;
          console.log(resp);
        });
    },
    /**
     * 获取符合条件的项目数量
     */
    queryCountByCondition(condition) {
      this.axios
        .post(base_url + "/lostProperty/queryCountByCondition", {
          page: condition.page,
          category: condition.category,
          fuzzyParam: condition.fuzzyParam,
          isHiddenAchieve: condition.isHiddenAchieve,
        })
        .then((resp) => {
          this.$store.state.itemsCount = resp.data.object;
        });
    },
    /**
     * 更新操作
     */
    update() {
      this.queryCountByCondition(this.$store.state.queryCondition);
      this.queryByCondition(this.$store.state.queryCondition);
    },
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
  },
};
</script>

<style>
</style>