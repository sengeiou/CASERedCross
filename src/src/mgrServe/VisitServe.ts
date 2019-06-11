import { DBMgr } from 'src/mgr/DBMgr';


export class VisitServe {

    getVisitId(id) {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_home_visit where LocalId=? order by ScheduleDate desc";
        // var sql = "DELETE FROM tb_home_visit"; 
        return mgr.execSql(sql, [id]);
    }

    getVisit_SavedStatus(SavedStatus){
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_home_visit where SavedStatus=?";
     
        return mgr.execSql(sql, [SavedStatus]);
    }

    getAllVisitList() {
        var mgr = DBMgr.GetInstance();
        var sql = "select * from tb_home_visit ";
        return mgr.execSql(sql);
    }

    getAllVisitScheduleDate(CaseId) {
        var mgr = DBMgr.GetInstance();
        var sql = "select ScheduleDate,ScheduleTime from tb_home_visit where CaseId=? and ScheduleDate>datetime('now') ORDER BY ScheduleDate asc limit 1";
        return mgr.execSql(sql, [CaseId]);
    }


    getVisitCaseId(CaseId) {
        var mgr = DBMgr.GetInstance();
        var sql = "select LocalId,ScheduleDate,SavedStatus from tb_home_visit where CaseId=? order by ScheduleDate desc";
        return mgr.execSql(sql, [CaseId]);
    }

    saveVisitCaseId(CaseId, LocalId) {
        var mgr = DBMgr.GetInstance();
        var sql = "update tb_home_visit set CaseId=? where LocalId=?";
        return mgr.execSql(sql, [CaseId, LocalId]);
    }

    deleteVisit() {
        var mgr = DBMgr.GetInstance();
        var sql = "DELETE FROM tb_home_visit";
        return mgr.execSql(sql);
    }

    addVisit( Bmi, CaseId, CategoryTopic1, CategoryTopic2, CategoryTopic3,  EmotionAssessment, EmotionAssessmentRemarks, Hip,  LifeStyleMeasureBloodPressure, LifeStyleMeasureBloodSuger, LifeStyleMeasureBpLocation, LifeStyleMeasureBpNoOfTime, LifeStyleMeasureBpPeriod, LifeStyleMeasureBsLocation, LifeStyleMeasureBsNoOfTime, LifeStyleMeasureBsPeriod, LifeStyleQuestion1, LifeStyleQuestion2, LifeStyleQuestion3, LifeStyleQuestion4, LifeStyleQuestion5, LifeStyleQuestion6, Location, LocationRemarks, OtherAccident, OtherAccidentNoOfDay, OtherHospDisbete, OtherHospDisbeteNoOfDay, OtherHospHighBp, OtherHospHighBpNoOfDay, OtherHospOtherIllness, OtherHospOtherIllnessNoOfDay, OtherRemarks, OtherSpecialNeed, OtherSpecialNeedService, ScheduleDate,  ScheduleTime, Status, TaskId,   VisitDate,  VisitDetailIndoor, VisitDetailIndoorRemarks, VisitDetailOther, VisitDetailOutdoor, VisitDetailOutdoorRemarks, VisitEndTime, VisitId, VisitStartTime, VisitStatus, VisitStatusRemarks, WHRatio, Waist, Weight,NeedsContent) {
        // alert(LifeStyleQuestion1)
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_home_visit ( Bmi, CaseId, CategoryTopic1, CategoryTopic2, CategoryTopic3, EmotionAssessment, EmotionAssessmentRemarks,  Hip, LifeStyleMeasureBloodPressure, LifeStyleMeasureBloodSuger, LifeStyleMeasureBpLocation, LifeStyleMeasureBpNoOfTime, LifeStyleMeasureBpPeriod, LifeStyleMeasureBsLocation, LifeStyleMeasureBsNoOfTime, LifeStyleMeasureBsPeriod, LifeStyleQuestion1, LifeStyleQuestion2, LifeStyleQuestion3, LifeStyleQuestion4, LifeStyleQuestion5,LifeStyleQuestion6,Location, LocationRemarks, OtherAccident, OtherAccidentNoOfDay,  OtherHospDisbete,OtherHospDisbeteNoOfDay,OtherHospHighBp,OtherHospHighBpNoOfDay,OtherHospOtherIllness,OtherHospOtherIllnessNoOfDay,OtherRemarks,OtherSpecialNeed,OtherSpecialNeedService,ScheduleDate,ScheduleTime,Status,TaskId,VisitDate,VisitDetailIndoor, VisitDetailIndoorRemarks, VisitDetailOther,VisitDetailOutdoor,VisitDetailOutdoorRemarks,VisitEndTime,VisitId,VisitStartTime,VisitStatus,VisitStatusRemarks,WHRatio ,Waist, Weight,SavedStatus,NeedsContent) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,?)";
        return mgr.execSql(sql, [ Bmi, CaseId, CategoryTopic1, CategoryTopic2, CategoryTopic3, EmotionAssessment, EmotionAssessmentRemarks,  Hip,  LifeStyleMeasureBloodPressure, LifeStyleMeasureBloodSuger, LifeStyleMeasureBpLocation, LifeStyleMeasureBpNoOfTime, LifeStyleMeasureBpPeriod, LifeStyleMeasureBsLocation, LifeStyleMeasureBsNoOfTime, LifeStyleMeasureBsPeriod, LifeStyleQuestion1, LifeStyleQuestion2, LifeStyleQuestion3, LifeStyleQuestion4, LifeStyleQuestion5, LifeStyleQuestion6, Location, LocationRemarks, OtherAccident, OtherAccidentNoOfDay, OtherHospDisbete, OtherHospDisbeteNoOfDay, OtherHospHighBp, OtherHospHighBpNoOfDay, OtherHospOtherIllness, OtherHospOtherIllnessNoOfDay, OtherRemarks, OtherSpecialNeed, OtherSpecialNeedService, ScheduleDate,  ScheduleTime, Status, TaskId,  VisitDate,  VisitDetailIndoor, VisitDetailIndoorRemarks, VisitDetailOther, VisitDetailOutdoor, VisitDetailOutdoorRemarks, VisitEndTime, VisitId, VisitStartTime, VisitStatus, VisitStatusRemarks, WHRatio, Waist, Weight,NeedsContent]);
    }


    addVisitWeb( Bmi, CaseId, CategoryTopic1, CategoryTopic2, CategoryTopic3,  EmotionAssessment, EmotionAssessmentRemarks, Hip,  LifeStyleMeasureBloodPressure, LifeStyleMeasureBloodSuger, LifeStyleMeasureBpLocation, LifeStyleMeasureBpNoOfTime, LifeStyleMeasureBpPeriod, LifeStyleMeasureBsLocation, LifeStyleMeasureBsNoOfTime, LifeStyleMeasureBsPeriod, LifeStyleQuestion1, LifeStyleQuestion2, LifeStyleQuestion3, LifeStyleQuestion4, LifeStyleQuestion5, LifeStyleQuestion6, Location, LocationRemarks, OtherAccident, OtherAccidentNoOfDay, OtherHospDisbete, OtherHospDisbeteNoOfDay, OtherHospHighBp, OtherHospHighBpNoOfDay, OtherHospOtherIllness, OtherHospOtherIllnessNoOfDay, OtherRemarks, OtherSpecialNeed, OtherSpecialNeedService, ScheduleDate,  ScheduleTime, Status, TaskId,   VisitDate,  VisitDetailIndoor, VisitDetailIndoorRemarks, VisitDetailOther, VisitDetailOutdoor, VisitDetailOutdoorRemarks, VisitEndTime, VisitId, VisitStartTime, VisitStatus, VisitStatusRemarks, WHRatio, Waist, Weight) {
        var mgr = DBMgr.GetInstance();
        var sql = "insert into tb_home_visit ( Bmi, CaseId, CategoryTopic1, CategoryTopic2, CategoryTopic3, EmotionAssessment, EmotionAssessmentRemarks,  Hip, LifeStyleMeasureBloodPressure, LifeStyleMeasureBloodSuger, LifeStyleMeasureBpLocation, LifeStyleMeasureBpNoOfTime, LifeStyleMeasureBpPeriod, LifeStyleMeasureBsLocation, LifeStyleMeasureBsNoOfTime, LifeStyleMeasureBsPeriod, LifeStyleQuestion1, LifeStyleQuestion2, LifeStyleQuestion3, LifeStyleQuestion4, LifeStyleQuestion5,LifeStyleQuestion6,Location, LocationRemarks, OtherAccident, OtherAccidentNoOfDay,  OtherHospDisbete,OtherHospDisbeteNoOfDay,OtherHospHighBp,OtherHospHighBpNoOfDay,OtherHospOtherIllness,OtherHospOtherIllnessNoOfDay,OtherRemarks,OtherSpecialNeed,OtherSpecialNeedService,ScheduleDate,ScheduleTime,Status,TaskId,VisitDate,VisitDetailIndoor, VisitDetailIndoorRemarks, VisitDetailOther,VisitDetailOutdoor,VisitDetailOutdoorRemarks,VisitEndTime,VisitId,VisitStartTime,VisitStatus,VisitStatusRemarks,WHRatio ,Waist, Weight,SavedStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0)";
        return mgr.execSql(sql, [ Bmi, CaseId, CategoryTopic1, CategoryTopic2, CategoryTopic3, EmotionAssessment, EmotionAssessmentRemarks,  Hip,  LifeStyleMeasureBloodPressure, LifeStyleMeasureBloodSuger, LifeStyleMeasureBpLocation, LifeStyleMeasureBpNoOfTime, LifeStyleMeasureBpPeriod, LifeStyleMeasureBsLocation, LifeStyleMeasureBsNoOfTime, LifeStyleMeasureBsPeriod, LifeStyleQuestion1, LifeStyleQuestion2, LifeStyleQuestion3, LifeStyleQuestion4, LifeStyleQuestion5, LifeStyleQuestion6, Location, LocationRemarks, OtherAccident, OtherAccidentNoOfDay, OtherHospDisbete, OtherHospDisbeteNoOfDay, OtherHospHighBp, OtherHospHighBpNoOfDay, OtherHospOtherIllness, OtherHospOtherIllnessNoOfDay, OtherRemarks, OtherSpecialNeed, OtherSpecialNeedService, ScheduleDate,  ScheduleTime, Status, TaskId,  VisitDate,  VisitDetailIndoor, VisitDetailIndoorRemarks, VisitDetailOther, VisitDetailOutdoor, VisitDetailOutdoorRemarks, VisitEndTime, VisitId, VisitStartTime, VisitStatus, VisitStatusRemarks, WHRatio, Waist, Weight]);
    }

    

    addVisit_yuyue(visitId, data, time, CaseId) {
        var mgr = DBMgr.GetInstance();
        if (!visitId) {
            var sql = "insert into tb_home_visit (ScheduleDate,ScheduleTime,CaseId) values (?,?,?)";
            return mgr.execSql(sql, [data, time, CaseId]);

        } else {
            var sql = "update tb_home_visit set ScheduleDate=?,ScheduleTime=? where LocalId=?";
            return mgr.execSql(sql, [data, time, visitId]);
        }
    }

    addVisit_neurou(visitId, VisitDate, VisitStartTime, VisitEndTime, presentVolunteer, supportVolunteer, Location, LocationRemarks, VisitStatus, VisitStatusRemarks, CaseId) {
        var mgr = DBMgr.GetInstance();
        if (!visitId) {
            var sql = "insert into tb_home_visit (VisitDate,VisitStartTime,VisitEndTime,presentVolunteer,supportVolunteer,Location,LocationRemarks,VisitStatus,VisitStatusRemarks,CaseId) values (?,?,?,?,?,?,?,?,?,?)";
            return mgr.execSql(sql, [VisitDate, VisitStartTime, VisitEndTime, presentVolunteer, supportVolunteer, Location, LocationRemarks, VisitStatus, VisitStatusRemarks, CaseId]);

        } else {
            var sql = "update tb_home_visit SET VisitDate=?,VisitStartTime=?,VisitEndTime=?,presentVolunteer=?,supportVolunteer=?,Location=?,LocationRemarks=?,VisitStatus=?,VisitStatusRemarks=? where LocalId=?";
            return mgr.execSql(sql, [VisitDate, VisitStartTime, VisitEndTime, presentVolunteer, supportVolunteer, Location, LocationRemarks, VisitStatus, VisitStatusRemarks, visitId]);
        }
    }

    saveService_neurou(visitId, VisitDetailIndoor, VisitDetailIndoorRemarks, VisitDetailOutdoor, VisitDetailOutdoorRemarks, VisitDetailOther, CategoryTopic1, CategoryTopic2, CategoryTopic3, CaseId) {
        var mgr = DBMgr.GetInstance();
        if (!visitId) {
            var sql = "insert into tb_home_visit (VisitDetailIndoor,VisitDetailIndoorRemarks,VisitDetailOutdoor,VisitDetailOutdoorRemarks,VisitDetailOther,CategoryTopic1,CategoryTopic2,CategoryTopic3,CaseId) values (?,?,?,?,?,?,?,?,?)";
            return mgr.execSql(sql, [VisitDetailIndoor, VisitDetailIndoorRemarks, VisitDetailOutdoor, VisitDetailOutdoorRemarks, VisitDetailOther, CategoryTopic1, CategoryTopic2, CategoryTopic3, CaseId]);

        } else {
            var sql = "update tb_home_visit SET VisitDetailIndoor=?,VisitDetailIndoorRemarks=?,VisitDetailOutdoor=?,VisitDetailOutdoorRemarks=?,VisitDetailOther=?,CategoryTopic1=?,CategoryTopic2=?,CategoryTopic3=? where LocalId=?";
            return mgr.execSql(sql, [VisitDetailIndoor, VisitDetailIndoorRemarks, VisitDetailOutdoor, VisitDetailOutdoorRemarks, VisitDetailOther, CategoryTopic1, CategoryTopic2, CategoryTopic3, visitId]);
        }
    }

    saveHeightWeight(visitId, Weight, Bmi, Waist, Hip, WHRatio, SYS1, DlA1, SYS2, DlA2, heartBeats1, heartBeats2, CaseId) {
        var mgr = DBMgr.GetInstance();
        if (!visitId) {
            var sql = "insert into tb_home_visit (Weight,Bmi,Waist,Hip,WHRatio,SYS1,DlA1,SYS2,DlA2,heartBeats1,heartBeats2,CaseId) values (?,?,?,?,?,?,?,?,?,?,?,?)";
            return mgr.execSql(sql, [Weight, Bmi, Waist, Hip, WHRatio, SYS1, DlA1, SYS2, DlA2, heartBeats1, heartBeats2, CaseId]);

        } else {
            var sql = "update tb_home_visit SET Weight=?,Bmi=?,Waist=?,Hip=?,WHRatio=?,SYS1=?,DlA1=?,SYS2=?,DlA2=?,heartBeats1=?,heartBeats2=? where LocalId=?";
            return mgr.execSql(sql, [Weight, Bmi, Waist, Hip, WHRatio, SYS1, DlA1, SYS2, DlA2, heartBeats1, heartBeats2, visitId]);
        }
    }

    saveLifeHabit(visitId, LifeStyleQuestion1, LifeStyleQuestion2, LifeStyleQuestion3, LifeStyleQuestion4, LifeStyleQuestion5, LifeStyleQuestion6, CaseId) {
        var mgr = DBMgr.GetInstance();
        if (!visitId) {
            var sql = "insert into tb_home_visit (LifeStyleQuestion1,LifeStyleQuestion2,LifeStyleQuestion3,LifeStyleQuestion4,LifeStyleQuestion5,LifeStyleQuestion6,CaseId) values (?,?,?,?,?,?,?)";
            return mgr.execSql(sql, [LifeStyleQuestion1, LifeStyleQuestion2, LifeStyleQuestion3, LifeStyleQuestion4, LifeStyleQuestion5, LifeStyleQuestion6, CaseId]);

        } else {
            var sql = "update tb_home_visit SET LifeStyleQuestion1=?,LifeStyleQuestion2=?,LifeStyleQuestion3=?,LifeStyleQuestion4=?,LifeStyleQuestion5=?,LifeStyleQuestion6=? where LocalId=?";
            return mgr.execSql(sql, [LifeStyleQuestion1, LifeStyleQuestion2, LifeStyleQuestion3, LifeStyleQuestion4, LifeStyleQuestion5, LifeStyleQuestion6, visitId]);
        }
    }

    saveEmotion(visitId, EmotionAssessment, CaseId) {
        var mgr = DBMgr.GetInstance();
        if (!visitId) {
            var sql = "insert into tb_home_visit (EmotionAssessment,CaseId) values (?,?)";
            return mgr.execSql(sql, [EmotionAssessment, CaseId]);

        } else {
            var sql = "update tb_home_visit SET EmotionAssessment=? where LocalId=?";
            return mgr.execSql(sql, [EmotionAssessment, visitId]);
        }
    }

    savaOtherSupplement(visitId, OtherHospDisbete, OtherHospDisbeteNoOfDay, OtherHospHighBp, OtherHospHighBpNoOfDay, OtherHospOtherIllness, OtherHospOtherIllnessNoOfDay, OtherAccident, OtherAccidentNoOfDay, OtherSpecialNeed, OtherSpecialNeedService, OtherRemarks, CaseId) {
        var mgr = DBMgr.GetInstance();
        if (!visitId) {
            var sql = "insert into tb_home_visit (OtherHospDisbete,OtherHospDisbeteNoOfDay,OtherHospHighBp,OtherHospHighBpNoOfDay,OtherHospOtherIllness,OtherHospOtherIllnessNoOfDay,OtherAccident,OtherAccidentNoOfDay,OtherSpecialNeed,OtherSpecialNeedService,OtherRemarks,CaseId) values (?,?,?,?,?,?,?,?,?,?,?,?)";
            return mgr.execSql(sql, [OtherHospDisbete, OtherHospDisbeteNoOfDay, OtherHospHighBp, OtherHospHighBpNoOfDay, OtherHospOtherIllness, OtherHospOtherIllnessNoOfDay, OtherAccident, OtherAccidentNoOfDay, OtherSpecialNeed, OtherSpecialNeedService, OtherRemarks, CaseId]);

        } else {
            var sql = "update tb_home_visit SET OtherHospDisbete=?,OtherHospDisbeteNoOfDay=?,OtherHospHighBp=?,OtherHospHighBpNoOfDay=?,OtherHospOtherIllness=?,OtherHospOtherIllnessNoOfDay=?,OtherAccident=?,OtherAccidentNoOfDay=?,OtherSpecialNeed=?,OtherSpecialNeedService=?,OtherRemarks=? where LocalId=?";
            return mgr.execSql(sql, [OtherHospDisbete, OtherHospDisbeteNoOfDay, OtherHospHighBp, OtherHospHighBpNoOfDay, OtherHospOtherIllness, OtherHospOtherIllnessNoOfDay, OtherAccident, OtherAccidentNoOfDay, OtherSpecialNeed, OtherSpecialNeedService, OtherRemarks, visitId]);
        }
    }


}