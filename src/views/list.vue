<template>
<div>
    <h1>你好--{{userInfo.nickname}}</h1>
    <button @click="outList">退出登录</button>
    <button @click="list">获取list</button>
    <button @click="showEchart">Echarts</button>
    <div v-if="isshowList">
        <table border="2" cellspacing="0">
            <tr>
                <td>index</td>
                <td>id</td>
                <td>name</td>
            </tr>
    </table>
        <table border="2" cellspacing="0" v-for="(lists,index) in productData" :key="lists.id">
            <tr>
                <td>{{index}}</td>
                <td>{{lists.id}}</td>
                <td>{{lists.name}}</td>
            </tr>
        </table>
    </div>
    <div class="echarts-box">
        <div id="listEchart" :style="{ width: '900px', height: '300px' }"></div>
    </div>
</div>
</template>

<script>
import { getCurrentInstance,onMounted,onUnmounted,ref } from '@vue/runtime-core'
import {useRouter} from "vue-router"
import { useStore } from 'vuex'
import * as echarts from "echarts";

export default {
    name:"userList",
    setup(){
        let total = ref(0)//总共多少条数据
        let productData = ref() //表格数据
        let a = ref()
        let queryMap = ref({//查询对象
                    pageNum: 1,
                    pageSize: 6,
                    name: "",
                    categoryId: "",
                    supplier: "",
                    status: 0,
                }) 

          
        let isshowList = ref(false)

        const router = useRouter()
        const echart = echarts
        const store = useStore()
        const { proxy } = getCurrentInstance()
        //获取用户信息
        let userInfo = ref(store.state.userInfo)  

        async function outList(){
            // eslint-disable-next-line
            LocalStorage.clearAll();
            await router.push("/login");
        }

        async function list(){
             const {data: res} = await proxy.$http.get("business/product/findProductList", {
                    params: this.queryMap
                });
                console.log(res.data.rows)
                if (!res.success) {
                      console.log('获取失败');
                } else {
                    this.isshowList = true;
                    this.desChart()
                    this.total = res.data.total;
                    this.productData = res.data.rows;
                    this.a=[]

                    var $this = this;
                    res.data.rows.forEach(function(e) {
                        $this.a.push({value:e.id,name:e.name})
                    }); 
                }    
        }
        function showEchart(){
            this.isshowList = false
            this.initChart()
        }
        
        // 基础配置一下Echarts
        function initChart() {
            var $this = this;//this 指向问题
            let myChart = echart.init(document.getElementById('listEchart'), 'dark');
            let option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [{
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: $this.a
                }]
            };
            option && myChart.setOption(option);
            }
        // 销毁Echarts
        function desChart(){
            let myChart = echart.init(document.getElementById('listEchart'))
            myChart.dispose();
        }
        
        return{
            total,productData,queryMap,isshowList,a,userInfo,
            
            list,outList,showEchart,initChart,desChart
        }
    }
}
</script>

<style scoped>

</style>