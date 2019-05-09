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
        var sql = "select LocalID,activityDate,actType from tb_Activity where caseId=?";
        return mgr.execSql(sql, [caseId]);
    }

    getActivity(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Activity where id=?";
        return mgr.execSql(sql, [id]);
    }

    addActivity() {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Activity (ActivityID) values (0)";
        return mgr.execSql(sql);
    }

    addcase() {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Case (CaseNo,VolVisitGrpId,QRCode,ChiName_Disply,Illness_Disply,OtherIllness_Disply,CarePlan_Disply,Height) values ('WT2019011',1,'12255444','风','没有病','没有病','天天睡觉',22)";
        return mgr.execSql(sql);
    }
}