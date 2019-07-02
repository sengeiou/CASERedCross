import { DBMgr } from 'src/mgr/DBMgr';
import { ApiConfig } from 'src/app/api.config';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';


export class ImageServe {

    getImageId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Image where LocalId=?";
        return mgr.execSql(sql, [id]);
    }

    saveImage_AttachmentId(AttachmentId, id) {
        var mgr = DBMgr.GetInstance();
        var sql = "update tb_Image SET AttachmentId=? where LocalId=?";
        return mgr.execSql(sql, [AttachmentId, id]);
    }

    saveImage_ImgId(ImgId, AttachmentId) {
        var mgr = DBMgr.GetInstance();
        var sql = "update tb_Image SET ImgId=? where AttachmentId=?";
        return mgr.execSql(sql, [ImgId, AttachmentId]);
    }

    getAllImageList() {
        var mgr = DBMgr.GetInstance();
        var sql = "select i.* from tb_Image as i left outer join tb_home_visit as h where i.ImgId=0 and i.VisitId=h.VisitId and h.SavedStatus=1 ";
        return mgr.execSql(sql);
    }

    getAllImageList2() {
        var mgr = DBMgr.GetInstance();
        var sql = "select i.* from tb_Image as i left outer join tb_home_visit as h where i.ImgId=0 and i.VisitId=h.LocalId and h.SavedStatus=1 ";
        return mgr.execSql(sql);
    }

    getImageList(VisitId) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Image where VisitId = ? ";
        return mgr.execSql(sql, [VisitId]);
    }

    getImageList_web(VisitId) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Image as i left outer join tb_home_visit as h  where i.ImgId=0 and h.SavedStatus=1 and i.VisitId=h.VisitId  and i.VisitId = ? ";
        return mgr.execSql(sql, [VisitId]);
    }

    getImageList_web2(VisitId) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Image as i left outer join tb_home_visit as h  where i.ImgId=0 and h.SavedStatus=1 and i.VisitId=h.LocalId  and i.VisitId = ? ";
        return mgr.execSql(sql, [VisitId]);
    }

    getImageList_old(VisitId) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Image where  ImgId>0 and VisitId = ? ";
        return mgr.execSql(sql, [VisitId]);
    }

    addImage(ImgId, VisitId, ImgPath, transfer: FileTransfer, file: File, base64Mgr: Base64) {
        var mgr = DBMgr.GetInstance();
        var myDate = new Date();
        if (myDate.getMonth() + 1 < 10) {
            var Month = "0" + (myDate.getMonth() + 1)
        } else {
            Month = "" + (myDate.getMonth() + 1)
        }
        var ImgName=myDate.getFullYear() + "" + Month + "" + myDate.getDate() + "" + myDate.getHours() + "" + myDate.getMinutes();
  
        mgr.execSql("select * from tb_Image where ImgId=? ", [ImgId]).then((e) => {
            var list = Array.from(e.res.rows);
            if (list.length > 0) {
                return;
            }

            var uploadpath = ApiConfig.getUploadPath();
            var fileurl = uploadpath + ImgPath;
            var fileTransfer: FileTransferObject = transfer.create();

            // fileurl="D:\\wwwroot\\"+ImgId+".jpg";

            // base64Mgr.encodeFile(fileurl).then((base64File:string)=>{
            //     alert(base64File);
            //     var sql = "insert into tb_Image(ImgId,VisitId,ImgName,Base64ImgString) values (?,?,?,?)";
            //     return mgr.execSql(sql,[ImgId,VisitId,'',base64File]);
            // }, (err) => {
            //     alert(err);
            //   });
            fileTransfer.download(fileurl, file.dataDirectory + 'f' + ImgId + ".jpg").then((entry) => {
                base64Mgr.encodeFile(file.dataDirectory + 'f' + ImgId + ".jpg").then((base64File: string) => {
                    //alert(base64File);
                    var sql = "insert into tb_Image(ImgId,VisitId,ImgName,Base64ImgString,Status) values (?,?,?,?,1)";
                    return mgr.execSql(sql, [ImgId, VisitId, ImgName, base64File]);
                });

            }, (error) => {
                // handle error

            });
        });
    }

    addImage2(ImgId, VisitId, base64File,VisitLocalId) {
        var mgr = DBMgr.GetInstance();
        var myDate = new Date();
        if (myDate.getMonth() + 1 < 10) {
            var Month = "0" + (myDate.getMonth() + 1)
        } else {
            Month = "" + (myDate.getMonth() + 1)
        }
        var ImgName=myDate.getFullYear() + "" + Month + "" + myDate.getDate() + "" + myDate.getHours() + "" + myDate.getMinutes();
        var sql = "insert into tb_Image(ImgId,VisitId,ImgName,Base64ImgString,VisitLocalId) values (?,?,?,?,?)";
        return mgr.execSql(sql, [ImgId, VisitId, ImgName, base64File,VisitLocalId]); 
    }

    deleteImage(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_Image where LocalId=?";
        return mgr.execSql(sql, [id]);
    }

    deleteImage2() {
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_Image where Status=0";
        return mgr.execSql(sql);
    }


    getImage_linshi() {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Image2 ";
        return mgr.execSql(sql);
    }

    addImage2_linshi(base64File) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Image2(Base64ImgString) values (?)";
        return mgr.execSql(sql, [base64File]); 
    }

    deleteImage2_linshi() {
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_Image2 ";
        return mgr.execSql(sql);
    }
}