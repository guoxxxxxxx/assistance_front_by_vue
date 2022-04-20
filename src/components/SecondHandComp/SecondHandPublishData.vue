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
            <Option value="交通工具">交通工具</Option>
            <Option value="书本资料">书本资料</Option>
            <Option value="生活用品">生活用品</Option>
            <Option value="电脑配件">电脑配件</Option>
            <Option value="其他">其他</Option>
          </Select>
        </FormItem>
        <FormItem label="价格" prop="isGiveMoney">
          <el-input-number
            v-model="formValidate.money"
            :precision="2"
            :step="1.0"
            :min="0"
          ></el-input-number>
        </FormItem>
        <FormItem label="上传图片">
          <image-upload-comp></image-upload-comp>
        </FormItem>
        <FormItem label="详细信息" prop="details">
          <Input
            v-model="formValidate.details"
            type="textarea"
            :autosize="{ minRows: 10}"
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
import ImageUploadComp from '@/components/publicComp/ImageUploadComp.vue'
import { base_url } from '@/config';
export default {
  data() {
    return {
      // 当前登录的用户
      current_uid: this.$store.state.user.uid,
      is_show_tips: false,
      formValidate: {
        title: "",
        category: "",
        money: 0,
        details: "",
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
     * 提交新信息到数据表中
     */
    addNewItem(){
      this.axios.post(base_url + "/trade/addNewItem", {
        uid: this.current_uid,
        title: this.formValidate.title,
        category: this.formValidate.category,
        money: this.formValidate.money,
        details: this.formValidate.details,
        imgUrls: this.$store.state.uploadImgList
      }).then(resp=>{
        if(resp.data.status == 200){
          this.$notify.success("发布信息成功！")
          // 待写 此处回调到发布信息的详细信息界面

          // 将imgUrls里的内容清空
          this.$store.state.imgUrls = [];
        }
        else{
          this.$notify.error("发布信息失败！")
        }
      })
    },
    /**
     * 点击提交按钮
     */
    handleSubmit(name) {
      this.$refs[name].validate(() => {
        this.addNewItem();
      });
    },
    /**
     * 点击重置按钮
     */
    handleReset(name) {
      this.$refs[name].resetFields();
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
