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
            <Option value="express">快递代取</Option>
            <Option value="takeaway">外卖代取</Option>
            <Option value="hotWater">热水代打</Option>
            <Option value="other">其他</Option>
          </Select>
        </FormItem>
        <FormItem label="截止时间">
          <Row>
            <Col span="11">
              <FormItem prop="date">
                <DatePicker
                  type="date"
                  placeholder="选择截止日期"
                  v-model="deadline_data"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="11">
              <FormItem prop="time">
                <TimePicker
                  type="time"
                  placeholder="选择截止时间"
                  v-model="deadline_time"
                ></TimePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="赏金" prop="gender">
          <RadioGroup v-model="is_show_tips">
            <Radio label="true">白嫖</Radio>
            <Radio label="false">给小费</Radio>
            <InputNumber
              v-if="is_show_tips"
              :max="10000"
              v-model="formValidate.money"
              :formatter="
                (value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              "
              :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
            ></InputNumber>
          </RadioGroup>
        </FormItem>
        <FormItem label="上传图片">
          <upload-comp></upload-comp>
        </FormItem>
        <FormItem label="详细信息" prop="details">
          <Input
            v-model="formValidate.details"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
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
import UploadComp from "@/components/publicComp/UploadComp.vue";
export default {
  data() {
    return {
      is_show_tips: "",
      deadline_time: "",
      deadline_date: "",
      formValidate: {
        title: "",
        category: "",
        deadline: this.deadline_date + this.deadline_time,
        money: "",
        details: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur",
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change",
          },
        ],
        gender: [
          {
            required: true,
            message: "Please select gender",
            trigger: "change",
          },
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change",
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change",
          },
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change",
          },
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur",
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
  },
  components: {
    UploadComp,
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
