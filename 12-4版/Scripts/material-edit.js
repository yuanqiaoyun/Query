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
const day = function () {
    var dayArr = [];
    for (i = 1; i < 32; i++) {
        var obj = {};
        obj.label = i;
        obj.value = i;
        obj.isActive = false;
        dayArr.push(obj);
    }
    return dayArr;
};
const timeList = function () {
    var timeArr = [];
    for (i = 0; i < 24; i++) {
        var hour = "";
        if (i < 10) {
            hour = "0" + i;
        } else {
            hour = i;
        }
        timeArr.push(hour + ':00');
        timeArr.push(hour + ':30');
    }
    return timeArr;
}
var vueData = {
    txtRoleValue: '',
    txtUserValue: '',
    viewAuthority: '',//查看
    dowloadAuthority: '',//下载
    backViewAuthority: '',//后端查看最终选择值
    authorityVisible: false, //查看角色对话框
    authorityVisibleUserSelect: false,
    authorityVisibleRoleSelect: false,
    userRoleList: [], //用户角色
    checkedroleList: [], //选择的用户角色
    userList: [],// 指定人
    checkUserAll: false, //用户是否全选
    checkRoleAll: false,//户角色是否全选
    downAuthority: '', //下载对话框
    editAuthority: '',//编辑角色对话框
    checkedUserList: [], //选择的指定用户列表
    selectType: '',//选择访问类型
    selectPermis: '',//选择权限类型
    contDialogVisible: false,
    treeContent: [], //树形组件的数据
    defalutProps: {           // 树形渲染时对应配置和内容
        children: 'children',
        label: 'name',
    },
    userId: '',//userId 用户角色
    prdtLines: [],
    brands: [],
    cur_version: '',// 当前资料版本
    fileList: [], //资料附件
    attachedList: [],
    histstoryMaterialList: [],
    contentInDirSelect: '',
    directoryIdSelect: '',
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
    saveVisible: false,
    saveUpVisible: false,
    delButtonVisible: false,
    txtVersionValue: 0,

    frequencyType: 1,// 从不，每周，每月,
    phone: '',
    frequencyList: [
        {
            type: 1,
            label: '从不',
        },
        {
            type: 2,
            label: '单次',
        },
        {
            type: 3,
            label: '每周',
        },
        {
            type: 4,
            label: '每月',
        },
    ],
    time: timeList(),
    selectedtime: '08:30', //选择的时间，
    week: [
        {
            label: '星期一',
            value: '1',
            isActive: false,
        },
        {
            label: '星期二',
            value: '2',
            isActive: false,
        },
        {
            label: '星期三',
            value: '3',
            isActive: false,
        },
        {
            label: '星期四',
            value: '4',
            isActive: false,
        },
        {
            label: '星期五',
            value: '5',
            isActive: false,
        },
        {
            label: '星期六',
            value: '6',
            isActive: false,
        },
        {
            label: '星期日',
            value: '7',
            isActive: false,
        },
    ],
    selectedWeek: '',
    day: day(),
    selectedDay: '', //选择的天
    selectedDate: '' //单次选择的日期
};
var materialEdit = new Vue({
    el: '#materialEdit',
    data: vueData,
    created() {
        this.getUserId();
        //去session里边去取变量和值
        this.getSessionVariable();
        //获取目录
        this.getContentList();
        //获取产品线
        this.getprdtList();
        //获取资料详情内容
        this.getMaterialDetail(vueData.materialId);
        //获取历史资料
        this.getHistoryMaterial();
        //获取权限数据
        this.getPermissionsList();
    },
    methods: {
        popDirecList() {
            vueData.contDialogVisible = true;
        },
        //从session中去取值
        getSessionVariable() {
            vueData.materialId = window.sessionStorage.getItem('materialId');
            vueData.If_download_flag = window.sessionStorage.getItem('If_download_flag') == "0" ? false : true;
            vueData.If_edit_flag = window.sessionStorage.getItem('If_edit_flag') == "0" ? false : true;
            vueData.If_delete_flag = window.sessionStorage.getItem('If_delete_flag') == "0" ? false : true;
            vueData.If_author = window.sessionStorage.getItem('If_author') == "0" ? false : true;
            vueData.If_read_flag = window.sessionStorage.getItem('If_read_flag') == "0" ? false : true;

            if (vueData.If_author) {
                vueData.delButtonVisible = true;
            }
            else {
                vueData.delButtonVisible = false;
            }
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
            }).catch(function (err) {
                console.log("获取产品线失败", err)
            });

        },
        //4.获取品牌
        getBrandsList(id) {
            axios.get('http://10.151.66.61:8099/api//Basic/GetBrandtList?productId=' + id + '').then(function (res) {
                vueData.brands = res.data.responseData;
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
                vueData.contentInDirSelect = node.data.name;
                vueData.directoryIdSelect = data.id;
            }
            if (node.level == 2) {
                // console.log("有且仅有两层",node.parent.data.name +'>'+ node.data.name);
                vueData.contentInDirSelect = node.parent.data.name + '>' + node.data.name;
                vueData.directoryIdSelect = data.id;
            }
            if (node.level == 3) {
                vueData.contentInDirSelect = node.parent.parent.data.name + '>' + node.parent.data.name + '>' + node.data.name;
                vueData.directoryIdSelect = data.id;
                // console.log("有三层",node.parent.parent.data.name +'>'+ node.parent.data.name + '>' + node.data.name);
            }
        },

        handleSelectDir() {
            vueData.formData.contentInDir = vueData.contentInDirSelect;
            vueData.formData.directoryId = vueData.directoryIdSelect;
            vueData.contDialogVisible = false;
        },
        //7.点击保存按钮
        cfmSaveMaterial(formName) {
            
            var phone = vueData.phone;  //电话
            var week = vueData.selectedWeek; //每周选择的周几
            var day = vueData.selectedDay;  //每月选择的天
            var date = vueData.selectedDate; //单次选择的日期。
            var timer = vueData.selectedtime;
            var prompt = vueData.frequencyType;
            var backPrompt = ""; //发送到后端的类型
            var backweek = ""; // f发送到后端的每周
            var backday = "";  //发送到后端的每月的多少号
            var backPhone = "";
            var that = materialEdit;
            that.$refs[formName].validate(function (valid) {
                console.log("表格valid", valid);
                if (prompt == 1) {
                    backPrompt = 1;
                    backweek = "";
                    backday = "";
                    backPhone = "";
                }
                if (prompt == 2) {
                    //单次
                    if (!phone) {
                        return materialEdit.$alert("手机号不能为空", '警告', {
                            confirmButtonText: '知道了',
                            showClose: false,
                            callback: action => {
                                return;
                            }
                        })
                    }
                    if (!date) {
                        return materialEdit.$alert("日期不能为空", '警告', {
                            confirmButtonText: '知道了',
                            showClose: false,
                            callback: action => {
                                return;
                            }
                        })
                    }
                    backPrompt = prompt;
                    backweek = "";
                    backday = date +" "+ timer;
                    backPhone = phone;
                }
                if (prompt == 3) {
                    //每周
                    if (!phone) {
                        return materialEdit.$alert("手机号不能为空", '警告', {
                            confirmButtonText: '知道了',
                            showClose: false,
                            callback: action => {
                                return;
                            }
                        })
                    };
                    if (!week) {
                        return materialEdit.$alert("请确认是周几", '警告', {
                            confirmButtonText: '知道了',
                            showClose: false,
                            callback: action => {
                                return;
                            }
                        })
                    };
                    backPrompt = prompt;
                    backweek = week;
                    backday = "9999-12-31 " + timer;
                    backPhone = phone;
                }
                if (prompt == 4) {
                    //每月
                    if (!phone) {
                        return materialEdit.$alert("手机号不能为空", '警告', {
                            confirmButtonText: '知道了',
                            showClose: false,
                            callback: action => {
                                return;
                            }
                        })
                    };
                    if (!day) {
                        return materialEdit.$alert("必须选哪一天", '警告', {
                            confirmButtonText: '知道了',
                            showClose: false,
                            callback: action => {
                                return;
                            }
                        })
                    };
                    backPrompt = 4;
                    backweek = "";
                    backPhone = phone;
                    backday = "9999-12-" + day +" "+ timer;
                }
                if(moment(vueData.formData.deadline).isBefore(curDate)){
                    return that.$message({
                        message: '保存失败,有效期不合格',
                        type: 'warning'
                    });
                }

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
                            "prompt": backPrompt,
                            "week": backweek,
                            "day": backday,
                            "phone": backPhone,
                            "userid": vueData.userId
                        },
                        success: function (res) {
                            if (res.responseStatus != "S") {
                                materialEdit.$message({ message: res.responseMsg, type: 'error' });
                            }
                            else {
                                vueData.saveVisible = true;
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
        btnSaveUpMaterial() {
            vueData.saveUpVisible = true;
            vueData.txtVersionValue = Number(vueData.cur_version) + 0.1;
        },
        //保存并升级版本
        cfmSaveUpMaterial(formName) {
            var phone = vueData.phone;  //电话
            var week = vueData.selectedWeek; //每周选择的周几
            var day = vueData.selectedDay;  //每月选择的天
            var date = vueData.selectedDate; //单次选择的日期。
            var timer = vueData.selectedtime;
            var prompt = vueData.frequencyType;
            var backPrompt = ""; //发送到后端的类型
            var backweek = ""; // f发送到后端的每周
            var backday = "";  //发送到后端的每月的多少号
            var backPhone = "";
          
            if (vueData.txtVersionValue == '' || vueData.txtVersionValue == '0') {
                materialEdit.$message({ message: '请输入升级版本号', type: 'error' });
            }
            else if (Number(vueData.txtVersionValue) <= Number(vueData.cur_version)) {
                materialEdit.$message({ message: '输入的升级版本号不能小于等于当前版本号', type: 'error' });
            }
            else {
                var that = materialEdit;
                that.$refs[formName].validate(function (valid) {
                    console.log("表格valid", valid);
                    if (prompt == 1) {
                        backPrompt = 1;
                        backweek = "";
                        backday = "";
                        backPhone = "";
                    }
                    if (prompt == 2) {
                        //单次
                        if (!phone) {
                            return materialEdit.$alert("手机号不能为空", '警告', {
                                confirmButtonText: '知道了',
                                showClose: false,
                                callback: action => {
                                    return;
                                }
                            })
                        }
                        if (!date) {
                            return materialEdit.$alert("日期不能为空", '警告', {
                                confirmButtonText: '知道了',
                                showClose: false,
                                callback: action => {
                                    return;
                                }
                            })
                        }
                        backPrompt = prompt;
                        backweek = "";
                        backday = date +" "+ timer;
                        backPhone = phone;
                    }
                    if (prompt == 3) {
                        //每周
                        if (!phone) {
                            return materialEdit.$alert("手机号不能为空", '警告', {
                                confirmButtonText: '知道了',
                                showClose: false,
                                callback: action => {
                                    return;
                                }
                            })
                        };
                        if (!week) {
                            return materialEdit.$alert("请确认是周几", '警告', {
                                confirmButtonText: '知道了',
                                showClose: false,
                                callback: action => {
                                    return;
                                }
                            })
                        };
                        backPrompt = prompt;
                        backweek = week;
                        backday = "9999-12-31 " + timer;
                        backPhone = phone;
                    }
                    if (prompt == 4) {
                        //每月
                        if (!phone) {
                            return materialEdit.$alert("手机号不能为空", '警告', {
                                confirmButtonText: '知道了',
                                showClose: false,
                                callback: action => {
                                    return;
                                }
                            })
                        };
                        if (!day) {
                            return materialEdit.$alert("必须选哪一天", '警告', {
                                confirmButtonText: '知道了',
                                showClose: false,
                                callback: action => {
                                    return;
                                }
                            })
                        };
                        backPrompt = 4;
                        backweek = "";
                        backPhone = phone;
                        backday = "9999-12-" + day +" "+ timer;
                    }

                    if (valid) {
                        $.ajax({
                            url: 'http://10.151.66.61:8099/api//Material/VersionUpgrade?', 
                            type: 'post',
                            data: {
                                "material_directoryid": vueData.formData.directoryId,
                                "name": vueData.formData.title,
                                "material_abstract": vueData.formData.summary,
                                "productgroupid": vueData.formData.prdtLineId,
                                "competebrand": vueData.formData.brand_no,
                                "current_version": vueData.txtVersionValue,
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
                                }
                                else {
                                    vueData.saveUpVisible = false
                                }
                            },
                            error: function (err) {
                                materialEdit.$message({ message: err.statusText, type: 'error' });
                            }
                        })
                        console.log(vueData.formData);
                    } else {
                        vueData.saveUpVisible = false
                        return that.$message({
                            message: '请将必填项填写完毕',
                            type: 'warning'
                        });
                    }
                })
            }
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

                vueData.frequencyType = res.data.responseData.prompt;
                if (vueData.frequencyType == 2) {//单次
                    vueData.phone = res.data.responseData.phone;
                    vueData.selectedDate = moment(res.data.responseData.day).format('YYYY-MM-DD');//$.getDateTodate(res.data.responseData.day);
                    vueData.selectedtime = moment(res.data.responseData.day).format('HH:mm');//$.getDateTotime(res.data.responseData.day);
                }
                if (vueData.frequencyType == 3) {//每周
                    vueData.phone = res.data.responseData.phone;
                    vueData.selectedWeek = res.data.responseData.week;
                    vueData.selectedtime = moment(res.data.responseData.day).format('HH:mm');//$.getDateTotime(res.data.responseData.day);
                        vueData.week.forEach((item, index) => {
                            if (item.value == res.data.responseData.week) {
                                item.isActive = true;
                            }
                        });

                    vueData.phone = res.data.responseData.phone;
                    vueData.selectedtime = moment(res.data.responseData.day).format('HH:mm');//$.getDateTotime(res.data.responseData.day);
                }
                if (vueData.frequencyType == 4) {//每月
                    vueData.phone = res.data.responseData.phone;
                    vueData.selectedDay = new Date(res.data.responseData.day).getDate();
                    vueData.selectedtime = moment(res.data.responseData.day).format('HH:mm');//$.getDateTotime(res.data.responseData.day);
                    vueData.day.forEach((item, index) => {
                        if (item.value ==vueData.selectedDay ) {
                            item.isActive = true;
                        }
                    });
                }
            }).catch(function (err) {
                    console.log("获取资料详情失败", err)
                })
        },
        //9 文件上传
        handleFileChange(file, fileList) {

            //说明有已经上传的文件了 小于1G
            var size = file.size / 1073741824;
            if (size > 1) {
                materialEdit.$alert('上传的文件不能大于1G', '提示', {});
            }
            else {
                var isExists = false;
                vueData.attachedList.forEach(item => {
                    if (item.attachment_name == file.name) {
                        isExists = true;
                    }
                });
                if (isExists) {
                    materialEdit.$alert('文件名已重复', '提示', {});
                } else {
                    var isUploadExists = false;
                    vueData.fileList.forEach(item => {
                        if (item.name == file.name) {
                            isUploadExists = true;
                        }
                    });
                    if (isUploadExists) {
                        materialEdit.$alert('文件名已重复', '提示', {});
                    }
                    else {
                        vueData.fileList.push(file);
                    }
                }
            }

        },
        //上传到服务器
        upTosever(index, fileitem, btnupload, txtupload) {
            $('#' + btnupload).hide();
            $('#' + txtupload).text("正在上传");

            var id = vueData.materialId;
            var userid = vueData.userId;
            var filename = fileitem.raw.name;
            var size = fileitem.raw.size;
            var lenarray = filename.split('.');
            var filetype = filename.split('.')[lenarray.length - 1];
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
                            message: res.responseMsg, type: 'success', customClass: 'uploadcss', iconClass: 'el-icon-success', center: true
                        });
                        materialEdit.getMaterialDetail(vueData.materialId);
                        vueData.fileList.splice(index, 1);
                    }
                    else {
                        $('#' + btnupload).show();
                        $('#' + txtupload).text("上传失败");
                        materialEdit.$message({ message: res.responseMsg, type: 'error' });
                    }
                },
                error: function (err) {
                    $('#' + btnupload).show();
                    $('#' + txtupload).text("上传失败");
                    materialEdit.$message({ message: err.statusText, type: 'error' });
                }
            })
        },
        //删除服务器的操作
        deletMaterialAttach(index) {
            vueData.fileList.splice(index, 1);
        },
        //deletMaterialAttached 删除已上传的附件
        handleDeletMaterialAttached(item) {
            vueData.deleAttachVisible = true;
            vueData.cur_attachmentId = item.attachment_id;
        },
        handDelClick() {

            $.ajax({
                url:
                    "http://10.151.66.61:8099/api/Material/DisabledMaterial?id=" +
                    vueData.materialId +
                    "&userid=" +
                    vueData.userId +
                    "",
                type: "post",
                // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
                dataType: "json",
                success: function (res) {
                    if (res.responseStatus == "S") {
                        vueData.deleMateriallVisible = false;
                        window.close();
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
                url: 'http://10.151.66.61:8099/api/Material/DelSingleMaterial',
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
        toHistoryView(historyId) {
            // window.open("HistoryView.aspx?id=" + historyId);
            window.open("file:///D:/%E6%96%87%E6%A1%A3/AUX--All/Query/12-4%E7%89%88/Pages/Materials/HistoryView.html?id=" + historyId);
        },
        saveClose() {
            saveVisible = false;
            window.close();
        },
        cfmCloseDir() {
            $.ajax({
                url: "http://10.151.66.61:8099/api/Material/UpdateMaterialState?id=" + vueData.materialId + "&userid=" + vueData.userId + "&if_edit_state=false",
                type: "post",
                success: function (res) {
                    if (res.responseStatus == "S") {
                        vueData.closeVisible = false;
                        window.close();
                    }
                    else {
                        materialEdit.$message({ message: "资料状态更新接口失败", type: 'error' });
                    }
                },
                error: function (err) {
                    materialEdit.$message({ message: "资料状态更新接口失败", type: 'error' });
                }
            });

        },
        getHistoryMaterial() {
            $.ajax({
                url: 'http://10.151.66.61:8099/api/Material/GetHistoryMaterialList?id=' + vueData.materialId,
                type: 'get',
                success: function (res) {
                    if (res.responseStatus == "S") {
                        vueData.histstoryMaterialList = res.responseData;
                    } else {
                        alert(res.responseMsg);
                        materialEdit.$message({ message: res.responseMsg, type: 'error' });
                    }
                },
                error: function (err) {
                    materialEdit.$message({ message: "获取历史资料数据失败", type: 'error' });
                }
            })
        },
        //权限设置代码
        // 获取设置权限内容

        getPermissionsList() {
            $.ajax({
                url: 'http://10.151.66.61:8099/api/Permissions/GetPermissionsList?id=' + vueData.materialId,
                type: 'get',
                success: function (res) {
                    if (res.responseStatus == "S") {
                        var type1 = false;
                        var type2 = false;
                        var type3 = false;
                        res.responseData.forEach((item, index) => {
                            if (item.type == 1) {
                                vueData.viewAuthority = item.permissions_type;
                                type1 = true;
                            }
                            if (item.type == 2) {
                                vueData.dowloadAuthority = item.permissions_type;
                                type2 = true;
                            }
                            if (item.type == 3) {
                                vueData.editAuthority = item.permissions_type;
                                type3 = true;
                            }
                            if (!type1) { vueData.viewAuthority = 4 }
                            if (!type2) { vueData.dowloadAuthority = 4 }
                            if (!type3) { vueData.editAuthority = 4 }

                        });

                    } else {
                        materialEdit.$message({ message: res.responseMsg, type: 'error' });
                    }
                },
                error: function (err) {
                    materialEdit.$message({ message: "设置权限内容失败", type: 'error' });
                }
            })

        },
        //1.获取用户角色列表
        getUserRoleList(id, type) {
            $.ajax({
                url: 'http://10.151.66.61:8099/api/Crm/GetRoleList?id=' + id + '&type=' + type + '&search=' + vueData.txtRoleValue,
                type: 'get',
                success: function (res) {
                    if (res.responseStatus == "S") {
                        if (res.responseData.length > 0) {
                            res.responseData.forEach(item => {
                                item.id = item.roleid;
                                if (item.if_select_flag == 1) {
                                    vueData.checkedroleList.push(item.id);
                                    item.selected = true;
                                } else {
                                    item.selected = false;
                                }
                            })
                        }
                        vueData.userRoleList = res.responseData;
                    } else {
                        materialEdit.$message({ message: res.responseMsg, type: 'error' });
                    }
                },
                error: function (err) {
                    materialEdit.$message({ message: "获取用户角色列表接口调用失败", type: 'error' });
                },
            })
        },
        //2.获取用户列表
        getUserList(id, type) {
            $.ajax({
                url: 'http://10.151.66.61:8099/api/Crm/GetUserList?id=' + id + '&type=' + type + '&search=' + vueData.txtUserValue,
                type: 'get',
                success: function (res) {
                    if (res.responseStatus == "S") {
                        if (res.responseData.length > 0) {
                            res.responseData.forEach(item => {
                                item.id = item.userid;
                                if (item.if_select_flag == 1) {
                                    item.selected = true;
                                    vueData.checkedUserList.push(item.id);
                                } else {
                                    item.selected = false;
                                }
                            })
                        }
                        vueData.userList = res.responseData;
                    } else {
                        materialEdit.$message({ message: res.responseMsg, type: 'error' });
                    }
                },
                error: function (err) {
                    materialEdit.$message({ message: "获取用户列表接口调用失败", type: 'error' });
                },
            })
        },

        // 监听权限选择的事件new_type 访问类型，new_permissions_type 权限类型
        //
        handleAuthorityChange(permis, type) {
            var id = vueData.materialId;
            vueData.selectPermis = permis;
            vueData.selectType = type;
            //仅作者、所有人
            if (permis == 1 || permis == 4) {
                vueData.authorityVisible = true;
            }

            if (permis == 2) {
                vueData.authorityVisibleRoleSelect = true;
                //指定角色
                this.getUserRoleList(id, type);
                //vueData.checkedroleList = [];
            }

            if (permis == 3) {
                vueData.authorityVisibleUserSelect = true;
                //指定人
                this.getUserList(id, type);
                //vueData.checkedUserList = [];
            }
            //查看
            if (type == 1) {
                //vueData.viewAuthority = permis;
            }
            //下载
            if (type == 2) {
                //vueData.dowloadAuthority = permis;
            }
            //type
            if (permis == 3) {
                //vueData.editAuthority = permis;
            }

        },
        //监听角色取消
        handleCancelRolechange() {
            vueData.authorityVisibleRoleSelect = false;
            vueData.checkedroleList = [];
            vueData.txtRoleValue = '';
            this.getUserRoleList(vueData.materialId, vueData.selectType);
        },
        //监听用户取消
        handleCancelUserchange() {
            vueData.authorityVisibleUserSelect = false;
            vueData.checkedUserList = [];
            vueData.txtUserValue = '';
            this.getUserList(vueData.materialId, vueData.selectType);
        },
        handleUserChangeList() {
            if (vueData.checkedUserList.length >= vueData.userList.length) {
                vueData.checkUserAll = true;
            } else {
                vueData.checkUserAll = false;
            }
        },
        //监听查看选择指定角色变化
        handleRoleChangeList() {
            if (vueData.checkedroleList.length >= vueData.userRoleList.length) {
                vueData.checkRoleAll = true;
            } else {
                vueData.checkRoleAll = false;
            }
        },
        //监听查看全选点击变化
        handleCheckRoleAll(value) {
            if (value) {
                vueData.checkedroleList = [];
                vueData.userRoleList.forEach(item => {
                    vueData.checkedroleList.push(item.id);
                })
            } else {
                vueData.checkedroleList = [];
            }
        },
        handleCheckUserkAll(value) {
            if (value) {
                vueData.checkedUserList = [];
                vueData.userList.forEach(item => {
                    vueData.checkedUserList.push(item.id);
                })
            } else {
                vueData.checkedUserList = [];
            }
        },
        //仅作者和所有人确定
        hadnleViewAuthorityOkAll() {
            //查看所有人和仅作者确定函数
            var id = vueData.materialId;
            vueData.authorityVisible = false;
            $.ajax({
                url: 'http://10.151.66.61:8099/api/Permissions/SetPermissions',
                type: 'post',
                data: {
                    "id": id,
                    "type": vueData.selectType,
                    "permissions_type": vueData.selectPermis,
                    "security_role": [],
                    "userid": []
                },
                success: function (res) {
                    if (res.responseStatus == "S") {
                        if (vueData.selectType == 1) {
                            vueData.viewAuthority = vueData.selectPermis;
                        }
                        if (vueData.selectType == 2) {
                            vueData.dowloadAuthority = vueData.selectPermis;
                        }
                        if (vueData.selectType == 3) {
                            vueData.editAuthority = vueData.selectPermis;
                        }

                    } else {
                        materialEdit.$message({ message: res.responseMsg, type: 'error' });
                    }
                },
                error: function (err) {
                    materialEdit.$message({ message: "权限修改失败", type: 'error' });
                }
            })
        },

        //用户和角色确定
        handleViewAuthorityOkRole() {
            var id = vueData.materialId;

            if (vueData.selectPermis == '2') {
                $.ajax({
                    url: 'http://10.151.66.61:8099/api/Permissions/SetPermissions',
                    type: 'post',
                    data: {
                        "id": id,
                        "type": vueData.selectType,
                        "permissions_type": vueData.selectPermis,
                        "security_role": vueData.checkedroleList,
                        "userid": []
                    },
                    success: function (res) {
                        if (res.responseStatus == "S") {
                            vueData.authorityVisibleRoleSelect = false;
                            vueData.checkedroleList = [];
                        } else {
                            materialEdit.$message({ message: res.responseMsg, type: 'error' });
                        }
                    },
                    error: function (err) {
                        materialEdit.$message({ message: "权限修改失败", type: 'error' });
                    }
                })
            }
            if (vueData.selectPermis == '3') {
                $.ajax({
                    url: 'http://10.151.66.61:8099/api/Permissions/SetPermissions',
                    type: 'post',
                    data: {
                        "id": id,
                        "type": vueData.selectType,
                        "permissions_type": vueData.selectPermis,
                        "security_role": [],
                        "userid": vueData.checkedUserList
                    },
                    success: function (res) {
                        if (res.responseStatus == "S") {
                            vueData.authorityVisibleUserSelect = false;
                            vueData.checkedUserList = [];
                        } else {
                            materialEdit.$message({ message: res.responseMsg, type: 'error' });
                        }
                    },
                    error: function (err) {
                        materialEdit.$message({ message: "权限修改失败", type: 'error' });
                    }
                })
            }
            if (vueData.selectType == 1) {
                vueData.viewAuthority = vueData.selectPermis;
            }
            if (vueData.selectType == 2) {
                vueData.dowloadAuthority = vueData.selectPermis;
            }
            if (vueData.selectType == 3) {
                vueData.editAuthority = vueData.selectPermis;
            }

        },
        ///取消 仅作者和所有人 弹出框
        handleViewCancel() {
            vueData.authorityVisible = false;
        },
        userSearch() {
            this.getUserList(vueData.materialId, vueData.selectType);
        },
        roleSearch() {
            this.getUserRoleList(vueData.materialId, vueData.selectType);
        },
        //提醒设置JS
        handleDayClick(thisItem) {
            //    console.log(thisItem);
            //    item.isActive = true;
            vueData.day.forEach(item => {
                item.isActive = false;
                if (item.value == thisItem.value) {
                    thisItem.isActive = true;
                    vueData.selectedDay = thisItem.value;
                }
            })
        },
        handleWeekClick(thisItem) {
            vueData.week.forEach(item => {
                item.isActive = false;
                if (item.value == thisItem.value) {
                    thisItem.isActive = true;
                    vueData.selectedWeek = thisItem.value;
                }
            })
        },
        //选择日期变化
        hadnldeDatePickChange(value){
            console.log(value);
            var curDate = moment().format("YYYY-MM-DD");
            if(moment(value).isBefore(curDate)){
             this.$message({
                 message: '选择的日期无效',
                 type: 'warning',
                 customClass: 'errormsgcss'
               });
            };
            vueData.formData.deadline = value;
         }

    }
})