<template>
  <div class="items_box">
    <div v-for="item in getItems" :key="item.lid">
      <md-card class="item-card" data-aos="zoom-in" data-aos-duration="1500">
        <md-card-header>
          <!-- 用户头像显示区域，若用户头像为null则显示默认头像 -->
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
          </div>
        </md-card-header>

        <!-- 
          将用户上传的第一张图片作为预览图片
          若 用户未上传图片则显示默认图片
         -->
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

        <!-- 详细说明 -->
        <div style="height: 70px">
          <md-card-content>
            {{ item.details }}
          </md-card-content>
        </div>

        <div id="btn_groups">
          <div id="_pubdate">发布日期: {{ item.pubdate }}</div>
          <md-card-actions>
            <Button type="warning" ghost @click="see_details(item.lid)"
              >查看详情</Button
            >
          </md-card-actions>
        </div>
      </md-card>
    </div>

    <!-- 当该界面没有订单时展示该界面 -->
    <el-empty
      description="暂无信息"
      v-if="getItemsCount == 0"
      :image-size="350"
      style="text-align: center; width: 100%"
    ></el-empty>

    <!-- 分页 -->
    <div style="width: 1500px; text-align: center" v-if="getItemsCount != 0">
      <el-pagination
        layout="prev, pager, next"
        :total="getItemsCount"
        :page-size="12"
        @current-change="currentPageEvent"
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
      base_url: base_url,
    };
  },
  methods: {
    /**
     * 从后台获取符合条件的信息
     */
    queryByCondition(condition) {
      this.axios
        .post(base_url + "/lostProperty/queryByCondition", {
          page: condition.page,
          category: condition.category,
          fuzzyParam: condition.fuzzyParam,
          isHiddenAchieve: condition.isHiddenAchieve,
        })
        .then((resp) => {
          this.$store.state.allItems = resp.data.object;
        });
    },
    /**
     * 获取符合条件的项目数量
     */
    queryCountByCondition(condition) {
      this.axios
        .post(base_url + "/lostProperty/queryCountByCondition", {
          page: condition.page,
          category: condition.category,
          fuzzyParam: condition.fuzzyParam,
          isHiddenAchieve: condition.isHiddenAchieve,
        })
        .then((resp) => {
          this.$store.state.itemsCount = resp.data.object;
        });
    },
    /**
     * 点击分页按钮
     */
    currentPageEvent(newPage) {
      this.$store.state.queryCondition.page = newPage;
      this.queryByCondition(this.$store.state.queryCondition);
    },
    /**
     * 点击查看详情按钮
     */
    see_details(lid) {
        // 隐藏搜索框
        this.$store.state.isShowSearch = false;
        this.$router.push({
            path:"/indexView/indexMissAndFindBody/LostPropertyDetailsComp",
            query:{
                lid: lid
            }
        })
    }
  },
  computed: {
    /**
     * 获取将要显示的项目信息
     */
    getItems() {
      return this.$store.state.allItems;
    },
    /**
     * 获取符合条件的项目数量
     */
    getItemsCount() {
      return this.$store.state.itemsCount;
    },
  },
  mounted() {
    this.$store.state.queryByCondition = {
      page: 1,
      fuzzyParam: "",
      category: "全部",
      isHiddenAchieve: 0,
    };
    // 查询将要展示的项目
    this.queryByCondition(this.$store.state.queryCondition);
    // 查询符合条件的项目数量
    this.queryCountByCondition(this.$store.state.queryCondition);
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