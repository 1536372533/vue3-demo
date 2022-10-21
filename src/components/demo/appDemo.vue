<template>
    <div id="js">

        <el-card v-if="show[0]" style="height:290px; width: 100%; --el-card-padding: 5px;"></el-card>    

        <el-card v-if="show[1]" style="height:290px; width: 100%; margin-top: 10px;--el-card-padding: 5px;">
            <div id="js1">
            </div>
        </el-card>

        <el-card v-if="show[2]" style="height:290px; width: 100%; margin-top: 10px;--el-card-padding: 5px;">
            <div id="js2">

            </div>
        </el-card>
        
        <el-card v-if="show[3]" style="height:290px; width: 100%; margin-top: 10px;--el-card-padding: 5px;">
            <div id="js3">

            </div>
        </el-card>
        <el-card v-if="show[4]" style="height:290px; width: 100%; margin-top: 10px;--el-card-padding: 5px;">
            <div id="js4">

            </div>
        </el-card>
    </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from 'vue'
    let show = ref([true,false,false,false,false])
    
    const {proxy} =  getCurrentInstance()
    proxy.bus.on('hello',(showIndex)=>{
        show.value.forEach((data,index) => {
            show.value[index] = false
            if (index == showIndex) {
                show.value[index] = true
            }
        });
	})

</script>

<style lang="less" scoped>

#js{    
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: center;
    #js1,#js2,#js3,#js4{    
        height:250px;
        border: 2px solid black;
        margin: 10px 10px 10px 10px;
    }
}
</style>