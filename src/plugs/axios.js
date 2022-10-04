import Axiso from 'axios'
import router from './../router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
/* eslint-disable */

    const axios  = Axiso.create({
        baseURL: 'http://121.199.17.114:8089/'
      })

    //请求拦截器
    axios.interceptors.request.use(config => {
        NProgress.start()
        config.headers.Authorization = LocalStorage.get(LOCAL_KEY_XINGUAN_ACCESS_TOKEN);
        return config;
    }
    , error => {
        return Promise.reject(error)
    });

    //响应拦截器
    axios.interceptors.response.use(
    function (response) {
        NProgress.done();
        const res = response.data;
        if (res.success) {
            return response;
        }
        if (res.data!=null&&res.data.errorCode === 50001) {
            LocalStorage.clearAll();
            return router.push("/login");
        }
        return response;
    },
    function (error) {
        return Promise.reject(error)
    }
    )
export default axios;