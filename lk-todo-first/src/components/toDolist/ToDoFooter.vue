<template>
  <div id="footer" class="clear footer">
    <label>
      <input type="checkbox" v-model="isCheckAll"/>
    </label>
    <span class="footer-count">已完成{{finishedCount}}件/总共{{todos.length}}件</span>
    <button class="btn" @click="clearFinished">清除已完成的任务</button>
  </div>
</template>

<script>
export default {
  name: "ToDoFooter",
  props: {
    todos: Array,
    //这里隐藏这一个问题，一般子组件是不允许直接去改父组件的数据的，但是这里却改来，不过仅仅是为来练习而已。
    //因为你在子组件中点击来全选，意味着就要改变数据中的finished的值，而数据是在父组件中的。
    isSelectAll:Function,
    clearFinished:Function,
  },
  data() {
    return {};
  },
  //计算属性 已经完成和总计  随着增删改 这个属性会变，所以要有一个计算属性。
  computed:{
    finishedCount(){
      //默认调用get方法。
      return this.todos.reduce((total,todo)=>total+(todo.finished?1:0),0) 
      //0是reduce方法的默认初始值。以上简写等同于以下
      //1.this.todos.reduce(function(total,todo){},0);
      //2.function(total,todo){},就是调用reduce方法的数组(todos)中
      //   每一个元素{title:'1111',finished:fale}也就是todo,要执行的函数。
      //    函数的函数体是：total +0 或者total+1, 加0还是加1的区别就在于todo.finished是否是true
      //    最终计算的结果是redeuce方法返回出去的。
    },
    isCheckAll:{
      //get是别的值变化时候，让他怎么变化。
      //set是这个计算属性自己变化的时候也要引起别人的变化
      //这里如果只写来get方法的话就是所有选中的情况下它会选中，但是它选中上面的不会所有都选中。。
      get(){
          return this.finishedCount === this.todos.length;
      },
      set(value){
       this.isSelectAll(value);
      },
    }
  },
  methods:{
    // clearFinished(){
    //    this.clearFinished();
    // }  这里完全不用写什么东西,就直接在点击函数中调用传过来的方法就可以了。
  },

};
</script>

<style scoped>
.footer {
  margin-top: 25px;
  padding-left: 6px;
}
.clear::after {
  display: block;
  content: "";
  clear: both;
}
.btn {
  padding: 8px 10px;
  text-align: center;
  vertical-align: middle;
  background: orange;
  color: #fff;
  border-radius: 3px;
  float: right;
  line-height: 20px;
  border: none;
  outline: none;
  font-size: 16px;
  cursor: pointer;
}
.btn:hover {
  background: #f00;
}
.footer-count{
  margin-left:12px;
}
</style>