<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- tips:此处注意一点如果组件中注入的时候用的是驼峰式写法这里也可以用中划线的形式写一样的-->
     <!-- <watch-and-computed></watch-and-computed> -->
    <!-- <WatchAndComputed></WatchAndComputed> -->
   <LifeCircle></LifeCircle>
  </div>
</template>

<script>
/* 
1.想要在某一处使用一个组件，第一步：在使用的地方引入该组件.
(前提1:这个组件本身存在，第二个这个组件本身要暴露出来例如：在HelloWord组件中，要有export default) ;
*/
// import HelloWorld from './components/HelloWorld.vue'

// import WatchAndComputed from './components/WatchAndComputed'
import LifeCircle from './components/LifeCircle'

export default {
  name: 'app',
  //2.在使用处 注册组件。
  components: {
    // HelloWorld
    // WatchAndComputed
    LifeCircle
  }
}
</script>

<style>

</style>
