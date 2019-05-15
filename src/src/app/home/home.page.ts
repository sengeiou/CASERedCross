import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivityServe } from 'src/mgrServe/ActivityServe';
import { ServiceApi } from 'src/providers/service.api';
import { CaseServe } from 'src/mgrServe/CaseServe';
import { VisitServe } from 'src/mgrServe/VisitServe';
import { PhoneServe } from 'src/mgrServe/PhoneServe';
import { VolunteerServr } from 'src/mgrServe/VolunteerServr';
import { SpecialtyServe } from 'src/mgrServe/SpecialtyServe';
import { HosiptalServe } from 'src/mgrServe/HosiptalServe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ServiceApi]
})
export class HomePage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public api: ServiceApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  n = 1500;
  list = [{}, {}]
  caselist = [];
  onMyLoad() {
    //参数
    this.params;
    this.getActivityList()
  }
  onMyShow() {

    this.getActivityList()
    this.getCase()
  }


  logout() { //退出登录
    this.showConfirm('你確定要登出嗎？', (e) => {
      if (e) {
        this.navigate('test')
      }
    })
  }

  upload() { //上传资料到服务器
    this.showConfirm('你確定要同步資料嗎？', (e) => {
      if (e) {
        this.SysnAllWeb()
      }
    })
  }

  
  phone(caseID,LocalId) {
    console.log(caseID,LocalId)
    this.navigate("phone", {caseID: caseID,PhoneID:LocalId,UserId: this.params.id});
  }


  activity(caseID,LocalId) {
    console.log(caseID,LocalId);
    this.navigate('activity', { caseID: caseID,LocalId:LocalId,UserId: this.params.id});
  }

  visit(caseID,LocalId) {
    console.log(caseID,LocalId)
    this.navigate('visit', { caseID: caseID,LocalId:LocalId ,UserId: this.params.id});
  }

 
  getActivityList() {
    var visit = new VisitServe();
    visit.getAllVisitList().then((e)=>{
      console.log(e)
    })
    var activity = new ActivityServe();
    activity.getAllActivityList().then((e)=>{
      console.log(e)
    })
  }
  getCase() {
    var cases = new CaseServe();
    // cases.addCase();
    cases.getAllCaseList().then((e) => {
      console.log(e);
      console.log(this.caselist);
      var arr = null;
      arr = Array.from(e.res.rows);
      for (var i = 0; i < arr.length; i++) {
        arr[i].activityList = [];
        arr[i].visitList = [];
      }
      this.caselist = arr;
 
      for (var i = 0; i < this.caselist.length; i++) {
        // console.log(this.caselist[i].id)
        this.setVisit( this.caselist[i]);
        this.setPhnoe(this.caselist[i]);
        this.setActivity(this.caselist[i]);
      }
      console.log(this.caselist)
    })
  }


  setVisit(kv){
    var visit = new VisitServe();
    visit.getVisitCaseId(kv.CaseId).then((e) => {
      console.log(e);
      if (e.res.rows.length > 0) {
        console.log( e.res.rows);
        kv.visitList = Array.from(e.res.rows);
      }
    });
  }

  setPhnoe(kv){
    var phone=new PhoneServe();
    phone.getPhoneCaseId(kv.CaseId).then((e) => {
      console.log(e);
      if (e.res.rows.length > 0) {
        console.log( e.res.rows);
        kv.phoneList = Array.from(e.res.rows);
        // this.CallDate_show=AppUtil.FormatDate(new Date(data["CallDate"]));
      }
    });
  }

  setActivity(kv){
    var activity = new ActivityServe();
    activity.getAllActivityListCaseId(kv.CaseId).then((e) => {  
      console.log(e);
      if (e.res.rows.length > 0) {
        console.log( e.res.rows);
        kv.activityList = Array.from(e.res.rows);
      }
    });
  }

  Volunteer=[];
  Specialty=[];
  Hosp=[];
  saList=[];
  SysnAllWeb(){
    var VolId=this.params.id
    this.api.SysnAllResultRecord(VolId).then((ret)=>{
      console.log(ret)
      if(ret.Result=="false"){
        this.Volunteer=ret.vList.VolunteerApp
        this.Specialty=ret.msList.objMSpecialtyApp
        this.Hosp=ret.mhList.objMHospApp
        this.saList=ret.saList.objSysnAllApp
        this.updateData()
      }else{
        alert("失败:"+ret.strMsg);
        this.toast('未能連線，無法登入');
      }
    });
  }

  updateData(){
    var volunteer = new VolunteerServr();
    volunteer.deleteVolunteer();
    var specialtyServe = new SpecialtyServe();
    specialtyServe.deleteSpecialty()
    var hosiptalServe = new HosiptalServe();
    hosiptalServe.deleteHosiptal()
    var cases = new CaseServe();
    cases.deleteCase()
    var visit = new VisitServe();
    visit.deleteVisit()
    var phone=new PhoneServe();
    phone.deletePhone()
    var activity = new ActivityServe();
    activity.deleteActivity()
    for(var i = 0; i < this.Volunteer.length; i++){
      this.setVolunteer( this.Volunteer[i]);
    }
    for(var i = 0; i < this.Specialty.length; i++){
      this.setSpecialty( this.Specialty[i]);
    }
    for(var i = 0; i < this.Hosp.length; i++){
      this.setHosp( this.Hosp[i]);     
    }
    for(var i = 0; i < this.saList.length; i++){
      this.setCase( this.saList[i].caseObj);  

      if(this.saList[i].psaList.objPhoneSupportApp){
        this.setPhone(this.saList[i].psaList.objPhoneSupportApp)
      }

      if(this.saList[i].hvList.objHomeVisitApp){
        for(var j = 0; j < this.saList[i].hvList.objHomeVisitApp.length; j++){
          this.setVisitWeb(this.saList[i].hvList.objHomeVisitApp[j])
        }
       
      }
      if(this.saList[i].aList.objActivityApp){
        for(var j = 0; j < this.saList[i].aList.objActivityApp.length; j++){
          this.setActivityWeb(this.saList[i].aList.objActivityApp[j])
        }
       
      }
      
    }
   this.getCase()
  }

  setVolunteer(kv){
    var volunteer = new VolunteerServr();
    volunteer.addVolunteer(kv.VolId,kv.UserName).then((e) => {
      console.log(e);
    });
  }
  setSpecialty(kv){
    var specialtyServe = new SpecialtyServe();
    specialtyServe.addSpecialty(kv.Name).then((e) => {
      console.log(e);
    });
  }
  setHosp(kv){
    var hosiptalServe = new HosiptalServe();
    hosiptalServe.addHosiptal(kv.Name).then((e) => {
      console.log(e);
    });
  }
  setCase(kv){
    var caseServe = new CaseServe();
    caseServe.addCase(kv.CaseId,kv.CaseNo,kv.QRCode,kv.ChiName_Disply,kv.Illness_Disply,kv.OtherIllness_Disply,kv.CarePlan_Disply,kv.Height).then((e) => {
      console.log(e);
    });
  }

  setPhone(kv){
    console.log(kv)
    var phone=new PhoneServe();
    if(kv){
      phone.addPhoneWeb(kv.CallDate,kv.CallEndTime,kv.CallStartTime,kv.CaseId,kv.Detail,kv.DetailOther,kv.OtherRemark,kv.Status,kv.SupportId,kv.UserName).then((e) => {
        console.log(e);
      });
    }
    
  }

  setVisitWeb(kv){
    console.log(kv)
    var visit = new VisitServe();
    visit.addVisit( kv.Bmi, kv.CaseId, kv.CategoryTopic1, kv.CategoryTopic2, kv.CategoryTopic3,  kv.EmotionAssessment, kv.EmotionAssessmentRemarks, kv.Hip,  kv.LifeStyleMeasureBloodPressure, kv.LifeStyleMeasureBloodSuger, kv.LifeStyleMeasureBpLocation, kv.LifeStyleMeasureBpNoOfTime, kv.LifeStyleMeasureBpPeriod, kv.LifeStyleMeasureBsLocation, kv.LifeStyleMeasureBsNoOfTime, kv.LifeStyleMeasureBsPeriod, kv.LifeStyleQuestion1, kv.LifeStyleQuestion2, kv.LifeStyleQuestion3, kv.LifeStyleQuestion4, kv.LifeStyleQuestion5,kv.LifeStyleQuestion6, kv.Location, kv.LocationRemarks, kv.OtherAccident, kv.OtherAccidentNoOfDay, kv.OtherHospDisbete,kv.OtherHospDisbeteNoOfDay,kv.OtherHospHighBp,kv.OtherHospHighBpNoOfDay,kv.OtherHospOtherIllness,kv.OtherHospOtherIllnessNoOfDay,kv.OtherRemarks,kv.OtherSpecialNeed,kv.OtherSpecialNeedService,kv.ScheduleDate,kv.ScheduleTime,kv.Status,kv.TaskId,kv.VisitDate_Disply,kv.VisitDetailIndoor, kv.VisitDetailIndoorRemarks, kv.VisitDetailOther,kv.VisitDetailOutdoor,kv.VisitDetailOutdoorRemarks,kv.VisitEndTime,kv.VisitId,kv.VisitStartTime,kv.VisitStatus,kv.VisitStatusRemarks,kv.WHRatio ,kv.Waist, kv.Weight).then((e)=>[
      console.log(e)
    ])
    
  }

  setActivityWeb(kv){
    console.log(kv)
    //caseId, activityDate, activityStartTime, activityEndTime, presentVolunteer, actType, activityDetailType, remarks1, remarks2, remarks3, remarks4, otherActRemarks, otherContent
    var activity = new ActivityServe();
    activity.addActivityWeb(kv.CaseId,kv.ActDate,kv.ActStartTime,kv.ActEndTime,kv.ActivityVolList.objActivityVolApp.VolId,kv.ActType,kv.ActDetailType,kv.Remarks1,kv.Remarks2,kv.Remarks3,kv.Remarks4,kv.OtherActRemarks,kv.Remarks).then((e)=>{

    })
  }


}
