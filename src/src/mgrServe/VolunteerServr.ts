import { DBMgr } from 'src/mgr/DBMgr';

export class VolunteerServr {

    getAllVolunteerList(){
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Volunteer ";
        return mgr.execSql(sql);
    }

    getVolunteerId(VolId) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Volunteer where VolId=?";
        return mgr.execSql(sql, [VolId]);
    }

   

    addVolunteer(VolId,VolunteerName) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Volunteer(VolId,VolunteerName) values (?,?)";
        return mgr.execSql(sql,[VolId,VolunteerName]);
    }
    
    deleteVolunteer(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_Volunteer"; 
        return mgr.execSql(sql);
    }
}