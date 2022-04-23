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
      <el-table-column property="money" label="赏金" width="120">
      </el-table-column>
      <el-table-column property="takeOrdersUser" label="接单人" width="120">
      </el-table-column>
      <el-table-column property="status" label="状态" width="120">
      </el-table-column>
      <el-table-column property="status" label="操作" width="180">
        <el-button type="primary" size="mini" @click="seeDetails"
          >查看</el-button
        >
        <el-button type="danger" size="mini">删除</el-button>
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
      console.log(val);
    },
    /**
     * 获取详细信息
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
    seeDetails() {
      setTimeout(() => {
        if (this.manager.methodName == "errand") {
          this.$router.push({
            name: "errandDetails",
            query: {
              eid: this.currentRow.id,
            },
          });
        }
      }, 1);
    },
  },
  computed: {
    getItemTable() {
      return this.manager.itemTable;
    },
  },
  mounted() {
    this.queryAllItem(this.manager.methodName);
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