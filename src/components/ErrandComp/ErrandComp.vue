<template>
  <div class="items_box">
    <div v-for="item in getItems" :key="item.id">
      <md-card class="item-card" data-aos="zoom-in" data-aos-duration="1500">
        <md-card-header>
          <md-avatar>
            <img
              :src="base_url + item.pubUser.avatarPath"
              alt="AVATAR"
              v-if="item.pubUser.avatarPath != null"
            />
            <img
              :src="base_url + '/avatar/default.png'"
              alt="AVATAR"
              v-if="item.pubUser.avatarPath == null"
            />
          </md-avatar>

          <div class="md-title">{{ item.pubUser.name }} | {{ item.title }}</div>
          <div class="md-subhead">
            <span>分类: {{ item.category }} </span>
            <!-- 如果小费为0则显示为免费 -->
            <span v-if="item.money">| 小费: {{ item.money }}</span>
            <span v-if="!item.money">| 无小费</span>
          </div>
        </md-card-header>

        <!-- 预览图片 -->
        <md-card-media v-if="!item.imgUrls[0]">
          <img
            :src="base_url + '/img/null.png'"
            alt="IMG"
            style="max-width: 320px; max-height: 180px"
          />
        </md-card-media>
        <md-card-media v-if="item.imgUrls[0]">
          <img
            :src="base_url + item.imgUrls[0]"
            alt="IMG"
            style="max-width: 320px; max-height: 180px"
          />
        </md-card-media>

        <div style="height: 70px">
          <md-card-content>
            {{ item.details }}
          </md-card-content>
        </div>

        <div id="btn_groups">
          <div id="_pubdate">发布日期: {{ item.pubdate }}</div>
          <md-card-actions>
            <Button type="warning" ghost @click="see_details(item.eid)"
              >查看详情</Button
            >
          </md-card-actions>
        </div>
      </md-card>
    </div>

    <!-- 当该界面没有订单时展示该界面 -->
    <el-empty
      description="暂无信息"
      v-if="getItems.length == 0"
      :image-size="350"
      style="text-align: center; width: 100%"
    ></el-empty>

    <!-- 分页 -->
    <div style="width: 1500px; text-align: center">
      <el-pagination
        layout="prev, pager, next"
        :total="getItemsCount"
        :page-size="12"
        v-on:current-change="pageChange"
        v-if="getItems.length == 0 ? false : true"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { base_url } from "@/config";
export default {
  data() {
    return {
      items_count: 0,
      errand_items: [],
      base_url: base_url,
      current_user: this.$store.getters.getUserInfo,
      errandFilterType: this.$store.getters.getErrandFilterType,
    };
  },
  methods: {
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

    /**
     * 条件查询 并赋值给相关变量
     */
    queryByCondition(condition) {
      this.axios
        .post(base_url + "/errand/queryByCondition", {
          category: condition.category,
          page: condition.page,
          fuzzyParam: condition.fuzzyParam,
          isHiddenAchieve: condition.isHiddenAchieve,
          isHiddenTakeOrders: condition.isHiddenTakeOrders,
        })
        .then((resp) => {
          this.$store.state.allItems = resp.data.object;
        });
    },

    /**
     * 条件查询符合条件的信息数目 并赋值给相关变量
     */
    queryCountByCondition(condition) {
      this.axios
        .post(base_url + "/errand/queryCountByCondition", {
          category: condition.category,
          page: condition.page,
          fuzzyParam: condition.fuzzyParam,
          isHiddenAchieve: condition.isHiddenAchieve,
          isHiddenTakeOrders: condition.isHiddenTakeOrders,
        })
        .then((resp) => {
          this.$store.state.itemsCount = resp.data.object;
        });
    },

    /**
     * 重新查询所需信息
     */
    reQuery(condition) {
      this.queryByCondition(condition);
      this.queryCountByCondition(condition);
    },

    /**
     * 页码改变事件监听
     */
    pageChange(newPage) {
      this.$store.state.queryCondition.page = newPage;
      this.reQuery(this.$store.state.queryCondition);
    },
  },
  mounted() {
    // 进入界面加载所有带跑腿项目
    this.queryByCondition(this.$store.state.queryCondition);
    // 进入界面将过滤框显示设为真
    this.$store.state.isShowSearch = true;
    // 查询符合条件项目的数量
    this.queryCountByCondition(this.$store.state.queryCondition);
  },
  computed: {
    /**
     * 获取符合条件的项目
     */
    getItems() {
      return this.$store.state.allItems;
    },
    /**
     * 获取符合项目的总数量
     */
    getItemsCount() {
      return this.$store.state.itemsCount;
    },
  },
};
</script>

<style scoped>
.item-card {
  width: 320px;
  height: 380px;
  border-radius: 30px;
  box-shadow: 10px 10px 30px rgb(128, 128, 128);
}

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