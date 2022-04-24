<template>
  <div style="padding 10px, 10px, 10px, 10px; overflow: auto;">
    <el-table
      ref="singleTable"
      :data="getDiscussTable"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column property="pubUserName" label="评论人" width="100">
      </el-table-column>
      <el-table-column property="shortContent" label="信息" width="230">
      </el-table-column>
      <el-table-column property="status" label="操作" width="150">
        <el-button
          type="primary"
          size="mini"
          @click="centerDialogVisible = true"
          >详情</el-button
        >
        <el-popconfirm
          title="确定要删除吗？"
          style="padding-left: 10px"
          @confirm="fakeDeleteDiscuss"
        >
          <el-button slot="reference" size="mini" type="danger">删除</el-button>
        </el-popconfirm>
      </el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="50%"
      center
    >
      <el-descriptions class="margin-top" title="评论详情" :column="2" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            用户名
          </template>
          {{ currentRow.pubUserName }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            发布日期
          </template>
          {{ currentRow.date }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            内容
          </template>
          {{ currentRow.content }}
        </el-descriptions-item>
      </el-descriptions>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { base_url } from "@/config";
export default {
  data() {
    return {
      discussTable: this.$store.state.manager.discussTable,

      // 当前选中的项目详细信息
      currentRow: {
        content: "",
        pubUserName: "",
      },

      centerDialogVisible: false,
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
     * 查询所需评论信息
     */
    queryDiscussTable() {
      this.axios
        .get(
          base_url +
            "/manager/" +
            this.$store.state.manager.methodName +
            "/queryDiscuss"
        )
        .then((resp) => {
          this.$store.state.manager.discussTable = resp.data.object;
        });
    },
    /**
     * 删除指定的评论信息
     */
    fakeDeleteDiscuss() {
      setTimeout(() => {
        this.axios
          .get(
            base_url +
              "/manager/" +
              this.$store.state.manager.methodName +
              "/fakeDeleteDiscuss",
            {
              params: {
                id: this.currentRow.id,
              },
            }
          )
          .then((resp) => {
            if (resp.data.status == 200) {
              this.$notify.success("删除成功!");
              // 刷新界面
              this.queryDiscussTable();
            } else {
              this.$notify.error("删除失败!");
            }
          });
      }, 10);
    },
  },
  mounted() {
    this.queryDiscussTable();
  },
  computed: {
    /**
     * 获取讨论表
     */
    getDiscussTable() {
      return this.$store.state.manager.discussTable;
    },

    /**
     * 监听改变
     */
    listenerChange() {
      return (
        this.$store.state.manager.itemTable,
        this.$store.state.manager.methodName
      );
    },
  },
  watch: {
    listenerChange: {
      handler() {
        this.queryDiscussTable();
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>