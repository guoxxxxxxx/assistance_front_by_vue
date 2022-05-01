<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
    if (this.$store.state.user == null) {
      // 跳转到登录界面
      this.$router.replace({
        path: "/loginView",
        query: { timestamp: Date.now() },
      });
    }

    // 主界面
    // this.$router.replace({
    //   path: "/indexView",
    //   query: { timestamp: Date.now() },
    // });
  },
  methods: {},
  created() {
    // this.$store.state.user = JSON.parse(sessionStorage.getItem('user'));
  },
};
</script>

<style>
.login-bg {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
