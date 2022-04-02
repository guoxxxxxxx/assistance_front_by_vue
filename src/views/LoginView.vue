<template>
  <body>
    <div class="container" data-aos="zoom-in" data-aos-duration="700">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" class="icon" />
      </div>
      <div class="title">登录</div>
      <div class="inputs">
        <label>邮箱</label>
        <input type="text" name="email" placeholder="example@email.com" />
        <label>密码</label>
        <input type="text" name="code" placeholder="Enter Password" />
        <button type="submit" id="login">登 录</button>
      </div>
      <div class="line">
        <div>
          <a href="" onclick="return false" @click="go_to_registerView"
            >注 册!</a
          >
        </div>
        <div>
          <a
            href=""
            id="forget"
            onclick="return false"
            @click="go_to_forgetView"
            >忘记密码?</a
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
     * 去注册界面
     */
    go_to_registerView() {
      this.$router.push("/registerView");
    },
    /**
     * 去忘记密码界面
     */
    go_to_forgetView() {
      this.$router.push("/forgetView");
    },
  },
};
</script>

// 导入外部样式
<style scoped src='../assets/css/login.css'></style>
<style scoped>
</style>