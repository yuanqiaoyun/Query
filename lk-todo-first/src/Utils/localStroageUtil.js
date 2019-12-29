/* 
1.首先要暴露出去 export default
口语化语言（个人理解):其实是把里边的方法暴露出去
 */
const LK_TODO ="lk_todo";
export default{
  //在本情景中就是读和写两个操作。

  //1.读（去本地去拿取）
  readTodo(){
     return JSON.parse(localStorage.getItem(LK_TODO)||'[]');
     /* 
     取出来的数据有可能为空。所以要处理一下。
      */
  },
  //2.写（去改变storage中的值）;
  saveTodo(todos){
    /* 
    1.存的时候要把Json对象转换成字符串。
     */
    localStorage.setItem(LK_TODO,JSON.stringify(todos));
    console.log(todos);

  },
}