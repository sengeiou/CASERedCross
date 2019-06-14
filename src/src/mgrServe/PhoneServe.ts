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
        var sql = "select LocalId,CallDate,SavedStatus,CallDate_Display,Status from tb_Phone where CaseId=? order by CallDate asc";
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

    addPhoneWeb(CallDate,CallEndTime,CallStartTime,CaseId,Detail,DetailOther,OtherRemark,Status,SupportId,UserName,CannotContact,NextPhoneDate,NextPhoneTime,CallDate_Display){
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Phone (CallDate,CallEndTime,CallStartTime,CaseId,Detail,DetailOther,OtherRemark,Status,SupportId,UserName,CannotContact,NextPhoneDate,NextPhoneTime,CallDate_Display,SavedStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,0)";
        return mgr.execSql(sql,[CallDate,CallEndTime,CallStartTime,CaseId,Detail,DetailOther,OtherRemark,Status,SupportId,UserName,CannotContact,NextPhoneDate,NextPhoneTime,CallDate_Display]);
    }

    addPhone(PhoneID,CaseId,CallDate,CallDate_Display,CallStartTime,CallEndTime,Detail,DetailOther,UserName,OtherRemark,CannotContact,NextPhoneDate,NextPhoneTime){
        var mgr = DBMgr.GetInstance();
        if(!PhoneID){
            var sql = "insert into tb_Phone (CaseId,CallDate,CallDate_Display,CallStartTime,CallEndTime,Detail,DetailOther,UserName,OtherRemark,Status,SavedStatus,CannotContact,NextPhoneDate,NextPhoneTime) values (?,?,?,?,?,?,?,?,?,2,1,?,?,?)";
            return mgr.execSql(sql,[CaseId,CallDate,CallDate_Display,CallStartTime,CallEndTime,Detail,DetailOther,UserName,OtherRemark,CannotContact,NextPhoneDate,NextPhoneTime]);
        }else{
            var sql = "update tb_Phone set CaseId=?,CallDate=?,CallDate_Display=?,CallStartTime=?,CallEndTime=?,Detail=?,DetailOther=?,UserName=?,OtherRemark=?,CannotContact=?,NextPhoneDate=?,NextPhoneTime=?,Status=2,SavedStatus=1 where LocalId=?";
            return mgr.execSql(sql,[CaseId,CallDate,CallDate_Display,CallStartTime,CallEndTime,Detail,DetailOther,UserName,OtherRemark,CannotContact,NextPhoneDate,NextPhoneTime,PhoneID]);
        }
    }

    sevaPhoneSavedStatus(id){
        var mgr = DBMgr.GetInstance();
        var sql = "update  tb_Phone SET SavedStatus=0,Status=0 where LocalID=?";
        return mgr.execSql(sql,[id]);
    }
}