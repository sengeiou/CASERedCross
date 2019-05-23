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


    public SaveActive(ActivityId, CaseId, ActDate, ActStartTime, ActEndTime, ActType, ActDetailType, Remarks1, Remarks2, Remarks3, Remarks4, OtherActRemarks, Remarks, Status,UserId) {
        var url = ApiConfig.getApiUrl();
        var data = { ActivityId, CaseId, ActDate, ActStartTime, ActEndTime, ActType, ActDetailType, Remarks1, Remarks2, Remarks3, Remarks4, OtherActRemarks, Remarks, Status ,UserId};
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
        soapMessage += "<tb_activity_vol_temp xsi:nil="+true+" />";
        soapMessage += "<tb_activity_vol_temp xsi:nil="+true+" />";
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

}
