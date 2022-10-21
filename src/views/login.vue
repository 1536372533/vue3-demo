<template>
<div id="login">
    <div id="border"></div>
    <div id="contain">
        <div id="left_card">
            <h1>欢迎来到我的Vue3大世界</h1>
            <span>Welcome to my Vue3 world</span>
        </div>
        <div id="right_card">
            <el-card class="el-card">
                <h2>欢迎登录</h2>
                <form  class="login" action="">
                    <input v-shake type="text" v-model="userLoginForm.username" placeholder="请输入账号">
                    <input v-shake type="password" v-model="userLoginForm.password" placeholder="请输入密码">
                </form>
                <div class="recover">
                    <p @click="recover">忘记密码</p>
                </div>
                <div class="message">
                    <span v-html="error"></span>
                </div>
                <div id="btn">
                    <button class="loginbtn"  @click="usreList">登陆</button>
                </div>
            </el-card>
        </div>
    </div>
    
</div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getCurrentInstance, reactive , ref  } from '@vue/runtime-core'
import { ElMessage } from 'element-plus'

export default {
    name:"appLogin",    
    setup(){
        let userLoginForm = reactive({
            username:"",
            password:""
        })
        const store = useStore()
        const router = useRouter()
        const { proxy } = getCurrentInstance()
        let error = ref('')
        async function usreList(){
            const {data: res} = await proxy.$http.post("system/user/login",this.userLoginForm);
            console.log(res)
            error.value = ''
             if (res.success) {
                    // eslint-disable-next-line
                    LocalStorage.set(LOCAL_KEY_XINGUAN_ACCESS_TOKEN, res.data);
                    await this.getUserInfo();
                } else {
                    error.value = res.data.errorMsg
                }
        }
        //获取用户信息
        async function getUserInfo() {
                const {data: res} = await proxy.$http.get("system/user/info");
                console.log(res)
                if (!res.success) {
                    console.log("获取用户信息失败:" + res.data.errorMsg);
                } else {
                    this.userInfo = res.data;
                    store.commit("setUserInfo", res.data);
                    await router.push("/home");
                }
        }
        const recover = () => {
            ElMessage({
                showClose: true,
                message: '密码都记不住，干什么吃的！',
                type: 'success',
            })
        }
        return {
            userLoginForm,error, 
            usreList,getUserInfo,recover,
        }    
    } 
}
</script>

<style lang="less" scoped>
@keyframes animate {
    0%{
        filter: hue-rotate(0deg);
    }
    100%{
        filter: hue-rotate(360deg);
    }
}
.contain{
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);   
    border: 1px solid black;
    border-radius: 25px; 
}
#login{
    position: relative;
    width: 100vw;
    height: 100vh;
    background-image: url(./../assets/login_background.gif);
    background-size: 100% 100%;
    background-color:  #a7a8bd;

    #border{
        .contain();
        width: 900px;
        box-shadow: -5px -5px 12px rgb(39, 65, 65),
                        5px 5px 22px aqua;
        /* 5秒 infinite循环播放无限次 linear匀速  */
        animation: animate 5s linear infinite;
    }
    #contain{
        .contain();
        background-color: rgba(255, 255, 255, 0.1) !important;
        backdrop-filter: blur(5px);
    }
}
#contain{
    display: flex;
    flex-direction:row;
    text-align:center;
    align-items: center;
    #left_card{
        width: 500px;
        h1{
            color: white;
            white-space: nowrap;
        }
        span{
            font-size: 1.2rem;
            text-align:center;
            color: white;
            white-space: nowrap;
        }   
    }
    #right_card{
        width: 400px;
        .el-card{
            margin: 0 45px;
            border-radius: 25px;
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
}
#right_card{
    display: flex;
    justify-content: center;
    align-items: center;
    h2{
        margin-bottom: 5px;
    }
    .login{
        input{
            width: 80%;
            height: 45px;
            margin-top: 10px;
            border: 1px solid white;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 10px;
            font-size: inherit;
            padding-left: 20px;
            outline: none;
        }
    }
    .recover{
        float: right;
        margin-top: 5px;
        color: #4e6ef2;
        cursor: pointer;
    }
    .message{
        float: left;
        margin-top: 5px;
        margin-left: 20px;
        font-size: 0.9rem;
        color: red;
    }
    .loginbtn{
        width: 100%;
        height: 35px;
        margin-top: 10px;
        border-radius: 10px;
        background-color: rgba(207, 38, 38, 0.8);   
        /* 5秒 infinite循环播放无限次 linear匀速  */
        animation: animate 5s linear infinite;
    } 
    
}


</style>