<template>
  <div>
    <div id="carousel">
      <!-- 轮播图 -->
      <el-carousel :interval="5000" arrow="always" type="card">
        <el-carousel-item v-for="item in getImgUrls" :key="item">
          <el-image :src="item" :preview-src-list="getImgUrls"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 搜索过滤区域 -->
    <div style="display: flex; margin-top: 50px;">
      <el-input
        placeholder="请输入要查询的信息"
        prefix-icon="el-icon-search"
        v-model="fuzzyParam"
        @keyup.enter.native="update"
      >
      </el-input>
      <el-button plain @click="update">搜索</el-button>
    </div>

    <!-- 评论区 -->
    <comment-comp id="comment"
      :authorId="0"
      @doSend="doSend"
      @doChidSend="doChidSend"
      :commentNum="getDiscussCount"
    ></comment-comp>

    <!-- 分页 -->
    <div
      style="width: auto; text-align: center"
      v-if="getDiscussCount == 0 ? false : true"
    >
      <el-pagination
        layout="prev, pager, next"
        :total="getDiscussCount"
        :page-size="6"
        @current-change="currentPageEvent"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { base_url } from "@/config";
import CommentComp from "../publicComp/CommentComp.vue";
export default {
  components: {
    CommentComp,
  },
  data() {
    return {
      base_url: base_url,
      imgs: ["5.jpg", "4.jpg", "3.jpg"],
      fuzzyParam: "",
      current_page: 1,
    };
  },
  computed: {
    getImgUrls() {
      let imgUrls = [];
      for (let i = 0; i < this.imgs.length; i++) {
        imgUrls.push(base_url + "/img/" + this.imgs[i]);
      }
      return imgUrls;
    },
    /**
     * 回显评论数量
     */
    getDiscussCount() {
      return this.$store.state.itemsCount;
    },
  },
  methods: {
    /**
     * 换页按钮
     */
    currentPageEvent(new_page) {
      this.current_page = new_page;
      this.queryDiscuss(new_page, this.fuzzyParam);
      document.getElementById("comment").scrollIntoView(true);
    },
    /**
     * 发送评论
     */
    doSend(content) {
      this.axios
        .post(base_url + "/alumni/sendDiscuss", {
          commentUid: this.$store.state.user.uid,
          content: content,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("发布成功！");
            this.update();
          } else {
            this.$notify.error("发布失败");
          }
        });
    },
    /**
     * 发送回复
     */
    doChidSend(content, targetUid, fatherDiscussId) {
      this.axios
        .post(base_url + "/alumni/sendReply", {
          commentUid: this.$store.state.user.uid,
          targetUid: targetUid,
          parentDiscussId: fatherDiscussId,
          content: content,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("回复成功");
            this.update();
          } else {
            this.$notify.error("回复失败");
          }
        });
    },
    /**
     * 刷新界面信息
     */
    update() {
      this.queryDiscuss(this.current_page, this.fuzzyParam);
      this.queryDiscussCount(this.fuzzyParam);
    },
    /**
     * 根据条件查询评论信息
     */
    queryDiscuss(page, fuzzyParam) {
      this.axios
        .get(base_url + "/alumni/queryDiscuss", {
          params: {
            page: page,
            fuzzyParam: fuzzyParam,
          },
        })
        .then((resp) => {
          this.$store.state.discussList = resp.data.object;
        });
    },
    /**
     * 查询符合符合条件的评论数量
     */
    queryDiscussCount(fuzzyParam) {
      this.axios
        .get(base_url + "/alumni/queryDiscussCount", {
          params: {
            fuzzyParam: fuzzyParam,
          },
        })
        .then((resp) => {
          this.$store.state.itemsCount = resp.data.object;
        });
    },
  },
  mounted() {
    // 进入界面查询信息
    this.queryDiscuss(1, this.fuzzyParam);
    this.queryDiscussCount(this.fuzzyParam);
  },
  watch:{
    fuzzyParam:{
      handler(){
        this.update();
      }
    }
  }
};
</script>

<style scoped>
#carousel {
  padding-top: 30px;
  height: auto;
}
</style>