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
        var soapMessage = "<?xml version='1.0' encoding ='utf-8' ?>";
        soapMessage += "<soap12: Envelope";
        soapMessage += "xmlns:xsi ='http://www.w3.org/2001/XMLSchema-instance'";
        soapMessage += "xmlns:xsd ='http://www.w3.org/2001/XMLSchema'";
        soapMessage += " xmlns:soap12 ='http://www.w3.org/2003/05/soap-envelope' >";
        soapMessage += "<soap12:Body >";
        soapMessage += "<SaveAll";
        soapMessage += " xmlns=\"http://tempuri.org/\">";
        soapMessage += "<objSaveAll>";
        soapMessage += "<hvLogList>";
        soapMessage += "<objAppHomeVisit>";
        soapMessage += "<ClientId>218 </ClientId>";
        soapMessage += "<CaseId> 32 </CaseId>";
        soapMessage += "<TaskId> 87 </TaskId>";
        soapMessage += "<VisitId> 75 </VisitId>";
        soapMessage += "<VisitDate> </VisitDate>";
        soapMessage += "<VisitStartTime> </VisitStartTime>";
        soapMessage += "<VisitEndTime> </VisitEndTime>";
        soapMessage += "<ServHrs> 0 </ServHrs>";
        soapMessage += "<Location> 1 </Location>";
        soapMessage += "<LocationRemarks> </LocationRemarks>";
        soapMessage += "<VisitStatus> 0 </VisitStatus>";
        soapMessage += "<VisitStatusRemarks> </VisitStatusRemarks>";
        soapMessage += "<VisitDetailIndoor> </VisitDetailIndoor>";
        soapMessage += "<VisitDetailIndoorRemarks> </VisitDetailIndoorRemarks>";
        soapMessage += "<VisitDetailOutdoor> </VisitDetailOutdoor>";
        soapMessage += "<VisitDetailOutdoorRemarks> </VisitDetailOutdoorRemarks>";
        soapMessage += "<VisitDetailOther> </VisitDetailOther>";
        soapMessage += "<CategoryTopic1> </CategoryTopic1>";
        soapMessage += "<CategoryTopic2> </CategoryTopic2>";
        soapMessage += "<CategoryTopic3> </CategoryTopic3>";
        soapMessage += "<UlnarLength> 0 </UlnarLength>";
        soapMessage += "<Height> 1.51 </Height>";
        soapMessage += "<Weight> 0.0 </Weight>";
        soapMessage += "<Bmi> 0.0 </Bmi>";
        soapMessage += "<Waist> 0.0 </Waist>";
        soapMessage += "<Hip> 0.0 </Hip>";
        soapMessage += "<WHRatio> 0.0 </WHRatio>";
        soapMessage += "<LifeStyleQuestion1> 0 </LifeStyleQuestion1>";
        soapMessage += "<LifeStyleQuestion2> 0 </LifeStyleQuestion2>";
        soapMessage += "<LifeStyleQuestion3> 0 </LifeStyleQuestion3>";
        soapMessage += "<LifeStyleQuestion4> 0 </LifeStyleQuestion4>";
        soapMessage += "<LifeStyleQuestion5> 0 </LifeStyleQuestion5>";
        soapMessage += "<LifeStyleQuestion6> 0 </LifeStyleQuestion6>";
        soapMessage += "<LifeStyleMeasureBloodSuger> 0 </LifeStyleMeasureBloodSuger>";
        soapMessage += "<LifeStyleMeasureBsLocation> 0 </LifeStyleMeasureBsLocation>";
        soapMessage += "<LifeStyleMeasureBsPeriod> 0 </LifeStyleMeasureBsPeriod>";
        soapMessage += "<LifeStyleMeasureBsNoOfTime> 0.0 </LifeStyleMeasureBsNoOfTime>";
        soapMessage += "<LifeStyleMeasureBloodPressure> 0 </LifeStyleMeasureBloodPressure>";
        soapMessage += "<LifeStyleMeasureBpLocation> 0 </LifeStyleMeasureBpLocation>";
        soapMessage += "<LifeStyleMeasureBpPeriod> 0 </LifeStyleMeasureBpPeriod>";
        soapMessage += "<LifeStyleMeasureBpNoOfTime > 0.0 </LifeStyleMeasureBpNoOfTime>";
        soapMessage += "<EmotionAssessment>, </EmotionAssessment>";
        soapMessage += "<EmotionAssessmentRemarks> </EmotionAssessmentRemarks>";
        soapMessage += "<OtherHospDisbete> 0 </OtherHospDisbete>";
        soapMessage += "<OtherHospDisbeteNoOfDay> 0 </OtherHospDisbeteNoOfDay>";
        soapMessage += "<OtherHospHighBp> 0 </OtherHospHighBp>";
        soapMessage += "<OtherHospHighBpNoOfDay> 0 </OtherHospHighBpNoOfDay>";
        soapMessage += "<OtherHospOtherIllness> 0 </OtherHospOtherIllness>";
        soapMessage += "<OtherHospOtherIllnessNoOfDay> 0 </OtherHospOtherIllnessNoOfDay>";
        soapMessage += "<OtherAccident> 0 </OtherAccident>";
        soapMessage += "<OtherAccidentNoOfDay> 0 </OtherAccidentNoOfDay>";
        soapMessage += "<OtherSpecialNeed> 0 </OtherSpecialNeed>";
        soapMessage += "<OtherSpecialNeedService> </OtherSpecialNeedService>";
        soapMessage += "<OtherRemarks> 2342343243242345239472308947892374983274982374987239847239874982374982374897239847293874892374983274987234p98571985471947503750987209857908237459823740958723908457908237459082754908720954790283754982374598723908547230985798237549823745987329804573298 </OtherRemarks>";
        soapMessage += "<Status> 1 </Status>";
        soapMessage += "<DeletePicString> </DeletePicString>";
        soapMessage += "<NeedsContent></NeedsContent>";
        soapMessage += "<hvuilList></hvuilList>";
        soapMessage += "<hvImgKeepListStr > 79, 80, 81, 82, 83, 84, 85 </hvImgKeepListStr>";
        soapMessage += "<hvNewImgQty > 0 </hvNewImgQty>";
        soapMessage += "<hvvlList/>";
        soapMessage += "<bplList/>";
        soapMessage += "<hrlList/>";
        soapMessage += "<tobj>";
        soapMessage += "<TaskId>87 </TaskId>";
        soapMessage += "<Schedule_Date> 17 - 06 - 2019 </Schedule_Date>";
        soapMessage += "<Schedule_Time> </Schedule_Time>";
        soapMessage += "</tobj>";
        soapMessage += "</objAppHomeVisit>";
        soapMessage += "</hvLogList>";
        soapMessage += "<activityLogList></activityLogList>";
        soapMessage += "<phoneSupportLogList></phoneSupportLogList>";
        soapMessage += "<medicAppointLogList></medicAppointLogList>";
        soapMessage += "</objSaveAll>";
        soapMessage += "</SaveAll>";
        soapMessage += "</soap12:Body>";
        soapMessage += "</soap12:Envelope>";


        // var soapMessage = "<?xml version='1.0' encoding='utf-8'?>";
        // soapMessage += "<soap12:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap12='http://www.w3.org/2003/05/soap-envelope'>";
        // soapMessage += "<soap12:Body>";
        // soapMessage += "<SaveAll  xmlns=\"http://tempuri.org/\">";
        // soapMessage += "<objSaveAll>";
        // soapMessage += "<hvLogList>";
        // soapMessage += "<objAppHomeVisit>";
        // soapMessage += "<ClientId>218</ClientId>";
        // soapMessage += "<CaseId>32</CaseId>";
        // soapMessage += "<TaskId>87</TaskId>";
        // soapMessage += "<VisitId>75</VisitId>";
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
        // soapMessage += " <hvNewImgQty>0</hvNewImgQty>";
        // soapMessage += "<hvvlList/>";

        // soapMessage += "<activityLogList>";
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
        // soapMessage += "</activityLogList>";

        // soapMessage += "<phoneSupportLogList>";
        // soapMessage += "<tb_phone_support_log_temp>";
        // soapMessage += "<SupportId>int</SupportId>";
        // soapMessage += "<CaseId>int</CaseId>";
        // soapMessage += "<CallDate>string</CallDate>";
        // soapMessage += "<CallStartTime>string</CallStartTime>";
        // soapMessage += "<CallEndTime>string</CallEndTime>";
        // soapMessage += "<Detail>string</Detail>";
        // soapMessage += "<DetailOther>string</DetailOther>";
        // soapMessage += "<OtherRemark>string</OtherRemark>";
        // soapMessage += "<ResponsibleVol>int</ResponsibleVol>";
        // soapMessage += "<CannotContact>int</CannotContact>";
        // soapMessage += "<NextPhoneDate>string</NextPhoneDate>";
        // soapMessage += "<NextPhoneTime>string</NextPhoneTime>";
        // soapMessage += "<Status>int</Status>";
        // soapMessage += "</tb_phone_support_log_temp>";
        // soapMessage += "<tb_phone_support_log_temp>";
        // soapMessage += "<SupportId>int</SupportId>";
        // soapMessage += "<CaseId>int</CaseId>";
        // soapMessage += "<CallDate>string</CallDate>";
        // soapMessage += "<CallStartTime>string</CallStartTime>";
        // soapMessage += "<CallEndTime>string</CallEndTime>";
        // soapMessage += "<Detail>string</Detail>";
        // soapMessage += "<DetailOther>string</DetailOther>";
        // soapMessage += "<OtherRemark>string</OtherRemark>";
        // soapMessage += "<ResponsibleVol>int</ResponsibleVol>";
        // soapMessage += "<CannotContact>int</CannotContact>";
        // soapMessage += "<NextPhoneDate>string</NextPhoneDate>";
        // soapMessage += "<NextPhoneTime>string</NextPhoneTime>";
        // soapMessage += "<Status>int</Status>";
        // soapMessage += "</tb_phone_support_log_temp>";
        // soapMessage += "</phoneSupportLogList>";

        // soapMessage += "<medicAppointLogList>";
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
        // soapMessage += "</medicAppointLogList>";

        // soapMessage += "</objSaveAll>";
        // soapMessage += "</SaveAll>";
        // soapMessage += "</soap12:Body>";
        // soapMessage += "</soap12:Envelope>";
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
                return ApiConfig.ErrorHandle('/SaveAll', data, err);
            });
    }

}
