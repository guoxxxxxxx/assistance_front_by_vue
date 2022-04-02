<template>
  <body>
    <div class="container" data-aos="zoom-in" data-aos-duration="700">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" class="icon" />
      </div>
      <div class="title">注 册</div>
      <div class="inputs">
        <div class="oneline">
          <label>邮 箱</label>
          <label>验证码</label>
        </div>
        <div class="oneline">
          <input type="text" name="email" placeholder="example@email.com" />
          <input
            type="text"
            name="verify"
            placeholder="Enter Verification Code"
          />
        </div>
        <div class="oneline">
          <label>密 码</label>
          <label>确认密码</label>
        </div>
        <div class="oneline">
          <input type="text" name="code" placeholder="Enter Password" />
          <input type="text" name="code" placeholder="Confirm Password" />
        </div>
        <div class="oneline">
          <button type="button" id="getCode">获取验证码</button>
          <button type="submit" id="register">注 册</button>
        </div>
      </div>
      <div class="line">
        <div>
          <a href="" onclick="return false">登 录</a>
        </div>
        <div>
          <a href="" onclick="return false" id="forget">忘记密码?</a>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {};
</script>

<style scoped src='../assets/css/register.css'></style>
<style scoped>
</style>