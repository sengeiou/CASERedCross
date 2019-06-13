import { DBMgr } from 'src/mgr/DBMgr';

export class VolunteerServr {

    getAllVolunteerList(){
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Volunteer ";
        return mgr.execSql(sql);
    }

    getAllVolunteerList_VolType(VolType){
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Volunteer where VolType=?";
        return mgr.execSql(sql,[VolType]);
    }

    getVolunteerId(VolId) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Volunteer where VolId=?";
        return mgr.execSql(sql, [VolId]);
    }

   

    addVolunteer(VolId,VolGrpId,VolunteerName,VolType) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Volunteer(VolId,VolGrpId,VolunteerName,VolType) values (?,?,?,?)";
        return mgr.execSql(sql,[VolId,VolGrpId,VolunteerName,VolType]);
    }
    
    deleteVolunteer(){
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_Volunteer"; 
        return mgr.execSql(sql);
    }
}