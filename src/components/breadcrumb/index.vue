<style  scoped>
</style>

<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group  name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in list"  :key="item.path" >
          <span class="link no-redirect" v-if="item.redirect==='noredirect'|| index === item.length - 1 || !item.parent ">
              {{item.name}}
          </span>
        </el-breadcrumb-item>
    </transition-group>
    
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      list: null,
    };
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb;
    },
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name);
      this.list = matched;
    },
  },
};
</script>
