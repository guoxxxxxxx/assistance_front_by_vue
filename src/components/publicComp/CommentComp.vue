<template>
  <div>
    <!-- 评论组件 -->
    <comment
      :avatar="user.avatarPath"
      :commentNum="getDiscussList.length"
      :authorId="user.uid"
      :commentList="getDiscussList  "
    ></comment>
  </div>
</template>

<script>
// 引入评论组件
import comment from "bright-comment";
import { base_url } from "@/config";
export default {
  data() {
    return {
      user: this.$store.state.user,
      base_url: base_url,
    };
  },
  components: {
    comment,
  },
  computed: {
    getDiscussList() {
      return this.$store.state.discussList;
    },
  },
};
</script>

<style>
</style>