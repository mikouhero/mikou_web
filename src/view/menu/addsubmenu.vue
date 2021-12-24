<style>
.title {
  margin-bottom: 20px;
}
</style>

<template>
  <el-row class="wrapper">
    <el-col class="header">
      <h4 class="title">添加子级菜单</h4>
    </el-col>
    <el-col class="content">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-form-item label="上级模块">
          {{ pname }}
        </el-form-item>
        <el-form-item label="菜单名称" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="URL" size="mini" required>
          <el-input v-model="form.urls"></el-input>
        </el-form-item>

        <el-form-item label="图标" size="mini" required>
          <el-input v-model="form.icon"></el-input>
        </el-form-item>

        <el-form-item label="描述" size="mini" required>
          <el-input v-model="form.remark"></el-input>
        </el-form-item>

        <el-form-item label="排序" size="mini" required>
          <el-input v-model="form.sort" type="number"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="form.status"
          ></el-switch>
        </el-form-item>

        <el-form-item label="check" prop="check">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="form.check"
          ></el-switch>
        </el-form-item>

        <el-form-item label="按钮" prop="button">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="form.button"
          ></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="mini" @click="save">确定</el-button>
          <el-button size="mini" @click="goback">返回</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { menu_add, menu_detail, menu_update } from "@/api/menu";
export default {
  props: ["id", "pid", "pname"],
  data() {
    return {
      form: {
        status: 1,
        check: 1,
        button: 0,
      },
    };
  },
  methods: {
    goback() {
      this.$router.push({
        path: "/menu",
      });
    },
    async save() {
      console.log(this.form);
      this.form.pid = this.pid;
      let _save = this.id === undefined ? menu_add : menu_update;

      await _save(this.form);
      this.$notify({
        type: `success`,
        message: `操作成功`,
      });
      const timer = setTimeout(() => {
        this.goback();
        clearTimeout(timer);
      }, 500);
    },
    async getData() {
      console.log(this.id);
      let res = await menu_detail({ id: this.id });
      console.log(res);
      this.form = res.data.info;
    },
  },
  mounted() {
    console.log(this.id);
    if (this.id !== undefined) {
      this.getData();
    }
  },
};
</script>