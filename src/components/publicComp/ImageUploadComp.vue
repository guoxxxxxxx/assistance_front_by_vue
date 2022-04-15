<template>
  <!-- 对图片上传组件进行二次封装 -->
  <!-- 
    文档说明: 
      Attribute: 
        imgList: 成功上传图片的列表信息

      event:
        handleRemove: 点击图片删除按钮时所执行的方法
          参数: img_src: 所要删除图片的名称

      注释：
        1. 若要回显图片信息,请在跳转到该路由时传递所要查看项目的id
   -->
  <div>
    <el-upload
      :action="base_url + '/upload/uploadImg'"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :multiple="true"
      :on-success="handleSuccess"
      :on-error="uploadError"
      :file-list="getEchoImgList"
      ref="imgUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { base_url } from "@/config";
export default {
  props: {},
  data() {
    return {
      current_id: 0,  // 当前所要回显图片的项目信息
      // fileList: this.$store.state.echoImgList,   // 图片回显列表
      base_url: base_url,
      dialogImageUrl: "",
      dialogVisible: false,
      imgList: [], // 用于保存已经上传的图片名称|路径
    };
  },
  methods: {
    /**
     * 点击图片 放大执行该方法
     */
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /**
     * 当上传图片成功时执行该方法 resp为服务器所传递过来的参数
     * 将上传成功的图片名称添加到imgList列表中
     * 以便于后续向服务器的请求
     */
    handleSuccess(resp) {
      // this.imgList.push(resp.lastFileName);
      this.$store.state.uploadImgList.push(resp.lastFileName);
    },
    /**
     * 文件上传大小限制为10MB, 超过10MB时显示错误提醒
     */
    uploadError() {
      this.$message.error("图片最大为10MB");
    },
    /**
     * 点击图片上的删除按钮时调用该方法，
     */
    handleRemove(file) {
      let img_src = file.url.substring(base_url.length);
      this.$emit("handleRemove", img_src);
    },
    /**
     * 父组件获取子组件的图片列表时调用该方法
     */
    getImgList(){
      console.log("这是子组件", this.imgList);
      return this.imgList;
    }
  },
  computed: {
    /**
     * 全局图像回显动态计算
     */
    getEchoImgList(){
      return this.$store.state.echoImgList;
    }
  }
};
</script>

<style>
</style>