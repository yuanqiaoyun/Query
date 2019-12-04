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
    if_download: false,
    userId: '', //用户ID
    materialId: '', //资料id
    materialDetail: {},
    attachList: [], //资料附件问题
    histstoryMaterialList:[],
    checkedMaterials: [],
    allSelectMark: false,
    if_edit_flag: true
};

var materialView = new Vue({
    el: '#material_view',
    data: vueData,
    created() {
        this.getUserId();
        this.getUrlId();
        this.getMaterialDetail();
        //获取历史资料
        this.getHistoryMaterial();
    },
    methods: {
        //1.获取用户id
        getUserId() {
            $.ajax({
                url: "/ISV/kms/api/Crm/GetCurrentUser",
                type: "get",
                success: function (res) {
                    vueData.userId = res.responseData.UserId;
                },
                error: function (err) {
                    materialView.$message({ message: "获取用户信息失败", type: 'error' });
                }
            });
        },
        //2. 获取路径中的参数
        getUrlId() {
            vueData.If_download_flag = window.sessionStorage.getItem('If_download_flag') == "0" ? false : true;
            vueData.If_edit_flag = window.sessionStorage.getItem('If_edit_flag')=="0"?false:true;
            vueData.materialId = window.sessionStorage.getItem('materialId');
            vueData.If_delete_flag = window.sessionStorage.getItem('If_delete_flag') == "0" ? false : true;
            vueData.If_author = window.sessionStorage.getItem('If_author') == "0" ? false : true;
            vueData.If_read_flag = window.sessionStorage.getItem('If_read_flag') == "0" ? false : true;

        },
        //3.获取资料详情内容
        getMaterialDetail() {
            var materialId = vueData.materialId;
            axios.get('/ISV/kms/api/Material/GetItem?materialid=' + materialId + '').then(function (res) {
                console.log(res);
                vueData.materialDetail = res.data.responseData;
                vueData.attachList = res.data.responseData.material_attachment;
            }).catch(function (err) {
                // console.log("获取资料详情失败",err)
            })
        },
        //4.选择某一项值的变化
        handleCheckedMaterialsChange() {
            if (vueData.checkedMaterials.length >= vueData.attachList.length) {
                 vueData.allSelectMark = true;
            } else {
                 vueData.allSelectMark = false;
            }

        },
        handlerSelectedChk(value) {
            if (value) {
                    vueData.checkedMaterials = vueData.attachList;
            }
            else {
                vueData.checkedMaterials = [];
            }
        },
        //5.单个下载
        downloadSingle(url, filename) {
            window.open("../Download.aspx?filePath="+url + "&fileName=" + filename);
        },
        //6.批量下载
        downAll() {
            vueData.checkedMaterials.forEach(item => {
                window.open("../Download.aspx?filePath=" + item.attachment_url + "&fileName=" + item.attachment_name);
            })
        },
        toHistoryView(historyId) {
            window.open("HistoryView.aspx?id=" + historyId);
        },
        //7.跳到编辑页面
        toEdit() {
            $.ajax({
                url: "/ISV/kms/api/Material/GetMaterialState?id=" + vueData.materialId + "&userid=" + vueData.userId ,
                type: "post",
                success: function (res) {
                    if (res.responseStatus == "S") {
                        var if_edit_user = res.responseData.if_edit_user;
                        var if_edit_state = res.responseData.if_edit_state;
                        var edit_userid_name = res.responseData.edit_userid_name;
                        if (if_edit_state && !if_edit_user) {
                            materialView.$message({ message: "该资料处于编辑状态，编辑人为【" + edit_userid_name + "】", type: 'error' });
                        }
                        if (if_edit_state && if_edit_user) {//正在编辑、编辑人当前人
                            window.sessionStorage.setItem('materialId', vueData.materialId);
                            window.sessionStorage.setItem('If_delete_flag', vueData.If_delete_flag);
                            window.sessionStorage.setItem('If_edit_flag', vueData.If_edit_flag);
                            window.sessionStorage.setItem('If_author', vueData.If_author);
                            window.sessionStorage.setItem('If_read_flag', vueData.If_read_flag);
                            window.sessionStorage.setItem('If_download_flag', vueData.If_download_flag);
                            window.location.href = "EditForm.aspx";
                        }
                        if (!if_edit_state) {//未编辑
                            $.ajax({
                                url: "/ISV/kms/api/Material/UpdateMaterialState?id=" + vueData.materialId + "&userid=" + vueData.userId + "&if_edit_state=true",
                                type: "post",
                                success: function (res) {
                                    if (res.responseStatus == "S") {
                                        window.sessionStorage.setItem('materialId', vueData.materialId);
                                        window.sessionStorage.setItem('If_delete_flag', vueData.If_delete_flag);
                                        window.sessionStorage.setItem('If_edit_flag', vueData.If_edit_flag);
                                        window.sessionStorage.setItem('If_author', vueData.If_author);
                                        window.sessionStorage.setItem('If_read_flag', vueData.If_read_flag);
                                        window.sessionStorage.setItem('If_download_flag', vueData.If_download_flag);
                                        window.location.href = "EditForm.aspx";
                                    }
                                    else {
                                        materialView.$message({ message: "资料状态更新接口失败", type: 'error' });
                                    }
                                },
                                error: function (err) {
                                    materialView.$message({ message: "资料状态更新接口失败", type: 'error' });
                                }
                            });
                        }
                    }
                    else {
                        materialView.$message({ message: res.responseMsg , type: 'error' });
                    }
                },
                error: function (err) {
                    materialView.$message({ message: "资料状态查询接口失败", type: 'error' });
                }
            });
        },
        //8.关闭
        toColse() {
            window.close();
        },
        //video 预览
        videoPreView(url, filename, type) {
            window.open("../PreVideo.aspx?url="+url);
        },
        //office 预览
        officePreView(url, filename, type) {
            var e_url = encodeURI(url);
            e_url = e_url.replace('(', escape('(')).replace(')', escape(')'));

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://open.auxgroup.com/saas/odv/onlineView",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json;charset=UTF-8",
                    "User-Agent": "PostmanRuntime/7.19.0",
                    "Accept": "*/*",
                    "Cache-Control": "no-cache",
                    "Postman-Token": "f0ca6f3b-24d2-4c48-babb-698e30403c02,7724e33e-3891-4e96-952a-fd639320f699",
                    "Host": "open.auxgroup.com",
                    "Accept-Encoding": "gzip, deflate",
                    "Content-Length": "349",
                    "Cookie": "route=53da63d91be01c8c8d189971c93d3c73",
                    "Connection": "keep-alive",
                    "cache-control": "no-cache"
                },
                "data": JSON.stringify({
                    "sysCode": "fssc",
                    "docUrl": e_url,
                    "htmlName": filename,
                    "wmContent": "",
                    "fileNameExt": type,
                    "password": ""
                })
            };

            $.ajax(settings).done(function (res) {
                if (res.code == "00000") {
                    window.open(res.data);
                }
                else {
                    materialView.$message({ message: "Office预览失败:" + res.message, type: 'error' });
                }
            }).fail(function (data, status, xhr) {
                materialView.$message({ message: "Office预览失败:" , type: 'error' });
            });

         
        },
        getHistoryMaterial() {
            $.ajax({
                url: '/ISV/kms/api/Material/GetHistoryMaterialList?id=' + vueData.materialId,
                type: 'get',
                success: function (res) {
                    if (res.responseStatus == "S") {
                        vueData.histstoryMaterialList = res.responseData;
                    } else {
                        alert(res.responseMsg);
                    }
                },
                error: function (err) {
                    alert(err.responseMsg);
                }
            })
        }
    },
})