<template>
  <body>
    <div class="container" data-aos="zoom-in" data-aos-duration="700">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" class="icon" />
      </div>
      <div class="title">登录</div>
      <div class="inputs">
        <div class="oneline">
          <label class="label_title">邮箱</label>
          <label class="label_tips" v-show="is_show_email_warm"
            >邮箱格式错误</label
          >
        </div>
        <input
          @keydown="listener_email_format"
          type="text"
          name="email"
          placeholder="example@email.com"
          v-model="login_email"
        />
        <label class="label_title">密码</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          v-model="login_password"
        />
        <button type="submit" id="login" @click="listener_login_btn">
          登 录
        </button>
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
import { checkEmail } from "@/assets/js/public";
import { base_url } from "@/config";
export default {
  data() {
    return {
      login_email: "", // 登录邮箱
      login_password: "", // 登录密码
      is_show_email_warm: false,
    };
  },
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
    /**
     * 监听用户输入的邮箱是否正确
     */
    listener_email_format() {
      setTimeout(() => {
        if (checkEmail(this.login_email) || this.login_email.length == 0) {
          this.is_show_email_warm = false;
        } else {
          this.is_show_email_warm = true;
        }
      }, 1);
    },
    /**
     * 登录按钮响应事件
     */
    listener_login_btn() {
      if (
        this.is_show_email_warm == false &&
        this.login_email.length != 0 &&
        this.login_password.length != 0
      ) {
        this.axios
          .post(base_url + "/user/login", {
            email: this.login_email,
            password: this.login_password,
          })
          .then((resp) => {
            if (resp.data.status == 200) {
              this.$message.success("登录成功！");
            } else if (resp.data.status == 401) {
              this.$message.error("该邮箱尚未注册！");
            } else if (resp.data.status == 400) {
              this.$message.error("邮箱或密码错误！");
            } else {
              this.$message.error("未知错误");
            }
          });
      } else {
        this.$message.error("用户信息有误, 请检查后再次输入!");
      }
    },
  },
};
</script>

// 导入外部样式
<style scoped src='../assets/css/login.css'></style>
<style scoped>
</style>