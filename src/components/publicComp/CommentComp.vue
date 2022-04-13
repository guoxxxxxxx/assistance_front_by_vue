<template>
  <div>
    <!-- 评论组件 -->
    <!-- <comment
      :avatar="user.avatarPath"
      :commentNum="getDiscussList.length"
      :authorId="userId"
      :commentList="getDiscussList  "
    ></comment> -->

    <my-comment-comp
      :avatar="user.avatarPath"
      :commentNum="getDiscussList.length"
      :authorId="userId"
      :commentList="getDiscussList"
    ></my-comment-comp>
  </div>
</template>

<script>
// 引入评论组件
// import comment from "bright-comment";
import myCommentComp from "@/components/CommentCompDir/MyCommentComp.vue";
import { base_url } from "@/config";
export default {
  props: ["userId"],
  data() {
    return {
      user: this.$store.state.user,
      base_url: base_url,
    };
  },
  components: {
    // comment,
    myCommentComp,
  },
  computed: {
    getDiscussList() {
      return this.$store.state.discussList;
    },
  },
  mounted(){
    console.log(this.user.avatarPath);
  }
};
</script>

<style>
</style>