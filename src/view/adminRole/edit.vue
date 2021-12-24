<style>
</style>

<template>
  <el-col class="wrapper">
    <el-row class="content">
      <el-form
        :model="roleForm"
        :rules="rules"
        label-width="120px"
        ref="roleForm"
      >
        <el-form-item label="权限名称：" prop="name" size="mini">
          <el-input
            v-model="roleForm.name"
            placeholder="请输入权限名称"
            clearable
            maxlength="16"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-tree
            :data="menutree"
            show-checkbox
            default-expand-all
            :indent="32"
            check-on-click-node
            :expand-on-click-node="false"
            ref="menutree"
            node-key="id"
            :props="treeProps"
          >
          </el-tree>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="mini" @click="save"> 确定</el-button>
          <el-button type="default" size="mini" @click="goBack">
            返回</el-button
          >
        </el-form-item>
      </el-form>
    </el-row>
  </el-col>
</template>

<script>
import { menu_list } from "@/api/menu";
import { role_add, role_edit, role_detail } from "@/api/auth";

export default {
  props: ["id"],
  data() {
    return {
      roleForm: {
        name: "",
      },
      rules: {
        name: [{ required: true, message: "输入角色名称", trigger: "blur" }],
      },
      menutree: [],
      treeProps: {
        children: "children",
        label: "name",
      },
      isEditing: false,
    };
  },
  methods: {
    async getMenuTree() {
      let res = await menu_list({});
      this.menutree = res.data;

      console.log(this.id)
      if (this.id !== undefined) {
        let res = await role_detail({ id: this.id });
        let permission = res.data.info.permission;
        this.roleForm.name = res.data.info.name;
        let node_keys = JSON.parse(permission);
        this.$refs.menutree.setCheckedKeys(node_keys);
      }
    },
    goBack() {
      this.$router.push({
        path: `/adminRole`,
      });
    },
    async save() {
      try {
        const _save = this.id === undefined ? role_add : role_edit;
        await this.$refs.roleForm.validate();

        let permission = this.$refs.menutree
          .getCheckedNodes(false, false)
          .map((item) => item.id);

        let res = await _save({
          id: this.id,
          name: this.roleForm.name,
          permission: JSON.stringify(permission),
        });
        this.$notify({
          type: `success`,
          message: `操作成功`,
        });
        const timer = setTimeout(() => {
          this.goBack();
          clearTimeout(timer);
        }, 500);
      } catch (err) {
        if (!err) {
          this.$message({
            type: `warning`,
            message: `表单验证失败`,
          });
        } else {
          console.error(err);
        }
      }
    },
  },
  mounted() {
    this.getMenuTree();
  },
};
</script>