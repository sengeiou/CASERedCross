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
        var sql = "select LocalId,CallDate,SavedStatus from tb_Phone where CaseId=?";
        return mgr.execSql(sql, [CaseId]);
    }

    getAllPhoneList() {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Phone ";
        return mgr.execSql(sql);
    }

    addPhone(PhoneID,CaseId,CallDate,CallStartTime,CallEndTime,Detail,DetailOther,UserName,OtherRemark){
        var mgr = DBMgr.GetInstance();
        if(!PhoneID){
            var sql = "insert into tb_Phone (CaseId,CallDate,CallStartTime,CallEndTime,Detail,DetailOther,UserName,OtherRemark) values (?,?,?,?,?,?,?,?)";
            return mgr.execSql(sql,[CaseId,CallDate,CallStartTime,CallEndTime,Detail,DetailOther,UserName,OtherRemark]);

        }else{
            var sql = "update tb_Phone set CaseId=?,CallDate=?,CallStartTime=?,CallEndTime=?,Detail=?,DetailOther=?,UserName=?,OtherRemark=? where LocalId=?";
            return mgr.execSql(sql,[CaseId,CallDate,CallStartTime,CallEndTime,Detail,DetailOther,UserName,OtherRemark,PhoneID]);
        }
    }
}