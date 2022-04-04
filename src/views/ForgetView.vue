<template>
  <body>
    <vue-particles
      class="login-bg"
      color="#39AFFD"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="5"
      linesColor="#8DD1FE"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="container" data-aos="zoom-in" data-aos-duration="700">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" class="icon" />
      </div>
      <div class="title">找回密码</div>
      <div class="inputs">
        <div class="oneline">
          <label class="label_title">邮 箱</label>
          <label class="label_warm">{{ show_email_warm }}</label>
        </div>
        <input
          type="text"
          name="email"
          placeholder="example@email.com"
          @keydown="listener_mail_format"
          v-model="forget_email"
        />
        <div class="oneline">
          <label class="label_title">新密码</label>
          <label class="label_warm">{{ show_password_warm }}</label>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          @keydown="listener_password_format"
          v-model="forget_new_password"
        />
        <label>验证码</label>
        <input
          type="text"
          name="verify"
          placeholder="Enter Verification Code"
          v-model="forget_verify_code"
        />
        <div class="oneline">
          <button type="button" id="getCode" @click="listener_getCode_btn">
            获取验证码
          </button>
          <button type="submit" id="amend" @click="listener_amend_btn">
            修 改
          </button>
        </div>
      </div>
      <div class="line">
        <div>
          <a href="" onclick="return false" id="forget" @click="go_to_login"
            >登 录!</a
          >
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
import { checkEmail } from "@/assets/js/public";
import { base_url } from "@/config";
// import { base_url } from "@/config";
export default {
  data() {
    return {
      forget_email: "",
      forget_verify_code: "",
      forget_new_password: "",
      show_email_warm: "",
      show_password_warm: "",
    };
  },
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
    /**
     * 检测邮箱格式是否正确
     */
    listener_mail_format() {
      setTimeout(() => {
        if (checkEmail(this.forget_email) || this.forget_email.length == 0) {
          this.show_email_warm = "";
        } else {
          this.show_email_warm = "邮箱格式错误";
        }
      }, 1);
    },
    /**
     * 按下键盘时检查密码长度是否正确
     */
    listener_password_format() {
      setTimeout(() => {
        if (
          this.forget_new_password.length >= 6 &&
          this.forget_new_password.length <= 20
        ) {
          this.show_password_warm = "";
        } else {
          this.show_password_warm = "密码长度应在6-20位";
        }
      }, 1);
    },
    /**
     * 点击获取验证码按钮
     */
    listener_getCode_btn() {
      if (checkEmail(this.forget_email)) {
        this.axios
          .get(base_url + "/mail/getCode", {
            params: {
              email: this.forget_email,
            },
          })
          .then((resp) => {
            if (resp.data.status == 200) {
              this.$message.success("验证码发送成功！");
            } else if (resp.data.status == 401) {
              this.$message.error("该邮箱尚未被注册!");
            } else {
              this.$message.error("未知错误！错误代码:", resp.data.status);
            }
          });
      } else {
        this.$message.error("邮箱格式错误！");
      }
    },
    /**
     * 修改按钮事件响应
     */
    listener_amend_btn() {
      // 检查邮箱, 密码等是否正确
      if (
        checkEmail(this.forget_email) &&
        this.forget_new_password.length >= 6 &&
        this.forget_new_password.length <= 20
      ) {
        // 判断验证码是否正确
        this.axios
          .post(base_url + "/mail/verify", {
            email: this.forget_email,
            verifyCode: this.forget_verify_code,
          })
          .then((resp) => {
            // 验证码正确 执行更改操作
            if (resp.data.status == 200) {
              this.axios
                .post(base_url + "/user/forget_password", {
                  email: this.forget_email,
                  password: this.forget_new_password,
                })
                .then((resp) => {
                  if (resp.data.status == 200) {
                    this.$message.success("密码修改成功！");
                    setTimeout(() => {
                      this.go_to_login();
                    }, 1000);
                  } else if (resp.data.status == 401) {
                    this.$message.error("该邮箱尚未注册！");
                  } else {
                    this.$message.error("修改失败！");
                  }
                });
            } else {
              this.$message.error("验证码错误！");
            }
          });
      } else {
        this.$message.error("您输入的信息有误！");
      }
    },
  },
};
</script>

<style scoped src='../assets/css/forget.css'></style>
<style>
</style>