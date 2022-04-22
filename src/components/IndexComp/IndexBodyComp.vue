<template>
  <div id="out_box">
    <index-top-comp></index-top-comp>
    <div id="index_box">
      <div id="box_left">
        <index-left-box-2></index-left-box-2>
        <index-left-box-1 style="border-radius: 30px;"></index-left-box-1>
      </div>
      <div id="box_right">
        <index-right-box></index-right-box>
      </div>
    </div>
  </div>
</template>

<script>
import { base_url } from "@/config";
import IndexLeftBox1 from "@/components/IndexComp/IndexLeftBox1.vue";
import IndexTopComp from "@/components/IndexComp/IndexTopComp.vue";
import IndexLeftBox2 from "@/components/IndexComp/IndexLeftBox2.vue";
import IndexRightBox from "@/components/IndexComp/IndexRightBox.vue";
export default {
  components: { IndexTopComp, IndexLeftBox1, IndexLeftBox2, IndexRightBox },
  methods: {
    base_url: base_url,
  },
};
</script>

<style scoped>
#out_box {
  padding-top: 40px;
}

#index_box {
  padding-top: 50px;
  display: flex;
  justify-content: space-between;
}

#box_left {
  width: 48%;
  height: 800px;
}

#box_right {
  width: 48%;
  height: 800px;
}
</style>