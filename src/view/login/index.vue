<template>
  <div class="login-container">
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      status-icon
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <el-form-item class="title">
        <span class="title-span"> 系统登录</span>
      </el-form-item>
      <el-form-item prop="account">
        <el-input
          prefix-icon="iconfont el-icon-user"
          type="text"
          v-model="ruleForm2.account"
          auto-complete="off"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="iconfont el-icon-lock"
          type="password"
          v-model="ruleForm2.password"
          auto-complete="off"
          placeholder="密码"
          @keydown.enter.native="login"
        ></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%" @click="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 200px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}

.title {
  text-align: center;
}

.title-span {
  font-size: 20px;
  font-weight: 900;
}
</style>

<script>
import { lo_login, lo_user_info } from "@/api/login";
import { Notification } from "element-ui";
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "",
        password: "",
      },
      rules2: {
        account: [
          {
            required: true,
            message: "please enter your account",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "enter your password", trigger: "blur" },
        ],
      },
      checked: false,
    };
  },
  methods: {
    login() {
      try {
        this.$refs.ruleForm2.validate(async (valid) => {
          if (!valid) {
            Notification.warning("请输入登录信息");
            return false;
          }
          // 接口请求数据的结果;
          let basic = await lo_login(this.ruleForm2);

          localStorage.setItem("token", basic.data.token);
    
          // 登录用户的权限相关信息
          let user = await lo_user_info();
          localStorage.setItem("menulist", JSON.stringify(user.data.menulist));
          localStorage.setItem("name", user.data.userinfo.name);
          localStorage.setItem("account", user.data.userinfo.account);

          this.$message({
            type: `success`,
            message: `登录成功，即将跳转...`,
          });

          //todo 获取转跳源 回到指定
          const timer = setTimeout(() => {
            this.$router.push({
              path: `/`,
            });
            clearTimeout(timer);
          }, 500);
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
