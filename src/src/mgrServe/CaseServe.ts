import { DBMgr } from 'src/mgr/DBMgr';


export class CaseServe {

    getCaseId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Case where CaseId=?";
        return mgr.execSql(sql, [id]);
    }

    getCaseVolVisitGrpId(VolVisitGrpId) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Case where VolVisitGrpId=?";
        return mgr.execSql(sql, [VolVisitGrpId]);
    }

    getAllCaseList() {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Case  ";
        return mgr.execSql(sql);
    }

    getAllCasessList() {
        var mgr = DBMgr.GetInstance();
        var sql = "select c.id from tb_Case as c join tb_Activity as a where c.id=a.LocalID";
        return mgr.execSql(sql);
    }

    addCase(CaseId, CaseNo, QRCode, ChiName_Disply, Illness_Disply, OtherIllness_Disply, CarePlan_Disply, Height, VolVisitGrpId) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Case(CaseId,CaseNo,QRCode,ChiName_Disply,Illness_Disply,OtherIllness_Disply,CarePlan_Disply,Height,VolVisitGrpId) values (?,?,?,?,?,?,?,?,?)";
        return mgr.execSql(sql, [CaseId, CaseNo, QRCode, ChiName_Disply, Illness_Disply, OtherIllness_Disply, CarePlan_Disply, Height, VolVisitGrpId]);
    }

    deleteCase() {
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_Case";
        return mgr.execSql(sql);
    }

    getCaseAll() {
        var mgr = DBMgr.GetInstance();
        // var sql = "select c.*,a.* from tb_Case as c join tb_Activity as a  join tb_Phone as p "
        //     + "join tb_home_visit as h  join tb_MedicalRecord as m"
        //     + " where c.CaseId=a.CaseId  and c.CaseId=p.CaseId  and c.CaseId=h.CaseId  and c.CaseId=m.CaseId ";
        var sql = "select * from tb_Case  ";
        return mgr.execSql(sql);
    }


} 