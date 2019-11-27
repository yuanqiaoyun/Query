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
    userId: '2FC6451A-6A73-E811-80C7-8BF578CAAADF', //用户ID
    materialId: 'F16C0144-C80C-EA11-80C9-DD15762E6A74', //资料id
    materialDetail: {},
    attachList: [], //资料附件问题

    checkedMaterials: [],
    allSelectMark: false,
    if_edit_flag: true
};

var materialView = new Vue({
    el: '#material_view',
    data: vueData,
    created() {
        this.getUrlId();
        this.getMaterialDetail();
    },
    methods: {
        //1.获取用户id
        getUserId() {
            $.ajax({
                url: "http://10.151.66.61:8099/api/Crm/GetCurrentUser",
                type: "get",
                success: function (res) {
                    vueData.userId = res.data.responseData.UserId;
                },
                error: function (err) {
                    app.$message({ message: "获取用户信息失败", type: 'error' });
                }
            });
        },
        //2. 获取路径中的参数
        getUrlId() {
            vueData.if_download = window.sessionStorage.getItem('If_download_flag');
            vueData.if_edit_flag = window.sessionStorage.getItem('If_edit_flag');
            vueData.materialId = window.sessionStorage.getItem('materialId');
            vueData.If_delete_flag = window.sessionStorage.getItem('If_delete_flag');
            vueData.If_author = window.sessionStorage.getItem('If_author');
            vueData.If_read_flag = window.sessionStorage.getItem('If_read_flag');

        },
        //3.获取资料详情内容
        getMaterialDetail() {
            var materialId = vueData.materialId;
            axios.get('http://10.151.66.61:8099/api/Material/GetItem?materialid=' + materialId + '').then(function (res) {
                console.log(res);
                vueData.materialDetail = res.data.responseData;
                vueData.attachList = res.data.responseData.material_attachment;
                if (vueData.attachList.length > 0) {
                    vueData.if_download = true;
                }
                else {
                    vueData.if_download = false;
                }
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
            const fileName = filename// 要导出的文件名，最后从url地址中截取出来
            if ('download' in document.createElement('a')) {
                const link = document.createElement('a') // 创建a标签
                link.download = fileName // a标签添加属性
                link.style.display = 'none'
                link.href = url//每个文件的url
                document.body.appendChild(link)
                link.click() // 执行下载
                URL.revokeObjectURL(link.href) // 释放url
                document.body.removeChild(link) // 释放标签
            } else { // 其他浏览器
            axios({ // 用axios发送get请求
                method: 'get',
                url: url,
                responseType: 'blob' // 表明返回服务器返回的数据类型
            }).then((res) => {
                const content = res.data
                const blob = new Blob([content]) // 构造一个blob对象来处理数据
                navigator.msSaveBlob(blob, fileName)
            })
            }
        },
        //6.批量下载
        downAll() {
            vueData.checkedMaterials.forEach(item => {
                window.open(item.attachment_url);
            })
        },
        //7.跳到编辑页面
        toEdit() {
            window.sessionStorage.setItem('materialId', vueData.materialId);
            window.sessionStorage.setItem('If_delete_flag', vueData.If_delete_flag);
            window.sessionStorage.setItem('If_edit_flag', vueData.If_edit_flag);
            window.sessionStorage.setItem('If_author', vueData.If_author);
            window.sessionStorage.setItem('If_read_flag', vueData.If_read_flag);
            window.sessionStorage.setItem('If_download_flag', vueData.If_download_flag);
            window.location.href = "EditForm.aspx";
        },
        //8.关闭
        toColse() {
            window.close();
        }

    },
})