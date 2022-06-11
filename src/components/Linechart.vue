<template>
<div class="linec">

</div>
</template>

<script lang="ts" setup>
import { ref,onMounted,reactive } from "vue" 
import * as echarts from "echarts";
import {  useCounterStore} from "../stores/counter";
const store=useCounterStore()
type arr= Array<{
    value:number,
    name:string
}>
let data:arr=reactive([{
    value:0,
    name:'默认'
}])

store.$subscribe((a:any,b)=>{
    if(a.events.key!='item') return
    let arr=a.events.newValue.slice(0,7)
 
    
    data= arr.map((v: any) => {
    return {
        value: v.total.confirm,
      name: v.name,
    }
  })
    mounteddata()
})
//渲染折线
const mounteddata=()=>{
        const charts=echarts.init(document.querySelector('.linec') as HTMLElement)
   const option = {

    title : {
        text: '各省确诊情况',
      
        subtext: '累计确诊'
    },
    tooltip : {
        trigger: 'axis'
    },
    // legend: {
    //     data:['意向','预购','成交']
    // },
   
    calculable : true,
    xAxis : [
        {
            type : 'category',
            
            boundaryGap : false,
            data : data.map((v)=>{
                return v.name
            })
        }
    ],
    yAxis : [
        {
            type : 'value',
            
        },
        
    ],
    series : [
        {
            name:'累计确诊',
            type:'line',
            
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: data.map((v)=>{
                return v.value
            })
        },
       
    ]
};
                    
    charts.setOption(option)
}
</script>

<style  scoped>
.linec{
    margin-top: 10px;
    width: 100%;

    
    height: 400px;
}
</style>