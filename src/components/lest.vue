<template  >
    <div v-if="Object.keys(data1.data).length != 0" class="list">

        <div>
            <div>新增确诊</div>
            <div class="text">{{ data1.data.diseaseh5Shelf.chinaAdd.confirm }}</div>
        </div>
        <div>
            <div>本土新增加</div>
            <div class="text"> {{ data1.data.diseaseh5Shelf.chinaAdd.localConfirmH5 }}</div>
        </div>
        <div>
            <div>新增无症状</div>
            <div class="text">{{ data1.data.diseaseh5Shelf.chinaAdd.noInfect }}</div>
        </div>
        <div>
            <div>现有确诊</div>
            <div class="text">{{ data1.data.diseaseh5Shelf.chinaTotal.nowConfirm }}</div>
        </div>
        <div>
            <div>现有本土</div>
            <div class="text">{{ data1.data.diseaseh5Shelf.chinaTotal.localConfirm }}</div>
        </div>
        <div>
            <div>现有无症状</div>
            <div class="text">{{ data1.data.diseaseh5Shelf.chinaTotal.noInfect }}</div>
        </div>


        <div>

            <div>累计确诊</div>
            <div class="text">{{ data1.data.diseaseh5Shelf.chinaTotal.confirm }}</div>
            <div>较昨日{{ data1.data.diseaseh5Shelf.chinaTotal.confirmAdd }}</div>
        </div>
        <div>
            <div>累计境外</div>
            <div class="text">{{ data1.data.diseaseh5Shelf.chinaTotal.importedCase }}</div>
            <div>较昨日{{ data1.data.diseaseh5Shelf.chinaAdd.importedCase }}</div>
        </div>
        <div>
            <div>累计死亡</div>
            <div class="text">{{ data1.data.diseaseh5Shelf.chinaTotal.dead }}</div>
            <div>较昨日{{ data1.data.diseaseh5Shelf.chinaAdd.dead }}</div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref, inject, reactive } from "vue"
const data1: any = inject('propsa')


</script>

<style  scoped>
.text {
    color: #386C98;

}

.list {
    color: rgb(206, 206, 206);
    background-color: #192537;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 20px;
}

.list>div {

    padding: 3px;
    margin-top: 20px;
    width: 33%;
    box-sizing: border-box;
    background-color: #1E3655;
}

.list div {
    text-align: center;
    margin-top: 3px;

}

.top {
    display: flex;

    justify-content: space-around;
    width: 100%;


}
</style>