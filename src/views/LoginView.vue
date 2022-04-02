<template>
  <body>
    <div class="container">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" class="icon" />
      </div>
      <div class="title">登 录</div>
      <div class="inputs">
        <span class="oneline">
          <label class="label_title">邮 箱</label>
          <label class="login_warm">{{ email_warm }}</label>
        </span>
        <input
          @keydown="ckemail"
          v-model="email"
          type="text"
          name="email"
          placeholder="example@email.com"
        />
        <span class="oneline">
          <label class="label_title">密 码</label>
          <label class="login_warm" id="password_login_warm">{{
            password_warm
          }}</label>
        </span>
        <input
          @keydown="ckPassword"
          v-model="password"
          type="password"
          name="password"
          placeholder="Enter Password"
        />
        <span class="oneline">
          <label class="label_title">验证码</label>
          <label class="login_warm"></label>
        </span>
        <input
          v-model="random_code"
          type="text"
          name="code"
          placeholder="Enter Verification Code"
        />
        <span id="button_groups">
          <button @click="getcode()" type="button" id="getCode">
            Get Code
          </button>
          <button type="submit" id="login">Login</button>
        </span>
      </div>

      <div class="line">
        <a href="">Sign In!</a>
        <br />
        <a href="">Forget Passowrd</a>
      </div>
    </div>
  </body>
</template>

<script>
import { base_url } from "@/config";
import { checkEmail } from "@/assets/js/public";
export default {
  data() {
    return {
      base_url: base_url,
      email: "",
      password: "",
      random_code: "",
      password_warm: "",
      email_warm: "",
      wait: 0,
    };
  },
  methods: {
    /**
     * 用户按下按键时, 检查用户邮箱格式是否正确
     */
    ckemail() {
      console.log(1);
      // 之所以要设置延迟是因为数据绑定有延迟
      setTimeout(() => {
        if (!checkEmail(this.email) && this.email != "") {
          this.email_warm = "邮箱格式错误";
        } else {
          this.email_warm = "";
        }
      }, 100);
    },

    /**
     * 当用户按下按键时, 检查用户密码长度是否正确
     */
    ckPassword() {
      if(this.password.length < 8 && this.password.length > 20 && this.password.length != 0){
        this.password = '密码长度应在6-20位'
      }
      else{
        this.password = ''
      }
    },

    // 计时器 防止用户连续点击获取验证码按钮

    /**
     * 点击获取验证码按钮
     */
    getcode() {
      if (this.email == "") {
        this.$message.warning("请输入邮箱！");
      } else {
        if (!checkEmail(this.email)) {
          this.$message.error("您输入的信息有误, 请检查后再次提交!");
        } else {
          this.axios
            .get(base_url + "/mail/getCode", { params: { email: this.email } })
            .then((resp) => {
              if (resp.data.status == "200") {
                this.$message.success("验证码发送成功");
              } else if (resp.data.status == "401") {
                this.$message.error("该邮箱尚未注册");
              } else {
                this.$message.error("未知错误");
              }
            });
        }
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
@import url("@/assets/css/login.css");
</style>