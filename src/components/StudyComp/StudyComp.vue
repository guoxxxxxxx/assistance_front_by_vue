<template>
  <div class="items_box">
    <div v-for="item in filterItems" :key="item.sid">
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

        <!-- 此处发布日期仅取前十位, 包含具体日期 不包含具体时间 -->
        <div id="btn_groups">
          <div id="_pubdate">发布日期: {{ item.pubdate }}</div>
          <md-card-actions>
            <Button type="warning" ghost @click="see_details(item.sid)"
              >查看详情</Button
            >
          </md-card-actions>
        </div>
      </md-card>
    </div>

    <!-- 当该界面没有订单时展示该界面 -->
    <el-empty
      description="暂无信息"
      v-if="filterItems.length == 0"
      :image-size="350"
      style="text-align: center; width: 100%;"
    ></el-empty>

    <!-- 分页 -->
    <div
      style="width: 1500px; text-align: center"
      v-if="filterItems.length != 0"
    >
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
      // 存放从后端查询的项目信息
      items: {},
      // 当前登录用户的id
      current_user: this.$store.state.user,
    };
  },
  methods: {
    /**
     * 点击查看详情按钮
     */
    see_details(id) {
      this.$store.state.isShowSearch = false;
      this.$router.push({
        path: "/indexView/IndexStudyBody/studyDetailsComp",
        query: {
          sid: id,
        },
      });
    },
    /**
     * 查询study表中有多少记录查询itemsCount
     */
    selectItemsCount(condition) {
      let temp = 0;
      if (condition.isHiddenAchieve) {
        temp = 1;
      }
      this.axios
        .post(base_url + "/study/queryItemsCountByCondition", {
          category: condition.category,
          fuzzyParam: condition.fuzzyParam,
          isHiddenAchieve: temp,
        })
        .then((resp) => {
          this.$store.state.itemsCount = resp.data.object;
        });
    },
    /**
     * 获取指定页码的信息
     * 条件查询
     */
    getItemsByCondition(page, condition) {
      console.log("queryCondition: ", condition);
      let isHiddenAchieveTemp = 0;
      if (condition.isHiddenAchieve) {
        isHiddenAchieveTemp = 1;
      }
      this.axios
        .post(base_url + "/study/queryByCondition", {
          page: page,
          category: condition.category,
          fuzzyParam: condition.fuzzyParam,
          isHiddenAchieve: isHiddenAchieveTemp,
        })
        .then((resp) => {
          this.$store.state.allItems = resp.data.object;
        });
    },
    /**
     * 点击页码按钮时响应事件
     */
    currentPageEvent(current_page) {
      this.getItemsByCondition(current_page, this.$store.state.queryCondition);
      // 将页码赋值给current_page;
      this.$store.state.queryCondition.page = current_page;

      // 返回顶部
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  computed: {
    /**
     * 通过计算属性来更新项目信息
     */
    filterItems() {
      return this.$store.state.allItems;
    },
    /**
     * 获取项目总数
     */
    getItemsCount() {
      return this.$store.state.itemsCount;
    },
    /**
     * 获取查询条件
     */
    getQueryCondition() {
      return this.$store.state.queryCondition;
    },
  },
  mounted() {
    /**
     * 进入页面,默认查询全部信息的第一页内容。
     */
    this.getItemsByCondition(1, this.$store.state.queryCondition);
    /**
     * 查询项目数量
     */
    this.selectItemsCount(this.$store.state.queryCondition);
  },
  watch: {},
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