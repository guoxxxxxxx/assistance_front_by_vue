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
          @click="setAchieve"
          v-if="
            current_item.uid == this.$store.state.user.uid ||
            current_item.isAchieve == 1
          "
          :disabled="current_item.isAchieve == 1"
          >{{ current_item.isAchieve ? "已解决" : "标记为已解决" }}</el-button
        >
        <el-button size="small" @click="back(1)">返回</el-button>
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
          @click="del"
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
        {{ current_item.sid }}
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
          所属学科范畴
        </template>
        {{ current_item.category }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-question"></i>
          是否已解决
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

    <!-- 用户所上传图片轮播效果 -->
    <div
      class="block"
      v-if="current_item.imgUrls.length"
      style="margin-top: 60px"
    >
      <el-carousel height="300px" type="card">
        <el-carousel-item v-for="src in current_item.imgUrls" :key="src">
          <el-image :src="src" :preview-src-list="current_item.imgUrls">
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 评论区 -->
    <comment-comp
      id="comment"
      :authorId="this.current_item.pubUser.uid"
      @doSend="doSend"
      @doChidSend="doChidSend"
      :commentNum="commentNum"
    ></comment-comp>

    <!-- 分页 -->
    <div style="width: auto; text-align: center" v-if="commentNum">
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
      current_page: 1,
      current_sid: null,
      current_item: {
        pubUser: {},
        imgUrls: [],
      },
      // 该界面评论的总数量
      commentNum: 0,
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
     * 返回上一级
     */
    back(val) {
      this.$router.back(val);
      this.$store.state.isShowSearch = true;
    },
    /**
     * 点击更改信息按钮
     */
    change() {
      this.$router.push({
        path: "/indexView/IndexStudyBody/studyChangeComp",
        query: { sid: this.current_sid },
      });
    },
    /**
     * 点击页码按钮事件
     */
    currentPageEvent(page) {
      this.selectDiscussBySid(this.current_sid, page);
      this.current_page = page;
      document.getElementById("comment").scrollIntoView(true);
    },
    /**
     * 点击发送评论按钮
     */
    doSend(content) {
      this.axios
        .post(base_url + "/study/sendDiscuss", {
          sid: this.current_sid,
          commentUid: this.$store.state.user.uid,
          content: content,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("发送评论成功！");
            // 重新查询评论信息
            this.selectDiscussBySid(this.current_sid);
            this.selectDiscussCountBySid(this.current_sid);
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
        .post(base_url + "/study/doSendReply", {
          parentDiscussId: fatherDiscussId,
          commentUid: this.$store.state.user.uid,
          targetUid: targetUserId,
          content: content,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("回复成功");
            // 重新查询该界面的评论消息
            this.selectDiscussBySid(this.current_sid, this.current_page);
            this.selectDiscussCountBySid(this.current_sid);
          } else {
            this.$notify.error("回复失败");
          }
        });
    },
    /**
     * 点击删除按钮
     */
    del() {
      this.$confirm("此操作将删除此贴, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 删除操作
        this.axios
          .get(base_url + "/study/fakeDeleteBySid", {
            params: { sid: this.current_sid },
          })
          .then((resp) => {
            if (resp.data.status == 200) {
              this.$notify.success("删除成功");
              this.$router.replace({
                path: "/indexView/IndexStudyBody/StudyComp",
                query: {
                  timestamp: Date.now(),
                },
              });
            } else {
              this.$notify.error("删除失败");
            }
          });
      });
    },
    /**
     * 通过sid获取该学习订单详细信息 并存放到current_item变量中
     */
    selectDetailsBySid(sid) {
      this.axios
        .get(base_url + "/study/selectDetailsBySid", {
          params: {
            sid: sid,
          },
        })
        .then((resp) => {
          this.current_item = resp.data.object;
        });
    },
    /**
     * 根据sid查询与之对应的评论信息 分页
     */
    selectDiscussBySid(sid, page) {
      this.axios
        .get(base_url + "/study/selectDiscussBySid", {
          params: { sid: sid, page: page },
        })
        .then((resp) => {
          // 更新vuex中的全局评论对象
          this.$store.state.discussList = resp.data.object;
        });
    },
    /**
     * 查询当前界面所拥有的评论数量
     */
    selectDiscussCountBySid(sid) {
      this.axios
        .get(base_url + "/study/selectDiscussCountBySid", {
          params: {
            sid: sid,
          },
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.commentNum = resp.data.object;
          }
        });
    },
    /**
     * 通过sid将当前项目状态改为已完成
     */
    setAchieve() {
      this.axios
        .get(base_url + "/study/setAchieveBySid", {
          params: { sid: this.current_sid },
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("状态成功更改为已完成");
            // 重新查询当前页面信息
            this.selectDetailsBySid(this.current_sid);
          } else {
            this.$notify.error("状态更改失败!");
          }
        });
    },
  },
  mounted() {
    // 返回顶部
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // 进入该界面 先将之前的全局评论清空
    this.$store.state.discussList = [];
    // 从上级路由读取所要查询页面的sid
    this.current_sid = this.$route.query.sid;
    // 查询当前页面详细信息
    this.selectDetailsBySid(this.current_sid);
    // 查询当前页面评论信息
    this.selectDiscussBySid(this.current_sid, 1);
    // 查询当前界面评论信息的数量
    this.selectDiscussCountBySid(this.current_sid);
  },
  computed: {},
  components: {
    CommentComp,
  },
};
</script>

<style>
</style>