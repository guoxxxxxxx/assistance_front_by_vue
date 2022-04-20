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
      // 待删除图片列表
      prepareDeleteImgList: [],
      current_tid: 0,
      // 当前登录的用户
      current_uid: this.$store.state.user.uid,
      fileList: [],
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
     * 删除图片按钮
     */
    handleRemove(file) {
      let img_src = file.url.substring(base_url.length);
      // 将要删除的图片存放到待删队列中
      this.prepareDeleteImgList.push(img_src);
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
     * 点击提交按钮
     */
    handleSubmit(name) {
      this.$refs[name].validate(() => {});
      // 删除待删除图片
      this.deleteImg();
      this.axios
        .post(base_url + "/trade/updateByTid", {
          tid: this.current_tid,
          category: this.formValidate.category,
          title: this.formValidate.title,
          details: this.formValidate.details,
          money: this.formValidate.money,
          imgUrls: this.$store.state.uploadImgList,
        })
        .then((resp) => {
          if (resp.data.status == 200) {
            this.$notify.success("修改信息成功");
            this.$store.state.uploadImgList = [];
            // 跳转回详细信息界面
            this.$router.replace({
              path: "/indexView/IndexSecondHandBody/secondHandDetailsComp",
              query: {
                tid: this.current_tid,
              },
            });
          } else {
            this.$notify.error("修改信息失败");
          }
        });
    },
    /**
     * 点击重置按钮
     */
    handleReset(name) {
      this.$refs[name].resetFields();
      this.prepareDeleteImgList = this.fileList;
      this.fileList = [];
    },
    /**
     * 将待删除图片删除
     */
    deleteImg() {
      for (let i = 0; i < this.prepareDeleteImgList.length; i++) {
        this.axios
          .get(base_url + "/trade/fakeDeleteImg", {
            params: {
              img: this.prepareDeleteImgList[i],
            },
          })
          .then((resp) => {
            console.log(resp);
          });
      }
      this.prepareDeleteImgList = [];
    },
    /**
     * 进入界面回显信息
     */
    getEchoInfo() {
      this.axios
        .get(base_url + "/trade/queryDetailsByTid", {
          params: {
            tid: this.$route.query.tid,
          },
        })
        .then((resp) => {
          this.formValidate = resp.data.object;
        });
    },
    /**
     * 查询所要回显的图片
     */
    queryImgList() {
      this.axios
        .get(base_url + "/trade/queryImgByTid", {
          params: {
            tid: this.current_tid,
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
  },
  components: {
    ImageUploadComp,
  },
  mounted() {
    // 从上级界面中接收所要回显的项目id
    this.current_tid = this.$route.query.tid;
    // 获取所要回显的信息
    this.getEchoInfo();
    this.queryImgList();
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
