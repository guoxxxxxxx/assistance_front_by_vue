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
          <image-upload-comp
            :fileList="fileList"
            @handleRemove="handleRemove"
          ></image-upload-comp>
        </FormItem>

        <FormItem label="详细信息" prop="details">
          <Input
            v-model="formValidate.details"
            type="textarea"
            :autosize="{ minRows: 10 }"
            placeholder="请输入详细信息"
          ></Input>
        </FormItem>
        <div style="text-align: center">
          <FormItem>
            <Button type="primary" @click="handleSubmit">修改</Button>
            <Button @click="cancel" style="margin-left: 8px">返回</Button>
          </FormItem>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { base_url } from "@/config";
import ImageUploadComp from "@/components/publicComp/ImageUploadComp.vue";
export default {
  data() {
    return {
      current_sid: this.$route.query.sid,
      fileList: [],
      formValidate: {},
      base_url: base_url,
      prepareDeleteImg: [], // 存放将要删除的图片
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
    handleSubmit() {
      // 首先先更删除要删除的图片信息
      if (this.prepareDeleteImg.length > 0) {
        for (let i = 0; i < this.prepareDeleteImg.length; i++) {
          this.axios.get(base_url + "/study/fakeDeleteImgByFilename", {
            params: { img_src: this.prepareDeleteImg[i] },
          });
        }
      }
      this.updateInfo();
    },
    /**
     * 更新用户更改的信息
     */
    updateInfo() {
      this.axios
        .post(base_url + "/study/updateBySid", {
          sid: this.current_sid,
          category: this.formValidate.category,
          title: this.formValidate.title,
          details: this.formValidate.details,
          imgUrls: this.$store.state.uploadImgList,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("修改成功");
            this.$router.back(1);
          } else {
            this.$notify.error("修改失败");
          }
        });
    },
    /**
     * 查询当前sid的信息
     */
    selectDetailsBySid(sid) {
      this.axios
        .get(base_url + "/study/selectDetailsBySid", {
          params: {
            sid: sid,
          },
        })
        .then((resp) => {
          this.formValidate = resp.data.object;
          for (let i = 0; i < this.formValidate.imgUrls.length; i++) {
            this.fileList.push(
              this.getEchoImgList(this.formValidate.imgUrls[i])
            );
          }
        });
    },
    /**
     * 将所需回显的图片封装成对象
     */
    getEchoImgList(imgUrl) {
      let obj = {
        name: imgUrl.substring(base_url.length + 5),
        url: imgUrl,
      };
      return obj;
    },
    /**
     * 返回上一级界面
     */
    cancel() {
      this.$router.back(1);
    },
    /**
     * 点击删除图片按钮
     */
    handleRemove(file) {
      let img_src = file.url.substring(base_url.length);
      // 将要删除的图片存放到待删队列中
      this.prepareDeleteImg.push(img_src);
    },
  },
  mounted() {
    // 更新所要回显的图片
    this.selectDetailsBySid(this.current_sid);
  },
  components: {
    ImageUploadComp,
  },
  computed: {},
};
</script>

<style>
</style>