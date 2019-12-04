using Aliyun.OSS;
using Css.Crm.KMS.BLL;
using Css.Crm.KMS.Web.BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Css.Crm.KMS.Web.Pages
{
    public partial class Download : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                string filePath = Request.QueryString["filePath"];
                //string filePath = "http://aux-home-prd.oss-cn-hangzhou.aliyuncs.com/资料库/7b7d7c81-4da9-439f-8f95-4051a7bf58da/1.0/新建文本文档 (4).txt";
                string fileName = Request.QueryString["fileName"]; //"新建文本文档 (4).txt";
                var config = CommonService.GetSysPara("OSSConfig");
                string bucketName = string.Empty;
                string endPoint = string.Empty;
                OssClient client = Common.GetOssConfigValue(config, ref endPoint, ref bucketName);
                var ossObject = client.GetObject(bucketName, filePath.Replace("http://" + bucketName + "." + endPoint + "/", ""));

                if (ossObject != null)
                {
                    byte[] bytes = new byte[(int)ossObject.Content.Length];

                    ossObject.Content.Read(bytes, 0, bytes.Length);
                    ossObject.Content.Close();
                    Response.ContentType = "application/octet-stream";

                    Response.AddHeader("Content-Disposition", "attachment;  filename=" + HttpUtility.UrlEncode(fileName, System.Text.Encoding.UTF8));
                    Response.BinaryWrite(bytes);
                    Response.Flush();
                    Response.End();
                }
            }
            catch (Exception ee) {
                Response.Clear();
                Response.Write("下载失败，请重新下载！");
                Response.End();
            }

        }
    }
}