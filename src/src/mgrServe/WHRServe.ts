import { DBMgr } from 'src/mgr/DBMgr';

export class WHRServe {

    getWHRId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_WHR where id=?";
        return mgr.execSql(sql, [id]);
    }

    getAllWHRList(CaseId){
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_WHR where CaseId=?";
        return mgr.execSql(sql,[CaseId]);
    }

    addWHR(CaseId,Ratio,MeasurementDate) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_WHR(CaseId,Ratio,MeasurementDate) values (?,?,?)";
        return mgr.execSql(sql,[CaseId,Ratio,MeasurementDate]);
    }
    
    deleteWHR(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_WHR"; 
        return mgr.execSql(sql);
    }
}