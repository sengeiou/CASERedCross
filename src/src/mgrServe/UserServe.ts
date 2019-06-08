import { DBMgr } from 'src/mgr/DBMgr';

export class UserServe  {

    getUserNumber(number) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from USER where number=? ";
        return mgr.execSql(sql, [number]);
    }

    getUser(number,password) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from USER where number=? and password=?";
        return mgr.execSql(sql, [number,password]);
    }

    getAllUserList() {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from USER ";
        return mgr.execSql(sql);
    }

    
} 