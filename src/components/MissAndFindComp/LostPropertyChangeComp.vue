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
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')"
            >提交</Button
          >
          <Button @click="handleReset()" style="margin-left: 8px"
            >返回</Button
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
      // 待删除图片列表
      prepareDeleteImgList: [],
      // 所要回显的图片信息
      fileList: [],
      current_lid: 0,
      base_url: base_url,
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
     * 通过lid查询详细信息
     */
    queryDetalisByLid(lid) {
      this.axios
        .get(base_url + "/lostProperty/queryDetailsByLid", {
          params: {
            lid: lid,
          },
        })
        .then((resp) => {
          console.log(resp);
          this.formValidate = resp.data.object;
        });
    },
    /**
     * 通过lid查询所要回显的图片信息
     */
    queryImgByLid(lid) {
      this.axios
        .get(base_url + "/lostProperty/queryImgByLid", {
          params: {
            lid: lid,
          },
        })
        .then((resp) => {
          let imgUrls = resp.data.object;
          let res = [];
          for (let i = 0; i < imgUrls.length; i++) {
            res.push(this.getEchoImgList(imgUrls[i]));
          }
          this.fileList = res;
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
     * 删除图片按钮
     */
    handleRemove(file) {
      let img_src = file.url.substring(base_url.length);
      // 将要删除的图片存放到待删队列中
      this.prepareDeleteImgList.push(img_src);
    },

    // ===============================
    /**
     * 点击提交按钮
     */
    handleSubmit(name) {
      this.$refs[name].validate(() => {});
      // 删除待删除图片
      this.deleteImg();
      this.axios
        .post(base_url + "/lostProperty/updateByLid", {
          lid: this.current_lid,
          category: this.formValidate.category,
          title: this.formValidate.title,
          details: this.formValidate.details,
          imgUrls: this.$store.state.uploadImgList,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("修改信息成功");
            this.$store.state.uploadImgList = [];
            // 跳转回详细信息界面
            this.$router.replace({
              path: "/indexView/indexMissAndFindBody/LostPropertyDetailsComp",
              query: {
                lid: this.current_lid,
              },
            });
          } else {
            this.$notify.error("修改信息失败");
          }
        });
    },
    /**
     * 点击返回
     */
    handleReset() {
      this.$router.back(1);
    },
    /**
     * 将待删除图片删除
     */
    deleteImg() {
      for (let i = 0; i < this.prepareDeleteImgList.length; i++) {
        this.axios
          .get(base_url + "/lostProperty/fakeDeleteImg", {
            params: {
              imgSrc: this.prepareDeleteImgList[i],
            },
          })
          .then((resp) => {
            console.log(resp);
          });
      }
      this.prepareDeleteImgList = [];
    },
  },
  mounted() {
    // 获取当前所要回显的项目id
    this.current_lid = this.$route.query.lid;
    // 获取回显信息
    this.queryDetalisByLid(this.current_lid);
    this.queryImgByLid(this.current_lid);
  },
  components: {
    ImageUploadComp,
  },
};
</script>

<style>
</style>