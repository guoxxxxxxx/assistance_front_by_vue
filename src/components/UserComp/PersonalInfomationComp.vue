<template>
  <div>
    <div id="container01">
      <el-avatar
        :size="150"
        src="https://raw.githubusercontent.com/guoxxxxxxx/Pic-Go/main/img/%E5%A4%B4%E5%83%8F.jpg"
      ></el-avatar>
      <Button id="change_ava_btn" @click="show_change_ava = true"
        >更改头像</Button
      >
      <div id="username">闪光皮皮</div>
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
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </Modal>

    <div id="detail_container_0">
      <div id="detail_container">
        <el-descriptions title="用户信息" :column="2">
          <el-descriptions-item label="用户id">100001</el-descriptions-item>
          <el-descriptions-item label="用户姓名">闪光皮皮</el-descriptions-item>
          <el-descriptions-item label="性别">男</el-descriptions-item>
          <el-descriptions-item label="学院">信息学院</el-descriptions-item>
          <el-descriptions-item label="年级">2018</el-descriptions-item>
          <el-descriptions-item label="专业">软件工程</el-descriptions-item>
          <el-descriptions-item label="手机号"
            >18831516175</el-descriptions-item
          >
          <el-descriptions-item label="邮箱"
            >guo_x0315@163.com</el-descriptions-item
          >
          <el-descriptions-item label="微信号"
            >guo_xxxxxxxxxx</el-descriptions-item
          >
          <el-descriptions-item label="QQ号">945855456</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <div id="change_info_btn">
      <el-button plain>修改信息</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show_change_ava: false,
      imageUrl: "",
    };
  },
  methods: {
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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