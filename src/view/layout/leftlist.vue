<style scoped>
.header-logo {
  position: relative;
  z-index: 100;
  color: #409eff;
  background: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 5px rgba(153, 153, 153, 0.349019607843137);
}
.logo {
  display: block;
  width: 90%;
  height: 100%;
  background-image: url(../../assets/images/menu-logo.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.name {
  font-size: 18px;
}
</style>

<template>
  <div class="wrapper">
    <div class="header-logo">
      <span class="logo" v-if="menuSwitch"> </span>
      <span class="name" v-else style=""> 菜单 </span>
    </div>
    <menu-wrapper></menu-wrapper>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MenuWrapper from "./sidebar.vue";
export default {
  components: {
    MenuWrapper,
  },
  computed: {
    ...mapState({
      menuSwitch: (state) => state.menuSwitch,
    }),
  },
};
</script>