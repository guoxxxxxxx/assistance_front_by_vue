<template>
  <div>
    <div id="container01">
      <el-avatar :size="150" :src="user.avatarPath"></el-avatar>
      <Button id="change_ava_btn" @click="changeAvatar">更改头像</Button>
      <div id="username">{{user.name}}</div>
    </div>
    <!-- 上传头像对话框 -->
    <Modal
      v-model="show_change_ava"
      title="上传头像"
      @on-ok="ok"
      @on-cancel="cancel"
      style="text-align: center"
    >
      <el-upload
        :file-list="fileList"
        class="avatar-uploader"
        action="http://localhost:8080/upload/uploadAvatar/"
        accept=".jpg, .jpeg, .png"
        :show-file-list="true"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :multiple="false"
        :limit="1"
        :on-exceed="handleOnExceed"
        :on-remove="cleanAvatar"
      >
        <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </Modal>

    <div id="detail_container_0">
      <div id="detail_container">
        <el-descriptions title="用户信息" :column="2">
          <el-descriptions-item label="用户id">{{
            user.uid
          }}</el-descriptions-item>
          <el-descriptions-item label="用户姓名">{{
            user.name
          }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{
            user.sex
          }}</el-descriptions-item>
          <el-descriptions-item label="生日">{{
            user.birthday
          }}</el-descriptions-item>
          <el-descriptions-item label="学院">{{
            user.faculty
          }}</el-descriptions-item>
          <el-descriptions-item label="年级">{{
            user.grade
          }}</el-descriptions-item>
          <el-descriptions-item label="专业">{{
            user.major
          }}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{
            user.phone
          }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{
            user.email
          }}</el-descriptions-item>
          <el-descriptions-item label="微信号">{{
            user.wechat
          }}</el-descriptions-item>
          <el-descriptions-item label="QQ号">{{
            user.qq
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <div id="change_info_btn">
      <el-button plain @click="change_personal_info_btn">修改信息</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { base_url } from "@/config";
export default {
  data() {
    return {
      fileList: [],
      format_date: "",
      show_change_ava: false,
      user: this.$store.getters.getUserInfo,
      imageUrl: "",
      last_fileName: "",
      uploadImgUrl: "",
    };
  },
  methods: {
    // 点击更改头像按钮
    changeAvatar() {
      this.show_change_ava = true;
      this.uploadImgUrl = "";
      this.fileList = '';
    },
    // 点击头像上传成功按钮
    ok() {
      axios
        .post(base_url + "/user/updateAvatarById", {
          uid: this.user.uid,
          avatarPath: this.last_fileName,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify({
              title: "成功",
              message: "更改头像成功",
              type: "success",
            });
            // 更新vuex中头像信息所在位置
            this.$store.commit(
              "updateUserAvatar",
              base_url + "/avatar/" + this.last_fileName
            );
            // 更新storageSession中的用户信息
            sessionStorage.clear();
            sessionStorage.setItem("user", JSON.stringify(this.$store.state.user));
            this.imageUrl = this.$store.getters.getUserInfo.avatarPath;
          } else {
            this.$notify({
              title: "失败",
              message: "更改头像失败",
              type: "fail",
            });
          }
        });
    },
    // 点击取消按钮
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    // 成功上传后的动作
    handleAvatarSuccess(resp, file) {
      this.uploadImgUrl = URL.createObjectURL(file.raw);
      this.last_fileName = resp.lastFileName;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 重复上传时的提醒
    handleOnExceed() {
      this.$message.error("请先删除先前上传的文件");
    },
    // 点击更改用户信息按钮
    change_personal_info_btn() {
      this.$router.push("/indexView/PersonalInfomationChangeComp");
    },
    // 点击删除按钮时，清空图片显示
    cleanAvatar() {
      this.uploadImgUrl = "";
    },
  },
};
</script>

<style scoped>
#change_info_btn {
  text-align: center;
  margin-top: 30px;
}

#detail_container_0 {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

#detail_container {
  width: 80%;
}

#username {
  margin-right: 100px;
  font-size: 2em;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

#container01 {
  padding-top: 30px;
  width: 100%;
  text-align: center;
}

#change_ava_btn {
  margin-left: 20px;
  margin-bottom: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>