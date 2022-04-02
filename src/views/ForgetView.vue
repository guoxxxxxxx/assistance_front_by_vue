<template>
  <body>
    <div class="container" data-aos="zoom-in" data-aos-duration="700">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" class="icon" />
      </div>
      <div class="title">找回密码</div>
      <div class="inputs">
        <label>邮 箱</label>
        <input type="text" name="email" placeholder="example@email.com" />
        <label>新密码</label>
        <input type="text" name="password" placeholder="Enter Password" />
        <label>验证码</label>
        <input
          type="text"
          name="verify"
          placeholder="Enter Verification Code"
        />
        <div class="oneline">
          <button type="button" id="getCode">获取验证码</button>
          <button type="submit" id="login">登 录</button>
        </div>
      </div>
      <div class="line">
        <div>
          <a href="" onclick="return false" id="forget" @click="go_to_login">登 录!</a>
        </div>
        <div>
          <a href="" onclick="return false" @click="go_to_registerView"
            >注 册!</a
          >
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  methods: {
    /**
     * 去登录界面
     */
    go_to_login() {
      this.$router.push("/loginView");
    },
    /**
     * 去注册界面
     */
    go_to_registerView() {
      this.$router.push("/registerView");
    },
  },
};
</script>

<style scoped src='../assets/css/forget.css'></style>
<style>
</style>