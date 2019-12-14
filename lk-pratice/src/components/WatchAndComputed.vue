<template>
  <div id="watchandComputeed">
       <h3>尝试计算的属性</h3>
        <label>加数1<input type="number" v-model="num1"/></label>
        <p></p>
        <div style="margin-left:80px;">+</div>
        <p></p>
        <label>加数2<input type="number" v-model="num2"/></label>
        <p></p>
        <label>总和:<input type="number" v-model="sum"/></label>
  </div>
</template>

<script>
export default {
   name:'WatchAndComputed',
   data(){
     return {
      num1:null,
      num2:null,
     }
   },
   computed:{
     // /* 如果一个属性是计算属性的话，就要在Vue提供的一个计算的钩子函数中定义例如：这里的sum */
     //这里写的是计算的属性
     /* 在computed里边自带的会有两个方法，1个是getter方法，另一个是setter方法。默认的会执行getter方法，
     1.计算属性，在vue计算属性这个钩子函数内部是以函数的形式体现的  形如：sum(){},
     也可以是以对象的形式出现的。上面那种写法是下面这种写法的简略写法 
      形如：sun:{
        //一个方法是get()方法
        get(){},
        //一个是setter方法
        set(){}, 这个方法是总和改变的时候，让其中的一个也跟着总和的价格改变, set方法会传出一个参数value,这个value就是计算属性中的值
      }
      */
     sum:{
       get(){
         return Number(this.num1) + Number(this.num2);
       },
       set(value){
        //  console.log(value);
         //只要绑定的那个sum值变化的时候，这个方法就会被触发。
         this.num1 = Number(value) - Number(this.num2);
       }
     }
   },

}
</script>

<style>

</style>