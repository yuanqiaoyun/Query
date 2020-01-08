<template>
  <div>
    <p>点击了{{count}}</p>
    <button @click="increment">增加</button>
    <button @click="decresement">减少</button>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
//上边的mapMutations拿到后，如果是属性就在computed钩子函数中展开。
// 如果是方法就在methods中展开。

/* 
从store中拿到count这个属性有两种方法，
1.这里采用的就是  在computed 中返回 通过$store这个对象来拿
 */
export default {
  name:'Counter',
  mounted(){
    console.log(this);
    console.log(this.$store);
  },
  computed:{
    count(){
      return  this.$store.state.count;
    }
  },
  methods:{
    ...mapMutations(['INCREMENT','DECREMENT']),
    increment(){
      // console.log('增加');
      this.INCREMENT();
    },
    decresement(){
      // console.log("减少");
      this.DECREMENT();
    },
  }
}
</script>

<style>

</style>