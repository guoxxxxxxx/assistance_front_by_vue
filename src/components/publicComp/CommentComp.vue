<template>
  <div>
    <!-- 评论组件 对评论组件进行二次封装 -->
    <!-- 
      以后传递参数仅传递authorid, doSend, doChildSend方法即可
     -->
    <comment
      :avatar="user.avatarPath"
      :commentNum="getDiscussList.length"
      :authorId="authorId"
      :commentList="getDiscussList"
      @doSend="doSend"
      @doChidSend="doChidSend"
    ></comment>
  </div>
</template>

<script>
// 引入评论组件
import comment from "bright-comment";
import { base_url } from "@/config";
export default {
  props:["authorId"],
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
  methods:{
    /**
     * 调用父组件中的方法
     */
    doSend(content){
      this.$emit("doSend", content);
    },

    /**
     * 调用子组件中的方法
     */
    doChidSend(content, targetUserId, fatherDiscussId){
      // console.log(content, targetUserId, fatherDiscussId);
      this.$emit("doChidSend", content, targetUserId, fatherDiscussId);
    }
  }
};
</script>

<style>
</style>