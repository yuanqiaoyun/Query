<template>
  <div id="lifeCircle">
      vue生命周期函数顺序和一般适用场景
      <p v-if="isShow">{{str1}}</p>
      <p v-else>{{str2}}</p>
      <button @click="destoryVue">销毁一个组件</button>
      <ul>
        
      </ul>
  </div>
</template>

<script>
export default {
   name:'LifeCircle',
   beforeCreate(){
     //1.在组件创建之前，在这一步的时候，data 和 methods还没有存在的
     console.log("1.beforeCreate");
   },
   data(){
     return {
          isShow:false,
          str1:'it like',
          str2:'like it',
     }
   },
   methods:{
     destoryVue(){
       this.$destroy();
     },
   },
   created(){
     //2.在这一步的时候，已经有了data 和methods， 请求数据一般在这里请求
     console.log("2.creatd");
   },
   beforeMount(){
     //3.开始编译开始真正的施行DOM 节点的时候
     console.log("3.beforeMount");
   },
   mounted(){
     //4.组件挂载完成
     console.log("4.mounted");
     /* 为了能够看到，在这里加一个定时器,但是注意  一旦开启一个定时器的时候，
     一定要记得在销毁组件之前把这个定时器也给销毁掉，因此会定一个变量等于这个定时器 ,然后在销毁组件之前把这个定时器给销毁掉*/
    this.intervalId =  setInterval(()=>{
       this.isShow = !this.isShow;
     },1000)
   },
   beforeUpdate(){
     //5.
     console.log("5.beforeUpdated");
   },
   updated(){
     console.log("6.updated");
   },
   beforDestroy(){
     //6。在组件毁灭之前
      console.log("7.beforDestory");
      clearInterval(this.intervalId);
   },
   destroyed(){
     //7组件毁灭之后
      console.log("8.destroyed");
   }

}
</script>

<style>

</style>