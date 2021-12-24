<style scoped>
.el-form-item {
  max-width: 640px;
}
</style>

<template>
  <div>
    <el-row class="wrapper">
      <el-col class="content">
        <el-form
          :model="passwordForm"
          :rules="rules"
          label-width="120px"
          ref="passwordForm"
          label-position="top"
        >
          <el-form-item label="原密码:" prop="password">
            <el-input
              v-model="passwordForm.password"
              placeholder="请输入原密码"
              required
              clearable
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码:" prop="password1">
            <el-input
              v-model="passwordForm.password1"
              placeholder="请输入新密码"
              required
              clearable
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="确定新密码:" prop="password2">
            <el-input
              v-model="passwordForm.password2"
              placeholder="请再次输入新密码"
              clearable
              required
              type="password"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="normal" @click="save"
              >确定</el-button
            >
            <el-button type="" size="normal" @click="goBack">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { lo_reset_password } from "@/api/login";

export default {
  data() {
    return {
      passwordForm: {
        password: "",
        password1: "",
        password2: "",
      },
      rules: {
        password: [
          { required: true, message: `请输入原密码`, trigger: `blur` },
          { min: 6, message: `密码不能少于6个字符`, trigger: `blur` },
        ],
        password1: [
          { required: true, message: `请输入新密码`, trigger: `blur` },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value && value.length < 6) {
                callback(new Error("密码不能少于6个字符!"));
              } else {
                if (this.passwordForm.password2 !== "") {
                  this.$refs.passwordForm.validateField("password2");
                }
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        password2: [
          { required: true, message: `请再次输入新密码`, trigger: `blur` },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value && value.length < 6) {
                callback(new Error("密码不能少于6个字符!"));
              } else if (value !== this.passwordForm.password1) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async save() {
      try {
        await this.$refs.passwordForm.validate();
        await lo_reset_password({
          ...this.passwordForm,
          username: localStorage.getItem("username"),
        });
        this.$message({
          type: `success`,
          message: `密码修改成功！`,
        });
        const timer = setTimeout(() => {
          this.goBack();
          clearTimeout(timer);
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>