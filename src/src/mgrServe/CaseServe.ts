import { DBMgr } from 'src/mgr/DBMgr';


export class CaseServe  {
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