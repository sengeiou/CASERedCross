import { DBMgr } from 'src/mgr/DBMgr';

export class VolunteerServr {

    getVolunteerId(VolId) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_Volunteer where VolId=?";
        return mgr.execSql(sql, [VolId]);
    }

    addVolunteer(VolGrpId,VolId,VolunteerName) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_Volunteer(VolGrpId,VolId,VolunteerName) values (?,?,?)";
        return mgr.execSql(sql,[VolGrpId,VolId,VolunteerName]);
    }
}