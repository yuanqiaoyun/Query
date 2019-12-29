<template>
  <div id="todo-head">
     <input  type="text" placeholder="请输入今天的任务清单" v-model="taskTitle" @keyup.enter="addItem"/>
  </div>
  <!--  在这里并没有用到射门组件，就是原生的html结合vue完成的 -->
</template>

<script>
export default {
  name:'ToDoHead',
  props:{
    addTodo:Function,
  },
  data(){
    return {
      taskTitle:'',
    }
  },
  methods:{
   //1.自己一开始写的。在这里没有加判断，而是在app.vue中加的判断
   //最好的方法应该是在这里就开始判断，完全处理好以后，再传给父组件。
    // addItem(){
    //   console.log(this.taskTitle);
    //   this.addTodo(this.taskTitle);
    //   this.taskTitle ="";
    // }
    addItem(){
      const  title = this.taskTitle.trim();//前后去空。
      if(!title){
        alert("输入内容不能为空");
        return;
      }
      let todo={title,finished:false}; //ES6的语法  ==== {title:title,finished:false}
      this.addTodo(todo);
      this.taskTitle = '';
    }
  },
}
</script>

<style scoped>
#todo-head input{
  width:560px;
  height:28px;
  border-radius:3px;
  padding:4px 7px;
  border:1px solid #ccc;
  outline:none;
  font-size:14px;
}
</style>