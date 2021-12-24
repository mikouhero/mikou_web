<style scoped>
.el-form-item {
  max-width: 640px;
}
.username {
  display: flex;
}
</style>

<template>
  <el-row class="wrapper user-info-edit">
    <el-col class="content">
      <el-form
        :model="infoForm"
        :rules="rules"
        label-width="120px"
        ref="infoForm"
        label-position="left"
      >
        <el-form-item label="用户名：" prop="username" class="username">
          {{ username }}
        </el-form-item>
        <el-form-item label="真实姓名：" prop="name">
          <el-input
            v-model="infoForm.name"
            placeholder="请输入姓名"
            clearable
            required
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="normal" @click="save" >确定</el-button>
          <el-button type="" size="normal" @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { lo_user_info, lo_reset_info } from "@/api/login";
export default {
  data: () => {
    return {
      username: "",
      infoForm: {},
      rules: {
        name: [{ required: true, message: `请输入姓名`, trigger: `blur` }],
      },
    };
  },
  mounted() {
    this.username = localStorage.getItem("username");
    this.infoForm = {
      name: localStorage.getItem("name"),
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    async save() {
      try {
        await this.$refs["infoForm"].validate();
        await lo_reset_info(this.infoForm);
        localStorage.setItem("name", this.infoForm.name);
        this.$message({
          type: `success`,
          message: `操作成功！`,
        });

        const timer = setTimeout(() => {
          this.goBack();
          clearTimeout(timer);
        }, 500);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>