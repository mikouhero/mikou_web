<style scoped>
.wrapper > .header > h3 {
  font-size: 18px;
}
.el-form {
  background: #f4f5f9;
  border: 1px solid #e4e4e4;
  padding: 10px;
  margin: 10px 0;
}
.el-form-item {
  margin-bottom: 10px;
}
.button {
  float: right;
}
</style>

<template>
  <el-row class="wrapper">
    <el-col class="header">
      <h3>用户管理</h3>
      <el-form inline size="small">
        <el-form-item label="账号搜索：">
          <el-input placeholder="请输入账号" v-model="account"></el-input>
        </el-form-item>
        <el-form-item label="姓名搜索：">
          <el-input placeholder="请输入姓名" v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="时间搜索：">
          <el-date-picker
            v-model="search_date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="getTableData(true)">筛选</el-button>
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" size="small" @click="add">添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col class="content">
      <el-table
        border
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: `#F4F5F9` }"
      >
        <el-table-column prop="id" label="ID" align="center"> </el-table-column>
        <el-table-column
          prop="account"
          label="账号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="reset(scope.row.id, scope.row.username)"
              >修改密码</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col class="footer">
      <pagination
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :page="page"
        :total="total"
        :pageSize="pageSize"
      ></pagination>
    </el-col>

    <!-- // 添加用户 -->
    <el-dialog
      class="sp"
      title="添加用户"
      :visible.sync="dialogVisible"
      :class-on-click-modal="false"
      width="640px"
      :append-to-body="true"
      ref="userDialog"
      @close="userForm = {}"
    >
      <el-form
        :model="userForm"
        label-width="120px"
        ref="userForm"
        label-position="top"
        size="mini"
        :rules="rules"
      >
        <el-form-item label="账号" prop="account">
          <el-input
            v-model="userForm.account"
            placeholder="请输入账号"
            clearable
            required
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="userForm.password"
            placeholder="请输入密码"
            clearable
            required
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input
            v-model="userForm.password2"
            placeholder="请再次输入密码"
            clearable
            required
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="userForm.name"
            placeholder="请输入姓名"
            clearable
            required
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select
            v-model="userForm.role_id"
            filterable
            placeholder="请选择角色"
            clearable
            required
          >
            <el-option
              v-for="(auth, i) in auth_list"
              :key="`auth` + i"
              :label="auth.name"
              :value="auth.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-form-item label="状态" prop="status">
            <el-switch
              v-model="userForm.status"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">
          取 消
        </el-button>
        <el-button type="primary" @click="save_add" size="mini">
          确 定
        </el-button>
      </span>
    </el-dialog>

    <!-- // 编辑用户 -->
    <el-dialog
      class="sp"
      title="编辑用户"
      :visible.sync="infoDialogVisible"
      :class-on-click-modal="false"
      width="640px"
      :append-to-body="true"
      ref="infoDialog"
      @close="infoForm = {}"
    >
      <el-form
        :model="infoForm"
        label-width="120px"
        ref="infoForm"
        label-position="top"
        size="mini"
        :rules="rules"
      >
        <el-form-item label="账号" prop="account">
          <el-input
            v-model="infoForm.account"
            placeholder="请输入账号"
            clearable
            required
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="infoForm.name"
            placeholder="请输入姓名"
            clearable
            required
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select
            v-model="infoForm.role_id"
            filterable
            placeholder="请选择角色"
            clearable
            required
          >
            <el-option
              v-for="(auth, i) in auth_list"
              :key="`auth` + i"
              :label="auth.name"
              :value="auth.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="infoForm.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="infoDialogVisible = false" size="mini">
          取 消
        </el-button>
        <el-button type="primary" @click="save_edit" size="mini">
          确 定
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      class="sp"
      title="修改密码"
      :visible.sync="passwordDialogVisible"
      :class-on-click-modal="false"
      width="640px"
      :append-to-body="true"
      ref="passwordDialog"
      @close="passwordForm = {}"
    >
      <el-form
        :model="passwordForm"
        label-width="120px"
        ref="passwordForm"
        label-position="top"
        size="mini"
        :rules="rules"
      >
        <el-form-item label="新密码：" prop="password">
          <el-input
            v-model="passwordForm.password"
            placeholder="请输入新密码"
            clearable
            required
          ></el-input>
        </el-form-item>

        <el-form-item label="确认新密码：" prop="password2">
          <el-input
            v-model="passwordForm.password2"
            placeholder="请再次输新入密码"
            clearable
            required
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="passwordDialogVisible = false" size="mini">
          取 消
        </el-button>
        <el-button type="primary" @click="save_password" size="mini">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { user_list, user_add, user_info, user_edit } from "@/api/adminUser";
import { user_auth_list } from "@/api/auth";
export default {
  data() {
    return {
      account: "",
      name: "",
      search_date: "",
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
      start_date: "",
      end_date: "",
      dialogVisible: false,
      infoDialogVisible: false,
      passwordDialogVisible: false,
      userForm: {},
      infoForm: {},
      auth_list: [],
      passwordForm: {
        password: "",
        password1: "",
        password2: "",
      },
      rules: {
        account: [
          { required: true, message: `请输入账号`, trigger: `blur` },
          { min: 3, message: `账号不能少于3个字符`, trigger: `blur` },
        ],

        password: [
          { required: true, message: `请输入密码`, trigger: `blur` },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value && value.length < 6) {
                callback(new Error("密码不能少于6个字符!"));
              } else {
                if (
                  this.passwordForm.password2 !== "" &&
                  this.$refs.passwordForm
                ) {
                  this.$refs.passwordForm.validateField("password2");
                }
                if (this.userForm.password2 !== "" && this.$refs.userForm) {
                  this.$refs.userForm.validateField("password2");
                }
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        password2: [
          { required: true, message: `请再次输入密码`, trigger: `blur` },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value && value.length < 6) {
                callback(new Error("密码不能少于6个字符!"));
              } else if (
                value !== this.passwordForm.password &&
                value !== this.userForm.password
              ) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        name: [{ required: true, message: `请输入姓名`, trigger: `blur` }],
        position: [{ required: true, message: `请输入职位`, trigger: `blur` }],
        role_id: [{ required: true, message: `请选择权限`, trigger: `change` }],
      },
    };
  },
  methods: {
    async getTableData(reset = false) {
      if (this.search_date) {
        this.start_date = this.search_date[0];
        this.end_date = this.search_date[1];
      }
      if (reset) {
        this.page = 1;
      }
      try {
        let res = await user_list({
          account: this.account,
          name: this.name,
          page: this.page,
          page_size: this.pageSize,
          start_date: this.start_date,
          end_date: this.end_date,
        });

        if (!res.list) {
          if (this.tableData.length) {
            // data或lists为null时清理有内容的列表
            this.tableData = [];
            this.total = 0;
          }
        } else {
          this.tableData = res.list;
          this.total = res.pager.total_rows;
        }
      } catch (err) {
        console.log(err);
      }
    },
    validate(formName) {
      return this.$refs[formName].validate();
    },
    // 分页器组件
    handleSizeChange(val) {
      this.page = 1;
      this.pageSize = val;
      this.$nextTick(() => {
        this.getTableData();
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.$nextTick(() => {
        this.getTableData();
      });
    },
    async add() {
      let _auth_list = await user_auth_list();

      this.auth_list = _auth_list.data.list;
      this.dialogVisible = true;
    },
    async save_add() {
      await this.validate("userForm");
      this.userForm.status = this.userForm.status * 1;
      let a = await user_add(this.userForm);
      this.$message({
        type: "success",
        message: "添加成功",
      });
      this.getTableData(true);
      this.dialogVisible = false;
    },

    async edit(id) {
      console.log(id);
      let _auth_list = await user_auth_list();
      this.tableData.forEach((item) => {
        if (item.id == id) {
          this.infoForm = { ...item };
        }
      });
      this.auth_list = _auth_list.data;
      this.infoDialogVisible = true;
    },
    async save_edit() {
      try {
        await this.validate("infoForm");
        await user_edit(this.infoForm);
        this.$message({
          type: `success`,
          message: `操作成功！`,
        });
        this.getTableData();
        this.infoDialogVisible = false; // 关闭编辑用户对话框
      } catch (err) {
        console.error(err || "表单验证失败");
      }
    },

    async reset(id, username) {
      this.passwordForm.id = id;
      this.passwordDialogVisible = true;
    },
    async save_password() {
      try {
        await this.validate("passwordForm");
        console.log(this.passwordForm);
        await user_edit(this.passwordForm);
        this.$message({
          type: `success`,
          message: `密码修改成功！`,
        });
        this.passwordDialogVisible = false; // 关闭修改密码对话框
        this.getTableData();
      } catch (err) {
        console.error(err || "表单验证失败");
      }
    },
  },
  mounted() {
    this.getTableData();
  },
};
</script>