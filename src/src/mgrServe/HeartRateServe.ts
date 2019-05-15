import { DBMgr } from 'src/mgr/DBMgr';

export class HeartRateServe {

    getHeartRateId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_HeartRate where id=?";
        return mgr.execSql(sql, [id]);
    }

    getAllHeartRateList(){
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_HeartRate";
        return mgr.execSql(sql);
    }

    addHeartRate(CaseId,RatePerMin,MeasurementDate) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_HeartRate(CaseId,RatePerMin,MeasurementDate) values (?,?,?)";
        return mgr.execSql(sql,[CaseId,RatePerMin,MeasurementDate]);
    }
    
    deleteHeartRate(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_HeartRate"; 
        return mgr.execSql(sql);
    }
}