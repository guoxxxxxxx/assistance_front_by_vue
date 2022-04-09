<template>
  <div id="change_info_container_0">
    <div id="change_info_contain">
      <h4 style="text-align: center">修改个人资料</h4>
    </div>
    <div style="margin-top: 40px">
      <Form :model="formItem" :label-width="80">
        <div class="two_Item">
          <div>
            <FormItem label="用户名">
              <Input
                v-model="formItem.name"
                placeholder="请输入用户名"
                style="width: 150px"
              ></Input>
            </FormItem>

            <FormItem label="性别">
              <RadioGroup v-model="formItem.sex">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
                <Radio label="保密">保密</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="学院">
              <Input
                v-model="formItem.faculty"
                placeholder="学院名称"
                style="width: 250px"
              ></Input>
            </FormItem>

            <FormItem label="年级">
              <Input
                v-model="formItem.grade"
                placeholder="年级"
                style="width: 250px"
              ></Input>
            </FormItem>

            <FormItem label="专业">
              <Input
                v-model="formItem.major"
                placeholder="专业"
                style="width: 250px"
              ></Input>
            </FormItem>
          </div>

          <div>
            <FormItem label="生日">
              <Row>
                <Col span="20">
                  <DatePicker
                    type="date"
                    placeholder="选择日期"
                    v-model="formItem.birthday"
                    format="yyyy-MM-dd"
                  ></DatePicker>
                </Col>
              </Row>
            </FormItem>

            <FormItem label="手机号">
              <Input
                v-model="formItem.phone"
                placeholder="请输入手机号"
                style="width: 250px"
              ></Input>
            </FormItem>

            <FormItem label="微信号">
              <Input
                v-model="formItem.wechat"
                placeholder="请输入微信号"
                style="width: 250px"
              ></Input>
            </FormItem>

            <FormItem label="QQ号">
              <Input
                v-model="formItem.qq"
                placeholder="QQ号"
                style="width: 250px"
              ></Input>
            </FormItem>

            <FormItem label="邮箱">
              <Input
                v-model="formItem.email"
                placeholder="邮箱"
                style="width: 250px"
                :readonly="true"
              ></Input>
            </FormItem>
          </div>
        </div>
        <div style="text-align: center; margin-top: 30px">
          <el-button plain @click="submit">修改</el-button>
          <el-button type="info" plain @click="cancel">取消</el-button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { base_url } from "@/config";
export default {
  data() {
    return {
      formItem: {}
    };
  },
  methods: {
    // 点击取消按钮
    cancel() {
      this.$router.back(1);
    },
    // 提交更改后的用户信息
    submit() {
      console.log(this.formItem.birthday);
      axios
        .post(base_url + "/user/updateUserInfoById", this.formItem)
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify({
              title: "成功",
              message: "修改信息成功",
              type: "success",
            });
            // 返回上个界面
            this.$router.back(1)
          } else {
            this.$notify({
              title: "失败",
              message: "修改信息失败",
              type: "error",
            });
          }
        });
    },
  },
  mounted() {
    this.formItem = this.$store.getters.getUserInfo;
  },
};
</script>

<style scoped>
#change_info_container_0 {
  width: 80%;
  margin-left: 60px;
}

#change_info_contain {
  padding-top: 30px;
  display: flex;
  justify-content: center;
}

.two_Item {
  display: flex;
  justify-content: space-around;
}
</style>
