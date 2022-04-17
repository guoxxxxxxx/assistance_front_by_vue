<template>
  <div style="margin-top: 20px">
    <!-- 发布人信息 -->
    <el-descriptions class="margin-top" title="发布人信息" :column="3" border>
      <template slot="extra">
        <el-button
          type="primary"
          size="small"
          @click="setAchieve(current_item.eid)"
          v-if="
            current_item.uid == this.$store.state.user.uid &&
            current_item.euid != null
          "
          :disabled="current_item.isAchieve == 1"
          >{{
            current_item.isAchieve == 1 ? "已完成" : "标记为已完成"
          }}</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="take_orders(current_item.eid)"
          v-if="current_item.uid != this.$store.state.user.uid"
          :disabled="current_item.euid != null"
          >{{ current_item.euid == null ? "接单" : "已被接单" }}</el-button
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
      title="接单人信息"
      :column="3"
      border
      v-if="current_item.euid"
    >
      <el-descriptions-item>
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

    <!-- 内容详情 -->
    <el-descriptions class="margin-top" title="内容详情" :column="2" border>
      <template slot="extra">
        <el-button
          type="warning"
          size="small"
          @click="changeErrandItem(current_item.eid)"
          v-if="current_item.uid == this.$store.state.user.uid"
          >修改信息</el-button
        >
      </template>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-price-tag"></i>
          订单编号
        </template>
        {{ current_item.eid }}
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
        {{ current_item.pubdate.substring(0, 10) }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          截止时间
        </template>
        {{
          current_eid.deadline == null
            ? "无"
            : current_item.deadline.substring(0, 10)
        }}
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
        <el-tag v-if="current_item.euid != null && current_item.isAchieve == 0"
          >已被接单</el-tag
        >
        <el-tag type="danger" v-if="current_item.euid == null">未被接单</el-tag>
        <el-tag type="success" v-if="current_item.isAchieve == 1"
          >已完成</el-tag
        >
      </el-descriptions-item>

      <el-descriptions-item>
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
  </div>
</template>

<script>
import { base_url } from "@/config";
export default {
  data() {
    return {
      // 当前订单的eid
      current_eid: 0,
      // 当前订单的详细信息
      current_item: {
        pubUser: {},
        takeOrderUser: {},
      },
    };
  },
  methods: {
    /**
     * 点击接单按钮
     */
    take_orders(eid) {
      this.axios
        .post(base_url + "/errand/updateEUid", {
          eid: eid,
          euid: this.$store.state.user.uid,
        })
        .then((resp) => {
          if (resp.status == 200) {
            // 重新加载界面
            this.getErrandDetails();
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
     * 返回上一级界面
     */
    back() {
      this.$router.back(1);
    },
    /**
     * 获取当前订单详细信息
     */
    getErrandDetails() {
      // 从父级界面获取所要查询的eid
      this.current_eid = this.$route.query.eid;
      // 向服务器发送请求查询当前订单信息
      this.axios
        .get(base_url + "/errand/queryDetailsByEid", {
          params: {
            eid: this.current_eid,
          },
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.status == 200) {
            this.current_item = resp.data.object;
          } else {
            this.$notify.error("加载数据失败");
          }
        });
    },
    /**
     * 点击修改信息按钮
     */
    changeErrandItem(eid) {
      this.$router.push({
        path: "/indexView/IndexDeliveryBody/errandChangeComp",
        query: {
          eid: eid,
        },
      });
    },
    /**
     * 完成订单 设置订单属性为已完成
     */
    setAchieve(eid) {
      this.axios
        .get(base_url + "/errand/updateErrandIsAchieveStateByEid", {
          params: {
            eid: eid,
          },
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.getErrandDetails();
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
  },
  mounted() {
    this.getErrandDetails();
    console.log(this.current_item);
    // 进入详细界面 隐藏搜素框
    this.$store.state.isShowSearch = false;
  },
};
</script>

<style>
</style>