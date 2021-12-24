<style scoped>
.nothing-box {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: row;
  height: 80%;
  min-height: 800px;
}
.imgBlock {
  flex: 0 0 50%;
  width: 50%;
  padding-right: 152px;
  zoom: 1;
}
.imagebox {
  float: right;
  width: 100%;
  max-width: 430px;
  height: 360px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
  background-image: url("../../assets/images/404.svg");
}

.title-box {
  text-align: left;
}
.title-box h1 {
  margin-bottom: 24px;
  color: #434e59;
  font-weight: 600;
  font-size: 72px;
  line-height: 72px;
}
.desc {
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 20px;
  line-height: 28px;
}
</style>


<template>
  <el-row class="wrapper">
    <el-col class="content">
      <div class="nothing-box">
        <div class="imgBlock">
          <div class="imagebox"></div>
        </div>
        <div class="title-box">
          <h1>404</h1>
          <div class="desc">抱歉，您访问的页面不存在</div>
          <el-button type="primary" @click="backhome"> 返回首页</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    backhome() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script> 
