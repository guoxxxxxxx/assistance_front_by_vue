<template>
  <body>
    <div class="container">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" class="icon" />
      </div>
      <div class="title">登录</div>
      <div class="inputs">
        <label>邮箱</label>
        <input type="text" name="email" placeholder="example@email.com" />
        <label>密码</label>
        <input type="password" name="password" placeholder="Enter Password" />
        <label>验证码</label>
        <input type="text" name="code" placeholder="Enter Verification Code" />
        <span id="button_groups">
          <button type="button" id="getCode">Get Code</button>
          <button type="submit" id="login">Login</button>
        </span>
      </div>

      <span class="line">
        <div>
          <a href="" id="forget">Forget Password?</a>
        </div>
        <div>
          <a href="">Sign Up!</a>
        </div>
      </span>
    </div>
  </body>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("@/assets/css/login.css");
</style>