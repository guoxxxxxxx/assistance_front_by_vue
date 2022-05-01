<template>
  <div class="index_header">
    <div id="left_box">
      <div id="index_logo_box">
        <img class="index_logo" src="../../../assets/img/index_logo.png" />
      </div>
      <Menu
        mode="horizontal"
        active-name="errand"
        @on-select="selectMethodName"
      >
        <MenuItem name="errand">
          <Icon type="md-bicycle" />
          跑腿
        </MenuItem>
        <MenuItem name="study">
          <Icon type="ios-book" />
          学习交流
        </MenuItem>
        <MenuItem name="second">
          <Icon type="logo-usd" />
          二手交易
        </MenuItem>
        <MenuItem name="lost">
          <Icon type="md-search" />
          失物招领
        </MenuItem>
        <MenuItem name="alumni">
          <Icon type="ios-people" />
          校友圈
        </MenuItem>
      </Menu>
    </div>
    <div id="right_box">
      <Dropdown @on-click="selectItem">
        <Avatar :src="user.avatarPath" size="large" />
        <DropdownMenu slot="list">
          <DropdownItem name="username"
            >用户名: {{ this.$store.getters.getUserInfo.name }}</DropdownItem
          >
          <DropdownItem name="user_center">个人中心</DropdownItem>
          <DropdownItem divided name="change_password">修改密码</DropdownItem>
          <DropdownItem v-if="this.$store.state.user.isManager == 1" name="user"
            >进入普通用户系统</DropdownItem
          >
          <DropdownItem name="exit">退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.getters.getUserInfo,
    };
  },
  methods: {
    /**
     * 头像下的选项
     */
    selectItem(name) {
      // 个人中心
      if (name == "user_center") {
        this.$router.push({
          path: "/indexView/PersonalInfomationComp",
          query: {
            timestamp: Date.now(),
          },
        });
      }
      // 退出
      else if (name == "exit") {
        sessionStorage.clear();
        this.$store.commit("updateUserInfo", null);
        this.$router.replace({
          path: "/login",
          query: {
            timestamp: Date.now(),
          },
        });
      } // 进入用户模式
      else if (name == "user") {
        this.$router.push({
          path: "/indexView/indexBodyComp",
          query: {
            timestamp: Date.now(),
          },
        });
      } // 忘记密码
      else if (name == "change_password") {
        this.$router.push({
          path: "/forgetView",
          query: {
            timestamp: Date.now(),
          },
        });
      }
    },
    /**
     * 规定要执行哪一个模块的方法
     */
    selectMethodName(name) {
      if (name == "errand") {
        this.$store.state.manager.methodName = "errand";
        this.$store.state.manager.title = "跑腿";
      } else if (name == "study") {
        this.$store.state.manager.methodName = "study";
        this.$store.state.manager.title = "学习";
      } else if (name == "second") {
        this.$store.state.manager.methodName = "second";
        this.$store.state.manager.title = "二手交易";
      } else if (name == "lost") {
        this.$store.state.manager.methodName = "lost";
        this.$store.state.manager.title = "失物招领";
      } else if (name == "alumni") {
        this.$store.state.manager.methodName = "alumni";
        this.$store.state.manager.title = "校友圈";
      }
    },
  },
};
</script>

<style scoped>
#left_box {
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.index_header {
  width: 100%;
  display: flex;
  justify-content: center;
}

#right_box {
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
}

#index_logo_box {
  width: 200px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.index_header {
  display: flex;
}

.index_logo {
  width: 130px;
  height: 30px;
}
</style>