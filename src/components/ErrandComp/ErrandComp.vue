<template>
  <div class="items_box">
    <div v-for="item in filterItems" :key="item.id">
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
          <div id="_pubdate">日期: {{ item.pubdate.substring(0, 10) }}</div>
          <md-card-actions>
            <Button type="warning" ghost @click="see_details(item.eid)"
              >查看详情</Button
            >
            <Button
              type="success"
              v-if="item.uid != current_user.uid"
              ghost
              @click="take_orders(item.eid)"
              :disabled="item.euid != null"
              >{{
                item.euid != null
                  ? item.isAchieve == 1
                    ? "已完成"
                    : "已被接单"
                  : "接单"
              }}</Button
            >
            <Button
              type="info"
              v-if="item.uid == current_user.uid && item.euid == null"
              ghost
              @click="changeErrandItem(item.eid)"
              >修改</Button
            >
            <Button
              type="success"
              v-if="item.uid == current_user.uid && item.euid != null"
              @click="
                achieveItem(item.eid);
                item.isAchieve = 1;
              "
              :disabled="item.isAchieve == 1"
              >完成订单</Button
            >
            <!-- <button @click="show(item)">测试按钮</button> -->
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
      errandItems: [],
      base_url: base_url,
      current_user: this.$store.getters.getUserInfo,
      errandFilterType: this.$store.getters.getErrandFilterType,
    };
  },
  methods: {
    /**
     * 点击接单按钮
     */
    take_orders(eid) {
      console.log(this.$store.getters.getUserInfo.uid, eid);
      this.axios
        .post(base_url + "/errand/updateEUid", {
          eid: eid,
          euid: this.$store.getters.getUserInfo.uid,
        })
        .then((resp) => {
          if (resp.status == 200) {
            // 重新加载界面
            axios.get(base_url + "/errand/queryAll", {}).then((resp) => {
              this.errandItems = resp.data.object;
            });
            this.$notify({
              title: "成功",
              message: "成功接单",
              type: "success",
            });
          } else {
            this.$notify({
              title: "失败",
              message: "接单失败",
              type: "error",
            });
          }
        });
    },
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
    /**
     * 点击修改信息按钮
     */
    changeErrandItem(eid) {
      this.$router.push({
        path: "/indexView/IndexDeliveryBody/errandChangeComp",
        query: {
          eid: eid,
        },
      });
    },
    /**
     * 完成订单
     */
    achieveItem(eid) {
      this.axios
        .get(base_url + "/errand/updateErrandIsAchieveStateByEid", {
          params: {
            eid: eid,
          },
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify({
              title: "成功",
              message: "更改完成信息成功",
              type: "success",
              duration: 1000,
            });
          } else {
            this.$notify({
              title: "失败",
              message: "更改完成信息失败",
              type: "error",
              duration: 100,
            });
          }
        });
    },
    /**
     * 过滤器使用相关函数------------------------------------------------------开始
     */

    // 判断所属范畴
    judgeCategory(Val, filterVal) {
      if (filterVal == "all") {
        return true;
      } else {
        return filterVal == Val;
      }
    },

    // 判断是否显示已完成
    judgeIsAchieve(val, filterVal) {
      // 若为1则不显示已完成
      if (filterVal == false) {
        return val != 1;
      } else {
        // 若为0则显示已完成订单
        return true;
      }
    },

    /**
     * 判断是否显示已接单订单
     */
    judgeIsTakeOrder(val, filterVal) {
      if (filterVal == false) {
        return val == null;
      } else {
        return true;
      }
    },

    /**
     * 实现模糊搜索
     * 根据标题、详细信息、种类来进行搜索
     */
    search(item, target) {
      return (
        item.title.indexOf(target) != -1 ||
        item.details.indexOf(target) != -1 ||
        item.category.indexOf(target) != -1
      );
    },

    /**
     * 过滤器使用相关函数------------------------------------------------------结束
     */
  },
  mounted() {
    /**
     * 进入界面加载所有带跑腿项目
     */
    axios.get(base_url + "/errand/queryAll", {}).then((resp) => {
      this.errandItems = resp.data.object;
    });
  },
  computed: {
    /**
     * 通过计算属性过滤跑腿订单信息
     */
    filterItems() {
      return this.errandItems.filter((item) => {
        if (this.judgeCategory(item.category, this.errandFilterType.category)) {
          if (
            this.judgeIsAchieve(
              item.isAchieve,
              this.errandFilterType.isSeeAchieve
            )
          ) {
            if (
              this.judgeIsTakeOrder(
                item.euid,
                this.errandFilterType.isSeeTakeOrder
              )
            ) {
              if (this.search(item, this.errandFilterType.searchFilter)) {
                return true;
              }
            }
          }
        }
        return false;
      });
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