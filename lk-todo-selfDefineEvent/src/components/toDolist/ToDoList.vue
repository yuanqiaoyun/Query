<template>
  <ul id="todoList">
      <ToDoListItem 
      v-for="(todo,index) in todos" 
      :key=index
      :index="index"
      :todoKey="todo"
      :delTodo="delTodo">
      </ToDoListItem>
  </ul>
</template>

<script>
import  ToDoListItem  from  './ToDoList-item'
export default {
   name:'List',
   components:{
     ToDoListItem
   },
   props:{
       todos:Array,
       delTodo:Function,
   },
}
</script>

<style scoped>
  #todoList{
      border:1px solid #ddd;
      border-radius:3px;
      margin:10px 0;
  } 
</style>