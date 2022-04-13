<template>
  <!-- 图片上传 -->
  <!-- 
      对图片上传组件进行二次封装
   -->
  <FormItem label="上传图片" prop="imgSrc">
    <el-upload
      :action="base_url + '/upload/uploadImg'"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :multiple="true"
      :on-success="handleSuccess"
      :on-error="uploadError"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </FormItem>
</template>

<script>
export default {
  props: {
    multiple: {
      type: String,
      default: true,
    },
  },
  data() {
    return {
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
      this.imgList.push(resp.lastFileName);
    },
    /**
     * 文件上传大小限制为10MB, 超过10MB时显示错误提醒
     */
    uploadError() {
      this.$message.error("图片最大为10MB");
    },
    /**
     * 点击图片上的删除按钮时调用该方法，
     * 从imgList列表中删除要删除的图片
     */
    handleRemove() {
      this.imgList.splice(this.imgList.length - 1);
    },
  },
};
</script>

<style>
</style>