var vueData = {
    expandedkeys:[],//
    treeContent: [], //树形目录文件数据
    defalutProps: {
        // 树形渲染东西的条件
        children: "children",
        label: "name"
    },
    materialdirectoryid: "", //当前节点的目录的id
    sapcompanycode: "1122", //tab选中项
    userRole: true, //用户角色:根据角色来判断该用户是否可以调用右击快捷键 false or true
    userId: "2FC6451A-6A73-E811-80C7-8BF578CAAADF", //userId 用户角色 2FC6451A-6A73-E811-80C7-8BF578CAAADF
    if_create_flag: false,
    // tableData:[{
    //   upDate: '2016-05-02',
    //   brandName: '奥克斯',
    //   title:'上海市普陀区金沙江路 1518 弄',
    //   version:'1.0',
    //   author:'小王',
    //   deadLine:'2020-12-10',
    // }, {
    //   upDate: '2016-05-04',
    //   brandName: '美的',
    //   title:'上海市普陀区金沙江路金沙江路金沙江路金沙江路 1517 弄',
    //   version:'1.0.1',
    //   author:'小张',
    //   deadLine:'2022-12-10',
    // }, {
    //   upDate: '2016-05-01',
    //   brandName: '格力',
    //   title:'上海市普陀区金沙江路 1519 弄',
    //   version:'1.1',
    //   author:'小李',
    //   deadLine:'2019-12-10',
    // }, {
    //   upDate: '2016-05-03',
    //   brandName: '海尔',
    //   title:'上海市普陀区金沙江路 1516 弄',
    //   version:'1.2',
    //   author:'小照',
    //   deadLine:'2010-12-10',
    // }],
    tableData: [], //表格数据
    clickMark: false, // 默认在空白处点击
    reName: "",
    reNameVisible: false, //重命名函数
    curDataId: "",//当前点击节点的ID
    deleErrorVisible: false,  //删除错误提示对话框
    deletError: "", //删除对话框中显示内容
    selectedMateriald: "",
    selectedIndex: "",
    deleMaterialVisible:false,
};
var app = new Vue({
    el: "#app",
    data: vueData,
    created() {
        // this.getUserId();
        vueData.curDate = new Date();
        //获取目录文件
        this.getContentList();
        //获取资料文件
        this.getMaterialList();
    },
    methods: {
        //所有的点击函数和界面函数事件都放在这里  http://10.151.66.61:8099/api/Crm/GetCurrentUser
        //一进页面获取用户id，并根据用户ID 获取用户角色
        getUserId() {
            var that = app;
            $.ajax({
                url: "http://10.151.66.61:8099/api/Crm/GetCurrentUser",
                type: "get",
                success: function (res) {
                    vueData.userId = res.responseData.UserId;
                    app.getUserRole(res.responseData.UserId);
                },
                error: function (err) {
                    app.$message({ message: "获取用户信息失败", type: 'error' });
                }
            });
        },

        //资料内容创建权限  http://10.151.66.61:8099/api/Crm/GetCurrentUserRole?id=
        //获取用户角色
        getUserRole(userId) {
            var that = app;
            $.ajax({
                url:
                    "http://10.151.66.61:8099/api/Crm/GetCurrentUserRole?id=" +
                    userId +
                    "",
                type: "get",
                success: function (res) {
                    vueData.userRole = res.responseData.indexOf("资料库目录编辑")> -1 ? true:false;
                    vueData.if_create_flag = res.responseData.indexOf("资料内容创建权限") > -1 ? true:false;
                },
                error: function (err) {
                    app.$message({ message: "获取用户信息失败", type: 'error' });
                }
            });
        },
        //点击Tab事件的监听
        handleTabsClick(tab) {
            vueData.sapcompanycode = tab.name;
            this.getMaterialList();
        },
         //展开事件
         handleExpand(data, node, item) {
            vueData.expandedkeys.push(data.id);
        },
          //关闭事件
        handleCollapse(data, node, item) {
            vueData.expandedkeys.forEach((item, index) => {
                if (item == data.id) {
                    vueData.expandedkeys.splice(index, 1);
                }
            })
        },
        //2.获取目录文件数据  http://10.151.66.61:8099/api/Directory/GetDirctory
        getContentList() {
            axios
                .get("http://10.151.66.61:8099/api/Directory/GetDirctory")
                .then(function (res) {
                    console.log(res);
                    vueData.treeContent = res.data.responseData;
                    vueData.materialdirectoryid = res.data.responseData[0].id;
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        cfmDeleMaterial() {
            // http://10.151.66.61:8099/api/Material/DisabledMaterial?id=
            var userId = vueData.userId;
            vueData.tableData.splice(vueData.selectedIndex, 1);
            $.ajax({
                url:
                    "http://10.151.66.61:8099/api/Material/DisabledMaterial?id=" +
                    vueData.selectedMateriald +
                    "&userid=" +
                    userId +
                    "",
                type: "post",
                // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
                dataType: "json",
                success: function (res) {
                    app.getMaterialList();
                },
                error: function (err) {
                    app.$message({ message: err.statusText, type: 'error' });
                }
            });

        },
        //3.点击删除按钮
        handleDelete(index, row) {
            vueData.selectedIndex = index;
            vueData.selectedMateriald = row.id;
            vueData.deleMaterialVisible = true;
        },

        //4.树形节点点击刷新表格
        handleNodeClick(data, node, item) {
            // console.log("data",data);
            // console.log("本身",data.name);
            // console.log("父亲",node.parent.data.name);
            // console.log("爷爷",node.parent.parent.data.name);
            vueData.materialdirectoryid = data.id;
            vueData.expandedkeys.push(data.id);
            this.getMaterialList();
        },
        //4.1.树形节点右击事件
        handleNodeContextMenu(event, data, node) {
            console.log(event);
            var userRole = vueData.userRole;
            if (!userRole) {
                //没有找到 
                return;
            } else {
                vueData.clickMark = true;
                
                var left = event.pageX;
                var top = event.screenY - 800;
                yqyOpenMenu(vueData.clickMark, left, top, function (itemName) {
                    // console.log({ itemName });
                    //判断如果点击了删除执行什么函数,如果点击了删除执行什么函数
                    app.$options.methods.handleRightClick(
                        vueData.clickMark,
                        itemName,
                        data.id,
                        node.parent.data.id,
                        data.name
                    );
                });
            }

        },
        //4.2点击目录空白处右击事件
        handleContentBlankClick(event, data, node) {
            var userRole = vueData.userRole;
            if (!userRole) {
                return;
            } else {
                vueData.clickMark = false;
                var left = event.pageX;
                var top = event.pageY + 20;
                yqyOpenMenu(vueData.clickMark, left, top, function (actionName) {
                    app.$options.methods.handleRightClick(
                        vueData.clickMark,
                        actionName,
                        "",
                        ""
                    );
                });
            }
        },
        //5.获取表格资料的数据
        getMaterialList() {
            const compCode = vueData.sapcompanycode;
            const materialdirectoryid = vueData.materialdirectoryid;
            const userId = vueData.userId;
            axios
                .get(
                    "http://10.151.66.61:8099/api/Material/GetList?sapcompanycode=" +
                    compCode +
                    "&materialdirectoryid=" +
                    materialdirectoryid +
                    "&userid=" +
                    userId +
                    ""
                )
                .then(function (res) {
                    vueData.tableData = res.data.responseData;
                })
                .catch(function (err) {
                    console.log(err);
                });
        },

        //6.跳转到新建资料页面去  file:///D:/%E6%96%87%E6%A1%A3/AUX--All/11-26%20%E7%BB%88%E7%89%88/Pages/Materials/new-add-material.html 本地新建页面路径
        toNewAdd() {
            window.open("file:///D:/%E6%96%87%E6%A1%A3/AUX--All/11-26%20%E7%BB%88%E7%89%88/Pages/Materials/new-add-material.html?userid=" + vueData.userId + "&materialDirId=" + vueData.materialdirectoryid);
        },
        //7.处理右键点击的函数
        handleRightClick(clickMark, actionName, dataId, parentId, dataName) {
            var userRole = vueData.userRole;
            if (!userRole) { return; }
            else {
                console.log(actionName);
                if (clickMark) {
                    //在节点处点击 ---无论点击什么都是新增上方子目录还是下方子目录都是新建一级目录一级目录。下面写新建一级目录函数
                    switch (actionName) {
                        case "+新增目录":
                        case "新增同级目录":
                            //执行新建一级目录
                            console.log("新建一级目录");
                            this.addNewDir(parentId);
                            break;
                        case "重命名":
                            this.renameDir(dataId, dataName);
                            break;
                        case "删除":
                            this.deleteDir(dataId);
                            break;
                        case '+新增资料':
                            this.toNewAdd();
                            break;
                        case "新增子目录":
                            this.addNewDir(dataId);
                            break;
                        default:
                            return;
                    }
                } else {
                    switch (actionName) {
                        case "+新增目录":
                            this.addNewDir("");
                            break;
                        case "上方新增目录":
                        case "下方新增目录":
                        case "新增子目录":
                            //执行新建一级目录
                            this.addNewDir(parentId);
                            break;
                        case '+新增资料':
                            this.toNewAdd();
                            break;
                        case "重命名":
                        case "删除":
                            return;
                        default:
                            return;
                    }
                }
            }
        },
        //8.新建目录函数
        addNewDir(parentId) {
            var that = app;
            var userId = vueData.userId;
            that
                .$prompt("请输入目录名称", "新建目录", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                        })
                        //.then(
                //({ value }) => {
                //    if (value.action == "cancel") {
                //        return;
                //    }
                //}
                //).catch(err => {
                //    return;
                //})
                .then(function (value) {
                    console.log("value", value);
                    if (value.action == "cancel") {
                        return;
                    }
                    if (value.action == "confirm") {
                        $.ajax({
                            url: "http://10.151.66.61:8099/api/Directory/CreateDirectory",
                            type: "post",
                            // 设置的是请求参数
                            data: {
                                name: value.value,
                                parentid: parentId,
                                userid: userId
                            },
                            // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
                            dataType: "json",
                            success: function (res) {
                                // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
                                // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
                                // console.log(res);
                                app.getContentList();
                            },
                            error: function (err) {
                                app.$message({ message: err.statusText, type: 'error' });
                            }
                        });
                    }
                })
                .catch(function (err) {
                    return ;
                });
        },
        //9 删除目录
        deleteDir(dataId) {
            var that = app;
            var userId = vueData.userId;
            vueData.curDataId = dataId;
            //查询是否存在子目录以及资料
            $.ajax({
                url: 'http://10.151.66.61:8099/api/Directory/QueryDirectorySource?id=' + dataId + '',
                type: 'get',
                success: function (res) {
                    //
                    // console.log(res.responseData.if_has_material);
                    // console.log(res.responseData.if_has_child);
                    if (res.responseData.if_has_material || res.responseData.if_has_child) {
                        vueData.deletError = true;
                        vueData.deleErrorVisible = true;
                    } else {
                        // 就是没有子目录以及资料，弹出提示框
                        vueData.deletError = false;
                        vueData.deleErrorVisible = true;
                    }
                },
                error: function (err) {
                    app.$message({ message: "查询是否有子目录失败", type: 'error' });
                }
            })


        },
        //9-1 真正删除目录
        cfmDeleDir() {
            var dataId = vueData.curDataId;
            var userId = vueData.userId;
            $.ajax({
                url:
                    "http://10.151.66.61:8099/api/Directory/DeleteDirectory?id=" +
                    dataId +
                    "&userid=" +
                    userId +
                    "",
                type: "post",
                // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
                dataType: "json",
                success: function (res) {
                    // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
                    // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
                    // console.log(res);
                    vueData.deleErrorVisible = false;
                    app.getContentList();


                },
                error: function (err) {
                    app.$message({ message: err.statusText, type: 'error' });
                }
            });
        },

        //10 重命名目录名称
        renameDir(dataId, name) {
            vueData.reName = name;
            vueData.reNameVisible = true;
            vueData.curDataId = dataId;
         
        },
        //11确认重命名
        cfmRename() {
            var that = app;
            var dataId = vueData.curDataId;
            var name = vueData.reName;
            var userId = vueData.userId;
            $.ajax({
                url: "http://10.151.66.61:8099/api/Directory/RenameDirectory",
                type: "post",
                // 设置的是请求参数
                data: {
                    id: dataId,
                    name: name,
                    userid: userId
                },
                // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
                dataType: "json",
                success: function (res) {
                    // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
                    // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
                    // console.log(res);
                    vueData.reNameVisible = false;
                    app.getContentList();
                },
                error: function (err) {
                    app.$message({ message: err.statusText, type: 'error' });
                }
            });
        },
        handleCellClick(row, event, column) {
            window.sessionStorage.setItem('materialId', row.id);
            window.sessionStorage.setItem('If_delete_flag', row.If_delete_flag);
            window.sessionStorage.setItem('If_edit_flag', row.If_edit_flag);
            window.sessionStorage.setItem('If_author', row.If_author);
            window.sessionStorage.setItem('If_read_flag', row.If_read_flag);
            window.sessionStorage.setItem('If_download_flag', row.If_download_flag);
            window.open("file:///D:/%E6%96%87%E6%A1%A3/AUX--All/11-26%20%E7%BB%88%E7%89%88/Pages/Materials/material-view.html");
        },
        handleEdit(row) {
            window.sessionStorage.setItem('materialId', row.id);
            window.sessionStorage.setItem('If_delete_flag', row.If_delete_flag);
            window.sessionStorage.setItem('If_edit_flag', row.If_edit_flag);
            window.sessionStorage.setItem('If_author', row.If_author);
            window.sessionStorage.setItem('If_read_flag', row.If_read_flag);
            window.sessionStorage.setItem('If_download_flag', row.If_download_flag);
            // file:///D:/%E6%96%87%E6%A1%A3/AUX--All/11-26%20%E7%BB%88%E7%89%88/Pages/Materials/material-edit.html 编辑页面本地地址
            window.open("file:///D:/%E6%96%87%E6%A1%A3/AUX--All/11-26%20%E7%BB%88%E7%89%88/Pages/Materials/material-edit.html");
        }
    }
});

