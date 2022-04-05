<template>
  <div>
    <index-header></index-header>
    <router-view></router-view>
  </div>
</template>

<script>
import IndexHeader from "@/components/IndexComp/IndexHeader.vue";
export default {
  components: {
    IndexHeader,
  },
  mounted(){
    this.$router.replace('/indexView/indexBodyComp')
  }
};
</script>

<style>
</style>