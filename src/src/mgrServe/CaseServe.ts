import { DBMgr } from 'src/mgr/DBMgr';


export class CaseServe  {

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
} 