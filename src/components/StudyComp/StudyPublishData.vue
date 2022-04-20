<template>
  <div id="form-box">
    <div class="form-container">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="标题" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="类别" prop="category">
          <Select v-model="formValidate.category" placeholder="请选择类别">
            <Option value="数学">数学</Option>
            <Option value="英语">英语</Option>
            <Option value="物理">物理</Option>
            <Option value="政治">政治</Option>
            <Option value="化学">化学</Option>
            <Option value="生物">生物</Option>
            <Option value="计算机">计算机</Option>
            <Option value="其他">其他</Option>
          </Select>
        </FormItem>

        <!-- 图片上传组件 -->
        <FormItem label="上传图片" prop="imgSrc">
          <image-upload-comp></image-upload-comp>
        </FormItem>

        <FormItem label="详细信息" prop="details">
          <Input
            v-model="formValidate.details"
            type="textarea"
            :autosize="{ minRows: 10 }"
            placeholder="请输入详细信息"
          ></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')"
            >提交</Button
          >
          <Button @click="handleReset('formValidate')" style="margin-left: 8px"
            >重置</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import ImageUploadComp from "@/components/publicComp/ImageUploadComp.vue";
import { base_url } from '@/config';
export default {
  data() {
    return {
      is_show_tips: false,
      formValidate: {
        uid: this.$store.state.user.uid,
        title: '',
        category: "",
        details: ""
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur",
          },
        ],
        category: [
          {
            required: true,
            message: "请选择所属类别",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    /**
     * 点击提交按钮
     */
    handleSubmit(name) {
      // 图片上传 全局保存图片
      let imgUrls = this.$store.state.uploadImgList;
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.axios.post(base_url + "/study/addNewItem", {
            uid: this.formValidate.uid,
            title: this.formValidate.title,
            category: this.formValidate.category,
            details: this.formValidate.details,
            imgUrls: imgUrls,
          }).then(resp => {
            if (resp.data.status) {
              this.$notify.success('发布成功')
              this.$store.state.uploadImgList = [];    
              // 进入发布项目的详细界面
              this.$router.push({
                path:"/indexView/IndexStudyBody/studyDetailsComp",
                query: {
                  sid: resp.data.object
                }
              })      
            }
            else{
              this.$notify.error('发布失败');
            }
          })
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    /**
     * 点击重置按钮
     */
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$store.state.echoImgList = []
    },
  },
  components: {
    ImageUploadComp,
  },
};
</script>

<style>
.form-container {
  width: 50%;
}

#form-box {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
