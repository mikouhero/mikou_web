<style>
.wrapper > .header > h3 {
  font-size: 18px;
  margin-bottom: 20px;
}
</style>

<template>
  <el-row class="wrapper">
    <el-col class="header">
      <h3 >计划任务</h3>

      <el-form inline size="small">
        <el-form-item label="名称：">
          <el-input placeholder="请输入名称"></el-input>
        </el-form-item>

        <el-form-item label="任务分组">
          <el-select placeholder="请选择" v-model="group">
            <el-option
              v-for="item in groupList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select placeholder="请选择" v-model="status">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button size="small" @click="getTableData(true)">筛选</el-button>
        </el-form-item>

        <el-form-item>
          <el-button size="small" type="primary" @click="add"> 添加 </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col class="content">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: `#F4F5F9` }"
      >
        <el-table-column prop="id" label="ID" align="center"></el-table-column>

        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column
          prop="group"
          label="任务分组"
          :formatter="groupName"
        ></el-table-column>
        <el-table-column prop="cron" label="cron表达式"></el-table-column>
        <el-table-column
          prop="target"
          label="调用目标"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="status" label="状态" :formatter="statusName">
        </el-table-column>

        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button size="mini" type="text">
              <i class="el-icon-edit" @click="edit(scope.row, scope.$index)">
                修改
              </i>
            </el-button>
            <el-button size="mini" type="text" v-show="scope.row.status == 1">
              <i class="el-icon-switch-button" @click="stop(scope.row.id)">
                停止</i
              >
            </el-button>
            <el-button size="mini" type="text" v-show="scope.row.status == 0">
              <i class="el-icon-mouse" @click="start(scope.row.id)"> 启动</i>
            </el-button>
            <el-button size="mini" type="text">
              <i
                class="el-icon-delete"
                @click="del(scope.row.id, scope.$index)"
              >
                删除</i
              >
            </el-button>
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

    <el-dialog
      :title="title"
      :visible.sync="addDialogVisible"
      width="700px"
      :class-on-click-modal="false"
      :append-to-body="true"
      ref="userDialog"
    >
      <el-form
        :model="addForm"
        size="small"
        ref="addForm"
        label-width="100px"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input
                v-model="addForm.name"
                placeholder="名称"
                clearable
                required
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务分组" prop="group">
              <el-select
                placeholder="请选择"
                v-model="addForm.group"
                filterable
                clearable
                required
              >
                <el-option
                  v-for="item in groupList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="调用目标" prop="target">
          <el-input
            v-model="addForm.target"
            placeholder="调用目标"
            clearable
            required
          ></el-input>
        </el-form-item>

        <el-form-item label="目标参数" prop="param">
          <el-input
            v-model="addForm.param"
            placeholder="目标参数"
            clearable
            required
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="cron表达式" prop="cron">
              <el-input
                v-model="addForm.cron"
                placeholder="cron表达式"
                clearable
                required
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否并发" prop="concurrent">
              <el-radio-group v-model="addForm.concurrent" size="small">
                <el-radio-button label="1">允许</el-radio-button>
                <el-radio-button label="2"> 禁止</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="调用类型" prop="type">
          <el-radio-group v-model="addForm.type" size="small">
            <el-radio-button label="1">接口</el-radio-button>
            <el-radio-button label="2"> 函数</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="执行策略" prop="strategy">
          <el-radio-group v-model="addForm.strategy" size="small">
            <el-radio-button label="1">立即执行</el-radio-button>
            <el-radio-button label="2"> 执行一次</el-radio-button>
            <el-radio-button label="3"> 放弃执行</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择" v-model="addForm.status" required>
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false" size="mini">
          取 消
        </el-button>
        <el-button type="primary" size="mini" @click="confirm">
          确 定
        </el-button>
      </span>
    </el-dialog>

  </el-row>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      group: "",
      status: "",

      groupList: [
        { value: 0, label: "默认", name: "默认" },
        { value: 1, label: "系统", name: "系统" },
      ],

      statusList: [
        { value: 0, label: "停用", name: "停用" },
        { value: 1, label: "正常", name: "正常" },
      ],

      tableData: [],
      addDialogVisible: false,
      init_add_form: {
        strategy: 1,
        type: 1,
        concurrent: 2,
      },
      addForm: {},
      title: "",

      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        group: [{ required: true, message: "请选择任务分组", trigger: "blur" }],
        target: [
          { required: true, message: "请输入调用目标", trigger: "blur" },
        ],
        cron: [
          { required: true, message: "请输入cron 表达式", trigger: "blur" },
        ],
        status: [
          { required: true, message: "请选择任务状态", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    async getTableData(reset = false) {
      this.tableData = [
        {
          id: 1,
          name: "111",
          group: 1,
          status: 0,
          target: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          param: "xxx",
          cron: "* * * * * *",
          strategy: 1,
          type: 1,
          concurrent: 2,
        },
        {
          id: 2,
          name: "222",
          group: 1,
          status: 0,
          target: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          cron: "* * * * * *",
          strategy: 1,
          type: 1,
          concurrent: 2,
        },
        {
          id: 3,
          name: "3333",
          group: 1,
          status: 0,
          target: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          cron: "* * * * * *",
          strategy: 1,
          type: 1,
          concurrent: 2,
        },
      ];
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
    add() {
      this.title = "添加任务";
      if (JSON.stringify(this.addForm) == "{}") {
        this.addForm = JSON.parse(JSON.stringify(this.init_add_form));
      }

      this.addDialogVisible = true;
    },
    validate(formName) {
      return this.$refs[formName].validate();
    },
    async confirm() {
      await this.validate("addForm");
      if (this.addForm.id === undefined) {
        await this._add();
      } else {
        await this._edit();
      }
    },
    async _add() {
      //todo 接口 返回id

      let taskId = 10;
      this.addForm.id = taskId;
      this.tableData.push(this.addForm);
      this.addForm = {};
      this.addDialogVisible = false;
      this.$message({
        type: "success",
        message: "添加成功",
      });
    },
    async _edit() {
      //  todo 接口

      //       this.tableData[this.edit_index]  = this.addForm   // 无效
      //       this.tableData.splice(this.edit_index, 1, this.addForm);  // 有效
      this.$set(this.tableData, this.edit_index, this.addForm); // 有效
      this.addForm = {};
      this.edit_index = -1;
      this.addDialogVisible = false;
      this.$message({
        type: "success",
        message: "更新成功",
      });
    },

    edit(row, index) {
      console.log(index);
      this.edit_index = index;
      console.log(this.edit_index);

      this.title = "修改任务";
      this.addDialogVisible = true;
      this.addForm = JSON.parse(JSON.stringify(row));
    },
    stop(id) {
      this.$confirm("此操作将停止该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //todo 接口

        const obj = this.tableData.find((item) => {
          return item.id == id;
        });
        obj.status = 0;
        this.$message({
          type: "success",
          message: "success",
        });
      });
    },
    del(id, key) {
      this.$confirm("此操作将删除该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        center: true,
      })
        .then(() => {
          //todo 接口

          this.tableData.splice(key, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    start(id) {
      this.$confirm("此操作将开启该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      }).then(() => {
        //todo 接口

        const obj = this.tableData.find((item) => {
          return item.id == id;
        });
        obj.status = 1;
        this.$message({
          type: "success",
          message: "success ",
        });
      });
    },
    statusName(row) {
      const status = row.status;
      const obj = this.statusList.find((item) => {
        return item.value === status;
      });
      if (obj !== undefined) {
        return obj.label;
      } else {
        return "";
      }
    },
    groupName(row) {
      const group = row.group;
      const obj = this.groupList.find((item) => {
        return item.value === group;
      });
      if (obj !== undefined) {
        return obj.label;
      } else {
        return "";
      }
    },
  },
  mounted() {
    this.getTableData();
  },
};
</script>
