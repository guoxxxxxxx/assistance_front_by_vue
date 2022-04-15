<template>
  <div>
    <!-- 发布人信息 -->
    <el-descriptions class="margin-top" title="发布人信息" :column="3" border>
      <!-- <template slot="extra">
        <el-button type="primary" size="small">操作</el-button>
      </template> -->

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
    <el-descriptions class="margin-top" title="内容详情" :column="2" border>
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
    <comment-comp :authorId="this.current_item.pubUser.uid"></comment-comp>

    <!-- 分页 -->
    <div style="width: auto; text-align: center" v-if="discussTotal">
      <el-pagination layout="prev, pager, next" :total="discussTotal" :page-size="12">
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
      current_sid: null,
      current_item: {
        pubUser: {},
        imgUrls: [],
      },
      // 该界面评论的总数量
      discussTotal: 0,
    };
  },
  methods: {
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
          console.log(this.current_item);
        });
    },
    /**
     * 根据sid查询与之对应的所有评论信息
     */
    selectDiscussBySid(sid) {
      this.axios
        .get(base_url + "/study/selectDiscussBySid", { params: { sid: sid } })
        .then((resp) => {
          // 更新vuex中的全局评论对象
          this.$store.state.discussList = resp.data.object;
          console.log("discuss: ", this.$store.state.discussList);
        });
    },
    /**
     * 查询当前界面所拥有的评论数量
     */
    selectDiscussCountBySid(sid) {
      this.axios.get(base_url + "/study/selectDiscussCountBySid", {
        params: {
          sid: sid,
        },
      }).then(resp => {
        if (resp.data.status == 200) {
          this.discussTotal = resp.data.object;
        }
      });
    },
  },
  mounted() {
    // 进入该界面 先将之前的全局评论清空
    this.$store.state.discussList = []
    // 从上级路由读取所要查询页面的sid
    this.current_sid = this.$route.query.sid;
    // 查询当前页面详细信息
    this.selectDetailsBySid(this.current_sid);
    // 查询当前页面评论信息
    this.selectDiscussBySid(this.current_sid);
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