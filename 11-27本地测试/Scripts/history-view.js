var vueData={
  urlPramas:{
    id:'2f2fc978-4712-ea11-80c9-dd15762e6a74', //历史资料详情
  },
  attachList:[],//从后端拿到的附件
  checkedAttach:[], //选中附件
  checkAll:"",
  matericalDetail:[],// 历史资料详情
};
var historyView = new Vue({
  el: '#history-view',
  data: vueData,
  created(){
     // 首先 获取u地址栏参数并转化成json对象,存放在data里边，用的时候只需要拿就好了。
      this.getUrlRequest();
      //根据蚕食去拿历史资料详情
      this.getHistoryMaterialDetail();
  },
  methods:{
    // 获取URL 并转化成对象
    getUrlRequest() {       
      var theRequest = new Object(); 
          var url = window.location.search;  //获取url中"?"符后的字符串
      if (url.indexOf("?") != -1) {  
          var strs = url.substring(1).split("&");  
          for (var i = 0; i < strs.length; i++) {   
              theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);  
          } 
      } 
      vueData.urlPramas = theRequest;
    },
    //
    getHistoryMaterialDetail(){
      $.ajax({
        url:'http://10.151.66.61:8099/api/Material/GetHistoryMaterial?id='+vueData.urlPramas.id,
        type:'get',
        success:function(res){
          if(res.responseStatus == "S"){
            if(res.responseData.material_attachment){
              res.responseData.material_attachment.forEach(item=>{
                if(item.attachment_size>1048576){
                  item.attachment_size = (item.attachment_size/1048576).toFixed(2) +'M';
                }else{
                  item.attachment_size = (item.attachment_size/10124).toFixed(2) +'kB';
                }
              })
              vueData.attachList = res.responseData.material_attachment;
            }
          }else{
            alert(res.responseMsg);
          }
        },
        error:function(err){
          alert(err.responseMsg);
        }

      })
    },

    // 批量下载
    handleCheckGrup(){
      console.log(vueData.checkedAttach);
      if(vueData.checkedAttach.length>=vueData.attachList.length){
        vueData.checkAll = true;
      }else{
        vueData.checkAll = false;
      }
    },
    handleCheckAllChange(value){
      if(value){
        vueData.checkedAttach = vueData.attachList;
      }else{
        vueData.checkedAttach = [];
        vueData.checkAll = false;
      }
    },
    handlePreview(item){
      console.log(item);
      window.open(item.url);
    }

  },
})