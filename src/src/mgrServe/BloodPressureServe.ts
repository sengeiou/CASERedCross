import { DBMgr } from 'src/mgr/DBMgr';

export class BloodPressureServe {

    getBloodPressureId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_BloodPressure where id=?";
        return mgr.execSql(sql, [id]);
    }

    getAllBloodPressureList(){
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_BloodPressure";
        return mgr.execSql(sql);
    }

    addBloodPressureWeb(CaseId,Upper,Lower,MeasurementDate) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_BloodPressure(CaseId,Upper,Lower,MeasurementDate) values (?,?,?,?)";
        return mgr.execSql(sql,[CaseId,Upper,Lower,MeasurementDate]);
    }
    
    deleteBloodPressure(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_BloodPressure"; 
        return mgr.execSql(sql);
    }
}