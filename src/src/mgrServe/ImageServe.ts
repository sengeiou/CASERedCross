import { DBMgr } from 'src/mgr/DBMgr';
import { ApiConfig } from 'src/app/api.config';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';


export class ImageServe {

    getImageId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Image where id=?";
        return mgr.execSql(sql, [id]);
    }

    getAllImageList(){
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Image";
        return mgr.execSql(sql);
    }

    getImageList(VisitId){
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Image where VisitId = ? ";
        return mgr.execSql(sql,[VisitId]);
    }

    addImage(ImgId,VisitId,ImgPath,transfer:FileTransfer,file:File,base64Mgr:Base64) {
        var mgr = DBMgr.GetInstance();
        var uploadpath=ApiConfig.getUploadPath();
        var fileurl=uploadpath+ImgPath;
        var fileTransfer: FileTransferObject=transfer.create();

        // fileurl="D:\\wwwroot\\"+ImgId+".jpg";
        
        // base64Mgr.encodeFile(fileurl).then((base64File:string)=>{
        //     alert(base64File);
        //     var sql = "insert into tb_Image(ImgId,VisitId,ImgName,Base64ImgString) values (?,?,?,?)";
        //     return mgr.execSql(sql,[ImgId,VisitId,'',base64File]);
        // }, (err) => {
        //     alert(err);
        //   });


        fileTransfer.download(fileurl, file.dataDirectory+ 'f'+ImgId+".jpg").then((entry) => {
            base64Mgr.encodeFile(file.dataDirectory+ 'f'+ImgId+".jpg").then((base64File:string)=>{
                //alert(base64File);
                var sql = "insert into tb_Image(ImgId,VisitId,ImgName,Base64ImgString) values (?,?,?,?)";
                return mgr.execSql(sql,[ImgId,VisitId,'',base64File]);
            });

          }, (error) => {
            // handle error
            
          });
    }
    
    deleteImage(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_Image"; 
        return mgr.execSql(sql);
    }
}