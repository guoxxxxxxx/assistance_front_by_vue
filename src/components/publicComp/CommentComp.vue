<template>
  <div>
<<<<<<< HEAD
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
=======
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
>>>>>>> 25fe691379c18698f472ad60c3f5edaa145e8ab2
  </div>
</template>

<script>
// 引入评论组件
// import comment from "bright-comment";
import myCommentComp from "@/components/CommentCompDir/MyCommentComp.vue";
import { base_url } from "@/config";
export default {
<<<<<<< HEAD
  props:["authorId"],
=======
  props: ["userId"],
>>>>>>> 25fe691379c18698f472ad60c3f5edaa145e8ab2
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
<<<<<<< HEAD
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
=======
  mounted(){
    console.log(this.user.avatarPath);
>>>>>>> 25fe691379c18698f472ad60c3f5edaa145e8ab2
  }
};
</script>

<style>
</style>