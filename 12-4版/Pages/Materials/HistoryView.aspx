<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="HistoryView.aspx.cs" Inherits="Css.Crm.KMS.Web.Pages.Materials.HistoryView" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link rel="stylesheet" href="../../Content/element-ui-212.css" />
    <link rel="stylesheet" href="../../Content/history-view.css" />
</head>
<body>
    <div id="history-view">
        <div class="history-view-wraaper">
            <div class="close">
                <span class="el-icon-close history-close" @click="toColse">关闭</span>
            </div>
            <div calss="history-view-content">
                <el-row>
             <el-col :span=18>
               <div class="history-view-content_mainL">
                 <div class="history-view-content_mainL-header">
                   <div class="history-view-content_mainL-header-url">
                     <img src="../../Content/images/URL.png" style="width:33px;height:16px;vertical-align: middle;">
                     <span class="history-view-content_mainL-header-urlTxt">{{matericalDetail.material_directory_name}}</span>
                   </div>
                   <div style="color:#ccc;">历史资料</div>
                 </div>
                 <!-- 品牌和产品线开始 -->
                 <div class="history-brandLiine">
                   <span class="history-brandLiine_txt">{{matericalDetail.competebrandname}}</span>
                   <span class="history-brandLiine_txt">{{matericalDetail.productgroupname}}</span>
                 </div>
                <!-- 品牌和产品线开始 -->
                <div class="history-title">{{matericalDetail.name}}</div>
                <div class="history-abstract">
                  <p class="history-abstract-txt">摘要:{{matericalDetail.material_abstract}}</p>
                </div>
                <div class="history-materials">
                    <el-checkbox-group v-model="checkedAttach" @change="handleCheckGrup" class="history-materials-list">
                        <el-checkbox v-for="item in attachList" :label="item" :key="item.attachment_id" class="history-materials-list-item">
                          <span  class="history-materials-list-item-inner">
                           <img v-if="item.attachment_type.toLowerCase() == 'doc'" class="fileList-item-info_pic"
                    src="../../Content/images/doc.png"/>
                  <img v-else-if="item.attachment_type.toLowerCase() == 'docx'" class="fileList-item-info_pic"
                    src="../../Content/images/doc.png"/>
                  <img v-else-if="item.attachment_type.toLowerCase() == 'ppt'" class="fileList-item-info_pic"
                    src="../../Content/images/ppt.png"/>
                  <img v-else-if="item.attachment_type.toLowerCase() == 'pptx'" class="fileList-item-info_pic"
                    src="../../Content/images/ppt.png"/>
                  <img v-else-if="item.attachment_type.toLowerCase() == 'xls'" class="fileList-item-info_pic"
                    src="../../Content/images/xls.png"/>
                 <img v-else-if="item.attachment_type.toLowerCase() == 'xlsx'" class="fileList-item-info_pic"
                    src="../../Content/images/xls.png"/>
                  <img v-else-if="item.attachment_type.toLowerCase() == 'txt'" class="fileList-item-info_pic"
                    src="../../Content/images/txt.png"/>
                  <img v-else-if="item.attachment_type.toLowerCase() == 'jpg'" class="fileList-item-info_pic"
                    src="../../Content/images/jpg.png"/>
                  <img v-else-if="item.attachment_type.toLowerCase() == 'png'" class="fileList-item-info_pic"
                    src="../../Content/images/jpg.png"/>
                   <img v-else-if="item.attachment_type.toLowerCase() == 'jpeg'" class="fileList-item-info_pic"
                    src="../../Content/images/jpg.png"/>
                  <img v-else-if="item.attachment_type.toLowerCase() == 'pdf'" class="fileList-item-info_pic"
                    src="../../Content/images/pdf.png"/>
                  <img v-else-if="item.attachment_type.toLowerCase() == 'zip'" class="fileList-item-info_pic"
                    src="../../Content/images/zip.png"/>
                  <img v-else-if="item.attachment_type.toLowerCase() == 'rar'" class="fileList-item-info_pic"
                    src="../../Content/images/zip.png"/>
                   <img v-else-if="item.attachment_type.toLowerCase()== 'avi'" class="fileList-item-info_pic" src="../../Content/images/video.png"/>
                   <img v-else-if="item.attachment_type.toLowerCase()== 'mov'" class="fileList-item-info_pic" src="../../Content/images/video.png"/>
                   <img v-else-if="item.attachment_type.toLowerCase()== 'rmvb'" class="fileList-item-info_pic" src="../../Content/images/video.png"/>
                   <img v-else-if="item.attachment_type.toLowerCase()== 'rm'" class="fileList-item-info_pic" src="../../Content/images/video.png"/>
                   <img v-else-if="item.attachment_type.toLowerCase()== 'flv'" class="fileList-item-info_pic" src="../../Content/images/video.png"/>
                   <img v-else-if="item.attachment_type.toLowerCase()== 'mp4'" class="fileList-item-info_pic" src="../../Content/images/video.png"/>
                   <img v-else-if="item.attachment_type.toLowerCase()== '3gp'" class="fileList-item-info_pic" src="../../Content/images/video.png"/>
                    <img v-else  class="fileList-item-info_pic" src="../../Content/images/file.png"/>
                              <span class="history-materials-list-item_name">{{item.attachment_name}}</span>
                              <span class="history-materials-list-item_size">{{(item.attachment_size)}}M</span>
                              <span class="history-materials-list-item_author">{{item.attachment_uploader}}</span>
                              <span class="history-materials-list-item_time">{{item.upload_on}}</span>
                              <span class="el-icon-reading history-materials-list-item_preview" @click=" handlePreview(item)"></span>
                              <span class="el-icon-download history-materials-list-item_down" @click=" handleDownload(item)"></span>
                          </span>
                        </el-checkbox>
                      </el-checkbox-group>
                </div>
                <div class="history-material-footer">
                    <el-checkbox v-model="checkAll" @change="handleCheckAllChange"><span class="el-icon-download dowAll" v-on:click="downAll">批量下载</span></el-checkbox>
                </div>
               </div>
              </el-col>
             <el-col :span=6>
               <div class="history-view-content_mainR">
                  <div class="history-view-content_mainR-header">
                      <span class="history-view-content-mainR-ver">v{{matericalDetail.current_version}}</span>
                  </div>
                   <div class="history-view-content_mainR-bottom">
                      <span class="history-view-content-mainR-author">作者：{{matericalDetail.owner_name}}</span>
                      <span class="history-view-content-mainR-modify">有效期至：{{matericalDetail.validity_date}}</span>
                   </div>
                      <div class="history-view-content_mainR-bottom">
                      <span class="history-view-content-mainR-author">更新人：{{matericalDetail.modify_name}}</span>
                      <span class="history-view-content-mainR-modify">更新时间：{{matericalDetail.modifiedon}}</span>
                   </div>
             </div>
            </el-col>
           </el-row>
            </div>
        </div>
    </div>
</body>
<script src="../../Scripts/axios.min.js"></script>
<script src="../../Scripts/jquery.js"></script>
<script src="../../Scripts/vue.js"></script>
<script src="../../Scripts/element-ui-212.js"></script>
<script src="../../Scripts/history-view.js"></script>
</html>
