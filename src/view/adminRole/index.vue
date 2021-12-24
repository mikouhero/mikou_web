<style>
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
  <el-col class="wrapper">
    <el-col class="header">
      <h3>权限管理</h3>
      <el-form inline>
        <el-form-item label="角色名:" prop="name">
          <el-input size="mini"  placeholder="请输入角色" v-model='roleForm.name'></el-input>
        </el-form-item>

        <el-form-item label="时间搜索">
          <el-date-picker
          v-model="daterange"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button size="mini" type="default" @click=getTableData(true)>筛选 </el-button></el-form-item
        >
        <el-form-item>
          <el-button size="mini" type="primary" @click="add"
            >添加
          </el-button></el-form-item
        >
      </el-form>
    </el-col>

    <el-col class="content" size="mini">
      <el-table
        size="mini"
        border
        :data="tableData"
        :header-cell-style="{ background: `#F4F5F9` }"
      >
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column
          size="mini"
          prop="name"
          label="权限名称"
          align="center"
        ></el-table-column>
        <el-table-column
          size="mini"
          prop="updated_at"
          label="更新时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>

            <template>
              <el-popconfirm
                confirm-button-text="好的"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                title="确定删除该角色？"
                @confirm="deleteItem(scope.row.id)"
              >
                <el-button slot="reference" type="primary" size="mini"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
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
  </el-col>
</template>



<script>
import { role_list, role_delete } from "@/api/auth";

export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      name: "",
      daterange: [],
      tableData: [],
      roleForm:{},
    };
  },
  methods: {
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
    async getTableData(reset = false) {
      if (reset) {
        this.page = 1;
      }
      let res = await role_list({
        name: this.roleForm.name,
        update_time: this.daterange ? this.daterange.join("~") : null,
        page: this.page,
        page_size: this.pageSize,
      });
      console.log(res);
      this.page = res.pager.page;
      this.pageSize = res.pager.page_size;
      this.total = res.pager.total_rows;
      this.tableData = res.list;
    },
    add() {
      this.$router.push({
        path: "/adminRole/add",
      });
    },
    edit(id) {
       this.$router.push({
        path: "/adminRole/edit/"+id,
      });
    },
    async deleteItem(id) {
      console.log(id);
      await role_delete({
        id: id,
      });
      this.$message({
        type: `success`,
        message: `权限删除成功！`,
      });
      this.getTableData(true);
    },
  },
  mounted() {
    this.getTableData();
  },
};
</script>