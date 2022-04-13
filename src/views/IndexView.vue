<template>
  <div>
    <index-header></index-header>
    <div class="border">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
        <index-footer></index-footer>
  </div>
</template>

<script>
import IndexHeader from "@/components/IndexComp/IndexHeader.vue";
import IndexFooter from "@/components/IndexComp/IndexFooterComp.vue";
export default {
  components: {
    IndexHeader,
    IndexFooter,
  },
  mounted() {
    this.$router.replace("/indexView/indexBodyComp");
  },
};
</script>

<style scoped>
.border {
  width: 100%;
  height: auto;
  background-color: #ecf0f3;
  border: none;
  outline: none;
}

.container {
  width: 80%;
  height: auto;
  border-radius: 30px;
  box-sizing: border-box;
  box-shadow: 14px 14px 20px #cbced1, 14px 14px 20px white;
  background-color: white;
  margin-top: 30px;
  margin-bottom: 30px;
  border: none;
  outline: none;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 40px;
  min-height: 900px;
}
</style>