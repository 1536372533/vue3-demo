<template>
<div id="login">
    <h1>你好 欢迎来到Vue3大世界</h1>
    <div id="contain">
        <form  class="login" action="">
            <span>账号:</span><input type="text" v-model="userLoginForm.username"><br>
            <span>密码:</span><input type="password" v-model="userLoginForm.password">
        </form>
            <button class="loginbtn" @click="usreList">登陆</button>
            <button class="addbtn" >注册</button>    
    </div>
</div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getCurrentInstance, reactive } from '@vue/runtime-core'


export default {
    name:"appLogin",
    setup(){
        let userLoginForm = reactive({
            username:"18852150",
            password:"123456"
        })
        const store = useStore()
        const router = useRouter()
        const { proxy } = getCurrentInstance()
        
        async function usreList(){
            const {data: res} = await proxy.$http.post("system/user/login",this.userLoginForm);
            console.log(res)
             if (res.success) {
                    console.log('登陆成功');
                    // eslint-disable-next-line
                    LocalStorage.set(LOCAL_KEY_XINGUAN_ACCESS_TOKEN, res.data);
                    await this.getUserInfo();
                } else {
                    console.log('登陆失败'+ res.data.errorMsg);
                    alert(res.data.errorMsg)
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
        return {
            userLoginForm,
            usreList,
            getUserInfo,
        }    
    }
}
</script>

<style scoped>
#login{
    position: relative;
}
#login h1,#contain{
    left: 50%;
    transform: translateX(-50%);
}
#login h1{
    position: absolute;
    top: 100px;
    white-space: nowrap;
}
#contain{
    width: 480px;
    height: 300px;
    position: absolute;
    top: 190px;
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: -4px -4px 10px rgb(39, 65, 65),
                4px 4px 20px aqua;
    /* 5秒 infinite循环播放无限次 linear匀速  */
    animation: animate 5s linear infinite;
}
@keyframes animate {
    0%{
        filter: hue-rotate(0deg);
    }
    100%{
        filter: hue-rotate(360deg);
    }
}
.login{
    position: relative;
    top: 80px;
}
.login span{
    font-size: 25px;
    margin-left: 30px;
}
.login input {
    width: 66%;
    height: 30px;
    font-size: 25px;
    margin-top: 15px;
    transform: translateX(10%);
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 1px 1px 2px rgb(39, 65, 65),1px 1px 2px aqua;;
}
.login input:focus{
    outline: none;
}
.loginbtn,.addbtn{
    position: relative;
    top: 140px;
    width: 100px;
    height: 35px;
    border: 1px solid aqua;
    border-radius: 5px;
    box-shadow: -1px -1px 2px rgb(39, 65, 65),1px 1px 2px aqua;
}
.loginbtn{
    float: left;
    left: 50px;
}
.addbtn{
    float: right;
    right: 50px;
}
</style>