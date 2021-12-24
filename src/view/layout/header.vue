<style scoped>
.wraaper {
  display: flex;
  height: 100%;
  line-height: 6-px;
}
.left {
  display: inline-block;
}
.icon {
  font-size: 20;
  padding: 20px 15px;
  color: #666;
}
.bread {
  flex: 1;
  display: flex;
  align-items: center;
}
.right {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.name {
  color: #666;
  font-size: 10;
  margin-right: lem;
  outline: none;
}
.iconfont {
  font-size: 20;
  color: #ccc;
  line-height: 40px;
  padding: 10px;
}
</style>


<template>
  <div class="wraaper">
    <div class="left" @click="toggleMenu">
      <el-tooltip
        class="item"
        effect="dark"
        content="菜单缩放"
        placement="bottom"
      >
        <span class="icon el-icon-s-fold"> </span>
      </el-tooltip>
    </div>

    <div class="bread">
      <bread-crumb> </bread-crumb>
    </div>
    <div class="right">
      <el-dropdown size="big" trigger="click" @command="handleCommand">
        <span class="name el-dropdown-link">
          {{ name }} ，欢迎您! <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-lock" command="reset"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-edit" command="edit"
            >编辑信息</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-switch-button" command="logout"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import { lo_logout, lo_user_info } from "@/api/login";
import BreadCrumb from "@/components/breadcrumb/index.vue";
export default {
  data() {
    return {
      name: "",
      username: "",
    };
  },
  computed: {
    ...mapState({
      menuSwitch: (state) => state.menuSwitch,
    }),
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch("menuSwitch", !this.menuSwitch);
    },
    handleCommand(command) {
      switch (command) {
        case "reset":
          this.$router.push({
            path: `/adminUser/reset-password`,
          });
          break;
        case "edit":
          this.$router.push({
            path: `/adminUser/edit-info`,
          });
          break;
        case "logout":
          this.logout();
      }
    },
    goToLogin() {
      this.$router.push({
        path: `/login`,
      });
    },
    async logout() {
      try {
        await lo_logout();
        localStorage.removeItem("name");
        localStorage.removeItem("username");
        localStorage.removeItem("menulist");
        localStorage.removeItem("token");
        console.log('out ')
        this.goToLogin();
      } catch (err) {
        console.log(err);
      }
    },
    async getName() {
      let name = localStorage.getItem("name");
      if (!name) {
        try {
          let res = await lo_user_info();
          this.name = res.data.userinfo.name;
          localStorage.setItem("menulist", JSON.stringify(res.data.menulist));
          localStorage.setItem("name", res.data.userinfo.name);
        } catch (err) {
          console.log(err);
        }
      } else {
        this.name = name;
      }
    },
  },
  mounted() {
    this.getName();
  },
  components: {
    BreadCrumb,
  },
};
</script>