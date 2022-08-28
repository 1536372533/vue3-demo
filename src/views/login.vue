<template>
  <h1>你好</h1>
  <button @click="usreList">点击登陆</button>
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
                     console.log('登入失败');
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
                    await router.push("/list");
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

<style>

</style>