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
        var sql = "select LocalID,activityDate,actType from tb_Activity where LocalID=?";
        return mgr.execSql(sql, [caseId]);
    }

    getActivity(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Activity where LocalID=?";
        return mgr.execSql(sql, [id]);
    }

    saveActivity(activityId, caseId, activityDate, activityStartTime, activityEndTime, presentVolunteer, actType, activityDetailType, remarks1, remarks2, remarks3, remarks4, otherActRemarks, otherContent) {
        var mgr = DBMgr.GetInstance();
        if (activityId) {
            var sql = "update tb_home_visit SET activityDate=?, activityStartTime=?, activityEndTime=?, presentVolunteer=?, actType=?,activityDetailType=?,remarks1=?,remarks2=?,remarks3=?,remarks4=?,otherActRemarks=?,otherContentwhere=? where LocalId=?";
            return mgr.execSql(sql, [activityDate, activityStartTime, activityEndTime, presentVolunteer, actType, activityDetailType, remarks1, remarks2, remarks3, remarks4, otherActRemarks, otherContent,activityId]);
        } else {
            var sql = "insert into tb_Activity (caseId,activityDate,activityStartTime,activityEndTime, presentVolunteer, actType,activityDetailType,remarks1,remarks2,remarks3,remarks4,otherActRemarks,otherContent) values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
            return mgr.execSql(sql, [caseId, activityDate, activityStartTime, activityEndTime, presentVolunteer, actType, activityDetailType, remarks1, remarks2, remarks3, remarks4, otherActRemarks, otherContent]);

        }
        
    }


}