<template>
<div id="App">
  <router-view/>
</div>
  
</template>

<script>
export default {
  name:"App",
  setup(){
    //                方法,     时间
    // setTimeout(function (){},3000)
    //箭头函数快捷键 输入an回车
    // setTimeout(()=>{
    //     alert('你好')
    // },2000)
  }
}
</script>

<style>
*{margin: 0px;padding: 0px;}
html,body,#App{width: 100%;height: 100%;}
</style>