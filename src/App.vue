<template>
  <div class="app">
    <charta :propsa="propsa"></charta>
    <div class="china"></div>
    <el-table  :data="store.item" border :header-cell-style="headerRowStyle" :row-style="aab" style="width: 30%;overflow: auto; "  max-height="100%">
      <el-table-column prop="name" :label="getprovince" width="150" />
      <el-table-column prop="today.confirm" label="新增确诊" width="110" />
      <el-table-column prop="total.confirm" label="累计确诊" width="110"/>
      <el-table-column prop="total.heal" label="治愈" width="110" />
      <el-table-column  prop="total.dead" label="死亡" width="110"/>
    </el-table>
    
  </div>

<!-- 
  <el-row class="mb-4">

    <el-button type="round">Primary</el-button>

  </el-row>

  <div class="dashed aac"></div> -->
</template>

<script lang="ts" setup>
import { ref, onMounted,reactive,provide,computed } from "vue"
import * as echarts from "echarts";
import "./assets/china.js"

import { geoCoordMap } from "./assets/geoMap";
import axios from "axios";
import { useCounterStore } from "./stores/counter";
import charta from "./components/Chart.vue";
const styl="background-color: #1E3655;"
const store = useCounterStore()
//获取新冠疫情消息
let aaaa:any
let propsa=reactive<{data:Object}>({data:{}})
onMounted(async () => {
  aaaa = await axios({
    url: 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf',
    method: 'GET'
  })
  //当获取到数据后调用
  initChaina(aaaa)
  
  propsa.data=aaaa.data.data

})
//爷孙传参
 provide('propsa',propsa)
//地图渲染
 const initChaina = (aaaa: any) => {

  let chinaname = aaaa.data.data.diseaseh5Shelf.areaTree[0].children
  const data: any = chinaname.map((v: any) => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children
    }
  })
 
  //表格、饼图、曲线图默认展示
  store.name=chinaname[2].name
  store.item = chinaname[2].children

  //插入的节点
  const charts = echarts.init(document.querySelector('.china') as HTMLElement)
  //echarts地图配置项
  var option = {
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        //  normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        // },

      },
      emphasis: {
        areaColor: "#0f5d9d",
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            //normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            //},
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: [45, 45],
        label: {
          show: true,
          color: "#fff",
          formatter(value: any) {
            return value.data.value[2]
          }
        },
        itemStyle: {
          color: '#1E90FF', //标志颜色
        },
        data: data,
      },
    ],
  }
  //点击地图后更新表格、饼图、曲线图
  charts.on('click', (e: any) => {
     store.name=e.data.name
    store.item = e.data.children
   
   
  })
  //将echarts配置放入进去
  charts.setOption(option)
}

//饿了么表单头部样式设置
const headerRowStyle = (args:any) => {
  return {
    color: 'rgb(206, 206, 206)',
    backgroundColor: '#0C3653'
  }
}
//饿了么表单单元格样式设置
const aab=()=>{
  return{
    color:'rgb(206, 206, 206)',
    backgroundColor: '#1E3655'
  }
}
//返回省份名称
 const getprovince =computed(()=>{
  return  store.name+'(省)'
})
</script>

<style  scoped>


.app {
  display: flex;
  padding-bottom: 40px;
  width: 100%;
  height: calc(100vh);
  /* position: absolute; */
  justify-content: space-between;
  background-image: url(./assets/图片/1.jpg);
  background-repeat: no-repeat;
  background-size: 100%;

}

.china {
  width: 35%;
  height: 700px;
  margin-top: 120px;
}

.aac {
  width: 100px;
  height: 100px;
  border-top: 2px dashed var(--el-border-color);
  box-shadow: var(--el-box-shadow);

}

</style>