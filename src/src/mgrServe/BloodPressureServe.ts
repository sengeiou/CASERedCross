import { DBMgr } from 'src/mgr/DBMgr';

export class BloodPressureServe {

    getBloodPressureId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_BloodPressure where id=?";
        return mgr.execSql(sql, [id]);
    }

    getAllBloodPressureList(CaseId){
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_BloodPressure where CaseId=?";
        return mgr.execSql(sql,[CaseId]);
    }

    getAllBloodPressureList_Lower(CaseId){
        var mgr = DBMgr.GetInstance();
        var sql = "select Lower,MeasurementDate,CaseId from tb_BloodPressure where CaseId=?";
        return mgr.execSql(sql,[CaseId]);
    }

    getAllBloodPressureList_Upper(CaseId){
        var mgr = DBMgr.GetInstance();
        var sql = "select Upper,MeasurementDate,CaseId from tb_BloodPressure where CaseId=?";
        return mgr.execSql(sql,[CaseId]);
    }

    addBloodPressureWeb(CaseId,Upper,Lower,date_swift_chart_display) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_BloodPressure(CaseId,Upper,Lower,MeasurementDate) values (?,?,?,?)";
        return mgr.execSql(sql,[CaseId,Upper,Lower,date_swift_chart_display]);
    }
    
    deleteBloodPressure(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_BloodPressure"; 
        return mgr.execSql(sql);
    }
}