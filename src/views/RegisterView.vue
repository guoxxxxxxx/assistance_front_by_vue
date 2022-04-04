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
      <div class="title">注 册</div>
      <div class="inputs">
        <div class="oneline">
          <div class="oneline">
            <label class="label_title">邮 箱</label>
            <label class="label_warm">{{ show_email_warm }}</label>
          </div>
          <div class="oneline">
            <label class="label_title">验证码</label>
            <label class="label_warm"></label>
          </div>
        </div>
        <div class="oneline">
          <input
            type="text"
            name="email"
            placeholder="example@email.com"
            @keydown="listener_email_format"
            v-model="register_email"
          />
          <input
            type="text"
            name="verify"
            placeholder="Enter Verification Code"
            v-model="register_verify_code"
          />
        </div>
        <div class="oneline">
          <div class="oneline">
            <label class="label_title" id="p_pwd_tips">密 码</label>
            <label class="label_warm" id="p_tips">{{ show_pwd_warm }}</label>
          </div>
          <div class="oneline">
            <label class="label_title">确认密码</label>
            <label class="label_warm">{{ show_spwd_warm }}</label>
          </div>
        </div>
        <div class="oneline">
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            v-model="register_password"
            @keydown="listener_password1_format"
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            v-model="register_password2"
            @keydown="listener_password2_fromat"
          />
        </div>
        <div class="oneline">
          <button type="button" id="getCode" @click="listener_getCode_btn">
            获取验证码
          </button>
          <button type="submit" id="register" @click="listener_register_btn">
            注 册
          </button>
        </div>
      </div>
      <div class="line">
        <div>
          <a href="" onclick="return false" @click="go_to_login">登 录</a>
        </div>
        <div>
          <a
            href=""
            onclick="return false"
            id="forget"
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
      show_pwd_warm: "",
      show_spwd_warm: "",
      show_email_warm: "",
      register_email: "",
      register_password: "",
      register_password2: "",
      register_verify_code: "",
    };
  },
  methods: {
    /**
     * 去忘记密码界面
     */
    go_to_forgetView() {
      this.$router.push("/forgetView");
    },
    /**
     * 去登录界面
     */
    go_to_login() {
      this.$router.push("/loginView");
    },
    /**
     * 当按下键盘时检查邮箱格式是否正确
     */
    listener_email_format() {
      setTimeout(() => {
        if (
          checkEmail(this.register_email) ||
          this.register_email.length == 0
        ) {
          this.show_email_warm = "";
        } else {
          this.show_email_warm = "邮箱格式错误";
        }
      }, 1);
    },
    /**
     * 按下键盘时检查密码长度是否正确
     */
    listener_password1_format() {
      setTimeout(() => {
        if (
          this.register_password.length >= 6 &&
          this.register_password.length <= 20
        ) {
          this.show_pwd_warm = "";
        } else {
          this.show_pwd_warm = "密码长度应在6-20位";
        }
      }, 1);
    },
    /**
     * 检测两次输入的密码是否一致
     */
    listener_password2_fromat() {
      setTimeout(() => {
        if (this.register_password === this.register_password2) {
          this.show_spwd_warm = "";
        } else {
          this.show_spwd_warm = "两次密码输入不一致";
        }
      }, 1);
    },
    /**
     * 获取验证码
     */
    listener_getCode_btn() {
      if (checkEmail(this.register_email)) {
        this.axios
          .get(base_url + "/mail/getRegisterCode", {
            params: { email: this.register_email },
          })
          .then((resp) => {
            if (resp.data.status == 200) {
              this.$message.success("验证码发送成功！");
            } else if (resp.data.status == 400) {
              this.$message.error("验证码发送失败, 请联系管理员!");
            } else {
              this.$message.error("未知错误!");
            }
          });
      } else {
        this.$message.error("邮箱格式错误");
      }
    },
    /**
     * 用户点击注册按钮
     */
    listener_register_btn() {
      // 从服务器获取用户的验证码
      if (
        this.register_password === this.register_password2 &&
        this.register_password.length >= 6 &&
        this.register_password.length <= 20
      ) {
        this.axios
          .post(base_url + "/mail/verify", {
            email: this.register_email,
            verifyCode: this.register_verify_code,
          })
          .then((resp) => {
            if (resp.data.status == "200") {
              // 服务器后台校验成功 开始注册流程
              // 判断用户输入数据是否有效

              this.axios
                .post(base_url + "/user/register", {
                  name: "default",
                  email: this.register_email,
                  password: this.register_password,
                })
                .then((resp) => {
                  if (resp.data.status == 200) {
                    this.$message.success("用户注册成功！");
                    setTimeout(() => {
                      this.go_to_login()
                    }, 1000);
                  } else if (resp.data.status == 402) {
                    this.$message.error("该邮箱已被注册！");
                  } else {
                    this.$message.error("注册失败!");
                  }
                });
            } else {
              this.$message.error("验证码错误！");
            }
          });
      } else{
        this.$message.error('您输入的信息有误！')
      }
    },
  },
};
</script>

<style scoped src='../assets/css/register.css'></style>
<style scoped>
</style>