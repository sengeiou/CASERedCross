import { DBMgr } from 'src/mgr/DBMgr';


export class VisitServe  {

    getVisitId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_home_visit where LocalId=?"; 
        // var sql = "DELETE FROM tb_home_visit"; 
        return mgr.execSql(sql, [id]);
    }

    getAllVisitList() {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_home_visit ";
        return mgr.execSql(sql);
    }

    
    getVisitCaseId(CaseId) {
        var mgr = DBMgr.GetInstance();
        var sql = "select LocalId,ScheduleDate,SavedStatus from tb_home_visit where CaseId=?";
        return mgr.execSql(sql, [CaseId]);
    }

    addVisit_yuyue(visitId,data,time,CaseId){
        var mgr = DBMgr.GetInstance();
        if(!visitId){
            var sql = "insert into tb_home_visit (ScheduleDate,ScheduleTime,CaseId) values (?,?,?)";
            return mgr.execSql(sql,[data,time,CaseId]);

        }else{
            var sql = "update tb_home_visit set ScheduleDate=?,ScheduleTime=? where LocalId=?";
            return mgr.execSql(sql,[data,time,visitId]);
        }
    }

    addVisit_neurou(visitId,VisitDate,VisitStartTime,VisitEndTime,presentVolunteer,supportVolunteer,Location,LocationRemarks,VisitStatus,VisitStatusRemarks,CaseId){
        var mgr = DBMgr.GetInstance();
        if(!visitId){
            var sql = "insert into tb_home_visit (VisitDate,VisitStartTime,VisitEndTime,presentVolunteer,supportVolunteer,Location,LocationRemarks,VisitStatus,VisitStatusRemarks) values (?,?,?,?,?,?,?,?,?)";
            return mgr.execSql(sql,[VisitDate,VisitStartTime,VisitEndTime,presentVolunteer,supportVolunteer,Location,LocationRemarks,VisitStatus,VisitStatusRemarks,CaseId]);

        }else{
            var sql = "update tb_home_visit SET VisitDate=?,VisitStartTime=?,VisitEndTime=?,presentVolunteer=?,supportVolunteer=?,Location=?,LocationRemarks=?,VisitStatus=?,VisitStatusRemarks=? where LocalId=?";
            return mgr.execSql(sql,[VisitDate,VisitStartTime,VisitEndTime,presentVolunteer,supportVolunteer,Location,LocationRemarks,VisitStatus,VisitStatusRemarks,visitId]);
        }
    }
}