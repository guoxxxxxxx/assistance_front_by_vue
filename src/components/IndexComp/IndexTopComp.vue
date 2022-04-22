<template>
  <div id="bx1">
    <div class="block">
      <el-image :src="src" style="max-height: 380px; border-radius: 30px;"></el-image>
    </div>
  </div>
</template>

<script>
import { base_url } from '@/config';
export default {
  data() {
    return {
      src: base_url + "/img/index.jpg",
    };
  },
  methods: {},
};
</script>

<style scoped>
#bx1 {
  width: 100%;
  height: 380px;
  border-radius: 30px;
  box-shadow: 10px 10px 30px rgb(128, 128, 128);
}
</style>