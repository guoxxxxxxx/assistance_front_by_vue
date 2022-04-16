<template>
  <div>
    <!-- 发布人信息 -->
    <el-descriptions class="margin-top" title="发布人信息" :column="3" border>
      <template slot="extra">
        <el-button
          type="primary"
          size="small"
          @click="achieveItem(current_item.eid)"
          v-if="
            current_item.uid == this.$store.state.user.uid ||
            current_item.isAchieve == 1
          "
          :disabled="current_item.isAchieve == 1"
          >{{ current_item.isAchieve ? "已完成" : "标记为已完成" }}</el-button
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

    <!-- 接单人信息 -->
    <el-descriptions class="margin-top" title="接单人信息" :column="3" border>
      <!-- <template slot="extra">
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
      </template> -->

      <el-descriptions-item v-if="current_item.takeOrderUser">
        <template slot="label">
          <i class="el-icon-price-tag"></i>
          ID
        </template>
        {{ current_item.takeOrderUser.uid }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        {{ current_item.takeOrderUser.name }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i
            v-if="current_item.takeOrderUser.sex == '男'"
            class="el-icon-male"
          ></i>
          <i
            v-if="current_item.takeOrderUser.sex == '女'"
            class="el-icon-female"
          ></i>
          <i
            v-if="current_item.takeOrderUser.sex == '保密'"
            class="el-icon-lock"
          ></i>
          性别
        </template>
        {{ current_item.takeOrderUser.sex }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          所属学院
        </template>
        {{ current_item.takeOrderUser.faculty }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-collection"></i>
          专业
        </template>
        {{ current_item.takeOrderUser.major }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          入学年份
        </template>
        {{ current_item.takeOrderUser.grade }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          联系电话
        </template>
        {{ current_item.takeOrderUser.phone }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-message"></i>
          邮箱
        </template>
        {{ current_item.takeOrderUser.email }}
      </el-descriptions-item>
    </el-descriptions>

    <div style="margin-top: 40px"></div>

    <div id="btn_groups">
      <Button type="warning" ghost @click="back">返回</Button>
      <Button
        type="success"
        ghost
        v-if="current_item.uid != this.currentUserUID"
        @click="take_orders(current_item.eid)"
        :disabled="current_item.euid != null"
        >{{ current_item.euid != null ? "已被接单" : "接单" }}</Button
      >
      <Button
        type="error"
        ghost
        v-if="current_item.pubUser.uid == this.currentUserUID"
        @click="fakeDeleteItemByEid(current_item.eid)"
        >删除</Button
      >
    </div>

    <!-- 评论组件 -->
    <comment-comp
      :authorId="current_item.pubUser.uid"
      @doSend="doSend"
      @doChidSend="doChidSend"
    ></comment-comp>
  </div>
</template>

<script>
import CommentComp from "@/components/publicComp/CommentComp.vue";
import axios from "axios";
import { base_url } from "@/config";
export default {
  props: ["dontShowSearch", "showSearch"],
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
     * 点击返回按钮 回退
     */
    back() {
      this.showSearch();
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
            this.$router.back(1);
          } else {
            this.$notify({
              title: "失败",
              message: "删除失败",
              type: "error",
            });
          }
        });
    },
    /**
     * 更新评论信息
     */
    updateDiscussList() {
      axios
        .get(base_url + "/errand/queryAllCommentsAndChildComments", {
          params: {
            eid: this.eid,
          },
        })
        .then((resp) => {
          console.log(resp.data.object);
          this.$store.commit("updateDiscussList", resp.data.object);
        });
    },
    /**
     * 点击发送评论按钮
     */
    doSend(content) {
      this.axios
        .post(base_url + "/errand/sendDiscuss", {
          eid: this.eid,
          commentUid: this.$store.state.user.uid,
          content: content,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.updateDiscussList();
            this.$notify.success("评论成功");
          } else {
            this.$notify.error("评论失败!");
          }
        });
    },
    /**
     * 完成订单
     */
    achieveItem(eid) {
      this.axios
        .get(base_url + "/errand/updateErrandIsAchieveStateByEid", {
          params: {
            eid: eid,
          },
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify({
              title: "成功",
              message: "更改完成信息成功",
              type: "success",
              duration: 1000,
            });
          } else {
            this.$notify({
              title: "失败",
              message: "更改完成信息失败",
              type: "error",
              duration: 1000,
            });
          }
        });
    },
    /**
     * 点击发送回复按钮
     */
    doChidSend(content, targetUserId, fatherDiscussId) {
      console.log(content, targetUserId, fatherDiscussId);
      this.axios
        .post(base_url + "/errand/sendReply", {
          parentDiscussId: fatherDiscussId,
          commentUid: this.$store.state.user.uid,
          targetUid: targetUserId,
          content: content,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.updateDiscussList();
            this.$notify.success("发表回复成功!");
          } else {
            this.$notify.error("发表回复失败!");
          }
        });
    },
  },
  data() {
    return {
      eid: this.$route.query.eid,
      current_item: {},
      base_url: base_url,
      currentUserUID: this.$store.getters.getUserInfo.uid, // 当前登录的用户id

      discussList: this.$store.state.discussList,
    };
  },
  components: {
    CommentComp,
  },
  mounted() {
    this.updateDiscussList();
    // 进入详细信息界面，查询详细信息
    axios
      .get(base_url + "/errand/queryDetailsByEid", {
        params: { eid: this.eid },
      })
      .then((resp) => {
        console.log(resp);
        this.current_item = resp.data.object;
      });

    // 隐藏搜索框
    this.dontShowSearch();
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