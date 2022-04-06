<template>
  <div class="items_box">
    <div v-for="e in person" :key="e.id">
      <md-card>
        <md-card-header>
          <md-avatar>
            <img src="../../assets/img/user.jpg" alt="Avatar" />
          </md-avatar>

          <div class="md-title">{{ e.title }}</div>
          <div class="md-subhead">
            <span>分类: {{ e.category }} </span>
            <span>| 小费: {{ e.price }}元</span>
          </div>
        </md-card-header>

        <md-card-media>
          <img src="../../assets/img/example.jpg" alt="People" />
        </md-card-media>

        <md-card-content>
          {{ e.details }}
        </md-card-content>

        <div id="btn_groups">
           <div id="_pubdate">
               发布日期: {{e.pubdate}}
           </div>
          <md-card-actions>
            <Button type="warning" ghost @click="see_details">查看详情</Button>
            <Button type="success" ghost>接单</Button>
          </md-card-actions>
        </div>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      person: {
        p1: {
          id: 1,
          category: "快递代取",
          name: "张三",
          title: "找人代取快递",
          details: "帮我拿快递100元劳务费！！！",
          imgsrc: "../../assets/img/user.jpg",
          headImgSrc: "../../assets/img/user.jpg",
          price: 100,
          pubdate: '2022/04/05'
        },
      },
    };
  },
  methods:{
    /**
     * 点击查看详细信息
     */
    see_details(){
      this.$router.push('/indexView/IndexDeliveryBody/errandDetailsComp')
    }
  }
};
</script>

<style scoped>

#_pubdate {
    padding-left: 5px;
    padding-top: 15px;
    color: rgb(163, 159, 159);
}

#btn_groups {
  display: flex;
  justify-content: space-between;
}

.md-card {
  width: 320px;
  margin: 25px;
  display: inline-block;
  vertical-align: top;
}

.items_box {
  display: flex;
  align-items: center;
  justify-content: left;
  flex-wrap: wrap;
}
</style>