<template>
<div>
    <div class="contain">
        <h1>你好--{{userInfo.nickname}}</h1>
        <el-button @click="desChart()">销毁Echarts</el-button> 
        <el-button @click="showEchart(2)">Echarts2</el-button>
        <el-button @click="showEchart(1)">Echarts1</el-button>      
    </div>
    <div class="show">
        <!-- <div v-if="isshowList">
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
        </div> -->
        <div class="echarts-box" >
            <div id="listEchart" :style="{ width: '600px', height: '220px'}"></div>
        </div>        
    </div>

</div>
</template>

<script>
import { getCurrentInstance,ref } from '@vue/runtime-core'
import {useRouter} from "vue-router"
import { useStore } from 'vuex'
import * as echarts from "echarts";

export default {
    name:"userList",
    setup(){
        let listData = ref([])
        //get需要告诉服务器要什么数据，6个
        let queryMap = ref({
                    pageNum: 1,
                    pageSize: 6,
                    name: "",
                    categoryId: "",
                    supplier: "",
                    status: 0,
                }) 
        const router = useRouter()
        const echart = echarts
        const store = useStore()
        const { proxy } = getCurrentInstance()
        //获取用户信息
        let userInfo = ref(store.state.userInfo)  

         async  function showEchart(a){
            queryMap.value.pageNum = a
            await this.list()
            this.initChart()
        }
        async function list(){
             const {data: res} = await proxy.$http.get("business/product/findProductList", {
                    params: this.queryMap
                });

                if (!res.success) {
                      console.log('获取失败');
                } else {
                    //清空数组，要不然有脏数据
                    this.listData=[]
                    // 销毁旧的图表
                    desChart()
                    res.data.rows.forEach(function(e) {
                        listData.value.push({value:e.id,name:e.name})
                    }); 
                }    
        }        
        // 基础配置一下Echarts
         function initChart() {
            // let myChart = echart.init(document.getElementById('listEchart'), 'dark');
            let myChart = echart.init(document.getElementById('listEchart'));
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
                data: listData.value
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
            queryMap,userInfo,listData,
            
            list,showEchart,initChart,desChart
        }
    }
}
</script>

<style lang="less" scoped>
.contain{
    h1{
        display: inline;
    }
    .el-button{
        float: right;
        margin-left: 10px;
    }
}
.show{
    width:100%;
    display: flex;
    justify-content: center;

}
</style>