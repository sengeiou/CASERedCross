import { DBMgr } from 'src/mgr/DBMgr';

export class SpecialtyServe {

    getSpecialtyId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Speciality where id=?";
        return mgr.execSql(sql, [id]);
    }

    addSpecialty(Name) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Speciality(Name) values (?)";
        return mgr.execSql(sql,[Name]);
    }
    
    deleteSpecialty(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_Speciality"; 
        return mgr.execSql(sql);
    }
}