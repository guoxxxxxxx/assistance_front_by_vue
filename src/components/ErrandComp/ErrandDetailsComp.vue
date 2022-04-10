<template>
  <div>
    <el-descriptions title="发布人信息">
      <el-descriptions-item label="用户名">{{pubUser.name}}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{pubUser.phone}}</el-descriptions-item>
      <el-descriptions-item label="学院">{{pubUser.faculty}}</el-descriptions-item>
      <el-descriptions-item label="邮箱"
        >{{pubUser.email}}</el-descriptions-item
      >
      <el-descriptions-item label="所属专业"
        >{{pubUser.grade + pubUser.major}}</el-descriptions-item
      >
    </el-descriptions>
    <el-descriptions title="内容详细信息">
      <el-descriptions-item label="订单编号">{{item.eid}}</el-descriptions-item>
      <el-descriptions-item label="类别">{{item.title}}</el-descriptions-item>
      <el-descriptions-item label="发布日期">{{item.pubdate}}</el-descriptions-item>
      <el-descriptions-item label="截止日期">{{item.deadline}}</el-descriptions-item>
    </el-descriptions>
    <h5 class="mt-0">详细概述</h5>
    <b-card style="width: 80%">
      <b-media>
        <p>
          {{item.details}}
        </p>
        <div id="pic_out_box">
          <div
            class="pic_show_box"
            v-for="(src, index) in srcList"
            :key="index"
          >
            <el-image
              style="width: 100px; height: 100px"
              :src="src"
              :preview-src-list="srcList"
            >
            </el-image>
          </div>
        </div>
      </b-media>
    </b-card>

    <div id="btn_groups">
      <Button type="success" ghost>接单</Button>
      <span>--</span>
      <Button type="warning" ghost @click="back">返回</Button>
    </div>
    <comment></comment>
  </div>
</template>

<script>
// 引入评论组件
import comment from "bright-comment";
import axios from "axios";
import { base_url } from "@/config";
export default {
  methods: {
    /**
     * 回退
     */
    back() {
      this.$router.back(1);
    },
  },
  data() {
    return {
      eid: this.$route.query.eid,
      srcList: [],
      item: {},
      pubUser: {},
    };
  },
  components: {
    comment,
  },
  mounted() {
    // 进入详细信息界面，查询详细信息
    axios
      .get(base_url + "/errand/queryDetailsByEid", {
        params: { eid: this.eid },
      })
      .then((resp) => {
        this.item = resp.data.object
        this.pubUser = this.item.pubUser
      });
  },
};
</script>

<style>
#btn_groups {
  display: flex;
  justify-content: center;
}

.pic_show_box {
  margin-right: 10px;
}

#pic_out_box {
  display: flex;
  padding-top: 10px;
  flex-wrap: wrap;
}
</style>