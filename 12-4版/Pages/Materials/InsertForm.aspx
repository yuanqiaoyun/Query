﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="InsertForm.aspx.cs" Inherits="Css.Crm.KMS.Web.Pages.Materials.InsertForm" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="../../Content/element-ui.css?v=1.1" />
    <link rel="stylesheet" href="../../Content/reset.css?v=1.1" />
    <link rel="stylesheet" href="../../Content/new-add-material.css?v=1.1" />
    <title></title>
    <style type="text/css">
          .contentDialog {
          width: 30%;
          height: 450px;
      }

    </style>
</head>
 <body>
  <div id="newAdd" style="margin-top: 10px;">
    <el-row :gutter="20">
      <el-col :span="18" style="padding-left: 20px;padding-right: 0px;">
        <el-form :model="formData" :rules="rules" ref="formData" status-icon>
          <div class="fmAction">
                  <i class="el-icon-document" style="color: #0088ff; cursor: pointer; font-size: 12px;margin-left: 10px;"  @click="handleSaveClick('formData')">保存</i>
           <!-- <el-button type="primary" size="mini" icon="el-icon-document">保存并升级</el-button> -->
                  <i class="el-icon-close" style="color: #0088ff; cursor: pointer; font-size: 12px;margin-left: 10px;" @click="closeVisible = true">关闭</i>
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
            <el-input type="textarea" :rows="5" v-model="formData.summary" maxlength=120></el-input>
          </el-form-item>
        </div>
        </el-form>
        <div id="material-upload-wrapper" style="padding: 15px 50px 50px 50px;;height: 43vh;">
          <div class="material-upload_top" style="font-size: 12px;line-height: 6px;margin-left: 0px;">资料 <i class="el-icon-folder-opened  upload-txt" style="padding-left:5px" slot="trigger">上传资料&lt;1G</i></div>
              
        </div>
      </el-col>
      <el-col :span="6" style="padding-top:31px">
      <div id="version">
        <div class="v-set">版本设置</div>
        <div class="cur-version">当前版本 <span class="ver-number">v1.0</span></div>
        <div class="history">历史版本</div>
      </div>
      <div id="deadline">
        <span class="dateLabel">有效期<i  class="formStar">*</i></span>
        <span class="dateWrap"><el-date-picker type="date" placeholder="选择日期" disabled v-model="formData.deadline"></el-date-picker></span>
      </div>
      </el-col>
    </el-row>


  <!-- 显示对话框内容 -->
  <el-dialog  :visible.sync="contDialogVisible" custom-class="contentDialog">
    <div class="content">
      <div class="content-title">
        <i class="el-icon-tickets icon-sign"></i><span class="content-txt">资料目录</span>
      </div>
      <div class="content-main content-mainDialog">
        <el-tree :data="treeContent" node-key="id" highlight-curren :props="defalutProps"  @node-click="handleNodeClick"></el-tree>
      </div>
    </div>
    <div slot="footer" class="dialog-footer"  style="margin-top: 280px;">
           <el-button type="primary" @click="handleSelectDir">确 定</el-button>
      <el-button @click="contDialogVisible = false">取 消</el-button>
   
    </div>
  </el-dialog>

     <!-- 关闭提示对话框 -->
  <el-dialog title="关闭提示" :visible.sync="closeVisible" custom-class="cdialogcss">
     <div class="tipContent">
        <div class="clsoeWranMark-icon">!</div>
        <div class="clsoeErrorTxt">资料不会自动保存，确认关闭！</div>
     </div>
    <span slot="footer" class="dialog-footer">
        <el-button  type="primary" @click="cfmCloseDir">确 定</el-button>
      <el-button @click="closeVisible = false">取 消</el-button>
      
    </span>
  </el-dialog>

     <el-dialog title="提示" :visible.sync="saveVisible" :close-on-click-modal='false' :show-close="false" custom-class="cdialogcss">
     <div class="tipContent">
        <div class="saveWranMark-icon"><img style="height:40px;width:40px" src="../../Content/images/success.png" /></div>
        <div class="saveErrorTxt">保存成功</div>
     </div>
    <span slot="footer" class="dialog-footer">
      <el-button  type="primary" @click="cfmSaveDir">确 定</el-button>
    </span>
  </el-dialog>
</div>
</body>
<script src="../../Scripts/axios.min.js?v=1.1"></script>
<script src="../../Scripts/jquery.js?v=1.1"></script>
<script src="../../Scripts/vue.js?v=1.1"></script>
<script src="../../Scripts/element-ui.js?v=1.1"></script>
<script src="../../Scripts/moment.min.js?v=1.1"></script>
<script src="../../Scripts/new-add-material.js?v=1.1"></script>
</html>
