<style>
.header > .title {
  font-size: 18px;
}
.header > button {
  float: right;
  margin-bottom: 20px;
}
</style>

<template>
  <el-row class="wrapper">
    <el-col class="header">
      <span class="title"> 菜单管理</span>
      <el-button type="primary" size="medium" @click="addmenu()">
        添加父级菜单</el-button
      >
    </el-col>

    <el-col class="content">
      <!-- <el-card v-for="(menu, index) in menus" :key="index"> -->
      <el-table
        border
        :data="menus"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="icon" label="icon" align="center">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="urls"
          label="urls"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="描述"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
        ></el-table-column>
        <el-table-column prop="status" label="级别" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.button === 0 ? "菜单" : "按钮" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" align="center" width="260px">
          <template slot-scope="scope">
            <el-button
              type="success"
              v-show="scope.row.status === 1 && scope.row.button === 0"
              size="mini"
              >展示</el-button
            >
            <el-button
              type="default"
              v-show="scope.row.status === 0 && scope.row.button === 0"
              size="mini"
              >不展示</el-button
            >
            <el-button
              type="primary"
              v-if="scope.row.button != 1"
              size="mini"
              @click="addmenu(scope.row)"
              >添加子集</el-button
            >
            <el-button type="default" size="mini" @click="editmenu(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- </el-card> -->
    </el-col>
  </el-row>
</template>

<script >
import { menu_list } from "@/api/menu";

export default {
  data() {
    return {
      menus: [],
    };
  },
  methods: {
    async getTableData() {
      let res = await menu_list();
      let menus = res.data;
      //   if (menus && menus.length > 0) {
      //     menus = menus.map((menu) => {
      //       console.log(2222, menu);
      //       let _menu = [menu];
      //       let i = 0;
      //       while (i < _menu.length) {
      //         for (; i < _menu.length; i++) {
      //           if (_menu[i].children) {
      //             for (let j = 0; j < _menu[i].children.length; j++) {
      //               _menu[i].children[j].pname = _menu[i].name;
      //             }
      //             _menu.splice(i + 1, 0, ..._menu[i].children);
      //             i++;
      //             break;
      //           }
      //         }
      //       }
      //       return _menu;
      //     });
      //   } else {
      //     menus = [[]];
      //   }
      //   console.log(menus);
      this.menus = menus;
    },
    addmenu(item) {
      this.$router.push({
        path: item
          ? `/menu/addsubmenu/${item.id}/${item.name}`
          : "/menu/addmenu",
      });
    },
    editmenu(item) {
      this.$router.push(
        item.pid === 0
          ? `/menu/editmenu/${item.id}`
          : `/menu/editsubmenu/${item.pid}/${item.name}/${item.id}`
      );
    },
  },

  mounted() {
    this.getTableData();
  },
};
</script>