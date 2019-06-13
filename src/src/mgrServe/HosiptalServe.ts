import { DBMgr } from 'src/mgr/DBMgr';

export class HosiptalServe {

    getHosiptalId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Hosiptal where HospId=?";
        return mgr.execSql(sql, [id]);
    }

    getAllHosiptalList(){
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Hosiptal";
        return mgr.execSql(sql);
    }

    addHosiptal(HospId,Name) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Hosiptal(HospId,Name) values (?,?)";
        return mgr.execSql(sql,[HospId,Name]);
    }
    
    deleteHosiptal(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_Hosiptal"; 
        return mgr.execSql(sql);
    }
}