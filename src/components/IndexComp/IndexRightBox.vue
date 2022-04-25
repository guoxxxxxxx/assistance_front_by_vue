<template>
  <div id="bx1">
    <div class="title">
      平台注册用户总数：
      <div class="numBox">
        <div class="content">{{userCount}}</div>
      </div>
    </div>
    <div class="title">
      平台项目总数：
      <div class="numBox">
        <div class="content">{{itemCount}}</div>
      </div>
    </div>
    <div class="title">
      平台评论总数：
      <div class="numBox">
        <div class="content">{{discussCount}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { base_url } from '@/config';
export default {
  data() {
    return {
      count: 0,
      userCount: 0,
      itemCount: 0,
      discussCount: 0,
    };
  },
  methods: {
    load() {
      this.count += 2;
    },
    /**
     * 查询用户数量
     */
    queryUserCount() {
      this.axios.get(base_url + '/user/queryUserCount').then(resp=>{
        this.userCount = resp.data.object;
      })
    },
    /**
     * 平台项目总数
     */
    queryItemCount() {
      this.axios.get(base_url + '/index/queryAllCount').then(resp=>{
        this.itemCount = resp.data.object.itemCount;
        this.discussCount = resp.data.object.disCount;
      })
    }
  },
  created() {
    this.queryUserCount();
    this.queryItemCount();
  }
};
</script>

<style scoped>
#bx1 {
  width: 100%;
  height: 800px;
  border-radius: 30px;
  box-shadow: 10px 10px 30px rgb(128, 128, 128);
  padding: 10px 10px 10px 10px;
}

.title {
  font-size: 2em;
  height: 33%;
  width: 100%;
  text-align: center;
}

.numBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.content {
  height: 60%;
  padding-top: 70px;
  width: 30%;
  border-radius: 80px 20px 80px 20px;
  box-shadow: 5px 5px 5px rgb(142, 141, 141);
  background-color: rgb(159, 208, 238);
  margin-top: 30px;
  font-size: 1.5em;
}
</style>