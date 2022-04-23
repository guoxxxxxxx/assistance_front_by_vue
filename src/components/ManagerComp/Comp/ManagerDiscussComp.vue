<template>
  <div style="padding 10px, 10px, 10px, 10px; overflow: auto;">
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column property="date" label="日期" width="100">
      </el-table-column>
      <el-table-column property="name" label="发布人" width="100">
      </el-table-column>
      <el-table-column property="discuss" label="信息" width="120">
      </el-table-column>
      <el-table-column property="status" label="操作" width="150">
        <el-button type="primary" size="mini">查看</el-button>
        <el-button type="danger" size="mini">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{ date: "2000-00-00", name: "李昊轩" }],
    };
  },
  methods:{
      handleCurrentChange(){
          console.log(null);
      }
  }
};
</script>

<style>
</style>