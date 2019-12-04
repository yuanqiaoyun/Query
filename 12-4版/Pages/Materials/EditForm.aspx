<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EditForm.aspx.cs" Inherits="Css.Crm.KMS.Web.Pages.Materials.EditForm" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    
    <title></title>
  <link rel="stylesheet" href="../../Content/element-ui.css?v=1.1" />
  <link rel="stylesheet" href="../../Content/reset.css?v=1.1"/>
  <link rel="stylesheet" href="../../Content/new-add-material.css?v=1.1"/>
    <link href="../../Content/material-edit.css?v=1.1" rel="stylesheet" />
</head>
<body>
  <div id="materialEdit">
    <el-row :gutter="20" style="margin-right:0px; margin-top: 10px;">
      <el-col :span="18" style="padding-left: 20px;padding-right: 0px;">
        <el-form :model="formData" :rules="rules" ref="formData" status-icon>
          <div class="fmAction">
              <i class="el-icon-document" style="color: #0088ff; cursor: pointer; font-size: 12px;margin-left: 10px;" @click="cfmSaveMaterial('formData')">保存</i>
              <i class="el-icon-document" style="color: #0088ff; cursor: pointer; font-size: 12px;margin-left: 10px;" @click="btnSaveUpMaterial">保存并升级</i>
              <i  v-if="delButtonVisible"  class="el-icon-delete" style="color: #0088ff; cursor: pointer; font-size: 12px;margin-left: 10px;" @click="deleMateriallVisible=true">删除</i>
              <i class="el-icon-close" style="color: #0088ff; cursor: pointer; font-size: 12px;margin-left: 10px;" @click="closeVisible=true">关闭</i>
          </div>
          <div class="form-item-container-yqy">
          <el-form-item label="目录" prop="contentInDir">
            <el-input placeholder="目录" v-model="formData.contentInDir" disabled class="inPcontent">
              <i slot="suffix" class=" el-icon-folder-opened" v-on:click="popDirecList"></i>
            </el-input>
          </el-form-item>
          <el-row>
            <el-col :span="6">
              <el-form-item label="产品线" prop="prdtLine">
                <el-select v-model="formData.prdtLine" @change="handlePrdtLineChange">
                  <el-option v-for="item in prdtLines" :key="item.id" :value="item.id"
                    :label="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="品牌" prop="brand">
                <el-select v-model="formData.brand" @change="handleBrandChange">
                  <el-option v-for="item in brands" :key="item.brand_no" :value="item.brand_no"
                    :label="item.brand_name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title" maxlength=50></el-input>
          </el-form-item>
          <el-form-item label="摘要" prop="summary">
            <el-input type="textarea" :rows="5" v-model="formData.summary" maxlength=120 ></el-input>
          </el-form-item>
        </div>
        </el-form>
        <div id="material-upload-wrapper" style="    padding:0px 30px 30px 40px;">
          <div class="material-upload_top">资料</div>
          <el-upload class="upload-container"
             ref="upload" 
            action="/ISV/kms/api/Material/UploadSingleMaterial"
            :http-request = "upTosever"
            :auto-upload="false"
            :on-change = "handleFileChange"
            :show-file-list="false">
           <i class="el-icon-folder-opened  upload-txt"  style="color:#0088ff" slot="trigger">上传资料&lt;1G</i>
                 <ul class="fileList-container">
             <li class="fileList-item" v-for="(fitem,index) in fileList">
              <div class="fileList-item-info">
                <img v-if="fitem.raw.type.indexOf('document',46)!== -1" class="fileList-item-info_pic" src="../../Content/images/doc.png">
                <img v-else-if="fitem.raw.type.indexOf('presentationml',46)!== -1" class="fileList-item-info_pic" src="../../Content/images/ppt.png">
                <img v-else-if="fitem.raw.type.indexOf('sheet',46)!== -1" class="fileList-item-info_pic" src="../../Content/images/xls.png">
                 <img v-else-if="fitem.raw.type.indexOf('/pdf')!== -1" class="fileList-item-info_pic" src="../../Content/images/pdf.png">
                <img v-else-if="fitem.raw.type.indexOf('text')!== -1" class="fileList-item-info_pic" src="../../Content/images/txt.png">
                <img v-else-if="fitem.raw.type.indexOf('image')!== -1" class="fileList-item-info_pic" src="../../Content/images/jpg.png">
                <img v-else-if="fitem.raw.type.indexOf('rar')== -1&&fitem.raw.name.indexOf('.rar')!==-1" class="fileList-item-info_pic" src="../../Content/images/zip.png"> 
                <img v-else-if="fitem.raw.type.indexOf('compressed')!== -1" class="fileList-item-info_pic" src="../../Content/images/zip.png">
                 <img v-else-if="fitem.raw.type.indexOf('video')!== -1" class="fileList-item-info_pic" src="../../Content/images/video.png">
                <img v-else  class="fileList-item-info_pic" src="../../Content/images/file.png">
               <span>{{fitem.name}}</span>
              </div>
              <div class="fileList-item-action">
                 <el-button class="smallBtn"  type="primary" size ='mini' icon="el-icon-upload2" :id=`btnupload${index}`  @click="upTosever(index,fitem,`btnupload${index}`,`txtupload${index}`)"></el-button>
                 <span class="action_up-status" :id=`txtupload${index}`>待上传</span>
                   <span class="action_up-size" v-if="fitem.size>=1048576">{{(fitem.size/1048576).toFixed(2)}}M</span>
                   <span class="action_up-size" v-if="fitem.size<1048576">{{(fitem.size/1024).toFixed(2)}}KB</span>
                 <el-button class="smallBtn" type="primary" size ='mini' icon="el-icon-delete" @click="deletMaterialAttach(index)"></el-button>
              </div>
             </li>
           </ul>
           <!-- 查到的已上传的文件开始 -->
           <ul class="fileList-container">
              <li class="fileList-item" v-for="(attaItem,index) in attachedList" :key="attaItem.attachment_id">
               <div class="fileList-item-info">
                <img v-if="attaItem.attachment_type.toLowerCase() == 'doc'" class="fileList-item-info_pic"
                  src="../../Content/images/doc.png">
                <img v-else-if="attaItem.attachment_type.toLowerCase() == 'docx'" class="fileList-item-info_pic"
                  src="../../Content/images/doc.png">
                <img v-else-if="attaItem.attachment_type.toLowerCase() == 'ppt'" class="fileList-item-info_pic"
                  src="../../Content/images/ppt.png">
                <img v-else-if="attaItem.attachment_type.toLowerCase() == 'pptx'" class="fileList-item-info_pic"
                  src="../../Content/images/ppt.png">
                <img v-else-if="attaItem.attachment_type.toLowerCase() == 'xls'" class="fileList-item-info_pic"
                  src="../../Content/images/xls.png">
               <img v-else-if="attaItem.attachment_type.toLowerCase() == 'xlsx'" class="fileList-item-info_pic"
                  src="../../Content/images/xls.png">
                <img v-else-if="attaItem.attachment_type.toLowerCase() == 'txt'" class="fileList-item-info_pic"
                  src="../../Content/images/txt.png">
                <img v-else-if="attaItem.attachment_type.toLowerCase() == 'jpg'" class="fileList-item-info_pic"
                  src="../../Content/images/jpg.png">
                   <img v-else-if="attaItem.attachment_type.toLowerCase() == 'png'" class="fileList-item-info_pic"
                    src="../../Content/images/jpg.png">
                   <img v-else-if="attaItem.attachment_type.toLowerCase() == 'jpeg'" class="fileList-item-info_pic"
                    src="../../Content/images/jpg.png">
                <img v-else-if="attaItem.attachment_type.toLowerCase() == 'pdf'" class="fileList-item-info_pic"
                  src="../../Content/images/pdf.png">
                <img v-else-if="attaItem.attachment_type.toLowerCase() == 'zip'" class="fileList-item-info_pic"
                  src="../../Content/images/zip.png">
                <img v-else-if="attaItem.attachment_type.toLowerCase() == 'rar'" class="fileList-item-info_pic"
                  src="../../Content/images/zip.png">
                 <img v-else-if="attaItem.attachment_type.toLowerCase()== 'avi'" class="fileList-item-info_pic" src="../../Content/images/video.png">
                   <img v-else-if="attaItem.attachment_type.toLowerCase()== 'mov'" class="fileList-item-info_pic" src="../../Content/images/video.png">
                   <img v-else-if="attaItem.attachment_type.toLowerCase()== 'rmvb'" class="fileList-item-info_pic" src="../../Content/images/video.png">
                   <img v-else-if="attaItem.attachment_type.toLowerCase()== 'rm'" class="fileList-item-info_pic" src="../../Content/images/video.png">
                   <img v-else-if="attaItem.attachment_type.toLowerCase()== 'flv'" class="fileList-item-info_pic" src="../../Content/images/video.png">
                   <img v-else-if="attaItem.attachment_type.toLowerCase()== 'mp4'" class="fileList-item-info_pic" src="../../Content/images/video.png">
                   <img v-else-if="attaItem.attachment_type.toLowerCase()== '3gp'" class="fileList-item-info_pic" src="../../Content/images/video.png">
                    <img v-else  class="fileList-item-info_pic" src="../../Content/images/file.png">
                <span style="vertical-align: middle;font-size:12px">{{attaItem.attachment_name}}</span>
               </div>
               <div class="fileList-item-action">
                  <span class="fileList-item-action_hasUpload" v-if="attaItem.attachment_size>=1048576">{{(attaItem.attachment_size/1048576).toFixed(2)}}M</span>
                   <span class="fileList-item-action_hasUpload" v-if="attaItem.attachment_size<1048576">{{(attaItem.attachment_size/1024).toFixed(2)}}KB</span>
                  <span class="fileList-item-action_hasUpload">{{attaItem.attachment_uploader}}</span>
                  <span class="fileList-item-action_hasUpload" style="width:200px;">{{attaItem.upload_on}}</span>
                  <el-button class="smallBtn" type="primary" size ='mini' icon="el-icon-delete" @click="handleDeletMaterialAttached(attaItem)"></el-button>
               </div>
              </li>
            </ul>
           <!-- 查到的已上传的文件结束 -->
        
          </el-upload>
          
        </div>
      </el-col>
      <el-col :span="6" style="padding-top:31px">
      <div id="version">
        <div class="v-set">版本设置</div>
        <div class="cur-version">当前版本 <span class="ver-number">v{{cur_version}}</span></div>
        <div class="history">历史版本</div>
          <ul class="historyContain">
          <li class="history_item"  v-for="item in histstoryMaterialList" @click="toHistoryView(item.id)">
            <span class="history_item-ver">v{{item.current_version}}</span>
            <span class="history_item-name">{{item.name.length>10?item.name.substring(0,10)+'...':item.name}}</span>
            <span class="history_item-author">{{item.modify_name}}</span>
            <span class="history_item-time">{{item.modifiedon}}</span>
          </li>
        </ul>
      </div>
          <!-- 指定角色权限开始 -->
      <div class="authority-container" v-if="If_author">
        <div class="authority-set">权限设置</div>
        <div class="authority-item">
          <div class="authority-item_label">查看:</div>
          <div class="authority-item_RadioWrap">
            <el-radio-group size="mini" v-model="viewAuthority">
              <el-radio-button :label="1"  @click.native.prevent="handleAuthorityChange(1,1)">所有人</el-radio-button>
              <el-radio-button :label="2" @click.native.prevent="handleAuthorityChange(2,1)">指定角色</el-radio-button>
              <el-radio-button :label="3" @click.native.prevent="handleAuthorityChange(3,1)">指定人</el-radio-button>
              <el-radio-button :label="4" @click.native.prevent="handleAuthorityChange(4,1)">仅作者</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="authority-item">
          <div class="authority-item_label">下载:</div>
          <div class="authority-item_RadioWrap">
              <el-radio-group size="mini" v-model="dowloadAuthority">
               <el-radio-button :label="1"  @click.native.prevent="handleAuthorityChange(1,2)">所有人</el-radio-button>
              <el-radio-button :label="2" @click.native.prevent="handleAuthorityChange(2,2)">指定角色</el-radio-button>
              <el-radio-button :label="3" @click.native.prevent="handleAuthorityChange(3,2)">指定人</el-radio-button>
              <el-radio-button :label="4" @click.native.prevent="handleAuthorityChange(4,2)">仅作者</el-radio-button>
              </el-radio-group>
            </div>
        </div>
        <div class="authority-item">
          <div class="authority-item_label">编辑:</div>
          <div class="authority-item_RadioWrap">
              <el-radio-group size="mini" v-model="editAuthority">
              <el-radio-button :label="1"  @click.native.prevent="handleAuthorityChange(1,3)">所有人</el-radio-button>
              <el-radio-button :label="2" @click.native.prevent="handleAuthorityChange(2,3)">指定角色</el-radio-button>
              <el-radio-button :label="3" @click.native.prevent="handleAuthorityChange(3,3)">指定人</el-radio-button>
              <el-radio-button :label="4" @click.native.prevent="handleAuthorityChange(4,3)">仅作者</el-radio-button>
              </el-radio-group>
            </div>
        </div>
      </div>
      <!-- 指定角色权限结束 -->
      <div id="deadline">
        <span class="dateLabel">有效期<i  class="formStar">*</i></span>
        <span class="dateWrap"><el-date-picker type="date" placeholder="选择日期" disabled v-model="formData.deadline"></el-date-picker></span>
      </div>
           <!-- 提醒设置开始 -->
      <div class="clockContainer" v-if="If_author">
         <div class="clock-tit">提醒设置</div>
         <div class="clock-main">
             <el-row  class="clock-main-row">
               <el-col :span="12" class="clock-main_col">
                  <div class="clock-main_itemLabel">重复</div>
                  <div class="clock-main_itemOptWrapper">
                      <el-select v-model="frequencyType" placeholder="请选择" class="clock-main_itemOpt">
                          <el-option
                            v-for="item in frequencyList"
                            :key="item.type"
                            :label="item.label"
                            :value="item.type">
                          </el-option>
                        </el-select>
                      </div>
               </el-col>
               <el-col :span="12" class="clock-main_col" v-if="frequencyType !== 1">
                  <div class="clock-main_itemLabel">手机</div>
                  <div class="clock-main_itemOptWrapper">
                    <el-input v-model="phone" placeholder="请输入内容"></el-input>
                  </div>
               </el-col>
             </el-row>
             <div class="clock-main-btm" v-if="frequencyType !== 1">
                <div  class="clock-main_btm_left">
                        <el-date-picker
                          v-if="frequencyType == 2"
                           v-model="selectedDate"
                           type="date"
                           placeholder="选择日期"
                           format="yyyy-MM-dd"
                           value-format="yyyy-MM-dd"
                           class="clock-main_itemOpt">
                       </el-date-picker>
                        <ul  v-if="frequencyType == 3"  class="weekPickContainer">
                          <li v-for="item in week" :key="item.value" class="weekPickContainer_item" v-bind:class="{ weekPickContainer_itemActive: item.isActive }" @click="handleWeekClick(item)">{{item.label}}</li>
                        </ul>
                        <ul v-if="frequencyType == 4"  class="dayPickContainer">
                            <li v-for="item in day" :key="item.value" class="dayPickContainer_item" v-bind:class="{dayPickContainer_itemActive : item.isActive }" @click="handleDayClick(item)">{{item.label}}</li>
                        </ul>
                      </div>
                 <div  class="clock-main_btm_right">
                    <el-select v-model="selectedtime" placeholder="请选择">
                        <el-option
                          v-for="item in time"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                      </el-select>
                  </div>
                </div>
         </div>
      </div>
       <!-- 提醒设置结束 -->
      </el-col>
    </el-row>
   


  <!-- 显示目录对话框内容 -->
  <el-dialog :visible.sync="contDialogVisible" width="30%" custom-class="contentDialog" destroy-on-close>
    <div class="content">
      <div class="content-title">
        <i class="el-icon-tickets icon-sign"></i><span class="content-txt">资料目录</span>
      </div>
      <div class="content-main content-mainDialog">
        <el-tree :data="treeContent" node-key="id" highlight-curren :props="defalutProps"  @node-click="handleNodeClick"></el-tree>
      </div>
    </div>
    <div slot="footer" class="dialog-footer" style="margin-top: 280px;">
      <el-button type="primary" @click="handleSelectDir">确 定</el-button>
        <el-button @click="contDialogVisible = false">取 消</el-button>
    </div>
  </el-dialog>

     
  <!-- 删除资料确认对话框 -->
  <el-dialog title="删除提示" :visible.sync="deleMateriallVisible" custom-class="cdialogcss">
      <div class="tipContent">
         <div class="deletWranMark-icon">!</div>
         <div class="deletErrorTxt">确认删除该资料</div>
      </div>
     <span slot="footer" class="dialog-footer">
          <el-button  type="primary" @click="handDelClick">确 定</el-button>
       <el-button @click="deleMateriallVisible = false">取 消</el-button>
     </span>
   </el-dialog>

  <!-- 删除附件确认对话框 -->
  <el-dialog title="删除提示" :visible.sync="deleAttachVisible" custom-class="cdialogcss">
      <div class="tipContent">
         <div class="clsoeWranMark-icon">!</div>
         <div class="deletErrorTxt">确认删除该附件</div>
      </div>
     <span slot="footer" class="dialog-footer">
            <el-button  type="primary" @click="cfmDeleAttach">确 定</el-button>
       <el-button @click="deleAttachVisible = false">取 消</el-button>
     </span>
   </el-dialog>
     
         <el-dialog title="关闭提示" :visible.sync="closeVisible" :close-on-click-modal='false'  custom-class="cdialogcss">
     <div class="tipContent">
        <div class="clsoeWranMark-icon">!</div>
        <div class="deletErrorTxt">资料不会自动保存，确认关闭！</div>
     </div>
    <span slot="footer" class="dialog-footer">
         <el-button  type="primary" @click="cfmCloseDir">确 定</el-button>
      <el-button @click="closeVisible = false">取 消</el-button>
    </span>
   </el-dialog>

    <el-dialog title="提示" :visible.sync="saveVisible" custom-class="cdialogcss" >
     <div class="tipContent">
        <div class="saveMark-icon"><img style="height:40px;width:40px" src="../../Content/images/success.png" /></div>
        <div class="deletErrorTxt">保存成功</div>
     </div>
    <span slot="footer" class="dialog-footer">
      <el-button  type="primary" @click="saveClose">确 定</el-button>
    </span>
  </el-dialog>
          <el-dialog title="保存并升级" :visible.sync="saveUpVisible" custom-class="cdialogcss upcdialogcss" >
     <div class="tipContent">
         <div  style="display: flex;align-items: center;width: 300px;margin: 0 auto;margin-top: 30px;">
          <span style="width: 80px;">版本号：</span><el-input placeholder="请输入版本号 例：1.0、2.0" type="number" maxlength="3" v-model="txtVersionValue">
              </div>
     </div>
            
    <span slot="footer" class="dialog-footer">
      <el-button  type="primary" @click="cfmSaveUpMaterial('formData')">确 定</el-button>
           <el-button @click="saveUpVisible=false">取 消</el-button>
    </span>
                  
  </el-dialog>

     <!--权限对话框-->
      <el-dialog  :visible.sync="authorityVisible" :show-close=false :close-on-click-modal='false'  custom-class="authority-dialog">
         <!-- 所有人或者仅作者 -->
    <div v-if="selectPermis==1||selectPermis == 4" slot="title" class="authority-header"><span class="titleMark"></span>权限提醒</div>
    <div v-if="selectPermis==1||selectPermis == 4" class="authority-main-allAndOnly">
      <img src="../../Content/images/warn.png">
      <p>确认修改权限</p>
    </div>
    <span slot="footer" class="dialog-footer" v-if="selectPermis==1||selectPermis == 4" >
      <el-button  type="primary" @click="hadnleViewAuthorityOkAll">确 定</el-button>
      <el-button    @click="handleViewCancel">取消</el-button>
    </span>
   <!-- 所有人或者仅作者 -->
  </el-dialog>

      <!-- 权限对话框 -->
  <el-dialog  :visible.sync="authorityVisibleUserSelect" :show-close=false :close-on-click-modal='false'   custom-class="authority-dialog-select">
    <!-- 指定人开始 -->
    <div v-if="selectPermis == 3" slot="title" class="authority-header"><span class="el-icon-user" style="font-size:15px;color:#0088ff;margin-right:5px;"></span>用户</div>
    <div v-if="selectPermis == 3" class="search-inp">
      <el-input placeholder="请输入内容" v-model="txtUserValue" >
      <i slot="suffix" class="el-input__icon el-icon-search" @click="userSearch" style="color:#0088ff;cursor: pointer; "></i>
    </el-input>
    </div>
    <div  v-if="selectPermis == 3" class="list-wraper">
      <el-checkbox-group v-model="checkedUserList" class="checkboxWrapper" @change="handleUserChangeList">
            <el-checkbox class="list_item" v-for="item in userList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <span slot="footer" class="dialog-footer" v-if="selectPermis == 3" >
        <el-checkbox class="checkAll" v-model="checkUserAll" @change="handleCheckUserkAll">全选</el-checkbox>
      <el-button  type="primary" @click="handleViewAuthorityOkRole" >确 定</el-button>
      <el-button    @click="handleCancelUserchange">取消</el-button>
    </span>
       <!-- 指定人结束 -->
   </el-dialog>

      <!-- 权限对话框 -->
  <el-dialog  :visible.sync="authorityVisibleRoleSelect" :show-close=false :close-on-click-modal='false'   custom-class="authority-dialog-select">
    <!-- 指定角色开始-->
    <div v-if="selectPermis==2" slot="title" class="authority-header"><span class="el-icon-user" style="font-size:15px;color:#0088ff;margin-right:5px;"></span>角色</div>
    <div v-if="selectPermis==2" class="search-inp">
      <el-input placeholder="请输入内容" v-model="txtRoleValue">
      <i slot="suffix" class="el-input__icon el-icon-search" @click="roleSearch" style="color:#0088ff; cursor: pointer;"></i>
    </el-input>
    </div>
    <div  v-if="selectPermis==2" class="list-wraper">
      <el-checkbox-group v-model="checkedroleList" class="checkboxWrapper" @change="handleRoleChangeList">
            <el-checkbox class="list_item" v-for="item in userRoleList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <span  v-if="selectPermis==2"  slot="footer" class="dialog-footer" >
        <el-checkbox class="checkAll" v-model="checkRoleAll" @change="handleCheckRoleAll">全选</el-checkbox>
      <el-button  type="primary" @click="handleViewAuthorityOkRole">确 定</el-button>
      <el-button    @click="handleCancelRolechange">取消</el-button>
    </span>
    <!-- 指定角色结束 -->
   </el-dialog>

</div>
</body>

<script src="../../Scripts/axios.min.js?v=1.1"></script>
<script src="../../Scripts/jquery.js?v=1.1"></script>
 <script src="../../Scripts/moment.min.js?v=1.1"></script>
<script src="../../Scripts/vue.js?v=1.1"></script>
<script src="../../Scripts/element-ui.js?v=1.1"></script>
<script src="../../Scripts/material-edit.js?v=1.1"></script>
</html>
