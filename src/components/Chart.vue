<template>
<div class="chart">
   
    <Lest></Lest>
    <Linechart></Linechart>
    <div class="yuan"></div>
    
</div>


</template>

<script lang="ts" setup>
import {ref} from "vue" 
import * as echarts from "echarts";
import { useCounterStore } from "../stores/counter";
import Lest from "./lest.vue";
import Linechart from "./Linechart.vue";

type arr= Array<{
    value:number,
    name:string
}>
let data:arr


let store=useCounterStore()     //引入pinia创库
//当创库time发生改变时，用于改变饼图转态
store.$subscribe((a:any,b)=>{
    if(a.events.key!='item') return
    let arr=a.events.newValue.slice(0,7)
    data= arr.map((v: any) => {
    return {
        value: v.total.confirm,
      name: v.name,
    }
  })
  console.log(a);
ac()
})
//渲染饼图
const ac=()=>{
         const charts=echarts.init(document.querySelector('.yuan') as HTMLElement)
      
    const option = {
       
        
    tooltip : {
        trigger: 'item',
    },

    
    calculable : true,
    series : [
        {
            barWidth:'100px',
            type:'pie',
            radius : ['20%', '60%'],
            itemStyle : {
                normal : {
                    label : {
                        show : true
                    },
                    labelLine : {
                        show : true
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        position : 'center',
                        textStyle : {
                            fontSize : '20',
                            fontWeight : 'bold'
                        }
                    }
                }
            },
            data:data
        }
    ]
}
 charts.setOption(option)
}




// type Props = {
 
//     propsa:Object

// }
// let abc=defineProps<Props>()
</script>

<style  scoped>

.item {
    width: 30%;
    height: 90px;
    background-color: red;
}
.chart{
    
    width: 31%;
   
   
}
.yuan{
    margin-top: -60px;
     width: 100%;
    height: 400px;
}
</style>