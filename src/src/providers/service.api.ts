import { Injectable } from '@angular/core';
import { Http, XHRBackend } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { ApiConfig } from '../app/api.config'
import { X2JS } from 'src/mgr/X2JS';
@Injectable()
export class ServiceApi {

    constructor(public http: Http) {

    }


    public VolunteerLogin(strLoginId, strPwd) {



        var url = ApiConfig.getApiUrl();
        var data = { strLoginId, strPwd };
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });
        let body = ApiConfig.GetPostXml("VolunteerLogin", { strLoginId, 
            strPwd: ApiConfig.MD5(strPwd).toUpperCase() });

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                console.log(res);
                var xmlstr=res.text();
                console.log(xmlstr);
                var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json( xmlstr );
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
        var data = { strLoginId};
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });
        let body = ApiConfig.GetPostXml("ForgotPassword", { strLoginId});

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                console.log(res);
                var xmlstr=res.text();
                console.log(xmlstr);
                var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json( xmlstr );
                //输出结果
                console.log(jsonObj);
                console.log(jsonObj.Envelope.Body.VolunteerLoginResponse.VolunteerLoginResult);

                return jsonObj.Envelope.Body.VolunteerLoginResponse.VolunteerLoginResult;
            })
            .catch(err => {
                return ApiConfig.ErrorHandle('/ForgotPassword', data, err);
            });
    }

    public SysnAllResultRecord(strLoginId) {
        var url = ApiConfig.getApiUrl();
        var data = { strLoginId};
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });
        let body = ApiConfig.GetPostXml("SysnAllResultRecord", { strLoginId});

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                console.log(res);
                var xmlstr=res.text();
                console.log(xmlstr);
                var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json( xmlstr );
                //输出结果
                console.log(jsonObj);
                console.log(jsonObj.Envelope.Body.VolunteerLoginResponse.VolunteerLoginResult);

                return jsonObj.Envelope.Body.VolunteerLoginResponse.VolunteerLoginResult;
            })
            .catch(err => {
                return ApiConfig.ErrorHandle('/SysnAllResultRecord', data, err);
            });
    }



}
