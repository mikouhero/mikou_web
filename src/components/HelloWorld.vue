<template>
  
  <div>
      <menu-list></menu-list>
      <header-dom></header-dom> 
  </div>

</template>

<script>
  import HeaderDom from  '@/view/layout/header.vue'
  import MenuList from '@/view/layout/leftlist.vue'
  export default {
    data() {
        return  {
          name:""
        }
    },
    components:{
      HeaderDom,
      MenuList
    }
  }
</script>
