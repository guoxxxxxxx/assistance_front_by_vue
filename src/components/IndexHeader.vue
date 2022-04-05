<template>
  <div class="index_header">
    <div id="left_box">
      <div id="index_logo_box">
        <img class="index_logo" src="../assets/img/index_logo.png" />
      </div>
      <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1">
          <Icon type="md-bicycle" />
          跑腿
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-book" />
          学习交流
        </MenuItem>
        <MenuItem name="3">
          <Icon type="logo-usd" />
          二手交易
        </MenuItem>
        <MenuItem name="4">
          <Icon type="md-search" />
          失物招领
        </MenuItem>
        <MenuItem name="5">
          <Icon type="ios-people" />
          校友圈
        </MenuItem>
      </Menu>
    </div>
    <div id="right_box">
      <Dropdown>
        <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large"/>
        <DropdownMenu slot="list">
          <DropdownItem name>用户名: 闪光皮皮</DropdownItem>
          <DropdownItem>个人中心</DropdownItem>
          <DropdownItem>消息</DropdownItem>
          <DropdownItem divided>退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#left_box {
  /* width: 70%; */
  display: flex;
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