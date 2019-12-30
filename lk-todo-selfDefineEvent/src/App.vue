<template>
  <div class="todo-container">
   <div class="todo-wrap">
       <ToDoHead ref="header"></ToDoHead>
       <ToDoList 
       :todos="todos"
       :delTodo="delTodo"></ToDoList>
       <ToDoFooter
       :todos="todos"
       :isSelectAll="isSelectAll"
       :clearFinished="clearFinished"></ToDoFooter>
   </div>
  </div>
</template>

<script>
// 引入组件
import ToDoHead from './components/toDolist/ToDoHead'
import ToDoList from './components/toDolist/ToDoList'
import ToDoFooter from './components/toDolist/ToDoFooter'

/* 
引入工具类。
 */
import localStroageUtil from './Utils/localStroageUtil';
export default {
  name: 'app',
  components: {
   ToDoHead,
   ToDoList,
   ToDoFooter
  },
   data(){
      return {
         /*  todos:[
              {
              title:"今天的学习内容是组件通信",
              finished:false,
          },
          {
              title:"还要学习一下其他的组件",
              finished:false,
          },
          {
              title:"早上要先收一下金币",
              finished:true,
          }
          ], 
          1.这里要去localstorage中去取。
          2.所以
          */
         todos:localStroageUtil.readTodo(),
      }
  },
  mounted(){
    //事件的监听一般都是放在这里的。
    /* 
     拿到监听的对象  header,通过$on监听，监听的是子组件传过来的addTodo,
     然后执行自己的本身的addTodo方法。这里不需要传参数，函数的传参机制会自动传过来。
     */
    this.$refs.header.$on("addTodo",this.addTodo)
  },
 
  methods:{
    //爷爷这里写来一个方法，要传给儿子，儿子再传给孙子，孙子才可以直接调用，
    delTodo(index){
      this.todos.splice(index,1);
    },
    //1.自己写的判断输入是否为空在父组件处理来，这是不合理的
    // addTodo(title){
    //   if(title){
    //   var obj ={
    //     title:title,
    //     finished:false,
    //   };
    //   this.todos.push(obj);
    //   }else{
    //     alert("输入任务名称不能为空");
    //   } 
    // }
    //2.应该直接接收的就是一个对象直接插入就好。
    addTodo(todo){
      this.todos.push(todo);
    },
    //是否全选
    isSelectAll(isCheckAll){
      this.todos.forEach((todo)=>{
        todo.finished = isCheckAll;
      })
    },
    clearFinished(){
      /* this.todos.forEach((todo,index)=>{
        if(todo.finished){
          this.todos.splice(index,1);
        }
      }) 
      
      这样写总是会留下一个删除不掉*/
     this.todos = this.todos.filter(todo=>!todo.finished);
    }

  },
  watch:{
    //监听数据todos的变化
    /* 
    1.监视什么属性或者什么数据，就写什么。
    2.deep:true or false。 true表示深度监视，
      若是对象数组的话，深度监视不仅能监听到数组的变化，还能监听到数组属性的值的变化。
    3.immediate:true  or false.  true一进来就会调用内部的handler 函数。
                                 false,只有监听到变化的时候才会执行这个函数里边的内容。
     */
    todos:{
      handler:localStroageUtil.saveTodo,
      //上边默认会把改变的todos传过去，所以也就写成了
      //handler:localStroageUtil.saveTodo(),
      deep:true,
      immediate:true,
    },
  }
}
</script>

<style>
.todo-container{
    width:600px;
    margin:0 auto;
}
/* 这个容器不给宽和高,全由内容自动撑起来 */
.todo-container .todo-wrap{
   padding:10px;
   border:1px solid #ddd;
   border-radius: 5px; 
}
</style>
