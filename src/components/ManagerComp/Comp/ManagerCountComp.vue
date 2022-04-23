<template>
  <div id="count-box">
    <div id="title">{{ getTitle }}管理界面</div>
    <div id="count_inner">
      <div class="cbt">
        <div class="count">
          {{ getItemCount }}
        </div>
        <div class="count_title">项目数量</div>
      </div>
      <div class="cbt">
        <div class="count">
          {{ getDiscussCount + getReplyCount }}
        </div>
        <div class="count_title">评论数量</div>
      </div>
    </div>
  </div>
</template>

<script>
import { base_url } from '@/config';
export default {
  data() {
    return {
      manager: {},
    };
  },
  methods: {
    /**
     * 查询项目总数和评论总数
     */
    queryItemDisCount(methodName) {
        this.axios.get(base_url + '/manager/' + methodName + '/queryItemDisCount').then(resp=>{
            console.log(resp);
            if(resp.data.status == 200){
                let info = resp.data.object;
                console.log(info);
                this.$store.state.manager.replyCount = info.replyCount;
                this.$store.state.manager.discussCount = info.discussCount;
                this.$store.state.manager.itemCount = info.itemCount;
            }
        })
    },
  },
  computed:{
      getReplyCount(){
          return this.$store.state.manager.replyCount;
      },
      getDiscussCount(){
          return this.$store.state.manager.discussCount;
      },
      getItemCount(){
          return this.$store.state.manager.itemCount;
      },
      getTitle(){
          return this.$store.state.manager.title;
      }
  },
  mounted() {
    // 从vuex中获取管理员信息
    this.manager = this.$store.state.manager;
    // 查询信息
    this.queryItemDisCount(this.$store.state.manager.methodName);
  },
};
</script>

<style scoped>
#count-box {
  padding: 10px 10px 10px 10px;
  overflow: auto;
}

#title {
  font-size: 2em;
  width: 100%;
  text-align: center;
}

#count_inner {
  margin-top: 20px;
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: space-around;
}

.cbt {
  width: 35%;
  height: 90%;
  border-radius: 80px 20px 80px 20px;
  box-shadow: 5px 5px 5px rgb(142, 141, 141);
  background-color: rgb(159, 208, 238);
}

.count {
  padding: 50px 0;
  width: 100%;
  height: 60%;
  font-size: 3em;
  text-align: center;
}

.count_title {
  width: 100%;
  height: 20%;
  font-size: 1.5em;
  text-align: center;
}
</style>