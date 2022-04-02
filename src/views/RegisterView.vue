<template>
  <body>
    <div class="container" data-aos="zoom-in" data-aos-duration="800">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" class="icon" />
      </div>
      <div class="title">注 册</div>
      <div class="inputs">
        <label>邮 箱</label>
        <input type="text" name="email" placeholder="example@email.com" />
        <label>密 码</label>
        <input type="text" name="code" placeholder="Enter Password" />
        <button type="submit" id="register">注 册</button>
      </div>
      <div class="line">
        <div>
          <a href="" id="forget">忘记密码?</a>
        </div>
        <div>
          <a href="" onclick="return false"
            >注 册!</a
          >
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {};
</script>

<style>
</style>