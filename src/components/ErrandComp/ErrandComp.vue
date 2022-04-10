<template>
  <div class="items_box">
    <div v-for="item in errandItems" :key="item.id">
      <md-card>
        <md-card-header>
          <md-avatar>
            <img :src="base_url + item.pubUser.avatarPath" alt="AVATAR" />
          </md-avatar>

          <div class="md-title">{{item.pubUser.name}} | {{ item.title }}</div>
          <div class="md-subhead">
            <span>分类: {{ item.category }} </span>
            <!-- 如果小费为0则显示为免费 -->
            <span v-if="item.money">| 小费: {{ item.money }}</span>
            <span v-if="!item.money">| 无小费</span> 
          </div>
        </md-card-header>

        <!-- 预览图片 -->
        <md-card-media v-if="item.imgUrls[0]">
          <img :src="base_url + item.imgUrls[0]" alt="IMG" />
        </md-card-media>

        <md-card-content>
          {{ item.details }}
        </md-card-content>

        <div id="btn_groups">
          <div id="_pubdate">发布日期: {{item.pubdate.substring(0,10)}}</div>
          <md-card-actions>
            <Button type="warning" ghost @click="see_details(item.eid)"
              >查看详情</Button
            >
            <Button type="success" v-if="item.uid!=current_user.uid" ghost>接单</Button>
            <Button type="info" v-if="item.uid==current_user.uid" ghost>修改</Button>
          </md-card-actions>
        </div>
      </md-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { base_url } from "@/config";
export default {
  data() {
    return {
      errandItems:{},
      base_url: base_url,
      current_user: this.$store.getters.getUserInfo,
    };
  },
  methods: {
    /**
     * 打印数据
     */
    show(s) {
      console.log(s);
      console.log(base_url);
    },
    /**
     * 点击查看详细信息
     */
    see_details(eid) {
      this.$router.push({
        path: "/indexView/IndexDeliveryBody/errandDetailsComp",
        query: {
          eid: eid,
        },
      });
    },
  },
  mounted() {
    /**
     * 进入界面加载所有带跑腿项目
     */
    axios.get(base_url + "/errand/queryAll", {}).then((resp) => {
      this.errandItems = resp.data.object;
    });
  },
  computed: {},
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