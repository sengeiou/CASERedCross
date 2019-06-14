import { DBMgr } from 'src/mgr/DBMgr';
import { ServiceApi } from 'src/providers/service.api';

export class ActivityServe {
    // public getAllActivityList(id){
    //     var mgr=DBMgr.GetInstance();
    //     var sql="select * from tb_Activity where id=?";
    //     return mgr.execSql(sql,[id]);
    // }

    getAllActivityList() {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Activity ";
        return mgr.execSql(sql);
    }

    getAllActivityListCaseId(caseId) {
        var mgr = DBMgr.GetInstance();
        var sql = "select LocalID,ActDate,ActType,Status,ActDate_Display from tb_Activity where CaseId=? order by ActDate asc";
        return mgr.execSql(sql, [caseId]);
    }

    getActivity(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Activity where LocalID=?";
        return mgr.execSql(sql, [id]);
    }

    getActivity_SavedStatus(SavedStatus) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Activity where SavedStatus=?";
        return mgr.execSql(sql,[SavedStatus]);
    }

    saveActivity(ActivityId, CaseId, ActDate, ActStartTime, ActEndTime, presentVolunteer, ActType, ActDetailType, Remarks1, Remarks2, Remarks3, Remarks4, OtherActRemarks, Remarks,ActDate_Display) {
        var mgr = DBMgr.GetInstance();
        if (ActivityId) {
            var sql = "update tb_Activity SET ActDate=?, ActStartTime=?, ActEndTime=?, presentVolunteer=?, ActType=?,ActDetailType=?,Remarks1=?,Remarks2=?,Remarks3=?,Remarks4=?,OtherActRemarks=?,Remarks=?,SavedStatus=1,ActDate_Display=? where LocalId=?";
            return mgr.execSql(sql, [ActDate, ActStartTime, ActEndTime, presentVolunteer, ActType, ActDetailType, Remarks1, Remarks2, Remarks3, Remarks4, OtherActRemarks, Remarks,ActDate_Display, ActivityId]);
        } else {
            var sql = "insert into tb_Activity (CaseId,ActDate,ActStartTime,ActEndTime, presentVolunteer, ActType,ActDetailType,Remarks1,Remarks2,Remarks3,Remarks4,OtherActRemarks,Remarks,Status,SavedStatus,ActivityId,ActDate_Display) values (?,?,?,?,?,?,?,?,?,?,?,?,?,2,1,0,?)";
            return mgr.execSql(sql, [CaseId, ActDate, ActStartTime, ActEndTime, presentVolunteer, ActType, ActDetailType, Remarks1, Remarks2, Remarks3, Remarks4, OtherActRemarks, Remarks,ActDate_Display]);

        }
    }

    addActivityWeb(ActivityId, CaseId, ActDate, ActStartTime, ActEndTime, presentVolunteer, ActType, ActDetailType, Remarks1, Remarks2, Remarks3, Remarks4, OtherActRemarks, Remarks,ActDate_Display,Status,) {
        var mgr = DBMgr.GetInstance(); 
        var sql = "insert into tb_Activity (ActivityId,CaseId,ActDate,ActStartTime,ActEndTime, presentVolunteer, ActType,ActDetailType,Remarks1,Remarks2,Remarks3,Remarks4,OtherActRemarks,Remarks,ActDate_Display,Status,SavedStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0)";
        return mgr.execSql(sql, [ActivityId,CaseId, ActDate, ActStartTime, ActEndTime, presentVolunteer, ActType, ActDetailType, Remarks1, Remarks2, Remarks3, Remarks4, OtherActRemarks, Remarks,ActDate_Display,Status]);
    }

    sevaActivitySavedStatus(id){
        var mgr = DBMgr.GetInstance();
        var sql = "update  tb_Activity SET SavedStatus=0,Status=0  where LocalID=?";
        return mgr.execSql(sql,[id]);
    }

    deleteActivity(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_Activity";
        return mgr.execSql(sql);
    }


}