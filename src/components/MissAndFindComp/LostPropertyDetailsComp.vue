<template>
  <div>
    <!-- 发布人信息 -->
    <el-descriptions
      class="margin-top"
      title="发布人信息"
      :column="3"
      border
      :labelStyle="LS"
      :contentStyle="CS"
    >
      <template slot="extra">
        <el-button
          type="primary"
          size="small"
          @click="setAchieve(current_lid)"
          v-if="
            current_item.uid == this.$store.state.user.uid ||
            current_item.isAchieve == 1
          "
          :disabled="current_item.isAchieve == 1"
          >{{ current_item.isAchieve ? "已完成" : "标记为已完成" }}</el-button
        >
        <el-button size="small" @click="back">返回</el-button>
      </template>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-price-tag"></i>
          ID
        </template>
        {{ current_item.pubUser.uid }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        {{ current_item.pubUser.name }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i v-if="current_item.pubUser.sex == '男'" class="el-icon-male"></i>
          <i v-if="current_item.pubUser.sex == '女'" class="el-icon-female"></i>
          <i v-if="current_item.pubUser.sex == '保密'" class="el-icon-lock"></i>
          性别
        </template>
        {{ current_item.pubUser.sex }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          所属学院
        </template>
        {{ current_item.pubUser.faculty }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-collection"></i>
          专业
        </template>
        {{ current_item.pubUser.major }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          入学年份
        </template>
        {{ current_item.pubUser.grade }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          联系电话
        </template>
        {{ current_item.pubUser.phone }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-message"></i>
          邮箱
        </template>
        {{ current_item.pubUser.email }}
      </el-descriptions-item>
    </el-descriptions>

    <div style="margin-top: 40px"></div>

    <!-- 内容详情 -->
    <el-descriptions
      class="margin-top"
      title="内容详情"
      :column="2"
      border
      :labelStyle="LS"
      :contentStyle="CS"
    >
      <template slot="extra">
        <el-button
          type="danger"
          size="small"
          @click="fakeDeleteByLid"
          v-if="current_item.uid == this.$store.state.user.uid"
          >删除信息</el-button
        >
      </template>
      <template slot="extra">
        <el-button
          type="warning"
          size="small"
          @click="change"
          v-if="current_item.uid == this.$store.state.user.uid"
          >修改信息</el-button
        >
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-price-tag"></i>
          问题编号
        </template>
        {{ current_item.lid }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          发布时间
        </template>
        {{ current_item.pubdate }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-collection"></i>
          分类
        </template>
        {{ current_item.category }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-question"></i>
          是否已完成
        </template>
        <el-tag type="success" v-if="current_item.isAchieve">是</el-tag>
        <el-tag type="danger" v-if="!current_item.isAchieve">否</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-chat-line-square"></i>
          详细说明
        </template>
        {{ current_item.details }}
      </el-descriptions-item>
    </el-descriptions>

    <div style="margin-top: 40px"></div>

    <!-- 用户所上传图片轮播效果 -->
    <div class="block" v-if="current_item.imgUrls" style="margin-top: 60px">
      <el-carousel height="300px" type="card">
        <el-carousel-item v-for="src in current_item.imgUrls" :key="src">
          <el-image :src="src" :preview-src-list="current_item.imgUrls">
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 评论区 -->
    <comment-comp id="comment"
      :authorId="this.current_item.pubUser.uid"
      @doSend="doSend"
      @doChidSend="doChidSend"
      :commentNum="commentNum"
    ></comment-comp>

    <!-- 分页 -->
    <div
      style="width: auto; text-align: center"
      v-if="commentNum == 0 ? false : true"
    >
      <el-pagination
        layout="prev, pager, next"
        :total="commentNum"
        :page-size="6"
        @current-change="currentPageEvent"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import CommentComp from "@/components/publicComp/CommentComp.vue";
import { base_url } from "@/config";
export default {
  data() {
    return {
      current_item: {
        pubUser: {},
      },
      current_lid: 0,
      // 该界面评论的总数量
      commentNum: 0,
      imgUrls: [],

      // 更改描述表的格式
      LS: {
        "word-break": "keep-all",
      },
      CS: {
        "max-width": "300px",
        "word-break": "break-all",
      },
    };
  },
  methods: {
    /**
     * 分页查询评论信息
     */
    currentPageEvent(newPage) {
      this.queryDiscussByLid(this.current_lid, newPage);
      this.selectDiscussCountBySid(this.current_lid);
      document.getElementById("comment").scrollIntoView(true);
    },
    /**
     * 查询当前界面所拥有的评论数量
     */
    selectDiscussCountBySid(lid) {
      this.axios
        .get(base_url + "/lostProperty/queryDiscussCountByLid", {
          params: {
            lid: lid,
          },
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.commentNum = resp.data.object;
          }
        });
    },
    /**
     * 点击发送评论按钮
     */
    doSend(content) {
      this.axios
        .post(base_url + "/lostProperty/sendDiscuss", {
          lid: this.current_lid,
          commentUid: this.$store.state.user.uid,
          content: content,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("发送评论成功！");
            // 重新查询该界面的评论消息
            this.queryDiscussByLid(this.current_lid, 1);
            this.selectDiscussCountBySid(this.current_lid);
          } else {
            this.$notify.error("发送评论失败!");
          }
        });
    },
    /**
     * 点击回复按钮
     */
    doChidSend(content, targetUserId, fatherDiscussId) {
      this.axios
        .post(base_url + "/lostProperty/doSendReply", {
          parentDiscussId: fatherDiscussId,
          commentUid: this.$store.state.user.uid,
          targetUid: targetUserId,
          content: content,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("回复成功");
            // 重新查询该界面的评论消息
            this.queryDiscussByLid(this.current_lid, 1);
            this.selectDiscussCountBySid(this.current_lid);
          } else {
            this.$notify.error("回复失败");
          }
        });
    },
    /**
     * 通过lid查询详细信息
     */
    queryDetalisByLid(lid) {
      this.axios
        .get(base_url + "/lostProperty/queryDetailsByLid", {
          params: {
            lid: lid,
          },
        })
        .then((resp) => {
          this.current_item = resp.data.object;
        });
    },
    /**
     * 返回到上一级菜单
     */
    back() {
      this.$router.back(1);
      this.$store.state.isShowSearch = true;
    },
    /**
     * 通过lid标记项目为已完成
     */
    setAchieve(lid) {
      this.axios
        .get(base_url + "/lostProperty/updateIsAchieveByLid", {
          params: {
            lid: lid,
          },
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("成功标记为已完成");
            // 重新刷新界面
            this.queryDetalisByLid(this.current_lid);
          } else {
            this.$notify.error("设置已完成失败!");
          }
        });
    },
    /**
     * 通过lid伪删除订单
     */
    fakeDeleteByLid(lid) {
      this.axios
        .get(base_url + "/lostProperty/fakeDeleteByLid", {
          params: {
            lid: lid,
          },
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("删除成功！");
            // 跳回到上一级界面
            this.$router.back(1);
          } else {
            this.$notify.error("删除失败");
          }
        });
    },
    /**
     * 点击修改信息按钮
     */
    change() {
      this.$router.push({
        path: "/indexView/indexMissAndFindBody/LostPropertyChangeComp",
        query: {
          lid: this.current_lid,
        },
      });
    },
    /**
     * 通过lid查询当前项目评论详情
     */
    queryDiscussByLid(lid, page) {
      this.axios
        .get(base_url + "/lostProperty/queryDiscussByLid", {
          params: {
            page: page,
            lid: lid,
          },
        })
        .then((resp) => {
          this.$store.state.discussList = resp.data.object;
        });
    },
  },
  mounted() {
    // 获取要查询详细信息的id
    this.current_lid = this.$route.query.lid;
    // 查询详细信息
    this.queryDetalisByLid(this.current_lid);
    // 获取当前页面评论信息
    this.queryDiscussByLid(this.current_lid, 1);
    this.selectDiscussCountBySid(this.current_lid);
  },
  components: {
    CommentComp,
  },
};
</script>

<style>
</style>