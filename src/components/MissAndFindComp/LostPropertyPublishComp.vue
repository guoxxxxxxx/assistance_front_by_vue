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
            <Option value="找物品">找物品</Option>
            <Option value="找失主">找失主</Option>
            <Option value="其他">其他</Option>
          </Select>
        </FormItem>
        <FormItem label="上传图片">
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
import { base_url } from "@/config";
export default {
  data() {
    return {
      formValidate: {},
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
     * 向后端发送添加信息的请求
     */
    publishNewItem(item) {
      this.axios
        .post(base_url + "/lostProperty/publishNewItem", {
          uid: this.$store.state.user.uid,
          category: item.category,
          title: item.title,
          details: item.details,
          imgUrls: this.$store.state.uploadImgList,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("发布成功");
            // 此处写回显代码！
            this.$router.replace({
              path:"/indexView/indexMissAndFindBody/LostPropertyDetailsComp",
              query:{
                lid: resp.data.object
              }
            })
          } else {
            this.$notify.error("发布失败");
          }
        });
    },
    /**
     * 点击提交按钮
     */
    handleSubmit(name) {
      this.$refs[name].validate(() => {
        this.publishNewItem(this.formValidate);
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
</style>