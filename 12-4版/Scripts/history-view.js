var vueData = {
    urlPramas: {
        id: '', //历史资料详情 2f2fc978-4712-ea11-80c9-dd15762e6a74
    },
    attachList: [],//从后端拿到的附件
    checkedAttach: [], //选中附件
    checkAll: "",
    matericalDetail: {},// 历史资料详情
};
var historyView = new Vue({
    el: '#history-view',
    data: vueData,
    created() {
        // 首先 获取u地址栏参数并转化成json对象,存放在data里边，用的时候只需要拿就好了。
        this.getUrlRequest();
        //根据蚕食去拿历史资料详情
        this.getHistoryMaterialDetail();
    },
    methods: {
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
        getHistoryMaterialDetail() {
            $.ajax({
                url: '/ISV/kms/api/Material/GetHistoryMaterial?id=' + vueData.urlPramas.id,
                type: 'get',
                success: function (res) {
                    if (res.responseStatus == "S") {
                        vueData.matericalDetail = res.responseData;
                        if (res.responseData.material_attachment) {
                            res.responseData.material_attachment.forEach(item => {
                                if (item.attachment_size > 1048576) {
                                    item.attachment_size = (item.attachment_size / 1048576).toFixed(2) + 'M';
                                } else {
                                    item.attachment_size = (item.attachment_size / 10124).toFixed(2) + 'kB';
                                }
                            })
                            vueData.attachList = res.responseData.material_attachment;
                        }
                    } else {
                        historyView.$message({ message: res.responseMsg, type: 'error' });
                    }
                },
                error: function (err) {
                    historyView.$message({ message: "获取历史版本详细信息失败", type: 'error' });
                }

            })
        },

        // 批量下载
        handleCheckGrup() {
            console.log(vueData.checkedAttach);
            if (vueData.checkedAttach.length >= vueData.attachList.length) {
                vueData.checkAll = true;
            } else {
                vueData.checkAll = false;
            }
        },
        downAll() {
            vueData.checkedMaterials.forEach(item => {
                window.open("../Download.aspx?filePath=" + item.attachment_url + "&fileName=" + item.attachment_name);
            })
        },
        handleCheckAllChange(value) {
            if (value) {
                vueData.checkedAttach = vueData.attachList;
            } else {
                vueData.checkedAttach = [];
                vueData.checkAll = false;
            }
        },
        handlePreview(item) {
            if (item.attachment_type == 'pdf' || item.attachment_type == 'txt' || item.attachment_type == 'jpg' || item.attachment_type == 'png' || item.attachment_type == 'jpeg') {
                window.open(item.attachment_url);
            }
            if (item.attachment_type.toLowerCase() == 'doc' || item.attachment_type.toLowerCase() == 'docx' || item.attachment_type.toLowerCase() == 'ppt' || item.attachment_type.toLowerCase() == 'pptx' || item.attachment_type.toLowerCase() == 'xls' || item.attachment_type.toLowerCase() == 'xlsx') {
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
                    materialView.$message({ message: "Office预览失败:", type: 'error' });
                });
            }
            if (item.attachment_type.toLowerCase() == 'avi' || item.attachment_type.toLowerCase() == 'mov' || item.attachment_type.toLowerCase() == 'rmvb' || item.attachment_type.toLowerCase() == 'rm' || item.attachment_type.toLowerCase() == 'flv' || item.attachment_type.toLowerCase() == 'mp4' || item.attachment_type.toLowerCase() == '3gp') {
                window.open("../PreVideo.aspx?url=" + item.attachment_url);
            }
            
        },
        handleDownload(item) {
            window.open("../Download.aspx?filePath=" + item.attachment_url + "&fileName=" + item.attachment_name);
        },
        toColse() {
            window.close();
        },

    },
})