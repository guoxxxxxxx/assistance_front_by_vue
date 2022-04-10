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
            <Option value="快递代取">快递代取</Option>
            <Option value="外卖代取">外卖代取</Option>
            <Option value="热水代打">热水代打</Option>
            <Option value="其他">其他</Option>
          </Select>
        </FormItem>
        <!-- 日期选择 -->
        <FormItem label="截止时间">
          <Row>
            <Col span="13">
              <DatePicker
                type="date"
                placeholder="选择截止日期"
                fromat="yyyy-MM-dd"
                @on-change="formatDate"
              ></DatePicker>
            </Col>
            <Col span="11">
              <TimePicker
                type="time"
                placeholder="选择截止时间"
                v-model="formValidate.deadtime"
              ></TimePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="赏金" prop="isGiveMoney">
          <el-input-number
            v-model="formValidate.money"
            :precision="2"
            :step="1.0"
            :min="0"
          ></el-input-number>
        </FormItem>
        <!-- 图片上传 -->
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
import {base_url} from '@/config'
export default {
  data() {
    return {
      imgList: [],
      base_url: base_url,
      is_show_tips: false,
      formValidate: {
        uid: this.$store.state.getters.getUserInfo.uid,
        title: "",
        category: "",
        deadline: "",
        deadtime: "",
        money: '',
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
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    // 文件上传失败时的消息
    uploadError(){
      this.$message.error('图片最大为10MB');
    },
    // 点击提交按钮
    handleSubmit(name) {
      console.log(this.imgSrc);
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.formValidate);
          // 向服务器发送数据
          this.axios.post(base_url + '/errand/addErrandItem', {
            errand:this.formValidate
          }).then(resp => {
            if (resp.data.status == 200) {
              this.$notify({
                title:"发布成功",
                message:"成功",
                type:"success"
              })
            }
            else{
              this.$notify({
                title:"发布失败",
                message:"失败",
                type:"error"
              })
            }
          })
        } else {
          this.$Message.error("请正确填写信息!");
        }
      });
    },
    // 点击重置按钮
    handleReset(name) {
      this.$refs[name].resetFields();
      console.log("show: ", this.is_show_tips);
    },
    // 格式化日期
    formatDate(val) {
      this.formValidate.deadline = val;
    },
    // 删除图片时调用方法
    handleRemove() {
      this.imgList.splice(this.imgList.length - 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传图片成功时调用方法
    handleSuccess(resp){
      this.imgList.push(resp.lastFileName);
      console.log(resp);
    }
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
