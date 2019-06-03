import { Injectable } from '@angular/core';
import { Http, XHRBackend } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { ApiConfig } from '../app/api.config';
import { X2JS } from 'src/mgr/X2JS';
import { Network } from '@ionic-native/network/ngx';
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
        let body = ApiConfig.GetPostXml("SysnAllResultRecord", { volunteerId });

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                console.log(res);
                var xmlstr = res.text();
                console.log(xmlstr);
                var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json(xmlstr);
                //输出结果
                console.log(jsonObj);
                console.log(jsonObj.Envelope.Body.SysnAllResultRecordResponse.SysnAllResultRecordResult);

                return jsonObj.Envelope.Body.SysnAllResultRecordResponse.SysnAllResultRecordResult;
            })
            .catch(err => {
                return ApiConfig.ErrorHandle('/SysnAllResultRecord', data, err);
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


    public SaveActive(ActivityId, CaseId, ActDate, ActStartTime, ActEndTime, ActType, ActDetailType, Remarks1, Remarks2, Remarks3, Remarks4, OtherActRemarks, Remarks, Status, UserId) {
        var url = ApiConfig.getApiUrl();
        var data = { ActivityId, CaseId, ActDate, ActStartTime, ActEndTime, ActType, ActDetailType, Remarks1, Remarks2, Remarks3, Remarks4, OtherActRemarks, Remarks, Status, UserId };
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        var soapMessage = "<?xml version='1.0' encoding='utf-8'?>";
        soapMessage += "<soap12:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap12='http://www.w3.org/2003/05/soap-envelope'>";
        soapMessage += "<soap12:Body>";
        soapMessage += "<SavePhoneSupport xmlns=\"http://tempuri.org/\">";
        soapMessage += "<obj>";
        soapMessage += "<pslObj>";
        soapMessage += "<ActivityId>" + ActivityId + "</ActivityId>";
        soapMessage += "<CaseId>" + CaseId + "</CaseId>";
        soapMessage += "<ActDate>" + ActDate + "</ActDate>";
        soapMessage += "<ActStartTime>" + ActStartTime + "</ActStartTime>";
        soapMessage += "<ActEndTime>" + ActEndTime + "</ActEndTime>";
        soapMessage += "<ActType>" + ActType + "</ActType>";
        soapMessage += "<ActDetailType>" + ActDetailType + "</ActDetailType>";
        soapMessage += "<Remarks1>" + Remarks1 + "</Remarks1>";
        soapMessage += "<Remarks2>" + Remarks2 + "</Remarks2>";
        soapMessage += "<Remarks3>" + Remarks3 + "</Remarks3>";
        soapMessage += "<Remarks4>" + Remarks4 + "</Remarks4>";
        soapMessage += "<OtherActRemarks>" + OtherActRemarks + "</OtherActRemarks>";
        soapMessage += "<Remarks>" + Remarks + "</Remarks>";
        soapMessage += "<Status>" + Status + "</Status>";
        soapMessage += "<alvList>";
        soapMessage += "<tb_activity_vol_temp xsi:nil=" + true + " />";
        soapMessage += "<tb_activity_vol_temp xsi:nil=" + true + " />";
        soapMessage += "</alvList>";
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

    public SaveAll(hvLogList, phoneSupportLogList, activityLogList, medicAppointLogList) {
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
        // soapMessage += "<objAppHomeVisit>";
        // soapMessage += "<ClientId>218</ClientId>";
        // soapMessage += "<CaseId>32</CaseId>";
        // soapMessage += "<TaskId>87</TaskId>";
        // soapMessage += "<VisitId>76</VisitId>";
        // soapMessage += "<VisitDate></VisitDate>";
        // soapMessage += "<VisitStartTime></VisitStartTime>";
        // soapMessage += "<VisitEndTime></VisitEndTime>";
        // soapMessage += "<ServHrs>0</ServHrs>";
        // soapMessage += "<Location>1</Location>";
        // soapMessage += "<LocationRemarks></LocationRemarks>";
        // soapMessage += "<VisitStatus>0</VisitStatus>";
        // soapMessage += "<VisitStatusRemarks></VisitStatusRemarks>";
        // soapMessage += "<VisitDetailIndoor></VisitDetailIndoor>";
        // soapMessage += "<VisitDetailIndoorRemarks></VisitDetailIndoorRemarks>";
        // soapMessage += "<VisitDetailOutdoor></VisitDetailOutdoor>";
        // soapMessage += "<VisitDetailOutdoorRemarks></VisitDetailOutdoorRemarks>";
        // soapMessage += "<VisitDetailOther></VisitDetailOther>";
        // soapMessage += "<CategoryTopic1></CategoryTopic1>";
        // soapMessage += "<CategoryTopic2></CategoryTopic2>";
        // soapMessage += "<CategoryTopic3></CategoryTopic3>";
        // soapMessage += "<UlnarLength>0</UlnarLength>";
        // soapMessage += "<Height>1.51</Height>";
        // soapMessage += "<Weight>0.0</Weight>";
        // soapMessage += "<Bmi>0.0</Bmi>";
        // soapMessage += "<Waist>0.0</Waist>";
        // soapMessage += "<Hip>0.0</Hip>";
        // soapMessage += "<WHRatio>0.0</WHRatio>";
        // soapMessage += "<LifeStyleQuestion1>0</LifeStyleQuestion1>";
        // soapMessage += "<LifeStyleQuestion2>0</LifeStyleQuestion2>";
        // soapMessage += "<LifeStyleQuestion3>0</LifeStyleQuestion3>";
        // soapMessage += "<LifeStyleQuestion4>0</LifeStyleQuestion4>";
        // soapMessage += "<LifeStyleQuestion5>0</LifeStyleQuestion5>";
        // soapMessage += "<LifeStyleQuestion6>0</LifeStyleQuestion6>";
        // soapMessage += "<LifeStyleMeasureBloodSuger>0</LifeStyleMeasureBloodSuger>";
        // soapMessage += "<LifeStyleMeasureBsLocation>0</LifeStyleMeasureBsLocation>";
        // soapMessage += "<LifeStyleMeasureBsPeriod>0</LifeStyleMeasureBsPeriod>";
        // soapMessage += "<LifeStyleMeasureBsNoOfTime>0.0</LifeStyleMeasureBsNoOfTime>";
        // soapMessage += "<LifeStyleMeasureBloodPressure>0</LifeStyleMeasureBloodPressure>";
        // soapMessage += "<LifeStyleMeasureBpLocation>0</LifeStyleMeasureBpLocation>";
        // soapMessage += "<LifeStyleMeasureBpPeriod>0</LifeStyleMeasureBpPeriod>";
        // soapMessage += "<LifeStyleMeasureBpNoOfTime>0.0</LifeStyleMeasureBpNoOfTime>";
        // soapMessage += "<EmotionAssessment>,</EmotionAssessment>";
        // soapMessage += "<EmotionAssessmentRemarks></EmotionAssessmentRemarks>";
        // soapMessage += "<OtherHospDisbete>0</OtherHospDisbete>";
        // soapMessage += "<OtherHospDisbeteNoOfDay>0</OtherHospDisbeteNoOfDay>";
        // soapMessage += "<OtherHospHighBp>0</OtherHospHighBp>";
        // soapMessage += "<OtherHospHighBpNoOfDay>0</OtherHospHighBpNoOfDay>";
        // soapMessage += "<OtherHospOtherIllness>0</OtherHospOtherIllness>";
        // soapMessage += "<OtherHospOtherIllnessNoOfDay>0</OtherHospOtherIllnessNoOfDay>";
        // soapMessage += "<OtherAccident>0</OtherAccident>";
        // soapMessage += "<OtherAccidentNoOfDay>0</OtherAccidentNoOfDay>";
        // soapMessage += "<OtherSpecialNeed>0</OtherSpecialNeed>";
        // soapMessage += "<OtherSpecialNeedService></OtherSpecialNeedService>";
        // soapMessage += "<OtherRemarks>2342343243242345239472308947892374983274982374987239847239874982374982374897239847293874892374983274987234p98571985471947503750987209857908237459823740958723908457908237459082754908720954790283754982374598723908547230985798237549823745987329804573298</OtherRemarks>";
        // soapMessage += "<Status>1</Status>";
        // soapMessage += "<DeletePicString></DeletePicString>";
        // soapMessage += "<NeedsContent></NeedsContent>";
        // soapMessage += "<hvuilList></hvuilList>";
        // soapMessage += "<hvImgKeepListStr>79,80,81,82,83,84,85</hvImgKeepListStr>";
        // soapMessage += "<hvNewImgQty>0</hvNewImgQty>";
        // soapMessage += "</objAppHomeVisit>";
        for (var i = 0; i < hvLogList.length; i++) {
            soapMessage += "<objAppHomeVisit>";
            soapMessage += "<ClientId>"+ hvLogList[i].ClientId+"</ClientId>";
            soapMessage += "<CaseId>"+ hvLogList[i].CaseId+"</CaseId>";
            soapMessage += "<TaskId>"+ hvLogList[i].TaskId+"</TaskId>";
            soapMessage += "<VisitId>"+ hvLogList[i].VisitId+"</VisitId>";
            soapMessage += "<VisitDate>"+ hvLogList[i].VisitDate+"</VisitDate>";
            soapMessage += "<VisitStartTime>"+ hvLogList[i].VisitStartTime+"</VisitStartTime>";
            soapMessage += "<VisitEndTime>"+ hvLogList[i].VisitEndTime+"</VisitEndTime>";
            soapMessage += "<ServHrs>"+ hvLogList[i].ServHrs+"</ServHrs>";
            soapMessage += "<Location>"+ hvLogList[i].Location+"</Location>";
            soapMessage += "<LocationRemarks>"+ hvLogList[i].LocationRemarks+"</LocationRemarks>";
            soapMessage += "<VisitStatus>"+ hvLogList[i].VisitStatus+"</VisitStatus>";
            soapMessage += "<VisitStatusRemarks>"+ hvLogList[i].VisitStatusRemarks+"</VisitStatusRemarks>";
            soapMessage += "<VisitDetailIndoor>"+ hvLogList[i].VisitDetailIndoor+"</VisitDetailIndoor>";
            soapMessage += "<VisitDetailIndoorRemarks>"+ hvLogList[i].VisitDetailIndoorRemarks+"</VisitDetailIndoorRemarks>";
            soapMessage += "<VisitDetailOutdoor>"+ hvLogList[i].VisitDetailOutdoor+"</VisitDetailOutdoor>";
            soapMessage += "<VisitDetailOutdoorRemarks>"+ hvLogList[i].VisitDetailOutdoorRemarks+"</VisitDetailOutdoorRemarks>";
            soapMessage += "<VisitDetailOther>"+ hvLogList[i].VisitDetailOther+"</VisitDetailOther>";
            soapMessage += "<CategoryTopic1>"+ hvLogList[i].CategoryTopic1+"</CategoryTopic1>";
            soapMessage += "<CategoryTopic2>"+ hvLogList[i].CategoryTopic2+"</CategoryTopic2>";
            soapMessage += "<CategoryTopic3>"+ hvLogList[i].CategoryTopic3+"</CategoryTopic3>";
            soapMessage += "<UlnarLength>"+ hvLogList[i].UlnarLength+"</UlnarLength>";
            soapMessage += "<Height>"+ hvLogList[i].Height+"</Height>";
            soapMessage += "<Weight>"+ hvLogList[i].Weight+"</Weight>";
            soapMessage += "<Bmi>"+ hvLogList[i].Bmi+"</Bmi>";
            soapMessage += "<Waist>"+ hvLogList[i].Waist+"</Waist>";
            soapMessage += "<Hip>"+ hvLogList[i].Hip+"</Hip>";
            soapMessage += "<WHRatio>"+ hvLogList[i].WHRatio+"</WHRatio>";
            soapMessage += "<LifeStyleQuestion1>"+ hvLogList[i].LifeStyleQuestion1+"</LifeStyleQuestion1>";
            soapMessage += "<LifeStyleQuestion2>"+ hvLogList[i].LifeStyleQuestion2+"</LifeStyleQuestion2>";
            soapMessage += "<LifeStyleQuestion3>"+ hvLogList[i].LifeStyleQuestion3+"</LifeStyleQuestion3>";
            soapMessage += "<LifeStyleQuestion4>"+ hvLogList[i].LifeStyleQuestion4+"</LifeStyleQuestion4>";
            soapMessage += "<LifeStyleQuestion5>"+ hvLogList[i].LifeStyleQuestion5+"</LifeStyleQuestion5>";
            soapMessage += "<LifeStyleQuestion6>"+ hvLogList[i].LifeStyleQuestion6+"</LifeStyleQuestion6>";
            soapMessage += "<LifeStyleMeasureBloodSuger>"+ hvLogList[i].LifeStyleMeasureBloodSuger+"</LifeStyleMeasureBloodSuger>";
            soapMessage += "<LifeStyleMeasureBsLocation>"+ hvLogList[i].LifeStyleMeasureBsLocation+"</LifeStyleMeasureBsLocation>";
            soapMessage += "<LifeStyleMeasureBsPeriod>"+ hvLogList[i].LifeStyleMeasureBsPeriod+"</LifeStyleMeasureBsPeriod>";
            soapMessage += "<LifeStyleMeasureBsNoOfTime>"+ hvLogList[i].LifeStyleMeasureBsNoOfTime+"</LifeStyleMeasureBsNoOfTime>";
            soapMessage += "<LifeStyleMeasureBloodPressure>"+ hvLogList[i].LifeStyleMeasureBloodPressure+"</LifeStyleMeasureBloodPressure>";
            soapMessage += "<LifeStyleMeasureBpLocation>"+ hvLogList[i].LifeStyleMeasureBpLocation+"</LifeStyleMeasureBpLocation>";
            soapMessage += "<LifeStyleMeasureBpPeriod>"+ hvLogList[i].LifeStyleMeasureBpPeriod+"</LifeStyleMeasureBpPeriod>";
            soapMessage += "<LifeStyleMeasureBpNoOfTime>"+ hvLogList[i].LifeStyleMeasureBpNoOfTime+"</LifeStyleMeasureBpNoOfTime>";
            soapMessage += "<EmotionAssessment>"+ hvLogList[i].EmotionAssessment+"</EmotionAssessment>";
            soapMessage += "<EmotionAssessmentRemarks>"+ hvLogList[i].EmotionAssessmentRemarks+"</EmotionAssessmentRemarks>";
            soapMessage += "<OtherHospDisbete>"+ hvLogList[i].OtherHospDisbete+"</OtherHospDisbete>";
            soapMessage += "<OtherHospDisbeteNoOfDay>"+ hvLogList[i].OtherHospDisbeteNoOfDay+"</OtherHospDisbeteNoOfDay>";
            soapMessage += "<OtherHospHighBp>"+ hvLogList[i].OtherHospHighBp+"</OtherHospHighBp>";
            soapMessage += "<OtherHospHighBpNoOfDay>"+ hvLogList[i].OtherHospHighBpNoOfDay+"</OtherHospHighBpNoOfDay>";
            soapMessage += "<OtherHospOtherIllness>"+ hvLogList[i].OtherHospOtherIllness+"</OtherHospOtherIllness>";
            soapMessage += "<OtherHospOtherIllnessNoOfDay>"+ hvLogList[i].OtherHospOtherIllnessNoOfDay+"</OtherHospOtherIllnessNoOfDay>";
            soapMessage += "<OtherAccident>"+ hvLogList[i].OtherAccident+"</OtherAccident>";
            soapMessage += "<OtherAccidentNoOfDay>"+ hvLogList[i].OtherAccidentNoOfDay+"</OtherAccidentNoOfDay>";
            soapMessage += "<OtherSpecialNeed>"+ hvLogList[i].OtherSpecialNeed+"</OtherSpecialNeed>";
            soapMessage += "<OtherSpecialNeedService>"+ hvLogList[i].OtherSpecialNeedService+"</OtherSpecialNeedService>";
            soapMessage += "<OtherRemarks>"+ hvLogList[i].OtherRemarks+"</OtherRemarks>";
            soapMessage += "<Status>"+ hvLogList[i].Status+"</Status>";
            soapMessage += "<DeletePicString>"+ hvLogList[i].DeletePicString+"</DeletePicString>";
            soapMessage += "<NeedsContent>"+ hvLogList[i].NeedsContent+"</NeedsContent>";
            soapMessage += "<hvuilList>"+ hvLogList[i].hvuilList+"</hvuilList>";
            soapMessage += "<hvImgKeepListStr>"+ hvLogList[i].hvImgKeepListStr+"</hvImgKeepListStr>";
            soapMessage += "<hvNewImgQty>"+ hvLogList[i].hvNewImgQty+"</hvNewImgQty>";
            soapMessage += "</objAppHomeVisit>";
        }
        soapMessage += "</hvLogList>";

        soapMessage += "<activityLogList>";
        for (var i = 0; i < activityLogList.length; i++) {
            soapMessage += "<tb_acticve_log_temp>";
            soapMessage += "<ActivityId>" + activityLogList[i].ActivityId + "</ActivityId>";
            soapMessage += "<CaseId>" + activityLogList[i].CaseId + "</CaseId>";
            soapMessage += "<ActDate>" + activityLogList[i].ActDate + "</ActDate>";
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
            soapMessage += "<Status>" + activityLogList[i].Status + "</Status>";
            soapMessage += "<alvList xsi:nil=" + true + "/>";
            soapMessage += "</tb_acticve_log_temp>";
        }
        // soapMessage += "<tb_acticve_log_temp>";
        // soapMessage += "<ActivityId>int</ActivityId>";
        // soapMessage += "<CaseId>int</CaseId>";
        // soapMessage += "<ActDate>string</ActDate>";
        // soapMessage += "<ActStartTime>string</ActStartTime>";
        // soapMessage += "<ActEndTime>string</ActEndTime>";
        // soapMessage += "<ActType>int</ActType>";
        // soapMessage += "<ActDetailType>string</ActDetailType>";
        // soapMessage += "<Remarks1>string</Remarks1>";
        // soapMessage += "<Remarks2>string</Remarks2>";
        // soapMessage += "<Remarks3>string</Remarks3>";
        // soapMessage += "<Remarks4>string</Remarks4>";
        // soapMessage += "<OtherActRemarks>string</OtherActRemarks>";
        // soapMessage += "<Remarks>string</Remarks>";
        // soapMessage += "<Status>int</Status>";
        // soapMessage += "<alvList xsi:nil="+true+"/>";
        // soapMessage += "</tb_acticve_log_temp>";
        soapMessage += "</activityLogList>";

        soapMessage += "<phoneSupportLogList>";
        for (var i = 0; i < phoneSupportLogList.length; i++) {
            soapMessage += "<tb_phone_support_log_temp>";
            soapMessage += "<SupportId>" + phoneSupportLogList[i].SupportId + "</SupportId>";
            soapMessage += "<CaseId>" + phoneSupportLogList[i].CaseId + "</CaseId>";
            soapMessage += "<CallDate>" + phoneSupportLogList[i].CallDate + "</CallDate>";
            soapMessage += "<CallStartTime>" + phoneSupportLogList[i].CallStartTime + "</CallStartTime>";
            soapMessage += "<CallEndTime>" + phoneSupportLogList[i].CallEndTime + "</CallEndTime>";
            soapMessage += "<Detail>" + phoneSupportLogList[i].Detail + "</Detail>";
            soapMessage += "<DetailOther>" + phoneSupportLogList[i].DetailOther + "</DetailOther>";
            soapMessage += "<OtherRemark>" + phoneSupportLogList[i].OtherRemark + "</OtherRemark>";
            soapMessage += "<ResponsibleVol>5</ResponsibleVol>";
            soapMessage += "<CannotContact>5</CannotContact>";
            soapMessage += "<NextPhoneDate>03-06-2019</NextPhoneDate>";
            soapMessage += "<NextPhoneTime>17:10</NextPhoneTime>";
            soapMessage += "<Status>" + phoneSupportLogList[i].Status + "</Status>";
            soapMessage += "</tb_phone_support_log_temp>";
            // soapMessage += "<tb_phone_support_log_temp>";
            // soapMessage += "<SupportId>1</SupportId>";
            // soapMessage += "<CaseId>8</CaseId>";
            // soapMessage += "<CallDate>03-06-2019</CallDate>";
            // soapMessage += "<CallStartTime>6:06</CallStartTime>";
            // soapMessage += "<CallEndTime>6:12</CallEndTime>";
            // soapMessage += "<Detail>5555555</Detail>";
            // soapMessage += "<DetailOther>string</DetailOther>";
            // soapMessage += "<OtherRemark>string</OtherRemark>";
            // soapMessage += "<ResponsibleVol>22</ResponsibleVol>";
            // soapMessage += "<CannotContact>3</CannotContact>";
            // soapMessage += "<NextPhoneDate>04-06-2019</NextPhoneDate>";
            // soapMessage += "<NextPhoneTime>6:06</NextPhoneTime>";
            // soapMessage += "<Status>1</Status>";
            // soapMessage += "</tb_phone_support_log_temp>";
        }
        soapMessage += "</phoneSupportLogList>";


        soapMessage += "<medicAppointLogList>";
        for (var i = 0; i < medicAppointLogList.length; i++) {
            soapMessage += "<tb_medical_appointment_log_temp>";
            soapMessage += "<AppointmentId>" + medicAppointLogList[i].AppointmentId + "</AppointmentId>";
            soapMessage += "<Hosp>" + medicAppointLogList[i].Hosp + "</Hosp>";
            soapMessage += "<Specialty>" + medicAppointLogList[i].Specialty + "</Specialty>";
            soapMessage += "<Description>" + medicAppointLogList[i].Description + "</Description>";
            soapMessage += "<AppointmentDate>" + medicAppointLogList[i].AppointmentDate + "</AppointmentDate>";
            soapMessage += "<AppointmentTime>" + medicAppointLogList[i].AppointmentTime + "</AppointmentTime>";
            soapMessage += "<Status>" + medicAppointLogList[i].Reason + "</Reason>";
            soapMessage += "<Reason>" + medicAppointLogList[i].Reason + "</Reason>";
            soapMessage += "</tb_medical_appointment_log_temp>";

        }
        // soapMessage += "<tb_medical_appointment_log_temp>";
        // soapMessage += "<AppointmentId>int</AppointmentId>";
        // soapMessage += "<Hosp>int</Hosp>";
        // soapMessage += "<Specialty>int</Specialty>";
        // soapMessage += "<Description>string</Description>";
        // soapMessage += "<AppointmentDate>string</AppointmentDate>";
        // soapMessage += "<AppointmentTime>string</AppointmentTime>";
        // soapMessage += "<Status>int</Status>";
        // soapMessage += "<Reason>string</Reason>";
        // soapMessage += "</tb_medical_appointment_log_temp>";
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

}
