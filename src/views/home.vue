<template>
    <div class="common-layout">
      <el-container>

        <el-header id="header">
          <div :data="isCollapse" class="icon" >
            <span v-if="isCollapse" @click="isCollapse = !isCollapse"><img src="./../assets/svg/system_left.svg"></span>  
            <span v-else @click="isCollapse = !isCollapse"><img src="./../assets/svg/system_right.svg"></span>
          </div>
          <div class="text">
            <h1> 一念天堂，一念地狱</h1>
          </div>
          <div>

          </div>
        </el-header>

        <el-container>
          <el-aside id="aside" >
            <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">

              <el-menu-item v-for="routerURL in urlLists" :key="routerURL.url"  @click="link(routerURL.url)">

                <el-icon><img :src = routerURL.icon></el-icon>
                <template #title>{{routerURL.name}}</template>

              </el-menu-item>

            </el-menu>
          </el-aside>

          <el-main id="main">
                <router-view></router-view>
          </el-main>
          
        </el-container>

      </el-container>
    </div>
</template>  
<script>
import { ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
export default {
    name:"appHome",
    setup () {
      const isCollapse = ref(false)
        var urlLists = ref([
          {url:'/welcome',     icon: require('./../assets/svg/home.svg'),name:' 系统主页'},
          {url:'/welcome/demo',icon: require('./../assets/svg/demo.svg'),name:' 个人Demo'},
          ])
      const router = useRouter()  
      const draw = () => {}
      const link = async(url) => {
          await router.push(url)
      }
        
      return {
        urlLists,isCollapse,
        draw,link
        }
    }
}
</script>

<style lang="less" scoped>
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
#header{
  height: 8vh;
  background-color:rgba(255, 255, 255, 0.3);
  position: relative;
  .icon{
    height: 100%;
    width: 63px;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    &:hover{
      background-color: white;
    }
  }
  .text{
      float: left;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
}
#aside{
  width: auto;
  .el-menu {
    height: 100%;
    --el-menu-bg-color:rgba(255, 255, 255, 0.5);
  }
}

#main{
  width: 100%;
  height: 92vh;
  background-color: #a7a8bd;
}
</style>