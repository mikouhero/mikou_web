
<style>

</style>

<template>
    
    <div>
        <template>

        </template>
    </div>
</template>


<script>

export default ({
   name:"Sildebar",
   props:{
       routes:{
           type:Array,
       }
   },
   computed:{
       siderState() {
           return this.$store.state.menuSwitch;
       }
   },
   methids:{
      onlyOneShowingChildren(children) {
      return children.filter((item) => !item.hidden).length === 1;
    },
   }

})
</script>
