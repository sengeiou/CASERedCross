import { DBMgr } from 'src/mgr/DBMgr';

export class SpecialtyServe {

    getSpecialtyId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Speciality where SpecialtyId=?";
        return mgr.execSql(sql, [id]);
    }

    getAllSpecialtyList(){
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Speciality";
        return mgr.execSql(sql);
    }

    addSpecialty(SpecialtyId,Name) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Speciality(SpecialtyId,Name) values (?,?)";
        return mgr.execSql(sql,[SpecialtyId,Name]);
    }
    
    deleteSpecialty(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_Speciality"; 
        return mgr.execSql(sql);
    }
}