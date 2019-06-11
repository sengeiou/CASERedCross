import { DBMgr } from 'src/mgr/DBMgr';


export class PhoneServe  {

    getPhoneId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Phone where LocalId=?"; 
        // var sql = "DELETE FROM tb_home_visit"; 
        return mgr.execSql(sql, [id]);
    }

    getPhoneCaseId(CaseId) {
        var mgr = DBMgr.GetInstance();
        var sql = "select LocalId,CallDate,SavedStatus from tb_Phone where CaseId=? order by CallDate desc";
        return mgr.execSql(sql, [CaseId]);
    }

    savePhoneCaseId(CaseId,LocalId){
        var mgr = DBMgr.GetInstance();
        var sql = "update tb_Phone set CaseId=? where LocalId=?"; 
        return mgr.execSql(sql, [CaseId,LocalId]);
    }

    getAllPhoneList() {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Phone ";
        return mgr.execSql(sql);
    }

    getPhone_SavedStatus(SavedStatus) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Phone where SavedStatus=?";
        return mgr.execSql(sql,[SavedStatus]);
    }

    deletePhone(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_Phone ";
        return mgr.execSql(sql);
    }

    addPhoneWeb(CallDate,CallEndTime,CallStartTime,CaseId,Detail,DetailOther,OtherRemark,Status,SupportId,UserName){
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Phone (CallDate,CallEndTime,CallStartTime,CaseId,Detail,DetailOther,OtherRemark,Status,SupportId,UserName,SavedStatus) values (?,?,?,?,?,?,?,?,?,?,0)";
        return mgr.execSql(sql,[CallDate,CallEndTime,CallStartTime,CaseId,Detail,DetailOther,OtherRemark,Status,SupportId,UserName]);
    }

    addPhone(PhoneID,CaseId,CallDate,CallStartTime,CallEndTime,Detail,DetailOther,UserName,OtherRemark){
        var mgr = DBMgr.GetInstance();
        if(!PhoneID){
            var sql = "insert into tb_Phone (CaseId,CallDate,CallStartTime,CallEndTime,Detail,DetailOther,UserName,OtherRemark,Status,SavedStatus) values (?,?,?,?,?,?,?,?,2,1)";
            return mgr.execSql(sql,[CaseId,CallDate,CallStartTime,CallEndTime,Detail,DetailOther,UserName,OtherRemark]);

        }else{
            var sql = "update tb_Phone set CaseId=?,CallDate=?,CallStartTime=?,CallEndTime=?,Detail=?,DetailOther=?,UserName=?,OtherRemark=?,Status=2 where LocalId=?";
            return mgr.execSql(sql,[CaseId,CallDate,CallStartTime,CallEndTime,Detail,DetailOther,UserName,OtherRemark,PhoneID]);
        }
    }
}