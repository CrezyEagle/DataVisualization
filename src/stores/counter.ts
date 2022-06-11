import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    item:[],
    list:<number[]>[],
    name:'',      //省份名
  }),
  getters: {
 
  },
  actions: {
    increment() {
  
    }
  }
})
