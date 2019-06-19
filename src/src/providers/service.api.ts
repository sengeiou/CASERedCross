import { Injectable } from '@angular/core';
import { Http, XHRBackend } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { ApiConfig } from '../app/api.config';
import { X2JS } from 'src/mgr/X2JS';
import { Network } from '@ionic-native/network/ngx';
import { AppUtil } from '../app/app.util';
@Injectable()
export class ServiceApi {

    constructor(public http: Http, private network: Network) {

    }

    public VolunteerLogin(strLoginId, strPwd) {

        var url = ApiConfig.getApiUrl();
        var data = { strLoginId, strPwd };
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });
        let body = ApiConfig.GetPostXml("VolunteerLogin", {
            strLoginId,
            strPwd: ApiConfig.MD5(strPwd).toUpperCase()
        });

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                console.log(res);
                var xmlstr = res.text();
                console.log(xmlstr);
                var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json(xmlstr);
                //输出结果
                console.log(jsonObj);
                console.log(jsonObj.Envelope.Body.VolunteerLoginResponse.VolunteerLoginResult);

                return jsonObj.Envelope.Body.VolunteerLoginResponse.VolunteerLoginResult;
            })
            .catch(err => {
                return ApiConfig.ErrorHandle('/VolunteerLogin', data, err);
            });
    }

    public ForgotPassword(strLoginId) {

        var url = ApiConfig.getApiUrl();
        var data = { strLoginId };
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });
        let body = ApiConfig.GetPostXml("ForgotPassword", { strLoginId });

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                console.log(res);
                var xmlstr = res.text();
                console.log(xmlstr);
                var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json(xmlstr);
                //输出结果
                console.log(jsonObj);

                console.log(jsonObj.Envelope.Body.ForgotPasswordResponse.ForgotPasswordResult);
                return jsonObj.Envelope.Body.ForgotPasswordResponse.ForgotPasswordResult;
            })
            .catch(err => {
                return ApiConfig.ErrorHandle('/ForgotPassword', data, err);
            });
    }

    public SysnAllResultRecord(volunteerId) {
        var url = ApiConfig.getApiUrl();
        var data = { volunteerId };
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });
        let body = ApiConfig.GetPostXml("NewSysnAllResultRecord", { volunteerId });

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                console.log(res);
                var xmlstr = res.text();
                console.log(xmlstr);
                var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json(xmlstr);
                //输出结果
                console.log(jsonObj);
                console.log(jsonObj.Envelope.Body.NewSysnAllResultRecordResponse.NewSysnAllResultRecordResult);

                return jsonObj.Envelope.Body.NewSysnAllResultRecordResponse.NewSysnAllResultRecordResult;
            })
            .catch(err => {
                return ApiConfig.ErrorHandle('/NewSysnAllResultRecord', data, err);
            });
    }

    public SavePhoneSupport(SupportId, CaseId, CallDate, CallStartTime, CallEndTime, Detail, DetailOther, OtherRemark, ResponsibleVol, Status, UserId) {
        var url = ApiConfig.getApiUrl();
        var data = { SupportId, CaseId, CallDate, CallStartTime, CallEndTime, Detail, DetailOther, OtherRemark, ResponsibleVol, Status };
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        var soapMessage = "<?xml version='1.0' encoding='utf-8'?>";
        soapMessage += "<soap12:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap12='http://www.w3.org/2003/05/soap-envelope'>";
        soapMessage += "<soap12:Body>";
        soapMessage += "<SavePhoneSupport xmlns=\"http://tempuri.org/\">";
        soapMessage += "<obj>";
        soapMessage += "<pslObj>";
        soapMessage += "<SupportId>" + SupportId + "</SupportId>";
        soapMessage += "<CaseId>" + CaseId + "</CaseId>";
        soapMessage += "<CallDate>" + CallDate + "</CallDate>";
        soapMessage += "<CallStartTime>" + CallStartTime + "</CallStartTime>";
        soapMessage += "<CallEndTime>" + CallEndTime + "</CallEndTime>";
        soapMessage += "<Detail>" + Detail + "</Detail>";
        soapMessage += "<DetailOther>" + DetailOther + "</DetailOther>";
        soapMessage += "<OtherRemark>" + OtherRemark + "</OtherRemark>";
        soapMessage += "<ResponsibleVol>" + ResponsibleVol + "</ResponsibleVol>";
        soapMessage += "<Status>" + Status + "</Status>";
        soapMessage += "</pslObj>";
        soapMessage += "<ahObj>";
        soapMessage += "<CaseId>" + CaseId + "</CaseId>";
        soapMessage += "<UserId>" + UserId + "</UserId>";
        soapMessage += "<DeviceType>" + 2 + "</DeviceType>";
        soapMessage += "<ActionType>" + 1 + "</ActionType>";
        soapMessage += "<DetailActionType>" + 1 + "</DetailActionType>";
        soapMessage += "<IpAddress>" + '10.56.189.44' + "</IpAddress>";
        soapMessage += "</ahObj>";
        soapMessage += "</obj>";
        soapMessage += "</SavePhoneSupport>";
        soapMessage += "</soap12:Body>";
        soapMessage += "</soap12:Envelope>";
        // let body = ApiConfig.GetPostXml("SavePhoneSupport",{"obj":{SupportId,CaseId}});
        let body = soapMessage;
        console.log(body);
        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                console.log(res);
                var xmlstr = res.text();
                console.log(xmlstr);
                var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json(xmlstr);
                //输出结果
                console.log(jsonObj);
                console.log(jsonObj.Envelope.Body.SavePhoneSupportResponse.SavePhoneSupportResult);

                return jsonObj.Envelope.Body.SavePhoneSupportResponse.SavePhoneSupportResult;
            })
            .catch(err => {
                return ApiConfig.ErrorHandle('/SavePhoneSupport', data, err);
            });
    }

    public ExecuteWorkingSet(WorkingSetID, CaseId, UserId) {
        var url = ApiConfig.getApiUrl();
        var data = { WorkingSetID, CaseId, UserId };
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        var soapMessage = "<?xml version='1.0' encoding='utf-8'?>";
        soapMessage += "<soap12:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap12='http://www.w3.org/2003/05/soap-envelope'>";
        soapMessage += "<soap12:Body>";
        soapMessage += "<ExecuteWorkingSet xmlns=\"http://tempuri.org/\">";
        soapMessage += "<WorkingSetID>" + WorkingSetID + "</WorkingSetID>";
        soapMessage += "<AppHeader>";
        soapMessage += "<CaseId>" + CaseId + "</CaseId>";
        soapMessage += "<UserId>" + UserId + "</UserId>";
        soapMessage += "<DeviceType>" + 2 + "</DeviceType>";
        soapMessage += "<ActionType>" + 1 + "</ActionType>";
        soapMessage += "<DetailActionType>" + 1 + "</DetailActionType>";
        soapMessage += "<IpAddress>" + '10.56.189.44' + "</IpAddress>";
        soapMessage += "</AppHeader>";
        soapMessage += "</ExecuteWorkingSet>";
        soapMessage += "</soap12:Body>";
        soapMessage += "</soap12:Envelope>";
        let body = soapMessage;
        console.log(body);
        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                console.log(res);
                var xmlstr = res.text();
                console.log(xmlstr);
                var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json(xmlstr);
                //输出结果
                console.log(jsonObj);
                console.log(jsonObj.Envelope.Body.ExecuteWorkingSetResponse.ExecuteWorkingSetResult);

                return jsonObj.Envelope.Body.ExecuteWorkingSetResponse.ExecuteWorkingSetResult;
            })
            .catch(err => {
                return ApiConfig.ErrorHandle('/ExecuteWorkingSet', data, err);
            });
    }


    public SaveActive1(ActivityId, CaseId, ActDate, ActStartTime, ActEndTime, ActType, ActDetailType, Remarks1, Remarks2, Remarks3, Remarks4, OtherActRemarks, Remarks, Status, UserId) {
        var url = ApiConfig.getApiUrl();
        var data = { ActivityId, CaseId, ActDate, ActStartTime, ActEndTime, ActType, ActDetailType, Remarks1, Remarks2, Remarks3, Remarks4, OtherActRemarks, Remarks, Status, UserId };
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });


        var soapMessage = "<?xml version='1.0' encoding='utf-8'?>";
        soapMessage += "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">";
        soapMessage += "<soap:Body>";
        soapMessage += "<SaveActive xmlns=\"http://tempuri.org/\">";
        soapMessage += "<obj>";
        soapMessage += "<alObj>";
        soapMessage += "<ActivityId>" + ActivityId + "</ActivityId>";
        soapMessage += "<CaseId>" + CaseId + "</CaseId>";
        soapMessage += "<ActDate>" + ActDate + "</ActDate>";
        soapMessage += "<ActStartTime>" + ActStartTime + "</ActStartTime>";
        soapMessage += "<ActEndTime>" + ActEndTime + "</ActEndTime>";
        soapMessage += "<ActType>" + ActType + "</ActType>";
        soapMessage += "<ActDetailType>" + ActDetailType + "</ActDetailType>";
        soapMessage += "<Remarks1>" + Remarks1 + "</Remarks1>";
        soapMessage += "<Remarks2></Remarks2>";
        soapMessage += "<Remarks3>" + Remarks3 + "</Remarks3>";
        soapMessage += "<Remarks4>" + Remarks4 + "</Remarks4>";
        soapMessage += "<OtherActRemarks>" + OtherActRemarks + "</OtherActRemarks>";
        soapMessage += "<Remarks>" + Remarks + "</Remarks>";
        soapMessage += "<Status>1</Status>";
        soapMessage += "<alvList>";
        soapMessage += "<tb_activity_vol_temp xsi:nil=\"true\" />";
        soapMessage += "<tb_activity_vol_temp xsi:nil=\"true\" />";
        soapMessage += "</alvList>";
        soapMessage += "</alObj>";
        soapMessage += "<ahObj>";
        soapMessage += "<CaseId>" + CaseId + "</CaseId>";
        soapMessage += "<UserId>" + UserId + "</UserId>";
        soapMessage += "<DeviceType>" + 2 + "</DeviceType>";
        soapMessage += "<ActionType>" + 1 + "</ActionType>";
        soapMessage += "<DetailActionType>" + 1 + "</DetailActionType>";
        soapMessage += "<IpAddress>" + '10.56.189.44' + "</IpAddress>";
        soapMessage += "</ahObj>";
        soapMessage += "</obj>";
        soapMessage += "</SaveActive>";
        soapMessage += "</soap:Body>";
        soapMessage += "</soap:Envelope>";

        let body = soapMessage;
        console.log(body);
        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                console.log(res);
                var xmlstr = res.text();
                console.log(xmlstr);
                var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json(xmlstr);
                //输出结果
                console.log(jsonObj);
                console.log(jsonObj.Envelope.Body.SavePhoneSupportResponse.SavePhoneSupportResult);

                return jsonObj.Envelope.Body.SavePhoneSupportResponse.SavePhoneSupportResult;
            })
            .catch(err => {
                return ApiConfig.ErrorHandle('/SaveActive', data, err);
            });
    }



    public SaveAll(hvLogList, phoneSupportLogList, activityLogList, medicAppointLogList, userId, type) {
        var url = ApiConfig.getApiUrl();
        var data = { hvLogList, phoneSupportLogList, activityLogList, medicAppointLogList };
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        var soapMessage = "<?xml version='1.0' encoding='utf-8'?>";
        soapMessage += "<soap12:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap12='http://www.w3.org/2003/05/soap-envelope'>";
        soapMessage += "<soap12:Body>";
        soapMessage += "<SaveAll xmlns=\"http://tempuri.org/\">";
        soapMessage += "<objSaveAll>";
        soapMessage += "<hvLogList>";

        for (var i = 0; i < hvLogList.length; i++) {
            if (hvLogList[i].SavedStatus == 1 || type == 'one') {
                // if (hvLogList[i].VisitDate) {
                //     var VisitDate = AppUtil.FormatDate2(new Date(hvLogList[i].VisitDate));
                // } else {
                //     var VisitDate = ''
                // }

                if (hvLogList[i].ScheduleDate) {
                    var ScheduleDate = AppUtil.FormatDate2(new Date(hvLogList[i].ScheduleDate));
                } else {
                    var ScheduleDate = ''
                }

                // console.log(VisitDate)
                var UlnarLength = 0;
                var DeletePicString = '';
                // var hvImgKeepListStr = ''
                // var hvNewImgQty = 0
                var ServHrs = 0;
                var hvuilList = []
                soapMessage += "<objAppHomeVisit>";
                soapMessage += "<tobj>";
                soapMessage += "<TaskId>" + hvLogList[i].TaskId + "</TaskId>";
                soapMessage += "<Schedule_Date>" + ScheduleDate + "</Schedule_Date>";
                soapMessage += "<Schedule_Time>" + hvLogList[i].ScheduleTime + "</Schedule_Time>";
                soapMessage += "</tobj>";
                soapMessage += "<ClientId>" + userId + "</ClientId>";
                soapMessage += "<CaseId>" + hvLogList[i].CaseId + "</CaseId>";
                soapMessage += "<TaskId>" + hvLogList[i].TaskId + "</TaskId>";
                soapMessage += "<VisitId>" + hvLogList[i].VisitId + "</VisitId>";
                // soapMessage += "<VisitDate>" + hvLogList[i].VisitDate + "</VisitDate>";
                soapMessage += "<VisitDate>" + hvLogList[i].VisitDate + "</VisitDate>";
                soapMessage += "<VisitStartTime>" + hvLogList[i].VisitStartTime + "</VisitStartTime>";
                soapMessage += "<VisitEndTime>" + hvLogList[i].VisitEndTime + "</VisitEndTime>";
                soapMessage += "<ServHrs>" + ServHrs + "</ServHrs>";
                soapMessage += "<Location>" + hvLogList[i].Location + "</Location>";
                soapMessage += "<LocationRemarks>" + hvLogList[i].LocationRemarks + "</LocationRemarks>";
                soapMessage += "<VisitStatus>" + hvLogList[i].VisitStatus + "</VisitStatus>";
                soapMessage += "<VisitStatusRemarks>" + hvLogList[i].VisitStatusRemarks + "</VisitStatusRemarks>";
                soapMessage += "<VisitDetailIndoor>" + hvLogList[i].VisitDetailIndoor + "</VisitDetailIndoor>";
                soapMessage += "<VisitDetailIndoorRemarks>" + hvLogList[i].VisitDetailIndoorRemarks + "</VisitDetailIndoorRemarks>";
                soapMessage += "<VisitDetailOutdoor>" + hvLogList[i].VisitDetailOutdoor + "</VisitDetailOutdoor>";
                soapMessage += "<VisitDetailOutdoorRemarks>" + hvLogList[i].VisitDetailOutdoorRemarks + "</VisitDetailOutdoorRemarks>";
                soapMessage += "<VisitDetailOther>" + hvLogList[i].VisitDetailOther + "</VisitDetailOther>";
                soapMessage += "<CategoryTopic1>" + hvLogList[i].CategoryTopic1 + "</CategoryTopic1>";
                soapMessage += "<CategoryTopic2>" + hvLogList[i].CategoryTopic2 + "</CategoryTopic2>";
                soapMessage += "<CategoryTopic3>" + hvLogList[i].CategoryTopic3 + "</CategoryTopic3>";
                soapMessage += "<UlnarLength>" + UlnarLength + "</UlnarLength>";
                soapMessage += "<Height>" + hvLogList[i].Height + "</Height>";
                soapMessage += "<Weight>" + hvLogList[i].Weight + "</Weight>";
                soapMessage += "<Bmi>" + hvLogList[i].Bmi + "</Bmi>";
                soapMessage += "<Waist>" + hvLogList[i].Waist + "</Waist>";
                soapMessage += "<Hip>" + hvLogList[i].Hip + "</Hip>";
                soapMessage += "<WHRatio>" + hvLogList[i].WHRatio + "</WHRatio>";
                soapMessage += "<LifeStyleQuestion1>" + hvLogList[i].LifeStyleQuestion1 + "</LifeStyleQuestion1>";
                soapMessage += "<LifeStyleQuestion2>" + hvLogList[i].LifeStyleQuestion2 + "</LifeStyleQuestion2>";
                soapMessage += "<LifeStyleQuestion3>" + hvLogList[i].LifeStyleQuestion3 + "</LifeStyleQuestion3>";
                soapMessage += "<LifeStyleQuestion4>" + hvLogList[i].LifeStyleQuestion4 + "</LifeStyleQuestion4>";
                soapMessage += "<LifeStyleQuestion5>" + hvLogList[i].LifeStyleQuestion5 + "</LifeStyleQuestion5>";
                soapMessage += "<LifeStyleQuestion6>" + hvLogList[i].LifeStyleQuestion6 + "</LifeStyleQuestion6>";
                soapMessage += "<LifeStyleMeasureBloodSuger>" + hvLogList[i].LifeStyleMeasureBloodSuger + "</LifeStyleMeasureBloodSuger>";
                soapMessage += "<LifeStyleMeasureBsLocation>" + hvLogList[i].LifeStyleMeasureBsLocation + "</LifeStyleMeasureBsLocation>";
                soapMessage += "<LifeStyleMeasureBsPeriod>" + hvLogList[i].LifeStyleMeasureBsPeriod + "</LifeStyleMeasureBsPeriod>";
                soapMessage += "<LifeStyleMeasureBsNoOfTime>" + hvLogList[i].LifeStyleMeasureBsNoOfTime + "</LifeStyleMeasureBsNoOfTime>";
                soapMessage += "<LifeStyleMeasureBloodPressure>" + hvLogList[i].LifeStyleMeasureBloodPressure + "</LifeStyleMeasureBloodPressure>";
                soapMessage += "<LifeStyleMeasureBpLocation>" + hvLogList[i].LifeStyleMeasureBpLocation + "</LifeStyleMeasureBpLocation>";
                soapMessage += "<LifeStyleMeasureBpPeriod>" + hvLogList[i].LifeStyleMeasureBpPeriod + "</LifeStyleMeasureBpPeriod>";
                soapMessage += "<LifeStyleMeasureBpNoOfTime>" + hvLogList[i].LifeStyleMeasureBpNoOfTime + "</LifeStyleMeasureBpNoOfTime>";
                soapMessage += "<EmotionAssessment>" + hvLogList[i].EmotionAssessment + "</EmotionAssessment>";
                soapMessage += "<EmotionAssessmentRemarks>" + hvLogList[i].EmotionAssessmentRemarks + "</EmotionAssessmentRemarks>";
                soapMessage += "<OtherHospDisbete>" + hvLogList[i].OtherHospDisbete + "</OtherHospDisbete>";
                soapMessage += "<OtherHospDisbeteNoOfDay>" + hvLogList[i].OtherHospDisbeteNoOfDay + "</OtherHospDisbeteNoOfDay>";
                soapMessage += "<OtherHospHighBp>" + hvLogList[i].OtherHospHighBp + "</OtherHospHighBp>";
                soapMessage += "<OtherHospHighBpNoOfDay>" + hvLogList[i].OtherHospHighBpNoOfDay + "</OtherHospHighBpNoOfDay>";
                soapMessage += "<OtherHospOtherIllness>" + hvLogList[i].OtherHospOtherIllness + "</OtherHospOtherIllness>";
                soapMessage += "<OtherHospOtherIllnessNoOfDay>" + hvLogList[i].OtherHospOtherIllnessNoOfDay + "</OtherHospOtherIllnessNoOfDay>";
                soapMessage += "<OtherAccident>" + hvLogList[i].OtherAccident + "</OtherAccident>";
                soapMessage += "<OtherAccidentNoOfDay>" + hvLogList[i].OtherAccidentNoOfDay + "</OtherAccidentNoOfDay>";
                soapMessage += "<OtherSpecialNeed>" + hvLogList[i].OtherSpecialNeed + "</OtherSpecialNeed>";
                soapMessage += "<OtherSpecialNeedService>" + hvLogList[i].OtherSpecialNeedService + "</OtherSpecialNeedService>";
                soapMessage += "<OtherRemarks>" + hvLogList[i].OtherRemarks + "</OtherRemarks>";
                if (type == 'one' && hvLogList[i].VisitId != 0) {
                    soapMessage += "<Status>2</Status>";
                } else {
                    soapMessage += "<Status>" + hvLogList[i].Status + "</Status>";
                }
                soapMessage += "<DeletePicString>" + DeletePicString + "</DeletePicString>";
                soapMessage += "<NeedsContent>" + hvLogList[i].NeedsContent + "</NeedsContent>";
                soapMessage += "<hvuilList>" + hvuilList + "</hvuilList>";
                soapMessage += "<hvImgKeepListStr>" + hvLogList[i].hvImgKeepListStr + "</hvImgKeepListStr>";
                soapMessage += "<hvNewImgQty>" + hvLogList[i].hvNewImgQty + "</hvNewImgQty>";

                soapMessage += "<hvvlList>";
                var hvvlList = hvLogList[i].hvvlList;
                if (hvvlList) {
                    for (var j = 0; j < hvvlList.length; j++) {
                        soapMessage += "<tb_home_visit_vol_log_temp>";
                        soapMessage += "<VolType>" + hvvlList[j].VolType + "</VolType>";
                        soapMessage += "<VolId>" + hvvlList[j].VolId + "</VolId>";
                        soapMessage += "<VolGrpId>" + hvvlList[j].VolGrpId + "</VolGrpId>";
                        soapMessage += "</tb_home_visit_vol_log_temp>";
                    }
                }

                soapMessage += "</hvvlList>";

                soapMessage += "<bplList>";
                if (hvLogList[i].SYS1 != 0 && hvLogList[i].DlA1 != 0) {
                    soapMessage += "<tb_blood_pressure_log_temp>";
                    soapMessage += "<CaseId>" + hvLogList[i].CaseId + "</CaseId>";
                    soapMessage += "<MeasurementDate>" + hvLogList[i].VisitDate + "</MeasurementDate>";
                    soapMessage += "<Upper>" + hvLogList[i].SYS1 + "</Upper>";
                    soapMessage += "<Lower>" + hvLogList[i].DlA1 + "</Lower>";
                    soapMessage += "</tb_blood_pressure_log_temp>";
                }
                if (hvLogList[i].SYS2 != 0 && hvLogList[i].DlA2 != 0) {
                    soapMessage += "<tb_blood_pressure_log_temp>";
                    soapMessage += "<CaseId>" + hvLogList[i].CaseId + "</CaseId>";
                    soapMessage += "<MeasurementDate>" + hvLogList[i].VisitDate + "</MeasurementDate>";
                    soapMessage += "<Upper>" + hvLogList[i].SYS2 + "</Upper>";
                    soapMessage += "<Lower>" + hvLogList[i].DlA2 + "</Lower>";
                    soapMessage += "</tb_blood_pressure_log_temp>";
                }
                soapMessage += "</bplList>";


                soapMessage += "<hrlList>";
                if (hvLogList[i].heartBeats1 > 0) {
                    soapMessage += "<tb_heart_rate_log_temp>";
                    soapMessage += "<CaseId>" + hvLogList[i].CaseId + "</CaseId>";
                    soapMessage += "<MeasurementDate>" + hvLogList[i].VisitDate + "</MeasurementDate>";
                    soapMessage += "<RatePerMin>" + hvLogList[i].heartBeats1 + "</RatePerMin>";
                    soapMessage += "</tb_heart_rate_log_temp>";
                }
                if (hvLogList[i].heartBeats2 > 0) {
                    soapMessage += "<tb_heart_rate_log_temp>";
                    soapMessage += "<CaseId>" + hvLogList[i].CaseId + "</CaseId>";
                    soapMessage += "<MeasurementDate>" + hvLogList[i].VisitDate + "</MeasurementDate>";
                    soapMessage += "<RatePerMin>" + hvLogList[i].heartBeats2 + "</RatePerMin>";
                    soapMessage += "</tb_heart_rate_log_temp>";
                }
                soapMessage += "</hrlList>";
                soapMessage += "</objAppHomeVisit>";
            }
        }
        soapMessage += "</hvLogList>";

        soapMessage += "<activityLogList>";
        for (var i = 0; i < activityLogList.length; i++) {
            if (activityLogList[i].SavedStatus == 1 || type == 'one') {
                var ActDate = AppUtil.FormatDate2(new Date(activityLogList[i].ActDate));
                console.log(ActDate)
                soapMessage += "<tb_acticve_log_temp>";
                soapMessage += "<ActivityId>" + activityLogList[i].ActivityId + "</ActivityId>";
                soapMessage += "<CaseId>" + activityLogList[i].CaseId + "</CaseId>";
                // soapMessage += "<ActDate>" + activityLogList[i].ActDate + "</ActDate>";
                soapMessage += "<ActDate>" + ActDate + "</ActDate>";
                soapMessage += "<ActStartTime>" + activityLogList[i].ActStartTime + "</ActStartTime>";
                soapMessage += "<ActEndTime>" + activityLogList[i].ActEndTime + "</ActEndTime>";
                soapMessage += "<ActType>" + activityLogList[i].ActType + "</ActType>";
                soapMessage += "<ActDetailType>" + activityLogList[i].ActDetailType + "</ActDetailType>";
                soapMessage += "<Remarks1>" + activityLogList[i].Remarks1 + "</Remarks1>";
                soapMessage += "<Remarks2>" + activityLogList[i].Remarks2 + "</Remarks2>";
                soapMessage += "<Remarks3>" + activityLogList[i].Remarks3 + "</Remarks3>";
                soapMessage += "<Remarks4>" + activityLogList[i].Remarks4 + "</Remarks4>";
                soapMessage += "<OtherActRemarks>" + activityLogList[i].OtherActRemarks + "</OtherActRemarks>";
                soapMessage += "<Remarks>" + activityLogList[i].Remarks + "</Remarks>";
                if (type == 'one' && activityLogList[i].ActivityId != 0) {
                    soapMessage += "<Status>1</Status>";
                } else {
                    soapMessage += "<Status>" + activityLogList[i].Status + "</Status>";
                }

                soapMessage += "<alvList xsi:nil=\"true \"/>";
                soapMessage += "</tb_acticve_log_temp>";
            }
        }

        soapMessage += "</activityLogList>";

        soapMessage += "<phoneSupportLogList>";
        for (var i = 0; i < phoneSupportLogList.length; i++) {
            if (phoneSupportLogList[i].SavedStatus == 1 || type == 'one') {
                var CallDate = AppUtil.FormatDate2(new Date(phoneSupportLogList[i].CallDate));
                console.log(CallDate)
                soapMessage += "<tb_phone_support_log_temp>";
                soapMessage += "<SupportId>" + phoneSupportLogList[i].SupportId + "</SupportId>";
                soapMessage += "<CaseId>" + phoneSupportLogList[i].CaseId + "</CaseId>";
                soapMessage += "<CallDate>" + CallDate + "</CallDate>";
                soapMessage += "<CallStartTime>" + phoneSupportLogList[i].CallStartTime + "</CallStartTime>";
                soapMessage += "<CallEndTime>" + phoneSupportLogList[i].CallEndTime + "</CallEndTime>";
                soapMessage += "<Detail>" + phoneSupportLogList[i].Detail + "</Detail>";
                soapMessage += "<DetailOther>" + phoneSupportLogList[i].DetailOther + "</DetailOther>";
                soapMessage += "<OtherRemark>" + phoneSupportLogList[i].OtherRemark + "</OtherRemark>";
                soapMessage += "<ResponsibleVol>" + userId + "</ResponsibleVol>";
                soapMessage += "<CannotContact>" + phoneSupportLogList[i].CannotContact + "</CannotContact>";
                soapMessage += "<NextPhoneDate>" + phoneSupportLogList[i].NextPhoneDate + "</NextPhoneDate>";
                soapMessage += "<NextPhoneTime>" + phoneSupportLogList[i].NextPhoneTime + "</NextPhoneTime>";
                if (type == 'one' && phoneSupportLogList[i].SupportId != 0) {
                    soapMessage += "<Status>1</Status>";
                } else {
                    soapMessage += "<Status>" + phoneSupportLogList[i].Status + "</Status>";
                }

                soapMessage += "</tb_phone_support_log_temp>";
            }
        }
        soapMessage += "</phoneSupportLogList>";

        soapMessage += "<medicAppointLogList>";
        for (var i = 0; i < medicAppointLogList.length; i++) {
            if (medicAppointLogList[i].SavedStatus == 1 || type == 'one') {
                var AppointmentDate = AppUtil.FormatDate2(new Date(medicAppointLogList[i].AppointmentDate));
                soapMessage += "<tb_medical_appointment_log_temp>";
                soapMessage += "<AppointmentId>" + medicAppointLogList[i].AppointmentId + "</AppointmentId>";
                soapMessage += "<CaseId>" + medicAppointLogList[i].CaseId + "</CaseId>";
                soapMessage += "<Hosp>" + medicAppointLogList[i].Hosp + "</Hosp>";
                soapMessage += "<Specialty>" + medicAppointLogList[i].Specialty + "</Specialty>";
                soapMessage += "<Description>" + medicAppointLogList[i].Description + "</Description>";
                soapMessage += "<AppointmentDate>" + AppointmentDate + "</AppointmentDate>";
                soapMessage += "<AppointmentTime>" + medicAppointLogList[i].AppointmentTime + "</AppointmentTime>";
                // if (type == 'all' && medicAppointLogList[i].AppointmentId != 0) {
                //     soapMessage += "<Status>1</Status>";
                // } else {

                // }
                soapMessage += "<Status>" + medicAppointLogList[i].Status + "</Status>";
                soapMessage += "<Reason>" + medicAppointLogList[i].Reason + "</Reason>";
                soapMessage += "</tb_medical_appointment_log_temp>";
            }

        }

        soapMessage += "</medicAppointLogList>";
        soapMessage += "</objSaveAll>";
        soapMessage += "</SaveAll>";
        soapMessage += "</soap12:Body>";
        soapMessage += "</soap12:Envelope>";
        // let body = ApiConfig.GetPostXml("SavePhoneSupport",{"obj":{SupportId,CaseId}});


        let body = soapMessage;
        console.log(body);
        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                console.log(res);
                var xmlstr = res.text();
                console.log(xmlstr);
                var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json(xmlstr);
                //输出结果
                console.log(jsonObj);
                console.log(jsonObj.Envelope.Body.SaveAllResponse.SaveAllResult);

                return jsonObj.Envelope.Body.SaveAllResponse.SaveAllResult;
            })
            .catch(err => {
                return ApiConfig.ErrorHandle('/SaveAll ', data, err);
            });
    }

    public UploadImgPart(section, ClientID, ImgDataBase64) {
        var url = ApiConfig.getApiUrl();
        var data = { section, ClientID, ImgDataBase64 };
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });
        var soapMessage = "<?xml version='1.0' encoding='utf-8'?>";
        soapMessage += "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">";
        soapMessage += "<soap:Body>";
        soapMessage += "<UploadImgPart xmlns=\"http://tempuri.org/\">";
        soapMessage += "<attachment>";
        soapMessage += "<section>string</section>";
        soapMessage += "<ClientID>string</ClientID>";
        soapMessage += "<ImgDataBase64>string</ImgDataBase64>";
        soapMessage += "</attachment>";
        soapMessage += "</UploadImgPart>";
        soapMessage += "</soap:Body>";
        soapMessage += "</soap:Envelope>";

        let body = soapMessage;
        console.log(body);
        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                console.log(res);
                var xmlstr = res.text();
                console.log(xmlstr);
                var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json(xmlstr);
                //输出结果
                console.log(jsonObj);
                console.log(jsonObj.Envelope.Body.UploadImgPartResponse.UploadImgPartResult);

                return jsonObj.Envelope.Body.UploadImgPartResponse.UploadImgPartResult;
            })
            .catch(err => {
                return ApiConfig.ErrorHandle('/UploadImgPart', data, err);
            });
    }



}
