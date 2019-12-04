<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PreVideo.aspx.cs" Inherits="Css.Crm.KMS.Web.Pages.PreVideo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script src="../Scripts/jquery.js"></script>
    <title></title>
    <script type="text/javascript">
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
        $(function () {
            $("#videoPre").attr("src", getUrlParam("url"));
        });
    </script>
</head>
<body style="text-align: center">
    <video controls="controls" id="videoPre" style="width: 80%" src="http://aux-home-prd.oss-cn-hangzhou.aliyuncs.com/资料库/UAT/ca0b7f9b-d79b-4564-85a9-2ebb6660273d/1.0/111.mp4"></video>
</body>
</html>
