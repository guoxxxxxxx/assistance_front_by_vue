<template>
  <div>
    <div id="blank"></div>
    <div id="mbox1">
      <manager-count-comp class="smaller-box"></manager-count-comp>
      <manager-precent-comp class="smaller-box"></manager-precent-comp>
    </div>
    <div
      style="
        width: 100%;
        text-align: center;
        font-size: 2em;
        height: 30px;
        margin-top: 30px;
      "
    >
      项目管理
    </div>
    <div id="mbox2">
      <manager-item-comp class="big-box"></manager-item-comp>
    </div>
    <div style="display: flex; width: 100%; justify-content:space-between;">
      <div
        style="
          width: 48%;
          text-align: center;
          font-size: 2em;
          height: 30px;
          margin-top: 30px;
        "
      >
        评论管理
      </div>
      <div
        style="
          width: 48%;
          text-align: center;
          font-size: 2em;
          height: 30px;
          margin-top: 30px;
        "
      >
        回复管理
      </div>
    </div>
    <div id="mbox3">
      <manager-discuss-comp class="standard-box"></manager-discuss-comp>
      <manager-reply-comp class="standard-box"></manager-reply-comp>
    </div>
  </div>
</template>

<script>
import ManagerCountComp from "./Comp/ManagerCountComp.vue";
import ManagerDiscussComp from "./Comp/ManagerDiscussComp.vue";
import ManagerItemComp from "./Comp/ManagerItemComp.vue";
import ManagerPrecentComp from "./Comp/ManagerPrecentComp.vue";
import ManagerReplyComp from "./Comp/ManagerReplyComp.vue";
export default {
  components: {
    ManagerCountComp,
    ManagerPrecentComp,
    ManagerItemComp,
    ManagerDiscussComp,
    ManagerReplyComp,
  },
};
</script>

<style sc,
    ManagerReplyCompoped>
#blank {
  padding-top: 50px;
}

#mbox1 {
  /* background-color: aqua; */
  height: 240px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.smaller-box {
  width: 48%;
  height: 100%;
  border-radius: 30px;
  box-shadow: 5px 5px 20px rgb(128, 128, 128);
}

#mbox2 {
  height: 400px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.big-box {
  width: 100%;
  height: 100%;
  border-radius: 30px;
  box-shadow: 5px 5px 20px rgb(128, 128, 128);
}

#mbox3 {
  height: 500px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.standard-box {
  width: 48%;
  height: 100%;
  border-radius: 30px;
  box-shadow: 5px 5px 20px rgb(128, 128, 128);
}
</style>