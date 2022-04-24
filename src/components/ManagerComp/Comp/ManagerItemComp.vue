<template>
  <div style="padding: 10px 10px 10px 10px; overflow: auto">
    <el-table
      ref="singleTable"
      :data="getItemTable"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column property="date" label="日期" width="180">
      </el-table-column>
      <el-table-column property="pubUser" label="发布人" width="120">
      </el-table-column>
      <el-table-column property="title" label="标题" width="200">
      </el-table-column>
      <el-table-column property="category" label="类别" width="120">
      </el-table-column>
      <el-table-column
        property="takeOrdersUser"
        label="接单人"
        width="120"
        v-if="
          this.$store.state.manager.methodName == 'errand' ||
          this.$store.state.manager.methodName == 'second'
        "
      >
      </el-table-column>
      <el-table-column
        width="120"
        label=""
        v-if="
          !(this.$store.state.manager.methodName == 'errand' ||
          this.$store.state.manager.methodName == 'second')
        "
      >
      </el-table-column>
      <el-table-column property="status" label="状态" width="120">
      </el-table-column>
      <el-table-column property="status" label="操作" width="180">
        <el-button type="primary" size="mini" @click="seeDetails(getMethodName)"
          >查看</el-button
        >
        <el-popconfirm
          title="确定要删除吗？"
          style="padding-left: 10px"
          @confirm="clickDelButton"
        >
          <el-button slot="reference" size="mini" type="danger">删除</el-button>
        </el-popconfirm>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { base_url } from "@/config";
export default {
  data() {
    return {
      currentRow: null,
      manager: this.$store.state.manager,
    };
  },

  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    /**
     * 更新界面: 删除操作进行后需要对界面进行更新操作
     */
    updatePage(methodName) {
      // 更新项目组件
      this.queryAllItem(methodName);
    },
    /**
     * 获取项目详细信息
     */
    queryAllItem(methodName) {
      this.axios
        .get(base_url + "/manager/" + methodName + "/queryAllItem")
        .then((resp) => {
          this.manager.itemTable = resp.data.object;
        });
    },
    /**
     * 点击查看详情
     */
    seeDetails(methodName) {
      setTimeout(() => {
        console.log("currentROW = ", this.currentRow);
        if (methodName == "errand") {
          this.$router.push({
            name: "errandDetails",
            query: {
              eid: this.currentRow.id,
            },
          });
        } else if (methodName == "study") {
          this.$router.push({
            path: "/indexView/IndexStudyBody/studyDetailsComp",
            query: {
              sid: this.currentRow.id,
            },
          });
        } else if (methodName == 'second'){
          this.$router.push({
            name: "tradeDetails",
            query: {
              tid: this.currentRow.id
            }
          })
        } else if (methodName == 'lost'){
          this.$router.push({
            name: "lostDetails",
            query: {
              lid: this.currentRow.id,
            }
          })
        }
      }, 1);
    },
    /**
     * 点击删除按钮
     */
    clickDelButton() {
      this.delItem(this.$store.state.manager.methodName);
    },
    /**
     * 删除操作
     */
    delItem(methodName) {
      setTimeout(() => {
        this.axios
          .get(base_url + "/manager/" + methodName + "/fakeDeleteItem", {
            params: {
              id: this.currentRow.id,
            },
          })
          .then((resp) => {
            if (resp.data.status == 200) {
              this.$notify.success("删除成功！");
              this.updatePage(methodName);
            } else {
              this.$notify.error("删除失败！");
            }
          });
      }, 10);
    },
  },
  computed: {
    getItemTable() {
      return this.manager.itemTable;
    },
    getMethodName() {
      return this.$store.state.manager.methodName;
    },
    /**
     * 监听
     */
    listenerChange() {
      return this.$store.state.manager.methodName;
    },
  },
  mounted() {
    // 查询评论详情
    this.queryAllItem(this.$store.state.manager.methodName);
  },
  watch: {
    listenerChange: {
      handler() {
        this.queryAllItem(this.$store.state.manager.methodName);
      },
    },
  },
};
</script>

<style>
/* 美化滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #d5d5d5;
  border-radius: 5px;
}
</style>