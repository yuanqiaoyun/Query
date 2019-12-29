<template>
  <div class="todo-container">
   <div class="todo-wrap">
       <ToDoHead :addTodo="addTodo"></ToDoHead>
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
import ToDoHead from './components/toDolist/ToDoHead'
import ToDoList from './components/toDolist/ToDoList'
import ToDoFooter from './components/toDolist/ToDoFooter'

export default {
  name: 'app',
  components: {
   ToDoHead,
   ToDoList,
   ToDoFooter
  },
  data(){
      return {
          todos:[
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
          taskTitle:"",
      }
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
