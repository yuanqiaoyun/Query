(function ($) {
    $.getUrlParam
        = function (name) {
            var reg
                = new RegExp("(^|&)" +
                    name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
})(jQuery);
const day =function(){
    var dayArr =[];
    for(i=1;i<32;i++){
        var obj ={};
       obj.label = i;
       obj.value = i;
       obj.isActive = false;
       dayArr.push(obj);
    }
    return dayArr;
};
const timeList = function(){
    var timeArr =[];
    for(i = 0 ;i<24;i++){
        var  hour ="";
        if(i<10){
            hour ="0" + i;
        }else{
            hour = i;
        }
        timeArr.push(hour +':00'); 
        timeArr.push(hour +':30'); 
    }
    return timeArr;
}

var vueData = {
    contDialogVisible: false,
    treeContent: [], //树形组件的数据
    defalutProps: {           // 树形渲染时对应配置和内容
        children: 'children',
        label: 'name',
    },
    userId: '2FC6451A-6A73-E811-80C7-8BF578CAAADF',//userId 用户角色
    prdtLines: [],
    brands: [],
    cur_version: '',// 当前资料版本
    fileList: [], //资料附件
    attachedList: [],
    formData: {
        contentInDir: '',
        prdtLine: '',//产品线
        brand: '',//品牌
        title: '',// 标题
        summary: '',//摘要
        directoryId: '', //记录
        prdtLineId: '',
        brand_no: '',
        deadline: '',
        bckenMaterialId: '',//  保存后后端返回的ID,
        if_edit_flag: null,
    },
    If_delete_flag: 0,
    If_edit_flag: 0,
    If_author: 0,
    If_read_flag: 0,
    If_download_flag: 0,
    closeVisible: false,
    rules: {
        contentInDir: [
            { required: true, message: '所在目录必填', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        prdtLine: [
            { required: true, message: '请选择生产线', trigger: 'blur' }
        ],
        brand: [
            { required: true, message: '请选择品牌', trigger: 'blur' }
        ],
        title: [
            { required: true, message: '资料标题必填，且长度不能超过50个字', trigger: 'blur', },
            { max: 50, message: '最多不能超过50个字', trigger: 'change', limit: true }
        ],
        summary: [
            { required: true, message: '摘要必填，且长度不能超过120个字', trigger: 'blur' },
            { max: 120, message: '最多不能超过120个字', trigger: 'change' }
        ],
    },
    materialId: '',  //资料id
    deleAttachVisible: false, //删除附件对话框的显示
    cur_attachmentId: '', //当前附件的ID
    deleMateriallVisible: false,//删除资料对话框的显示
    saveVisible:false,
    histstoryMaterialList:[],//历史版本资料


    // 权限角色变量
    viewAuthority:'',//查看的角色
    backViewAuthority:'',//后端查看最终选择值
    authorityVisible:false, //查看角色对话框
    userRoleList:[], //用户角色
    checkedroleList:[], //选择的用户角色
    userList:[],// 指定人
    checkAll:false, //用户角色是否全选
    downAuthority:'', //下载对话框
    editAuthority:'' ,//编辑角色对话框
    checkedUserList:[], //选择的指定用户列表

    // 提醒设置的变量
     frequencyType:1,// 从不，每周，每月,
     phone:'',
     frequencyList:[
         {
            type:1,
            label:'从不',
         },
         {
            type:2,
            label:'单次',
         },
         {
            type:3,
            label:'每周',
         },
         {
            type:4,
            label:'每月',
         },
     ],// 提醒设置供选的数组
    //  time:[
    //      {
    //         value:'00:00',
    //         label:'00:00',
    //      },
    //      {
    //         value:'00:30',
    //         label:'00:30',
    //      },
    //      {
    //         value:'01:00',
    //         label:'01:00',
    //      },
    //      {
    //         value:'01:30',
    //         label:'01:30',
    //      },
    //      {
    //         value:'02:00',
    //         label:'02:00',
    //      },
    //      {
    //         value:'02:30',
    //         label:'02:30',
    //      },
    //      {
    //         value:'03:00',
    //         label:'03:00',
    //      },
    //      {
    //         value:'04:00',
    //         label:'04:00',
    //      },
    //      {
    //         value:'04:30',
    //         label:'04:30',
    //      },
    //      {
    //         value:'05:30',
    //         label:'05:30',
    //      },
    //      {
    //         value:'06:00',
    //         label:'06:00',
    //      },
    //      {
    //         value:'06:30',
    //         label:'06:30',
    //      },
    //      {
    //         value:'07:00',
    //         label:'07:00',
    //      },
    //      {
    //         value:'07:30',
    //         label:'07:30',
    //      },
    //      {
    //         value:'08:00',
    //         label:'08:00',
    //      },
    //      {
    //         value:'08:30',
    //         label:'08:30',
    //      },
    //      {
    //         value:'09:00',
    //         label:'09:00',
    //      },
    //      { value:'09:30',label:'09:30',},
    //      {value:'10:00',label:'10:00',},
    //      {value:'10:30',label:'10:30',},
    //      {value:'11:00',label:'11:00',},
    //      {value:'11:30',label:'11:30',},
    //      {value:'12:00',label:'12:00',},
    //      {value:'12:30',label:'12:30',},
    //      {value:'13:00',label:'13:00',},
    //      {value:'13:30',label:'13:30',},
    //      {value:'14:00',label:'14:00',},
    //      {value:'14:30',label:'14:30',},
    //      {value:'15:00',label:'15:00',},
    //      {value:'15:30',label:'15:30',},
    //      {value:'16:00',label:'16:00',},
    //      {value:'16:30',label:'16:30',},
    //      {value:'17:00',label:'17:00',},
    //      {value:'17:30',label:'17:30',},
    //  ],
     time:timeList(),
     selectedtime:'08:30', //选择的时间，
     week:[
         {
             label:'星期一',
             value:'1',
             isActive:false,
         },
         {
            label:'星期二',
            value:'2',
            isActive:false,
        },
        {
            label:'星期三',
            value:'3',
            isActive:false,
        },
        {
            label:'星期四',
            value:'4',
            isActive:false,
        },
        {
            label:'星期五',
            value:'5',
            isActive:false,
        },
        {
            label:'星期六',
            value:'6',
            isActive:false,
        },
        {
            label:'星期日',
            value:'7',
            isActive:false,
        },
     ],
     selectedWeek:'',
     day:day(),
     selectedDay:'', //选择的天
     selectedDate:'2019-12-23' //单次选择的日期
};
var materialEdit = new Vue({
    el: '#materialEdit',
    data: vueData,
    created() {
        this.getUserId();
         //获取产品线
         this.getprdtList();
        //去session里边去取变量和值
        this.getSessionVariable();
        //获取历史版本列表
        this.getHistoryMaterial()
        //获取目录
        this.getContentList();
        //获取权限列表
        this.getPermissionsList();
        

    },
    methods: {
        popDirecList() {
            vueData.contDialogVisible = true;
        },
        //获取
        getRoleList(id,type){
            // vueData.userRoleList = [
            //     {name: "中心-财务", roleid: "91f1336a-2612-e911-80c6-ed6b9706ec83", if_select_flag: 0},
            //     {name: "客服-班长", roleid: "48800a11-1675-e811-80c7-822b5c0c59bf", if_select_flag: 0},
            //     {name: "CEO 业务经理", roleid: "14b3451a-6a73-e811-80c7-8bf578caaadf", if_select_flag: 0},
            //     {name: "村淘开单-杭州中心", roleid: "845bb4e0-ac4f-e911-80c3-d28c2016458e", if_select_flag: 0},
            //     {name: "总部-安装卡数据导出", roleid: "65747464-eb5c-e911-80c8-e19bf7584c50", if_select_flag: 0},
            //     {name: "监理主管", roleid: "2fc41c35-fccd-e811-80c5-c599a7045901", if_select_flag: 0},
            //     {name: "资料内容创建权限", roleid: "8712e90f-3f0c-ea11-80c9-dd15762e6a74", if_select_flag: 0},
            //     {name: "知识管理器", roleid: "bfba451a-6a73-e811-80c7-8bf578caaadf", if_select_flag: 0},
            //     {name: "外部电商-录单", roleid: "56d98bf0-e884-e811-80cb-f0709a5f128c", if_select_flag: 0},
            //     {name: "中心-网络", roleid: "1d78f83f-2e75-e811-80c7-822b5c0c59bf", if_select_flag: 0},
            //     {name: "中心-结算", roleid: "c702e612-3075-e811-80c7-822b5c0c59bf", if_select_flag: 0},
            //     {name: "集团-审计岗位", roleid: "e65c2d83-e017-e911-80c6-efa8542c74c4", if_select_flag: 0},
            //     {name: "中心-信息", roleid: "2fab8da5-2b75-e811-80c7-822b5c0c59bf", if_select_flag: 0},
            //     {name: "销售员", roleid: "ccb8451a-6a73-e811-80c7-8bf578caaadf", if_select_flag: 0},
            //     {name: "市场营销副总裁", roleid: "92a6451a-6a73-e811-80c7-8bf578caaadf", if_select_flag: 0},
            //     {name: "中心-商技术主管", roleid: "1b700131-44e6-e811-80c5-c599a7045901", if_select_flag: 0},
            //     {name: "中心-技术", roleid: "b7143f26-3775-e811-80c7-822b5c0c59bf", if_select_flag: 0},
            //     {name: "Support User", roleid: "abb5451a-6a73-e811-80c7-8bf578caaadf", if_select_flag: 0},
            //     {name: "结算-结算管理", roleid: "8f8fbe01-6b75-e811-80c7-822b5c0c59bf", if_select_flag: 0},
            //     {name: "服务仓库修改", roleid: "2a5a518b-c404-e911-80c3-d28c2016458e", if_select_flag: 0},
            //     {name: "客服-科长", roleid: "31a3c48c-f574-e811-80c7-822b5c0c59bf", if_select_flag: 0},
            //     {name: "代理", roleid: "acac451a-6a73-e811-80c7-8bf578caaadf", if_select_flag: 0}
            //      ] ;
            var url =''
         $.ajax({
             url:'http://10.151.66.61:8099/api/Crm/GetRoleList?id=a1e0c031-bb11-ea11-80c9-dd15762e6a74&&type=1',
             type:'get',
             success:function(res){
               if(res.responseStatus == 'S'){
                    vueData.userRoleList = res.responseData;
               }else{
                   alert(res.responseMsg);
               }
             },
             error:function(err){
                 alert("接口调用失败",err.Message);
             }

         })
        },
        //从session中去取值
        getSessionVariable() {
            vueData.materialId = window.sessionStorage.getItem('materialId');
            vueData.If_delete_flag = window.sessionStorage.getItem('If_delete_flag');
            vueData.If_edit_flag = window.sessionStorage.getItem('If_edit_flag');
            vueData.If_author = window.sessionStorage.getItem('If_author');
            vueData.If_read_flag = window.sessionStorage.getItem('If_read_flag');
            vueData.If_download_flag = window.sessionStorage.getItem('If_download_flag');
            //获取资料详情内容
            this.getMaterialDetail(vueData.materialId);
        },
        //获取历史版本列表
        // +vueData.materialId,
        getHistoryMaterial(){
          $.ajax({
              url:'http://10.151.66.61:8099/api/Material/GetHistoryMaterialList?id=6C08C23E-4C12-EA11-80C9-DD15762E6A74',
              type:'get',
              success:function(res){
                if(res.responseStatus == "S"){
                    vueData.histstoryMaterialList =  res.responseData;
                }else{
                    alert(res.responseMsg);
                }
              },
              error:function(err){
                  alert(err.responseMsg);
              }
          })
        },
     
        // 获取用户userID 
        getUserId() {
            $.ajax({
                url: "http://10.151.66.61:8099/api//Crm/GetCurrentUser",
                type: "get",
                success: function (res) {
                    vueData.userId = res.responseData.UserId;
                },
                error: function (err) {
                    materialEdit.$message({ message: "获取用户信息失败", type: 'error' });
                }
            });
        },
        //2.获取目录文件数据
        getContentList() {
            axios.get('http://10.151.66.61:8099/api//Directory/GetDirctory').then(function (res) {
                vueData.treeContent = res.data.responseData;
            }).catch((function (err) {
                console.log(err)
            }))
        },
        //3.获取产品线
        getprdtList() {
            axios.get('http://10.151.66.61:8099/api//Basic/GetProductList').then(function (res) {
                vueData.prdtLines = res.data.responseData;
                // vueData.formData.prdtLine = res.data.responseData[0].name;
                // vueData.formData.prdtLineId = res.data.responseData[0].id;
                // materialEdit.$options.methods.getBrandsList(vueData.formData.prdtLineId);
            }).catch(function (err) {
                console.log("获取产品线失败", err)
            });

        },
        //4.获取品牌
        getBrandsList(id) {
            axios.get('http://10.151.66.61:8099/api//Basic/GetBrandtList?productId=' + id + '').then(function (res) {
                vueData.brands = res.data.responseData;
                // vueData.formData.brand = res.data.responseData[0].brand_name;
                // vueData.formData.brand_no = res.data.responseData[0].brand_no;
            }).catch(function (err) {
                console.log("获取产品线失败", err)
            })
        },
        //5.产品线选项的变化
        handlePrdtLineChange(value) {
            vueData.formData.prdtLineId = value;
            this.getBrandsList(value);
        },
        handleBrandChange(value) {
            vueData.formData.brand_no = value;
        },
        //6.弹出目录节点点击
        handleNodeClick(data, node, component) {
            console.log("node", node);
            if (node.level == 1) {
                //只有一层
                // console.log("只有一层",node.data.name);
                vueData.formData.contentInDir = node.data.name;
                vueData.formData.directoryId = data.id;
            }
            if (node.level == 2) {
                // console.log("有且仅有两层",node.parent.data.name +'>'+ node.data.name);
                vueData.formData.contentInDir = node.parent.data.name + '>' + node.data.name;
                vueData.formData.directoryId = data.id;
            }
            if (node.level == 3) {
                // console.log("有三层",node.parent.parent.data.name +'>'+ node.parent.data.name + '>' + node.data.name);
                vueData.formData.contentInDir = node.parent.parent.data.name + '>' + node.parent.data.name + '>' + node.data.name;
                vueData.formData.directoryId = data.id;
            }
        },

        //7.点击保存按钮
        cfmSaveMaterial(formName) {
            var that = materialEdit;
            var phone = vueData.phone;  //电话
            var week = vueData.selectedWeek; //每周选择的周几
            var day = vueData.selectedDay;  //每月选择的天
            var date = vueData.selectedDate; //单次选择的日期。
            var timer = vueData.selectedtime;
            var prompt = vueData.frequencyType;
            var backPrompt = ""; //发送到后端的类型
            var backweek = ""; // f发送到后端的每周
            var backday ="";  //发送到后端的每月的多少号
            var backPhone = "";
            that.$refs[formName].validate(function (valid) {
                console.log("表格valid", valid);
                if (valid) {
                    if(prompt ==1){
                        backPrompt = 1;
                        backweek ="";
                        backday = "";
                        backPhone ="";
                    }
                    if(prompt == 2){
                         //单次
                        if(!phone){
                            alert("手机号不能为空");
                        }
                        if(!date){
                            alert("日期不能为空");
                        }
                        backPrompt = prompt;
                        backweek ="";
                        backday = date + timer;
                        backPhone = phone;
                    }
                    if(prompt == 3){
                        //每周
                        if(!phone){
                            return  materialEdit.$alert("手机号不能为空",'警告',{
                                confirmButtonText: '知道了',
                                showClose:false,
                                callback :action=>{
                                    return ;
                                }
                            })
                        };
                        if(!week){
                            return  materialEdit.$alert("请确认是周几",'警告',{
                                confirmButtonText: '知道了',
                                showClose:false,
                                callback :action=>{
                                    return ;
                                }
                            })
                        };
                        backPrompt = prompt;
                        backweek = week;
                        backday = "9999-12-31" + timer;
                        backPhone = phone;    
                    }
                    if(prompt == 4){
                        //每月
                        if(!phone){
                            // materialEdit.$message({ message: "手机号不能为空", type: 'error',duration:0 });
                          return  materialEdit.$alert("手机号不能为空",'警告',{
                                confirmButtonText: '知道了',
                                showClose:false,
                                callback :action=>{
                                    return ;
                                }
                            })
                        };
                        if(!day){
                            return  materialEdit.$alert("必须选哪一天",'警告',{
                                confirmButtonText: '知道了',
                                showClose:false,
                                callback :action=>{
                                    return ;
                                }
                            })
                        };
                        backPrompt = 4;
                        backweek ="";
                        backPhone = phone;
                        backday = "9999-12-"+ day + timer;
                        
                    }
                    else{
                        // + vueData.materialId
                        $.ajax({
                            url: 'http://10.151.66.61:8099/api//Material/UpdateMaterial?id=3b9718f0-4512-ea11-80c9-dd15762e6a74' ,
                            type: 'post',
                            data: {
                                "material_directoryid": vueData.formData.directoryId,
                                "name": vueData.formData.title,
                                "material_abstract": vueData.formData.summary,
                                "productgroupid": vueData.formData.prdtLineId,
                                "competebrand": vueData.formData.brand_no,
                                "validity_date": vueData.formData.deadline,
                                "prompt": backPrompt,
                                "week": backweek,
                                "day": backday,
                                "phone": backPhone,
                                "userid": vueData.userId
                            },
                            success: function (res) {
                                if (res.responseStatus != "S") {
                                    materialEdit.$message({ message: res.responseMsg, type: 'error' });
                                }else{
                                    vueData.saveVisible = true
                                }
                            },
                            error: function (err) {
                                materialEdit.$message({ message: err.statusText, type: 'error' });
                            }
                        })
                        console.log(vueData.formData);
                    }  
                } else {
                    vueData.saveVisible = false;
                    return that.$message({
                        message: '请将必填项填写完毕',
                        type: 'warning'
                    });
                }
            })
        },
        //8.根据后端返回的资料id qu 查询资料详情
        getMaterialDetail(materialId) {
            axios.get('http://10.151.66.61:8099/api/Material/GetItem?materialid=3b9718f0-4512-ea11-80c9-dd15762e6a74').then(function (res) {
                //  console.log(res.data.responseData);
                vueData.formData.directoryId = res.data.responseData.material_directoryid;
                vueData.formData.contentInDir = res.data.responseData.material_directory_name;
                vueData.formData.prdtLine = res.data.responseData.productgroupname;
                vueData.formData.brand = res.data.responseData.competebrandname;
                vueData.formData.title = res.data.responseData.name;
                vueData.formData.summary = res.data.responseData.material_abstract;
                vueData.formData.prdtLineId = res.data.responseData.productgroupid;
                vueData.formData.brand_no = res.data.responseData.competebrand;
                vueData.attachedList = res.data.responseData.material_attachment;
                vueData.cur_version = res.data.responseData.current_version;
                vueData.formData.deadline = res.data.responseData.validity_date;
            }).catch(function (err) {
                console.log("获取资料详情失败", err)
            })
        },
        //9 文件上传
        handleFileChange(file,fileList) {
            console.log(file);
           if(vueData.attachedList.length>0){
               //说明有已经上传的文件了
               vueData.attachedList.forEach(item=>{
                   if(item.attachment_name !==file.name){
                       vueData.fileList.push(file);
                   }else{
                    materialEdit.$alert('文件名已重复','提示',{});
                   }
               })
           }else{
               if(vueData.fileList.length <= 0){
                vueData.fileList.push(file);
               }else{
                  vueData.fileList.forEach(item=>{
                    if(item.name!==file.name){
                         vueData.fileList.push(file);
                    }else{
                        materialEdit.$alert('文件名已重复','提示',{
                        //    callback:action=>{
                        //        return ;
                        //    }  
                        });
                         }
                  }) 
               }
           }
        },
        //上传到服务器
        upTosever(index, fileitem) {
            var id = vueData.materialId;
            var userid = vueData.userId;
            var filename = fileitem.raw.name;
            var size = fileitem.raw.size;
            var lenarray = filename.split('.');
            var filetype = filename.split('.')[lenarray.length-1];
            var formData = new FormData();
            formData.append("uploadInput", fileitem.raw);
            formData.append("id", id);
            formData.append("userid", userid);
            formData.append("filename", filename);
            formData.append("size", size);
            formData.append("filetype", filetype);
            $.ajax({
                url: 'http://10.151.66.61:8099/api/Material/UploadSingleMaterial', /*接口域名地址*/
                type: 'post',
                data: formData,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.responseStatus == "S") {
                        materialEdit.$message({
                            message: res.responseMsg, type: 'success', customClass: 'uploadcss', iconClass: 'el-icon-success', center: true});
                        materialEdit.getMaterialDetail(vueData.materialId);

                        vueData.fileList.splice(index,1);
                    }
                    else {
                        materialEdit.$message({ message: res.responseMsg, type: 'error' });
                    }
                },
                error: function (err) {
                    materialEdit.$message({ message: err.statusText, type: 'error' });
                }
            })
        },
        //删除服务器的操作
        deletMaterialAttach(index) {
            //  console.log(index);
            vueData.fileList.splice(index, 1);
        },
        //deletMaterialAttached 删除已上传的附件
        handleDeletMaterialAttached(item) {
            console.log(item);
            vueData.deleAttachVisible = true;
            vueData.cur_attachmentId = item.attachment_id;
        },
        handDelClick() {
         
            $.ajax({
                url:
                    "http://10.151.66.61:8099/api/Material/DisabledMaterial?id=" +
                    vueData.materialId +
                    "&userid=" +
                    userId +
                    "",
                type: "post",
                // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
                dataType: "json",
                success: function (res) {
                    if (res.responseStatus == "S") {
                        vueData.deleMateriallVisible = false;
                    }
                    else {
                        materialEdit.$message({ message: res.responseMsg, type: 'error' });
                    }
                },
                error: function (err) {
                    materialEdit.$message({ message: err.statusText, type: 'error' });
                }
            });
        },
        cfmDeleAttach() {
            //调用删除已上传的附件
            $.ajax({
                url: 'http://10.151.66.61:8099/api//Material/DelSingleMaterial',
                type: 'post',
                data: {
                    attachment_id: vueData.cur_attachmentId,
                    userid: vueData.userId,
                },
                success: function (res) {
                    if (res.responseStatus == "S") {
                        vueData.deleAttachVisible = false;
                        materialEdit.getMaterialDetail(vueData.materialId);
                    }
                },
                error: function (err) {
                    materialEdit.$message({ message: err.statusText, type: 'error' });
                }
            });
        },

        cfmCloseDir() {
            vueData.closeVisible = false;
            window.close();
        },

        //权限设置代码
        // 获取设置权限内容
        // http://10.151.66.61:8099/api/Permissions/GetPermissionsList?id=6C08C23E-4C12-EA11-80C9-DD15762E6A74
        getPermissionsList(){
             $.ajax({
                 url:'http://10.151.66.61:8099/api/Permissions/GetPermissionsList?id=6C08C23E-4C12-EA11-80C9-DD15762E6A74',
                 type:'get',
                 success:function(res){
                    if(res.responseStatus == "S"){
                       //先保存一个查看的类型
                       vueData.viewAuthority = res.responseData[0].permissions_type;
                    }else{
                        alert(res.responseMsg);
                    }
                 },
                 error:function(err){
                     alert(err.responseMsg);
                 }
             })

        },
         //1.获取用户角色列表
         getUserRoleList(id,type){
             $.ajax({
                 url:'http://10.151.66.61:8099/api/Crm/GetRoleList?id='+id+'&type='+type ,
                 type:'get',
                 success:function(res){
                   if(res.responseStatus == "S"){
                       if(res.responseData.length>0){
                        res.responseData.forEach(item=>{
                            item.id = item.roleid;
                            if(item.if_select_flag == 0){
                                item.selected = false;
                               
                            }else{
                                item.selected = true;
                            }
                        })
                       }
                       vueData.userRoleList = res.responseData;
                       console.log(vueData.userRoleList);
                   }else{
                       alert("获取用户角色列表调用失败",res.responseMsg);
                   }
                 },
                 error:function(err){
                     alert("获取用户角色列表接口调用失败",err.responseMsg);
                 },
             })
         },
         //2.获取用户列表
         getUserList(id,type){
            $.ajax({
                url:'http://10.151.66.61:8099/api/Crm/GetUserList?id='+id+'&type='+type ,
                type:'get',
                success:function(res){
                  if(res.responseStatus == "S"){
                      if(res.responseData.length>0){
                       res.responseData.forEach(item=>{
                            item.id = item.userid;
                           if(item.if_select_flag == 0){
                               item.selected = false;
                           }else{
                            item.selected = true;
                           }
                       })
                      }
                      vueData.userList = res.responseData;
                      console.log(vueData.userList);
                  }else{
                      alert("获取用户列表调用失败",res.responseMsg);
                  }
                },
                error:function(err){
                    alert("获取用户列表接口调用失败",err.responseMsg);
                },
            })
        },
        // 监听查看角色变化的事件
        handleAuthorityChange(value){
            // var id = vueData.materialId;
            var id = '6C08C23E-4C12-EA11-80C9-DD15762E6A74';
            vueData.authorityVisible = true;
            vueData.viewAuthority = value;
           if(value==2){
               //指定角色
               this.getUserRoleList(id,1);
           }
           if(value == 3){
               //指定人
               this.getUserList(id,1);
           }
           
        },
        //监听查看角色取消
        handleCancelRolechange(){
            vueData.authorityVisible2 = false;
            vueData.viewAuthority ="";
        },
        //监听查看选择指定角色变化
        handleRoleChangeList(){
           if(vueData.checkedroleList.length>=vueData.userRoleList.length){
               vueData.checkAll = true;
           }else{
            vueData.checkAll = false;
           }
        },
        //监听查看全选点击变化
        handleCheckAll(value){
            if(value){
                vueData.userRoleList.forEach(item=>{
                    vueData.checkedroleList.push(item.id);
                })
            }else{
                vueData.checkedroleList = [];
            }
              
        },
        //仅作者和所有人查看确定函数
        hadnleViewAuthorityOkAll(){
            // POST /api/Permissions/SetPermissions
            //查看所有人和仅作者确定函数
            var id ="6C08C23E-4C12-EA11-80C9-DD15762E6A74";
            var permissions_type = vueData.viewAuthority;
            vueData.authorityVisible = false;
            $.ajax({
                url:'http://10.151.66.61:8099/api/Permissions/SetPermissions',
                type:'post',
                data:{
                        "id": id,
                        "type": "1",
                        "permissions_type": permissions_type,
                        "security_role": [],
                        "userid": []   
                },
                success:function(res){
                   if(res.responseStatus == "S"){
                       alert('权限修改成功');
                   }else{
                       alert(res.responseMsg);
                   }
                },
                error:function(err){
                    alert(err.responseMsg);
                }
            })
            
        },
        //跳转到历史版本记录中
        toHistoryView(historyId){
            window.open("file:///D:/%E6%96%87%E6%A1%A3/AUX--All/Query/11-27%E6%9C%AC%E5%9C%B0%E6%B5%8B%E8%AF%95/Pages/Materials/history-view.html?id=1111&url=2222");
        },
       //提醒设置JS
       handleDayClick(thisItem){
        //    console.log(thisItem);
        //    item.isActive = true;
         vueData.day.forEach(item=>{
            item.isActive = false;
            if(item.value == thisItem.value){
                thisItem.isActive = true;
                vueData.selectedDay = thisItem.value;
            }
        })
       },
       handleWeekClick(thisItem){
           vueData.week.forEach(item=>{
               item.isActive = false;
               if(item.value == thisItem.value){
                   thisItem.isActive = true;
                   vueData.selectedWeek  = thisItem.value ;
               }
           })
       },
        
    }
})