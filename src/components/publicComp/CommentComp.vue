<template>
  <div>
    <!-- 评论组件 对评论组件进行二次封装 -->
    <!-- 
      以后传递参数仅传递authorid, doSend, doChildSend方法即可
      文档说明: 
        Attribute:
          1. authorID: 发布该项目的作者

        event:
          1. doSend: 发送请求时所调用方法 
            参数: content 评论内容

          2. doChidSend: 发送回复时所调用方法 
            参数： content 评论内容, targetUserId 被评论用户ID, fatherDiscussId 所属父评论ID
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