<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ViewForm.aspx.cs" Inherits="Css.Crm.KMS.Web.Pages.Materials.ViewForm" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
  <link rel="stylesheet" href="../../Content/element-ui-212.css?v=1.1" />
  <link rel="stylesheet" href="../../Content/reset.css?v=1.1" />
  <link rel="stylesheet" href="../../Content/material-view.css?v=1.1" />
  <title>资料查看</title>
</head>

<body>
  <div id="material_view">
    <div class="close">
           <i class="el-icon-edit"  v-if="if_edit_flag" style="color: #0088ff; cursor: pointer; font-size: 12px;" @click="toEdit">编辑</i>
           <i class="el-icon-close" style="color: #0088ff; cursor: pointer; font-size: 12px;margin-left: 10px;" @click="toColse">关闭</i>
    </div>
    <div class="viewContainer" style="margin:0 10px">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="detailContain">
            <div class="detailContent">
              <div class="contentIn"><img src="../../Content/images/URL.png" style="width:33px;height:16px;vertical-align: middle;font-size: 12px;padding-right: 10px;">{{materialDetail.material_directory_name}}</div>
            </div>
            <div class="detai_brand">
              <span class="detai_brand-txt" >{{materialDetail.productgroupname}}</span>
              <span class="detai_brand-txt"  >{{materialDetail.competebrandname}}</span>
            </div>
            <div class="detail_title">
              <div class="detail_title-txt">{{materialDetail.name}}</div>
            </div>
            <div class="detail_abstr">
             <p class="detail_abstr-des"> 摘要：{{materialDetail.material_abstract}}</p>
            </div>
            <el-checkbox-group v-model="checkedMaterials" class="fileList-container"
              @change="handleCheckedMaterialsChange">
              <el-checkbox v-for="attaItem in attachList" :key="attaItem.attachment_id" :label="attaItem" class="fileList-item" >
                <span class="fileList-item-info">
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
                  <span style="font-size:12px;">{{attaItem.attachment_name}}</span>
                </span>
                <span class="fileList-item-action">
                   <span class="action_up-status" v-if="attaItem.attachment_size>=1048576">{{(attaItem.attachment_size/1048576).toFixed(2)}}M</span>
                  <span class="action_up-status" v-if="attaItem.attachment_size<1048576">{{(attaItem.attachment_size/1024).toFixed(2)}}KB</span>
                  <span class="action_up-status">{{attaItem.attachment_uploader}}</span>
                  <span class="action_up-status" style="width:200px;">{{attaItem.upload_on}}</span>
                  <a target="_blank" :href="attaItem.attachment_url" v-if="attaItem.attachment_type=='pdf'||attaItem.attachment_type=='txt'||attaItem.attachment_type=='jpg'||attaItem.attachment_type=='png'||attaItem.attachment_type=='jpeg'" class="el-icon-reading preview"></a>
                  <span class="el-icon-reading preview" @click="officePreView(attaItem.attachment_url,attaItem.attachment_name,attaItem.attachment_type)"   v-else-if="attaItem.attachment_type.toLowerCase() == 'doc'||attaItem.attachment_type.toLowerCase() == 'docx'||attaItem.attachment_type.toLowerCase() == 'ppt'||attaItem.attachment_type.toLowerCase() == 'pptx'||attaItem.attachment_type.toLowerCase() == 'xls'||attaItem.attachment_type.toLowerCase() == 'xlsx'"></span>
                   <span class="el-icon-reading preview" @click="videoPreView(attaItem.attachment_url,attaItem.attachment_name,attaItem.attachment_type)"   v-else-if="attaItem.attachment_type.toLowerCase() == 'avi'||attaItem.attachment_type.toLowerCase() == 'mov'||attaItem.attachment_type.toLowerCase() == 'rmvb'||attaItem.attachment_type.toLowerCase() == 'rm'||attaItem.attachment_type.toLowerCase() == 'flv'||attaItem.attachment_type.toLowerCase() == 'mp4'||attaItem.attachment_type.toLowerCase() == '3gp'"></span>
                    <span  v-else class="el-icon-reading preview" style="color: gainsboro;"></span>
                  <span v-if="if_download" class="el-icon-download preview" style="margin-left:10px;" @click="downloadSingle(attaItem.attachment_url,attaItem.attachment_name)"></span>
                  <span v-else class="el-icon-download preview" style="margin-left:5px; color:#ccc" @click="return false;"></span>
                </span>
              </el-checkbox>
            </el-checkbox-group>
            <div class="dowAll-wrapper" v-if=if_download >
                <el-checkbox v-model='allSelectMark' @change="handlerSelectedChk"></el-checkbox><span class="el-icon-download dowAll" v-on:click="downAll">批量下载</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="padding-left:0px">
          <div class="historyContain">
              <div class="history_txt">
                <span class="cur-version">v{{materialDetail.current_version}}</span>
            </div>
                 <div class="history_txt">
                <span style="width: 150px;display: inline-block;">作者：{{materialDetail.owner_name}}</span>
                <span style="margin-left:45px"> 有效期：{{materialDetail.validity_date}}</span>
            </div>
            <div class="history_txt" style="padding-top: 5px;">
                <span style="width: 150px;display: inline-block;">更新人：{{materialDetail.modify_name}}</span>
                <span style="margin-left:45px">更新时间：{{materialDetail.modifiedon}}</span>
            </div>
              <div class="history">历史版本</div>
          <ul class="historyContainList">
          <li class="history_item"  v-for="item in histstoryMaterialList" @click="toHistoryView(item.id)">
            <span class="history_item-ver">v{{item.current_version}}</span>
            <span class="history_item-name">{{item.name.length>10?item.name.substring(0,10)+'...':item.name}}</span>
            <span class="history_item-author">{{item.modify_name}}</span>
            <span class="history_item-time">{{item.modifiedon}}</span>
          </li>
        </ul>
      </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</body>
<script src="../../Scripts/axios.min.js?v=1.1"></script>
<script src="../../Scripts/jquery.js?v=1.1"></script>
<script src="../../Scripts/vue.js?v=1.1"></script>
<script src="../../Scripts/element-ui-212.js?v=1.1"></script>
<script src="../../Scripts/material-view.js?v=1.1"></script>
</html>
