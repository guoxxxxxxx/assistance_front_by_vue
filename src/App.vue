<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  mounted(){
    // 跳转到登录界面
    this.$router.replace({
      path: '/loginView',
      query: {timestamp: Date.now()}
    })
  },
  methods:{
  }
}
</script>

<style>
</style>
