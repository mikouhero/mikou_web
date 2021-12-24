<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.topic .el-table th.is-leaf {
  background: #eff2fb !important;
  border: none !important;
}
.topic .el-table--border,
.topic .el-table--border td,
.topic .el-table--border td {
  border: none !important;
}
.el-table th > .cell {
  padding-left: 0px;
}
.comment .el-table th.is-leaf {
  background: #eff2fb !important;
}

</style>
