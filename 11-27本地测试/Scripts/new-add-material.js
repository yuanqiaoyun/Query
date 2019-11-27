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
    userId: '',//userId 用户角色
    prdtLines: [],
    brands: [],
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
        
    },
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
    fileList: [], //上传文件列表
    saveStatus: false, //是否保存
    closeVisible: false,
    saveVisible: false,
    materialId:"",
     
};
var newAdd = new Vue({
    el: '#newAdd',
    data: vueData,
    created() {
        vueData.userId = $.getUrlParam("userid");
        //获取目录
        this.getContentList();
        //获取产品线
        this.getprdtList();

        this.getCurTime();

        this.getMaterialContentUrl();
    },
    methods: {
        popDirecList() {
            vueData.contDialogVisible = true;
        },
        getMaterialContentUrl() {
            vueData.formData.directoryId = $.getUrlParam("materialDirId");
            if (vueData.formData.directoryId) {
                //调接口 获取到的而路径复制给formData.contentInDir;
                $.ajax({
                    url: 'http://10.151.66.61:8099/api/Directory/GetDirctoryByChildId?Id=' + vueData.formData.directoryId,
                    type: 'get',
                    success: function (res) {
                        vueData.formData.contentInDir = res.responseData;
                    },
                    error: function () {
                    },
                })
            } else {
                vueData.formData.contentInDir = "";
            }
        },
        getCurTime() {
            vueData.formData.deadline = moment().add(1, 'y').format("YYYY-MM-DD");
        },
        //2.获取目录文件数据
        getContentList() {
            axios.get('http://10.151.66.61:8099/api/Directory/GetDirctory').then(function (res) {
                vueData.treeContent = res.data.responseData;
            }).catch((function (err) {
                newAdd.$message({ message: err.statusText, type: 'error' });
            }))
        },
        //3.获取产品线
        getprdtList() {
            axios.get('http://10.151.66.61:8099/api/Basic/GetProductList').then(function (res) {
                vueData.prdtLines = res.data.responseData;
                vueData.formData.prdtLine = res.data.responseData[0].name;
                vueData.formData.prdtLineId = res.data.responseData[0].id;
                newAdd.$options.methods.getBrandsList(vueData.formData.prdtLineId);
            }).catch(function (err) {
                newAdd.$message({ message: "获取产品线失败", type: 'error' });
            });

        },
        //4.获取品牌
        getBrandsList(id) {
            axios.get('http://10.151.66.61:8099/api/Basic/GetBrandtList?productId=' + id + '').then(function (res) {
                vueData.brands = res.data.responseData;
                vueData.formData.brand = res.data.responseData[0].brand_name;
                vueData.formData.brand_no = res.data.responseData[0].brand_no;
            }).catch(function (err) {
                newAdd.$message({ message: "获取产品线失败", type: 'error' });
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
        handleSaveClick(formName) {
            var that = newAdd;
            that.$refs[formName].validate(function (valid) {
                //  console.log("表格valid",valid);
                if (valid) {
                    
                    $.ajax({
                        url: 'http://10.151.66.61:8099/api/Material/CreateMaterial',
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
                            vueData.materialId = res.responseData.id;
                            vueData.saveVisible = true;
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })
                    console.log(vueData.formData);
                } else {
                    console.log('error submit!!');
                    return that.$message({
                        message: '请将必填项填写完毕',
                        type: 'warning'
                    });
                }
            })
        },
        
        //9 文件上传
        handleFileChange(file, fileList) {
            console.log(file);
            vueData.fileList.push(file);
        },
        //上传到服务器
        upTosever(fileitem) {
            console.log("要上传的拿一箱", fileitem);
            var id = vueData.materialId;
            var userid = vueData.userId;

            var formData = new FormData();
            formData.append("uploadInput", fileitem.raw);
            formData.append("id", id);
            formData.append("userid", userid);
            $.ajax({
                url: 'http://10.151.66.61:8099/api/Material/UploadSingleMaterial', /*接口域名地址*/
                type: 'post',
                data: formData,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.responseStatus == "S") {
                        console.log(res.responseMsg);
                    }
                    else {
                        app.$message({ message: err.statusText, type: 'error' });
                    }
                },
                error: function (err) {
                    app.$message({ message: err.statusText, type: 'error' });
                }
            })
        },


        //删除服务器的操作
        deletMaterialAttach(index) {
            //  console.log(index);
            vueData.fileList.splice(index, 1);
        },

        //新增关闭提示
        cfmCloseDir() {
            vueData.closeVisible = false;
            window.close();
        },
        cfmSaveDir() {
            vueData.saveVisible = false;
            window.sessionStorage.setItem('materialId', vueData.materialId);
            window.sessionStorage.setItem('If_delete_flag', '1');
            window.sessionStorage.setItem('If_edit_flag', '1');
            window.sessionStorage.setItem('If_author', '1');
            window.sessionStorage.setItem('If_read_flag', '1');
            window.sessionStorage.setItem('If_download_flag', '1');
            // file:///D:/%E6%96%87%E6%A1%A3/AUX--All/11-26%20%E7%BB%88%E7%89%88/Pages/Materials/material-edit.html  本地编辑页面地址
            window.location.href = "file:///D:/%E6%96%87%E6%A1%A3/AUX--All/11-26%20%E7%BB%88%E7%89%88/Pages/Materials/material-edit.html";
        }
    }
})
