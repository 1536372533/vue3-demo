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
html,body{
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  background: url(./assets/login_background.gif) no-repeat;
  background-size: 100% 100%;
}
</style>