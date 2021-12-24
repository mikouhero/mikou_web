<style scoped>
.el-menu {
  height: calc(100% -60px);
  overflow: auot;
  border: none;
  text-align: left;
}
.el-submenu > .first-icon {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  display: inline-block;
}
.is-active > .first-icon {
  color: #409eff;
}

.is-active > .first-title {
  font-weight: bold;
}
.el-menu-item {
  height: 40px !important;
  line-height: 40px !important;
  border-left: 4px solid #fff;
}

.el-menu-item > .first-icon {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  display: inline-block;
}
</style>

<template>
  <div>
    <el-menu
      class="slidebar-menu"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="bg"
      :text-color="tc"
      :active-text-color="atc"
      router=""
    >
      <template v-if="menulist.length">
        <template v-for="(item, index) in menulist">
          <el-submenu
            calss="sidebar-wrap__menu"
            v-if="item.children"
            :key="item.name"
            :index="item.urls"
          >
            <template slot="title">
              <i class="icon first-icon" :class="item.icon"> </i>
              <span class="first-title" slot="title">
                {{ sliderState ? item.name : "" }}
              </span>
            </template>
            <template v-for="(child, i) in item.children">
              <el-menu-item :index="child.urls">
                <span class="icon">
                  <i :class="child.icon"></i>
                </span>
                <span slot="title">{{ child.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :index="item.urls">
            <span class="icon first-icon" :class="item.icon"></span>
            <span class="first-title" slot="title"
              >{{ sliderState ? item.name : "" }}
            </span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { routes } from "@/router/index";
import { lo_user_info } from "@/api/login";

export default {
  name: "sidebar",
  data: () => {
    return {
      menulist: [],
      routes: [],
      bg: "",
      tc: "",
      atc: "",
    };
  },
  computed: {
    ...mapState({
      menuSwitch: (state) => state.menuSwitch,
    }),
    isCollapse() {
      if (this.menuSwitch) {
        return false;
      }
      return true;
    },
    sliderState() {
      return this.$store.state.menuSwitch;
    },
  },
  mounted() {
    for (let i = 0; i < routes.length; i++) {
      const element = routes[i];
      if (!element.name) {
        element.name = element.children[0].name;
      }
    }
    this.routes = routes;
    this.getMenuList();
  },
  methods: {
    onlyOneShowingChildren(children) {
      return children.filter((item) => !item.hidden).length === 1;
    },
    goToLogin() {
      this.$router.push({
        path: `/`,
      });
    },
    async getMenuList() {
      let menulist = localStorage.getItem("menulist");
      if (!menulist) {
        try {
          let res = await lo_user_info();
          this.menulist = menulist = res.data.menulist;
          localStorage.setItem("menulist", JSON.stringify(menulist));
          localStorage.setItem("name", res.data.userinfo.name);
        } catch (err) {
          console.log(err);
        }
      } else {
        menulist = JSON.parse(menulist);
      }
      this.menulist = menulist;
    },
  },
  components: {},
};
</script>