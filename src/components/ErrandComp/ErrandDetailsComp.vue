<template>
  <div>
    <el-descriptions title="发布人信息">
      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="学院">信息学院</el-descriptions-item>
      <el-descriptions-item label="邮箱"
        >guo_x0315@163.com</el-descriptions-item
      >
      <el-descriptions-item label="联系地址"
        >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item
      >
    </el-descriptions>
    <el-descriptions title="内容详细信息">
      <el-descriptions-item label="订单编号">1</el-descriptions-item>
      <el-descriptions-item label="类别">快递代取</el-descriptions-item>
      <el-descriptions-item label="简述">顺丰快递代取</el-descriptions-item>
      <el-descriptions-item label="发布日期">2000-03-15</el-descriptions-item>
      <el-descriptions-item label="截止日期">2022-03-15</el-descriptions-item>
    </el-descriptions>
    <h5 class="mt-0">详细概述</h5>
    <b-card style="width: 80%">
      <b-media>
        <p>
          2018年一月份已经saygoodbye，二月份是浮躁的月份。自己很少写博客，但是经常看别人写的，有做笔记的，有分享技术和面试经验的。感觉写的都很好，自己也想尝试下，记录下自己的成长，坚持写博文，希望在2018年末的时候，看到这篇博文的时候，能发现自己这一年过得很有意义...
        </p>
        <div id="pic_out_box">
          <div
            class="pic_show_box"
            v-for="(src, index) in srcList"
            :key="index"
          >
            <el-image
              style="width: 100px; height: 100px"
              :src="src"
              :preview-src-list="srcList"
            >
            </el-image>
          </div>
        </div>
      </b-media>
    </b-card>

    <div id="btn_groups">
      <Button type="success" ghost>接单</Button>
      <span>--</span>
      <Button type="warning" ghost @click="back">返回</Button>
    </div>
    <comment></comment>
  </div>
</template>

<script>
// 引入评论组件
import comment from "bright-comment";
export default {
  methods: {
    /**
     * 回退
     */
    back() {
      this.$router.back(1);
    },
  },
  data() {
    return {
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      ],
    };
  },
  components:{
      comment,
  }
};
</script>

<style>
#btn_groups {
  display: flex;
  justify-content: center;
}

.pic_show_box {
  margin-right: 10px;
}

#pic_out_box {
  display: flex;
  padding-top: 10px;
  flex-wrap: wrap;
}
</style>