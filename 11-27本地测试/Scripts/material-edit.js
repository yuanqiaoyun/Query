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


    // 权限角色变量
    viewAuthority:'',//允许的角色
    authorityVisible:false,
    authorityVisible2:false, //指定角色对话框
    userRoleList:[],
    checkedroleList:[], //选择的用户角色
    userList:[],
    checkAll:false, //用户角色是否全选
    authorityVisible3:false,
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
        //获取目录
        this.getContentList();

        //获取用户角色列表
        this.getRoleList();
        

    },
    methods: {
        popDirecList() {
            vueData.contDialogVisible = true;
        },
        //获取
        getRoleList(){
         $.ajax({
             url:'http://10.151.66.61:8099/api/Crm/GetRoleList?id=a1e0c031-bb11-ea11-80c9-dd15762e6a74',
             type:'get',
             success:function(res){
               if(res.responseStatus == 'S'){
                    vueData.userRoleList = res.responseData;
               }else{
                   alert(res.responseMsg);
               }
             },
             error:function(err){
                 alert("接口调用失败",err);
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
            vueData.saveVisible = true
            var that = materialEdit;
            that.$refs[formName].validate(function (valid) {
                console.log("表格valid", valid);
                if (valid) {
                    $.ajax({
                        url: 'http://10.151.66.61:8099/api//Material/UpdateMaterial?id=' + vueData.materialId,
                        type: 'post',
                        data: {
                            "material_directoryid": vueData.formData.directoryId,
                            "name": vueData.formData.title,
                            "material_abstract": vueData.formData.summary,
                            "productgroupid": vueData.formData.prdtLineId,
                            "competebrand": vueData.formData.brand_no,
                            "validity_date": vueData.formData.deadline,
                            "prompt": "1",
                            "week": "",
                            "day": "",
                            "phone": "",
                            "userid": vueData.userId
                        },
                        success: function (res) {
                            if (res.responseStatus != "S") {
                                materialEdit.$message({ message: res.responseMsg, type: 'error' });
                            }
                        },
                        error: function (err) {
                            materialEdit.$message({ message: err.statusText, type: 'error' });
                        }
                    })
                    console.log(vueData.formData);
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
            axios.get('http://10.151.66.61:8099/api/Material/GetItem?materialid=' + materialId + '').then(function (res) {
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
        // 角色群权限设置
        handleAuthorityChange(value){
            //  vueData.authorityVisible2 = !vueData.authorityVisible2;
            console.log(value);
          if(value==1||value==4){
            vueData.authorityVisible = true;
          }
          if(value == 2){
              vueData.authorityVisible2 = !vueData.authorityVisible2;
          }
          
        },
        handleCancelRolechange(){
            vueData.authorityVisible2 = false;
            vueData.viewAuthority ="";
        },
        //监听选择指定角色变化
        handleRoleChangeList(){
           if(vueData.checkedroleList.length>=vueData.userRoleList.length){
               vueData.checkAll = true;
           }else{
            vueData.checkAll = false;
           }
        },
        //监听全选点击变化
        handleCheckAll(value){
            if(value){
                vueData.checkedroleList = vueData.userRoleList;
            }else{
                vueData.checkedroleList = [];
            }
              
        }
        
    }
})