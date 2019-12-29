<template>
  <li id="todoList-item" :style="{background:bgcolor}" 
  @mouseenter="dealBtnShow(true)"
  @mouseleave="dealBtnShow(false)">
    <label>
      <input type="checkbox" v-model="todoKey.finished"/>
      <span class="item-title">{{todoKey.title}}</span>
      <button class="btn-del" v-show="isShowBtn" @click="delItem">删除</button>
    </label>
</li>
</template>

<script>
export default {
    name:'Item',
    data(){
      return {
      bgcolor:"#fff",
      isShowBtn:false,  //这里鼠标悬浮时候的背景色和按钮的出现完全可以用CSS来实现
                        //这里主要练习动态绑定样式和vue的v-show指令
      }
    },
    props:{
      todoKey:Object,
      index:Number,//父组件传过来的index的值，子组件才能把这个值传给父组件，让父组件知道删除的是哪一个
      delTodo:Function,//从爷爷辈儿传过来的删除的方法。
    },
    methods:{
      dealBtnShow(isShowBtn){
        //控制那妞的显示和隐藏
        this.isShowBtn = isShowBtn;
        //背景颜色的改变
        this.bgcolor = isShowBtn ? '#ddd' : '#fff'; //要蹙额会使用三目运算符
      },
      delItem(){
       //子组件中删除只是执行一个删除的动作，真正的删除是在父组件中删除的，
      //这里不仅要向父组件中传，父组件还要再向上面传递一次。
      console.log(this.props);
      if(window.confirm(`您确定要删除${this.todoKey.title}这项任务吗？`)){
        this.delTodo(this.index);
      }
      }
      
    }

}
</script>

<style scoped>
 li {
     height:36px;
     line-height: 36px;
     border-bottom: 1px solid #ddd;
     padding:2px 4px;
     cursor:pointer;
 }
 li:hover .btn-del{
   display:block;
 }
 li:last-child{
     border-bottom: none;
 }
 .item-title{
     margin-left:5px;
 }
 .btn-del{
   float:right;
   margin-right:5px;
   padding:4px 6px;
   text-align: center;
   vertical-align: middle;
   outline:none;
   border-radius:3px;
   border:none;
   margin-top:5px;
   background:orange;
   display:none;
   color:#fff;
   cursor:pointer;
 }
</style>

