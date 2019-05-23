import { DBMgr } from 'src/mgr/DBMgr';


export class CaseServe {

    getCaseId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Case where id=?";
        return mgr.execSql(sql, [id]);
    }

    getAllCaseList() {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Case ";
        return mgr.execSql(sql);
    }

    getAllCasessList() {
        var mgr = DBMgr.GetInstance();
        var sql = "select c.id from tb_Case as c join tb_Activity as a where c.id=a.LocalID";
        return mgr.execSql(sql);
    }

    addCase() {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Case(CaseNo,QRCode,ChiName_Disply,Illness_Disply,OtherIllness_Disply,CarePlan_Disply) values ('WT201905','12555','风','没有病','没有病','天天睡觉')";
        return mgr.execSql(sql);
    }
} 