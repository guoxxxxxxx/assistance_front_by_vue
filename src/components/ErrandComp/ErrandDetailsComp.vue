<template>
  <div>
    <el-descriptions title="发布人信息">
      <el-descriptions-item label="用户名">{{
        pubUser.name
      }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{
        pubUser.phone
      }}</el-descriptions-item>
      <el-descriptions-item label="学院">{{
        pubUser.faculty
      }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{
        pubUser.email
      }}</el-descriptions-item>
      <el-descriptions-item label="所属专业">{{
        pubUser.grade + pubUser.major
      }}</el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="接单人信息" v-if="item.euid">
      <el-descriptions-item label="用户名">{{
        takeOrderUser.name
      }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{
        takeOrderUser.phone
      }}</el-descriptions-item>
      <el-descriptions-item label="学院">{{
        takeOrderUser.faculty
      }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{
        takeOrderUser.email
      }}</el-descriptions-item>
      <el-descriptions-item label="所属专业">{{
        takeOrderUser.grade + takeOrderUser.major
      }}</el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="内容详细信息">
      <el-descriptions-item label="订单编号">{{
        item.eid
      }}</el-descriptions-item>
      <el-descriptions-item label="类别">{{ item.title }}</el-descriptions-item>
      <el-descriptions-item label="发布日期">{{
        formatDate(item.pubdate)
      }}</el-descriptions-item>
      <el-descriptions-item label="发布时间">{{
        item.pubtime
      }}</el-descriptions-item>
      <el-descriptions-item label="截止日期">{{
        formatDate(item.deadline)
      }}</el-descriptions-item>
      <el-descriptions-item label="截止时间">{{
        item.deadtime
      }}</el-descriptions-item>
    </el-descriptions>
    <h5 class="mt-0">详细概述</h5>
    <b-card style="width: 80%">
      <b-media>
        <p>
          {{ item.details }}
        </p>
        <div id="pic_out_box">
          <div
            class="pic_show_box"
            v-for="(src, index) in item.imgUrls"
            :key="index"
          >
            <el-image
              style="width: 100px; height: 100px"
              :src="base_url + src"
              :preview-src-list="addBaseUrlInImg(item.imgUrls)"
            >
            </el-image>
          </div>
        </div>
      </b-media>
    </b-card>

    <div id="btn_groups">
      <Button type="warning" ghost @click="back">返回</Button>
      <Button
        type="success"
        ghost
        v-if="pubUser.uid != this.currentUserUID"
        @click="take_orders(item.eid)"
        :disabled="item.euid != null"
        >{{ item.euid != null ? "已被接单" : "接单" }}</Button
      >
      <Button
        type="error"
        ghost
        v-if="pubUser.uid == this.currentUserUID"
        @click="fakeDeleteItemByEid(item.eid)"
        >删除</Button
      >
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
     * 点击接单按钮
     */
    take_orders(eid) {
      console.log(this.$store.getters.getUserInfo.uid, eid);
      this.axios
        .post(base_url + "/errand/updateEUid", {
          eid: eid,
          euid: this.$store.getters.getUserInfo.uid,
        })
        .then((resp) => {
          if (resp.status == 200) {
            // 重新加载界面
            axios
              .get(base_url + "/errand/queryDetailsByEid", {
                params: { eid: this.eid },
              })
              .then((resp) => {
                this.item = resp.data.object;
                this.pubUser = this.item.pubUser;
                this.takeOrderUser = this.item.takeOrderUser;
              });
            this.$notify({
              title: "成功",
              message: "成功接单",
              type: "success",
            });
          } else {
            this.$notify({
              title: "失败",
              message: "接单失败",
              type: "error",
            });
          }
        });
    },
    /**
     * 回退
     */
    back() {
      this.$router.back(1);
    },
    /**
     * 更改详细信息长度
     */
    formatDate(date) {
      if (date == null) {
        return "未知";
      } else if (date.length <= 10) {
        return date;
      } else {
        return date.substring(0, 10);
      }
    },
    /**
     * 格式化图片路径，为图片路径添加源地址
     *  */
    addBaseUrlInImg(imgs) {
      let res = [];
      for (let i = 0; i < imgs.length; i++) {
        res.push(base_url + imgs[i]);
      }
      return res;
    },
    /**
     * 伪删除订单信息
     */
    fakeDeleteItemByEid(eid) {
      this.axios
        .post(base_url + "/errand/fakeDeleteItemByEid", { eid: eid })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
            });
            this.$router.back(1)
          } else {
            this.$notify({
              title: "失败",
              message: "删除失败",
              type: "error",
            });
          }
        });
    },
  },
  data() {
    return {
      eid: this.$route.query.eid,
      item: {},
      pubUser: {},
      takeOrderUser: {},
      base_url: base_url,
      currentUserUID: this.$store.getters.getUserInfo.uid,
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
        this.item = resp.data.object;
        this.pubUser = this.item.pubUser;
        this.takeOrderUser = this.item.takeOrderUser;
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