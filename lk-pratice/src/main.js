import Vue from 'vue'
import App from './App.vue'


//代表是否显示生产环境的信息,改为true的时候注意查看一下控制台的信息，
//阻止启动生产消息
Vue.config.productionTip = false;

//$mount 表示手动挂载，  $mount("#app") 手动挂载在id 为app 的组件上
// render 是new出来的Vue对象当中的一个函数
/* 
render: h => h(App),的演变过程

render  函数接收一个参数,最终把这个参数生成一个叫App的元素返回,（和上面导入的App对应）返回并挂载到app上面。只不过在这里 这个参数是个组件而已。演变的过程如下：
ES5 或者说原生的
render:function(params){
  return params(App);
}



然后ES6 
 render(params){
   return params(App);
 }
到
render(h){
  return h(App);
}
最后到箭头函数
render:h=>h(App)

*/
new Vue({
  render: h => h(App),
}).$mount('#app')
