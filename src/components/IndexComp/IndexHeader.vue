<template>
  <div class="index_header">
    <div id="left_box">
      <div id="index_logo_box">
        <img class="index_logo" src="../../assets/img/index_logo.png" />
      </div>
      <Menu mode="horizontal" active-name="1">
        <MenuItem name="1" to="/indexView/indexBodyComp">
          <Icon type="ios-home" />
          主页
        </MenuItem>
        <MenuItem name="2" to="/indexView/IndexDeliveryBody/ErrandComp">
          <Icon type="md-bicycle" />
          跑腿
        </MenuItem>
        <MenuItem name="3" to="/indexView/IndexStudyBody">
          <Icon type="ios-book" />
          学习交流
        </MenuItem>
        <MenuItem name="4" to="/indexView/IndexSecondHandBody">
          <Icon type="logo-usd" />
          二手交易
        </MenuItem>
        <MenuItem name="5" to="/indexView/indexMissAndFindBody">
          <Icon type="md-search" />
          失物招领
        </MenuItem>
        <MenuItem name="6" to="/indexView/indexSchoolmateBody">
          <Icon type="ios-people" />
          校友圈
        </MenuItem>
      </Menu>
    </div>
    <div id="right_box">
      <Dropdown @on-click="selectItem">
        <Avatar
          :src="user.avatarPath"
          size="large"
        />
        <DropdownMenu slot="list">
          <DropdownItem name="username">用户名: {{this.$store.getters.getUserInfo.name}}</DropdownItem>
          <DropdownItem name="user_center">个人中心</DropdownItem>
          <DropdownItem name="message">消息</DropdownItem>
          <DropdownItem divided name="change_password">修改密码</DropdownItem>
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
    }
  },
  methods: {
    /**
     * 头像下的选项
     */
    selectItem(name){
      // 个人中心
      if(name == 'user_center'){
        this.$router.push('/indexView/PersonalInfomationComp')
      }
      // 退出
      else if (name == 'exit') {
        this.$store.commit('updateUserInfo', {})
        // location.reload();
        this.$router.replace('/indexView');
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