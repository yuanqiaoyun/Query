import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export default new Vuex.Store({
  state:{
    /* 
    1.所有的数据都放在这里。并且是独立于所有的组件的。
     */
    count:0, 
  },
  mutations:{
    /* 
    操作state里边数据的唯一通道。
    2.这里面的方法一般都是大写。
     */
    INCREMENT(state){
      state.count++;
    },
    DECREMENT(state){
      state.count--;
    }
  },
  actions:{
    /* 
    对数据的异步操作是放在这里的。
     */
  },
})

/* const store = new Vuex.Store({
  state:{
    count:0,
  },
  mutations:{
    INCREMENT(state){
      state.count++;
    },
    DECREMENT(state){
      state.count--;
    }
  },
  actions:{},
});
export default store */
/* 
new Vux.Store 相当于是创建一个store的实例。
 */