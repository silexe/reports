<!DOCTYPE html>
<html>
<body>
<%
dim fs,file,fname, fdata, io, data
fname = request.form("fname") & ".js"
fdata = request.form("fdata")
clnFdata = Replace(fdata,vbTab,"******")
io = request.form("io")
set fs=Server.CreateObject("Scripting.FileSystemObject")
'*form call requests write
If(io = "write") Then
  '*if file exists
  If (fs.FileExists("D:\Domains\v2023355\wwwroot\v\reports\saved_reports\" & fname))=true Then
    fs.DeleteFile("D:\Domains\v2023355\wwwroot\v\reports\saved_reports\" & fname)
    set file = fs.CreateTextFile("D:\Domains\v2023355\wwwroot\v\reports\saved_reports\" & fname,true)
    file.Write(fdata)
    file.Close
    set file=nothing
    Response.Write("<success>https://sam-ess.com/v/reports/saved_reports/" & fname & "</success>")
  '*if file does not exist
  Else
    set file = fs.CreateTextFile("D:\Domains\v2023355\wwwroot\v\reports\saved_reports\" & fname,true)
    file.Write(fdata)
    file.Close
    set file=nothing
    Response.Write("<success>https://sam-ess.com/v/reports/saved_reports/" & fname & "</success>")
  End If
'*form call requests read
ElseIf(io = "read") Then
  '*if file exists
  If (fs.FileExists("D:\Domains\v2023355\wwwroot\v\reports\saved_reports\" & fname))=true Then
    set file =fs.OpenTextFile("D:\Domains\v2023355\wwwroot\v\reports\saved_reports\" & fname,1,false)
    data = file.ReadAll
    file.Close
    Response.Write("<success>" & data & "</success>")
    set file=nothing
  '*if file does not exist
  Else
    Response.Write("<error>File does not exist</error>")
  End If
End If
'*closes connections
set fs=nothing
%>
</body>
</htmL>