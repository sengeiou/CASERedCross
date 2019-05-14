import { DBMgr } from 'src/mgr/DBMgr';

export class HosiptalServe {

    getHosiptalId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Hosiptal where id=?";
        return mgr.execSql(sql, [id]);
    }

    addHosiptal(Name) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Hosiptal(Name) values (?)";
        return mgr.execSql(sql,[Name]);
    }
    
    deleteHosiptal(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_Hosiptal"; 
        return mgr.execSql(sql);
    }
}