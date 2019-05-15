import { DBMgr } from 'src/mgr/DBMgr';

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

    addImage(ImgId,VisitId,ImgName,Base64ImgString) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Image(ImgId,VisitId,ImgName,Base64ImgString) values (?,?,?,?)";
        return mgr.execSql(sql,[ImgId,VisitId,ImgName,Base64ImgString]);
    }
    
    deleteImage(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_Image"; 
        return mgr.execSql(sql);
    }
}