using Css.Crm.KMS.BLL;
using Css.Crm.KMS.Web.BLL;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Css.Crm.KMS.Web
{
    public partial class Home : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        //protected void Button_Click(object sender, EventArgs e)
        //{

        //    int upLength = 2048;        //上传文件大小MB
        //    if (FileUpload.HasFile)
        //    {
        //        HttpFileCollection uploadFiles = Request.Files;

        //        for (int i = 0; i < uploadFiles.Count; i++)
        //        {
        //            HttpPostedFile postedFile = uploadFiles[i];
        //            try
        //            {
        //                if ((FileUpload.FileBytes.Length / (1024 * 1024)) > upLength)
        //                {
        //                    ClientScript.RegisterStartupScript(this.GetType(), "upfileOK", "alert('大小超出 " + upLength + " M的限制，请处理后再上传！');", true);
        //                    return;
        //                }
        //              else
        //                {
        //                    AliyunOssService.UploadFile(postedFile.FileName, postedFile.InputStream, "1.0");
        //                    ClientScript.RegisterStartupScript(this.GetType(), "upfileOK", "alert('提示：文件上传成功');", true);
        //                }
        //            }
        //            catch (Exception ex)
        //            {
        //                ClientScript.RegisterStartupScript(this.GetType(), "upfileOK", "alert('提示：文件上传失败" + ex.Message + "');", true);
        //            }
        //        }
        //    }

        //    //   string upPath = "/up/";  //上传文件路径
        //    //    int upLength = 30;        //上传文件大小MB
        //    //    string upFileType = "|image/bmp|image/x-png|image/pjpeg|image/gif|image/png|image/jpeg|";

        //    //    string fileContentType = FileUpload.PostedFile.ContentType;    //文件类型
                
        //    //    if (true)
        //    //    {
        //    //        string name = FileUpload.PostedFile.FileName;                  // 客户端文件路径

        //    //        FileInfo file = new FileInfo(name);

        //    //        string fileName = DateTime.Now.ToString("yyyyMMddhhmmssfff") + file.Extension; // 文件名称，当前时间（yyyyMMddhhmmssfff）
        //    //        string webFilePath = Server.MapPath(upPath) + fileName;        // 服务器端文件路径

        //    //        string FilePath = upPath + fileName;   //页面中使用的路径

        //    //        if (!File.Exists(webFilePath))
        //    //        {
        //    //            if ((FileUpload.FileBytes.Length / (1024 * 1024)) > upLength)
        //    //            {
        //    //                ClientScript.RegisterStartupScript(this.GetType(), "upfileOK", "alert('大小超出 " + upLength + " M的限制，请处理后再上传！');", true);
        //    //                return;
        //    //            }

        //    //            try
        //    //            {
        //    //                // FileUpload.SaveAs(webFilePath);                                // 使用 SaveAs 方法保存文件

        //    //                AliyunOssService.UploadFile(name, FileUpload.FileBytes, "1.0");
        //    //                ClientScript.RegisterStartupScript(this.GetType(), "upfileOK", "alert('提示：文件上传成功');", true);
        //    //            }
        //    //            catch (Exception ex)
        //    //            {
        //    //                ClientScript.RegisterStartupScript(this.GetType(), "upfileOK", "alert('提示：文件上传失败" + ex.Message + "');", true);
        //    //            }
        //    //        }
        //    //        else
        //    //        {
        //    //            ClientScript.RegisterStartupScript(this.GetType(), "upfileOK", "alert('提示：文件已经存在，请重命名后上传');", true);
        //    //        }
        //    //    }
        //    //    else
        //    //    {
        //    //        ClientScript.RegisterStartupScript(this.GetType(), "upfileOK", "alert('提示：文件类型不符" + fileContentType + "');", true);
        //    //    }
        //    //}
        //}
    }
}