<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="Css.Crm.KMS.Web.Home" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" type="text/css" href="../Content/element-ui-212.css?v=1.1" />
    <link rel="stylesheet" type="text/css" href="../Content/reset.css?v=1.1" />
    <link rel="stylesheet" type="text/css" href="../Content/material-index.css?v=1.1" />
    <link rel="stylesheet" type="text/css" href="../Content/yqyOpenMenu.css?v=1.1"/>
   
    <title></title>
    
    <style type="text/css">
        .materials-tabTit-tabs .el-tabs__item {
            text-align: center;
            padding: 0;
            width: 150px;
        }

        .cell {
            font-size: 12px !important;
        }
    </style>
</head>
 <body>
  <div id="app">
       <div class="searhContainer">
      <div class="search_keywords">
          <el-input placeholder="请搜索关键字"  v-model="searchKeyWords">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearchClick"></i>
        </el-input>
      </div>
      <div class="search_directory">
          <el-select v-model="searchDirectory"  @change="handleSearchDirectorychange">
              <el-option value="" label="请选择"></el-option>
              <el-option value="1" label="当前目录"></el-option>
              <el-option value="2" label="当前目录及子目录"></el-option>
              <el-option value="3" label="所有目录"></el-option>
            </el-select>
      </div>
      <div class="search_tit">
          <el-select v-model="searchTit" placeholder="请选择" @change="handleSearchTitchange">
              <el-option value="" label="请选择"></el-option>
              <el-option value="1" label="标题搜索"></el-option>
              <el-option value="2" label="摘要搜索"></el-option>
              <el-option value="3" label="附录搜索"></el-option>
            </el-select>
      </div>
      
    </div>
    <el-row :gutter="20" style="margin: 0px auto;">
      <el-col :span="4">
        <div class="content" @contextmenu.prevent="handleContentBlankClick">
          <div class="content-title">
            <i class="el-icon-tickets icon-sign"></i><span class="content-txt">资料目录</span>
          </div>
          <div class="content-main">
            <el-tree :data="treeContent" :default-expanded-keys="expandedkeys" @node-expand="handleExpand" @node-collapse="handleCollapse" node-key="id" highlight-curren @node-click="handleNodeClick"
              :props="defalutProps" @node-contextmenu="handleNodeContextMenu">
                <span slot-scope="{ node, data }">
                <span>{{data.name}}</span>
                <span v-if="node.level!=1" style="margin-left:3px;color:#f00">{{data.quantity_expire==0||data.quantity_expire == null?'':data.quantity_expire}}</span>
              </span></el-tree>
          </div>
        </div>
      </el-col>

      <el-col :span="20" style="padding-right: 0px;">
        <div class="materials">
          <div class="materials-tabTit">
            <div class="materials-tabTit-tabs">
            <el-tabs v-model="sapcompanycode" @tab-click="handleTabsClick">
              <el-tab-pane label="家用空调" name="1122" ></el-tab-pane>
              <el-tab-pane label="中央空调" name="1120" ></el-tab-pane>
              <el-tab-pane label="厨房电器" name="1195" ></el-tab-pane>
            </el-tabs>
          </div>
            <div class="add-material" v-if="if_create_flag">
                   <i class="el-icon-plus" style="color: #0088ff; cursor: pointer; font-size: 12px;" @click="toNewAdd">新建资料</i>
            </div>
          </div>
          <!-- 表格容器 -->
          
          <div class="tableWrap">
            <el-table :data="tableData" height="86vh" >
              <el-table-column type="index" label="序号" width="60" align="center" sortable>
              </el-table-column>
              <el-table-column prop="competebrandname" width="80" label="品牌"  align="center" sortable>
                  
              </el-table-column>
              <el-table-column  label="标题" width="350"  align="center"  sortable header-align="center">
                  <template slot-scope="scope">
                     <div :title="scope.row.name" @click="handleCellClick(scope.row)"  style="color:#4088ff;cursor:pointer; ">{{scope.row.name.length>15?scope.row.name.substring(0,15)+'......':scope.row.name}}</div>
                  </template>
              </el-table-column>
              <el-table-column label="版本" align="center"  width="80" sortable>
                <template slot-scope="scope">
                  <div>v{{scope.row.current_version}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="owner_name" label="作者"     align="center" sortable>
              </el-table-column>
              <el-table-column prop="modifiedon" label="更新时间"    align="center" sortable>
              </el-table-column>
           <el-table-column  label="有效期"  width="150" align="center" sortable>
                  <template slot-scope="scope">
                      <div v-if="scope.row.isOutDate" style="background:#f00;border-radius:2px;">{{scope.row.validity_date}}</div>
                      <div v-else>{{scope.row.validity_date}}</div>
                    </template>
              </el-table-column>
              <el-table-column label="操作" align="left" width="200">
                <template slot-scope="scope">
                  <%--<el-button v-if="scope.row.If_edit_flag == 1" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>--%>
                    <i v-if="scope.row.If_edit_flag == 1" class="el-icon-edit" style="color: #0088ff; cursor: pointer;" @click="handleEdit(scope.row)">编辑</i>
                      <i v-if="scope.row.If_delete_flag == 1" class="el-icon-delete" style="color: #0088ff;margin-left: 5px; cursor: pointer;" @click="handleDelete(scope.$index, scope.row)">删除</i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
       <!-- 目录层提示对话框 -->
     <el-dialog title="提示" :visible.sync="createDriVisible"  custom-class="cdialogcss">
       <div class="tipContent">
            <div class="deletErrorMark-icon">!</div>
            <div class="deletErrorTxt">目录层数不能超过3级！</div>
       </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="createDriVisible=false">确 定</el-button>
        <el-button @click="createDriVisible = false">取 消</el-button>
      </span>
    </el-dialog>

          <!-- 删除资料提示对话框 -->
     <el-dialog title="删除提示" :visible.sync="deleMaterialVisible"  custom-class="cdialogcss">
       <div class="tipContent">
            <div class="deletErrorMark-icon">!</div>
            <div class="deletErrorTxt">确定删除该记录</div>
       </div>
      <span slot="footer" class="dialog-footer">
           <el-button type="primary" @click="cfmDeleMaterial">确 定</el-button>
        <el-button @click="deleMaterialVisible = false">取 消</el-button>
       
      </span>
    </el-dialog>

    <el-dialog title="重命名对话框" :visible.sync="reNameVisible"  custom-class="cdialogcss">
      <el-input v-model="reName"></el-input>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="cfmRename">确 定</el-button>
        <el-button @click="reNameVisible = false">取 消</el-button>
      
      </span>
    </el-dialog>
 
    <!-- 删除目录提示对话框 -->
    <el-dialog title="删除提示" :visible.sync="deleErrorVisible"  custom-class="cdialogcss">
       <div class="tipContent" v-if="deletError">
            <div class="deletErrorMark-icon">X</div>
            <div class="deletErrorTxt">请先移除该目录下的子目录以及资料</div>
       </div>
       <div class="tipContent" v-else>
          <div class="deletWranMark-icon" style="background-color:#ff9200;">!</div>
          <div class="deletErrorTxt">确认删除该目录</div>
       </div>
      <span slot="footer" class="dialog-footer">
           <el-button v-if="deletError" type="primary" @click="deleErrorVisible = false">确 定</el-button>
        <el-button v-else type="primary" @click="cfmDeleDir">确 定</el-button>
        <el-button @click="deleErrorVisible = false">取 消</el-button>
       
      </span>
    </el-dialog>
  </div>
</body>
  <script src="../Scripts/axios.min.js?v=1.1"></script>
  <script src="../Scripts/jquery.js?v=1.1"></script>
<script src="../Scripts/moment.min.js"></script>
  <script src="../Scripts/vue.js?v=1.1"></script>
  <script src="../Scripts/element-ui-212.js?v=1.1"></script>
  <script src="../Scripts/yqyOpenMenu.js?v=1.1"></script>
  <script src="../Scripts/material-index.js?v=1.1"></script>
</html>
