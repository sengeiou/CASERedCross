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

    addMedicalRecord(AppointmentDate,AppointmentTime,Description,Reason,Hosp,Specialty,CaseId){
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_MedicalRecord(AppointmentDate,AppointmentTime,Description,Reason,Hosp,Specialty,CaseId,Status) values (?,?,?,?,?,?,?,1)";
        return mgr.execSql(sql,[AppointmentDate,AppointmentTime,Description,Reason,Hosp,Specialty,CaseId]);
    }

    saveMedicalRecord(AppointmentDate,AppointmentTime,Hosp,Specialty,Description,Reason,Status,LocalId){
        var mgr = DBMgr.GetInstance();
        var sql = "update tb_MedicalRecord SET AppointmentDate=?,AppointmentTime=?,Hosp=?,Specialty=?,Description=?,Reason=?,Status=? where LocalId=?";
        return mgr.execSql(sql,[AppointmentDate,AppointmentTime,Hosp,Specialty,Description,Reason,Status,LocalId]);
    }

    addMedicalRecordHospSpecialty(Hosp,Specialty,CaseId){
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_MedicalRecord(Hosp,Specialty,CaseId,Status) values (?,?,?,1)";
        return mgr.execSql(sql,[Hosp,Specialty,CaseId]);
    }

}