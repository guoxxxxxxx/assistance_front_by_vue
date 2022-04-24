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
          @click="setAchieve(current_item.tid)"
          v-if="
            current_item.uid == this.$store.state.user.uid &&
            current_item.tuid != null
          "
          :disabled="current_item.isAchieve == 1"
          >{{
            current_item.isAchieve == 1 ? "已完成" : "标记为已完成"
          }}</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="take_orders(current_item.tid)"
          v-if="current_item.uid != this.$store.state.user.uid"
          :disabled="current_item.tuid != null"
          >{{ current_item.tuid == null ? "欲购买" : "已被预定" }}</el-button
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

    <!-- 接单人信息 -->
    <el-descriptions
      class="margin-top"
      title="预购人信息"
      :column="3"
      border
      v-if="current_item.tuid"
      :labelStyle="LS"
      :contentStyle="CS"
    >
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-price-tag"></i>
          ID
        </template>
        {{ current_item.takeOrdersUser.uid }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        {{ current_item.takeOrdersUser.name }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i
            v-if="current_item.takeOrdersUser.sex == '男'"
            class="el-icon-male"
          ></i>
          <i
            v-if="current_item.takeOrdersUser.sex == '女'"
            class="el-icon-female"
          ></i>
          <i
            v-if="current_item.takeOrdersUser.sex == '保密'"
            class="el-icon-lock"
          ></i>
          性别
        </template>
        {{ current_item.takeOrdersUser.sex }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          所属学院
        </template>
        {{ current_item.takeOrdersUser.faculty }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-collection"></i>
          专业
        </template>
        {{ current_item.takeOrdersUser.major }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          入学年份
        </template>
        {{ current_item.takeOrdersUser.grade }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          联系电话
        </template>
        {{ current_item.takeOrdersUser.phone }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-message"></i>
          邮箱
        </template>
        {{ current_item.takeOrdersUser.email }}
      </el-descriptions-item>
    </el-descriptions>

    <div style="margin-top: 40px"></div>

    <!-- 内容详情 -->
    <el-descriptions
      class="margin-top"
      title="商品详情"
      :column="2"
      border
      :labelStyle="LS"
      :contentStyle="CS"
    >
      <template slot="extra">
        <el-button
          type="danger"
          size="small"
          @click="deleteItem(current_item.tid)"
          v-if="current_item.uid == this.$store.state.user.uid"
          >删除信息</el-button
        >
        <el-button
          type="warning"
          size="small"
          @click="changeItem(current_item.tid)"
          v-if="current_item.uid == this.$store.state.user.uid"
          >修改信息</el-button
        >
      </template>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-price-tag"></i>
          订单编号
        </template>
        {{ current_item.tid }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"> 订单标题 </template>
        {{ current_item.title }}
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
          <i class="el-icon-date"></i>
          截止时间
        </template>
        {{ current_item.deadline == null ? "无" : current_item.deadline }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"> 所属范畴 </template>
        {{ current_item.category }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          当前状态
        </template>
        <el-tag v-if="current_item.tuid != null && current_item.isAchieve == 0"
          >已预定</el-tag
        >
        <el-tag type="danger" v-if="current_item.tuid == null">未被预定</el-tag>
        <el-tag type="success" v-if="current_item.isAchieve == 1"
          >已出售</el-tag
        >
      </el-descriptions-item>

      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-collection"></i>
          详细信息
        </template>
        {{ current_item.details }}
      </el-descriptions-item>
    </el-descriptions>

    <div style="margin-top: 40px"></div>

    <!-- 用户所上传图片轮播效果 -->
    <div
      class="block"
      v-if="current_item.imgUrls.length != 0"
      style="margin-top: 60px"
    >
      <el-carousel height="300px" type="card">
        <el-carousel-item v-for="src in current_item.imgUrls" :key="src">
          <el-image :src="src" :preview-src-list="current_item.imgUrls">
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 评论功能 -->
    <comment-comp
      id="comment"
      :authorId="current_item.pubUser.uid"
      :commentNum="commentNum"
      @doSend="doSend"
      @doChidSend="doChidSend"
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
      // 评论的数量
      commentNum: 1,
      current_item: {
        pubUser: {},
        takeOrdersUser: {},
        imgUrls: [],
      },
      current_tid: this.$route.query.tid,
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
      this.queryDiscussByTid(newPage);
      document.getElementById("comment").scrollIntoView(true);
    },
    /**
     * 删除信息方法
     */
    deleteItem(tid) {
      this.$confirm("此操作将删除此贴, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 删除操作
        this.axios
          .get(base_url + "/trade/fakeDeleteItem", {
            params: {
              tid: tid,
            },
          })
          .then((resp) => {
            if (resp.data.status == 200) {
              this.$notify.success("删除成功");
              this.$router.back(1);
            } else {
              this.$notify.error("删除失败");
            }
          });
      });
    },
    /**
     * 发送评论方法
     */
    doSend(content) {
      this.axios
        .post(base_url + "/trade/sendDiscuss", {
          tid: this.current_tid,
          commentUid: this.$store.state.user.uid,
          content: content,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("发表评论成功！");
            // 重新查询评论数量
            this.queryDiscussCount(this.current_tid);
            this.queryDiscussByTid(1);
          } else {
            this.$notify.error("发表评论失败!");
          }
        });
    },
    /**
     * 发送回复方法
     */
    doChidSend(content, targetUserId, fatherDiscussId) {
      this.axios
        .post(base_url + "/trade/sendReply", {
          parentDiscussId: fatherDiscussId,
          commentUid: this.$store.state.user.uid,
          targetUid: targetUserId,
          content: content,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("发送回复成功！");
            // 重新查询评论数量
            this.queryDiscussCount(this.current_tid);
            this.queryDiscussByTid(1);
          } else {
            this.$notify.error("发送回复失败！");
          }
        });
    },
    /**
     * 修改信息按钮
     */
    changeItem(tid) {
      this.$router.push({
        path: "/indexView/indexSecondHandBody/secondHandChangeComp",
        query: {
          tid: tid,
        },
      });
    },
    /**
     * 预定
     */
    take_orders(tid) {
      this.axios
        .get(base_url + "/trade/wantToBuy", {
          params: {
            tid: tid,
            tuid: this.$store.state.user.uid,
          },
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("预定成功！");
            // 刷新界面信息
            this.queryDetailsByTid();
          } else {
            this.$notify.error("预定失败！");
          }
        });
    },
    /**
     * 查询当前项目详细信息
     */
    queryDetailsByTid() {
      this.axios
        .get(base_url + "/trade/queryDetailsByTid", {
          params: {
            tid: this.current_tid,
          },
        })
        .then((resp) => {
          this.current_item = resp.data.object;
        });
    },
    /**
     * 返回按钮
     */
    back() {
      this.$router.back(1);
      this.$store.state.isShowSearch = true;
    },
    /**
     * 通过tid查询评论信息
     */
    queryDiscussByTid(page) {
      this.axios
        .get(base_url + "/trade/queryDiscussByTid", {
          params: {
            tid: this.current_tid,
            page: page,
          },
        })
        .then((resp) => {
          this.$store.state.discussList = resp.data.object;
        });
    },
    /**
     * 查询评论数量
     */
    queryDiscussCount() {
      this.axios
        .get(base_url + "/trade/queryDiscussCount", {
          params: {
            tid: this.current_tid,
          },
        })
        .then((resp) => {
          this.commentNum = resp.data.object;
        });
    },
  },
  computed: {},
  mounted() {
    // 查询当前项目详细信息
    this.queryDetailsByTid();
    // 查询评论信息
    this.queryDiscussByTid(1);
    // 查询评论数量
    this.queryDiscussCount(this.current_tid);
    // 进入详细界面 隐藏搜素框
    this.$store.state.isShowSearch = false;
  },
  components: {
    CommentComp,
  },
};
</script>

<style>
</style>