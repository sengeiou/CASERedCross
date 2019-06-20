import { DBMgr } from 'src/mgr/DBMgr';

export class MedicalRecordServe {
    getMedicalRecordId(id){
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_MedicalRecord where LocalId=?";
        return mgr.execSql(sql,[id]);
    }
    getAllMedicalRecordList(CaseId) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_MedicalRecord where CaseId=?";
        return mgr.execSql(sql,[CaseId]);
    }

    getAllMedicalRecor_SavedStatus(SavedStatus) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_MedicalRecord where SavedStatus=?";
        return mgr.execSql(sql,[SavedStatus]);
    }

    getAllMedicalRecor_SavedStatus2(SavedStatus,CaseId) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_MedicalRecord where SavedStatus=? and CaseId=?";
        return mgr.execSql(sql,[SavedStatus,CaseId]);
    }

    addMedicalRecord(AppointmentDate,AppointmentTime,Description,Reason,Hosp,Specialty,CaseId,Status){
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_MedicalRecord(AppointmentDate,AppointmentTime,Description,Reason,Hosp,Specialty,CaseId,Status,SavedStatus,AppointmentId) values (?,?,?,?,?,?,?,?,1,0)";
        return mgr.execSql(sql,[AppointmentDate,AppointmentTime,Description,Reason,Hosp,Specialty,CaseId,Status]);
    }

    addMedicalRecordWeb(AppointmentId,AppointmentDate,AppointmentTime,Description,Reason,Hosp,Specialty,CaseId){
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_MedicalRecord(AppointmentId,AppointmentDate,AppointmentTime,Description,Reason,Hosp,Specialty,CaseId,Status,SavedStatus) values (?,?,?,?,?,?,?,?,1,0)";
        return mgr.execSql(sql,[AppointmentId,AppointmentDate,AppointmentTime,Description,Reason,Hosp,Specialty,CaseId]);
    }

    saveMedicalRecord(AppointmentDate,AppointmentTime,Hosp,Specialty,Description,Reason,Status,LocalId){
        var mgr = DBMgr.GetInstance();
        var sql = "update tb_MedicalRecord SET AppointmentDate=?,AppointmentTime=?,Hosp=?,Specialty=?,Description=?,Reason=?,Status=?,SavedStatus=1 where LocalId=?";
        return mgr.execSql(sql,[AppointmentDate,AppointmentTime,Hosp,Specialty,Description,Reason,Status,LocalId]);
    }

    saveMedicalRecord_SavedStatus(SavedStatus,LocalId){
        var mgr = DBMgr.GetInstance();
        var sql = "update tb_MedicalRecord SET SavedStatus=? where LocalId=?";
        return mgr.execSql(sql,[SavedStatus,LocalId]);
    }

    addMedicalRecordHospSpecialty(Hosp,Specialty,CaseId){
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_MedicalRecord(Hosp,Specialty,CaseId,Status) values (?,?,?,1)";
        return mgr.execSql(sql,[Hosp,Specialty,CaseId]);
    }

    deleteMedicalRecord(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_MedicalRecord";
        return mgr.execSql(sql);
    }

    deleteMedicalRecord_id(id){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_MedicalRecord where LocalId=?";
        return mgr.execSql(sql,[id]);
    }

}