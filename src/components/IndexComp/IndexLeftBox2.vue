<template>
  <div id="bx1">
    <div id="avatar">
      <md-avatar style="width: 100px; height: 100px">
        <img :src="this.$store.state.user.avatarPath" alt="AVATAR" />
      </md-avatar>
      <div id="user_name">欢迎用户: {{ this.$store.state.user.name }}</div>
    </div>
    <div id="welcome_content">
        专业年级：<span class="content">{{this.$store.state.user.grade}}级 {{this.$store.state.user.major}}</span>
        <br><br>
        注册邮箱：<span class="content">{{this.$store.state.user.email}}</span><br><br>
        注册时间：<span class="content">{{this.$store.state.user.registerTime}}</span>
    </div>
  </div>
</template>

<script>
import { base_url } from "@/config";
export default {
  data() {
    return {
      count: 0,
      base_url: base_url,
    };
  },
  methods: {
    load() {
      this.count += 2;
    },
  },
};
</script>

<style scoped>
#bx1 {
  width: 100%;
  height: 380px;
  border-radius: 30px;
  box-shadow: 10px 10px 30px rgb(128, 128, 128);
  text-align: center;
}

#avatar {
  padding-top: 30px;
  width: 100%;
  text-align: center;
}

#user_name {
  padding-top: 30px;
  font-size: 2em;
}

#welcome_content {
  width: 100%;
  text-align: center;
  padding-top: 40px;
  font-size: 1.3em;
}

.content {
  color: rgb(183, 175, 175);
}
</style>