import { DBMgr } from 'src/mgr/DBMgr';

export class WeightServe {

    getWeightId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Weight where id=?";
        return mgr.execSql(sql, [id]);
    }

    getAllWeightList(){
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Weight";
        return mgr.execSql(sql);
    }

    addWeight(CaseId,Weight,MeasurementDate) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Weight(CaseId,Weight,MeasurementDate) values (?,?,?)";
        return mgr.execSql(sql,[CaseId,Weight,MeasurementDate]);
    }
    
    deleteWeight(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_Weight"; 
        return mgr.execSql(sql);
    }
}