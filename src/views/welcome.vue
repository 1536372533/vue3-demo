<template>
    <div id="welcome">
        <el-breadcrumb separator="/" style="padding-left:10px;padding-top: 10px; padding-bottom:10px;font-size:12px;">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>欢迎</el-breadcrumb-item>

        </el-breadcrumb>    
        <el-row :gutter="15" style="display:flex; flex-warp:warp; margin: 0px; ">
            <!-- 左边部分 -->
            <el-col :span="13"  style="padding-left:10px;">
                <!-- 用户信息表格 -->
                <el-card class="box-card">

                    <div class="clearfix">
                        <span>用户信息</span>
                        <el-button style="float:right;" @click="outLogin()"  plain  type="primary">退出登陆</el-button>
                        <el-button style="float:right; margin-right: 10px;" type="primary" plain loading >获取源码</el-button>
                    </div>
                    <el-divider></el-divider>
                    <el-tooltip class="item" effect="dark" content="帅气又多金的小伙子" placement="right-start">
                        <el-avatar :size="80" :src="require('./../assets/upload/'+ userInfo.avatar)" style="float:left; margin-left: 20px;"></el-avatar>
                    </el-tooltip>
                    <div class="right" style="float:right; width:520px; height: 100px;">
                        <el-table :data="tableInfo" border>
                            <el-table-column prop="username" label="用户账号"></el-table-column>
                            <el-table-column prop="nickname" label="用户昵称"></el-table-column>
                            <el-table-column fixed="right" prop="roles" label="用户角色" width="150"></el-table-column>
                        </el-table>
                    </div>
                </el-card>

                <!-- 功能列表 -->
                <el-card class="box-card" style=" margin-top:10px;" :gutter="10">
                    <el-card style="height:125px; margin: 0 20px 0 20px; --el-card-padding: 0px;" >
                        <img  style="height: auto; min-width: 100%; background-position: center;" src="./../assets/font.png" alt="帅">
                    </el-card>
                </el-card>

                <el-card class="box-card" style="margin-top:20px;  padding:0px;">
                    <div id="loginReport" style="width: 650px;height:210px;">
                        <list></list>
                    </div>
                </el-card>
                
            </el-col>
            <!-- 右边部分 -->
            <el-col :span="11" style="padding-left:10px;" >
                <div class="grid-content bg-purple">
                    <el-card style="min-height:639px;">
                        <div style="height:170px"> 
                            <swiper 
                                :slidesPerView="3"
                                :spaceBetween="30"
                                :loop="true"
                                :slideToClickedSlide="true"
                                :centered-slides="true"
                                :modules="modules"  
                                >
                                <swiper-slide v-for="swiper in img" :key="swiper.url">
                                    <img :src="swiper.url">
                                </swiper-slide>
                            </swiper>

                        </div>
                       
                        <el-divider>其他项目</el-divider>

                        <el-row :gutter="20">
                            <el-col :span="6"><div class="grid-content bg-purple" v-shake><el-button @click="demo(1)">功能1</el-button></div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple" v-shake><el-button @click="demo(2)">功能2</el-button></div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple" v-shake><el-button @click="demo(3)">功能3</el-button></div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple" v-shake><el-button @click="demo(4)">功能4</el-button></div></el-col>
                        </el-row>

                        <el-divider></el-divider>
                        <el-card style="height:290px;overflow: none;">
                            {{userInfo}}
                            <demo></demo>
                        </el-card>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute,useRouter } from 'vue-router'
import { ref, reactive , toRefs } from '@vue/reactivity'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import { ElNotification } from 'element-plus'
import list from './../components/list.vue'
import demo from '../components/demo/AppDemo.vue'

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/pagination";
import "swiper/css/navigation"
//分页器以及左右箭头
import { Pagination, Navigation, } from "swiper";

export default {
    name:"appWelcome",
    components: {
        Swiper,
        SwiperSlide,
        list,
        demo
    },
    setup () {

        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        const {proxy} =  getCurrentInstance()
        //获取用户信息
        let userInfo = ref(store.state.userInfo) 
        let tableInfo = ref([])
        let img = ref([
            {url:require("./../assets/swiper/1.jpg")},
            {url:require("./../assets/swiper/2.jpg")},
            {url:require("./../assets/swiper/3.jpg")},
            {url:require("./../assets/swiper/4.jpg")},
            {url:require("./../assets/swiper/5.jpg")},
        ])
        //获取用户信息tabelInfo
        async function info(){
            const {data: res} = await proxy.$http.get("system/user/info");
            if (!res.success) {
                console.log("获取用户信息失败:" + res.data.errorMsg);
            } else {
                userInfo.value = res.data;
                tableInfo.value.push({
                    username: res.data.username,
                    nickname: res.data.nickname,
                    roles:    res.data.roles
                })
                //tableInfo是json数组类型 console.log(tableInfo.value[0].username);
            }
        }
        info()
        const delay = 3000
        
        function throttle1(func, wait) {
            var previous = 0;
            return function () {
                var now = Date.now();
                var context = this;
                var args = arguments;
                if (now - previous > wait) {
                    func.apply(context, args);
                    previous = now;
                }
            }
        }
        function Message(index){
            ElNotification({
                title: 'Title',
                message: 'Demo'+index,
                type: 'success',
                duration: delay,
            })
        }
        const demo = (index) => {
            if(index == 1){
                const demo1 = throttle1(Message(index),delay)
            }
        }
        function outLogin(){
            // eslint-disable-next-line
            LocalStorage.clearAll();
            router.push("/login");
        }
        return {
            userInfo,tableInfo,img,
            outLogin,demo,
            modules: [Pagination,Navigation],
        }
    },
}
</script>

<style lang="less">
.swiper{
    position: relative;
    width: 100%;
    height: 100%;
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 300ms;
        transform: scale(0.7);
        img{
            width: 100%;
            height: 100%;
            }
        &-active{
            transform: scale(1);
            }
        }
}

</style>
