import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides, LoadingController } from '@ionic/angular';
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
import { BloodPressureServe } from 'src/mgrServe/BloodPressureServe';
import { WeightServe } from 'src/mgrServe/WeightServe';
import { WHRServe } from 'src/mgrServe/WHRServe';
import { HeartRateServe } from 'src/mgrServe/HeartRateServe';
import { MedicalRecordServe } from 'src/mgrServe/MedicalRecordServe';
import { Network } from '@ionic-native/network/ngx';

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
    public api: ServiceApi,
    public network: Network,
    public loadingController: LoadingController
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  n = 1500;
  list = [{}, {}]
  caselist = [];
  wangluo = ''
  onMyLoad() {
    //参数
    this.params;
    this.getActivityList()
  }
  onMyShow() {

    this.getActivityList()
    this.getCase()
    this.wangluo = this.network.type;
    console.log(this.network.type)
  }


  logout() { //退出登录
    this.showConfirm('你確定要登出嗎？', (e) => {
      if (e) {
        this.navCtrl.navigateBack('test');
      }
    })
  }

  upload() { //上传资料到服务器
    this.wangluo = this.network.type;
    if (this.wangluo == 'none') {
      this.showConfirm('流動裝置沒有連接到互聯網', (e) => { })
      return;
    }

    this.showConfirm('你確定要同步資料嗎？', (e) => {
      if (e) {
        this.presentLoading();
      }
    })


  }

  loading = null;


  async presentLoading() {

    this.loading = await this.loadingController.create({
      message: '同步中'
    });
    await this.loading.present();
    var phoneList = [];
    var activityList = [];
    var visiltList = [];
    var medicAppointLogList = [];
    console.log('aa')
    // this.SysnAllWeb();

    var visit = new VisitServe();
    visit.getVisit_SavedStatus(1).then((e) => {
      console.log(e)
      visiltList = Array.from(e.res.rows)
    })

    var activity = new ActivityServe();
    activity.getActivity_SavedStatus(1).then((e) => {
      console.log(e)
      activityList = Array.from(e.res.rows)
    })

    var phone = new PhoneServe();
    phone.getPhone_SavedStatus(1).then((e) => {
      console.log(Array.from(e.res.rows))
      phoneList = Array.from(e.res.rows)

      // this.api.SaveAll(visiltList, phoneList, activityList, medicAppointLogList).then((ret) => {
      //   if (ret.Result == 'true') {
      //     this.SysnAllWeb();
      //   }
      //   console.log(ret)
      // })
    })

    var medicalRecordServe = new MedicalRecordServe();
    medicalRecordServe.getAllMedicalRecor_SavedStatus(1).then((e) => {
      console.log(e)
      medicAppointLogList = Array.from(e.res.rows)
    })

    this.api.SaveAll(visiltList, phoneList, activityList, medicAppointLogList).then((ret) => {
      if (ret.Result == 'true') {
        this.SysnAllWeb();
      }
      console.log(ret)
    })

  }

  phone(caseID, LocalId) {
    console.log(caseID, LocalId)
    this.navigate("phone", { caseID: caseID, PhoneID: LocalId, UserId: this.params.id });
  }


  activity(caseID, LocalId) {
    console.log(caseID, LocalId);
    this.navigate('activity', { caseID: caseID, LocalId: LocalId, UserId: this.params.id });
  }

  visit(caseID, LocalId) {
    console.log(caseID, LocalId)
    this.navigate('visit', { caseID: caseID, LocalId: LocalId, UserId: this.params.id });
  }

  getActivityList() {
    var visit = new VisitServe();
    visit.getAllVisitList().then((e) => {
      console.log(e)
    })
    var activity = new ActivityServe();
    activity.getAllActivityList().then((e) => {
      console.log(e)
    })
  }

  getCase() {
    var cases = new CaseServe();
    // cases.addCase();
    var UserId = this.params.id
    cases.getCaseVolVisitGrpId(UserId).then((e) => {
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
        this.setVisit(this.caselist[i]);
        this.setPhnoe(this.caselist[i]);
        this.setActivity(this.caselist[i]);
      }
      console.log(this.caselist)
    })
  }


  setVisit(kv) {
    var visit = new VisitServe();
    visit.getVisitCaseId(kv.CaseId).then((e) => {
      console.log(e);
      if (e.res.rows.length > 0) {
        console.log(e.res.rows);
        kv.visitList = Array.from(e.res.rows);
      }
    });
  }

  setPhnoe(kv) {
    var phone = new PhoneServe();
    phone.getPhoneCaseId(kv.CaseId).then((e) => {
      console.log(e);
      if (e.res.rows.length > 0) {
        console.log(e.res.rows);
        kv.phoneList = Array.from(e.res.rows);
        // this.CallDate_show=AppUtil.FormatDate(new Date(data["CallDate"]));
      }
    });
  }

  setActivity(kv) {
    var activity = new ActivityServe();
    activity.getAllActivityListCaseId(kv.CaseId).then((e) => {
      console.log(e);
      if (e.res.rows.length > 0) {
        console.log(e.res.rows);
        kv.activityList = Array.from(e.res.rows);
      }
    });
  }
  Caselist = [];
  visiltList = [];
  Phonelist = [];
  Activitylists = [];
  Volunteer = [];
  Specialty = [];
  Hosp = [];
  saList = [];
  BloodPressure = []; //血压
  Weight = []; //重量
  WHR = []; //腰臀比
  HeartRate = []; //心跳

  SysnAllWeb() {
    var VolId = this.params.id
    this.api.SysnAllResultRecord(VolId).then((ret) => {
      console.log(ret)
      if (ret.Result == "false") {
        this.Volunteer = ret.vList.VolunteerApp
        this.Specialty = ret.msList.objMSpecialtyApp
        this.Hosp = ret.mhList.objMHospApp
        this.saList = ret.saList.objSysnAllApp
        var saListtype = typeof this.saList;
        console.log(typeof this.saList)
        console.log(this.saList.length)
        if (saListtype == 'object' && this.saList.length == undefined) {
          var a = [];
          a.push(this.saList);
          this.saList = a;
        }

        this.updateData(); //同步数据到本地数据库

        this.loading.dismiss();;
      } else {
        alert("失败:" + ret.strMsg);
        this.toast('未能連線，無法登入');
      }
    });
  }

  updateData() {
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
    var phone = new PhoneServe();
    phone.deletePhone()
    var activity = new ActivityServe();
    activity.deleteActivity()
    for (var i = 0; i < this.Volunteer.length; i++) {
      this.setVolunteer(this.Volunteer[i]);
    }
    for (var i = 0; i < this.Specialty.length; i++) {
      this.setSpecialty(this.Specialty[i]);
    }
    for (var i = 0; i < this.Hosp.length; i++) {
      this.setHosp(this.Hosp[i]);
    }
    for (var i = 0; i < this.saList.length; i++) {
      //案例
      this.setCase(this.saList[i].caseObj);


      //电话
      var Phonelisttype = typeof this.saList[i].psaList.objPhoneSupportApp;
      if (Phonelisttype == 'object' && this.saList[i].psaList.objPhoneSupportApp.length == undefined) {
        var data = [];
        data.push(this.saList[i].psaList.objPhoneSupportApp)
        this.Phonelist = data;
      } else {
        this.Phonelist = this.saList[i].psaList.objPhoneSupportApp;
      }
      console.log(this.Phonelist)
      if (this.saList[i].psaList.objPhoneSupportApp) {
        for (var j = 0; j < this.Phonelist.length; j++) {
          this.setPhone(this.Phonelist[j])
          console.log(this.Phonelist[j])
        }
      }

      //探访
      var visiltListtype = typeof this.saList[i].hvList.objHomeVisitApp;
      if (visiltListtype == 'object' && this.saList[i].hvList.objHomeVisitApp.length == undefined) {
        var data = [];
        data.push(this.saList[i].hvList.objHomeVisitApp);
        this.visiltList = data;
      } else {
        this.visiltList = this.saList[i].hvList.objHomeVisitApp;
      }
      if (this.saList[i].hvList.objHomeVisitApp) {
        for (var j = 0; j < this.visiltList.length; j++) {
          this.setVisitWeb(this.visiltList[j])
        }
      }

      //活动
      var Activitylisttype = typeof this.saList[i].aList.objActivityApp;
      if (Activitylisttype == 'object' && this.saList[i].aList.objActivityApp.length == undefined) {
        var data = [];
        data.push(this.saList[i].aList.objActivityApp);
        this.Activitylists = data;
      } else {
        this.Activitylists = this.saList[i].aList.objActivityApp;
      }
      console.log(this.Activitylists)
      if (this.Activitylists) {
        console.log('555555hhhhh ')
        for (var j = 0; j < this.Activitylists.length; j++) {
          console.log('hhhhh ')
          this.setActivityWeb(this.Activitylists[j])
          console.log(this.Activitylists[j])
        }
      }

      //血压
      var BloodPressuretype = typeof this.saList[i].BloodPressureMonthlyList.objChartBPp;
      if (BloodPressuretype == 'object' && this.saList[i].BloodPressureMonthlyList.objChartBPp.length == undefined) {
        var data = [];
        data.push(this.saList[i].BloodPressureMonthlyList.objChartBP);
        this.BloodPressure = data;
      } else {
        this.BloodPressure = this.saList[i].BloodPressureMonthlyList.objChartBP;
      }
      if (this.BloodPressure) {
        for (var j = 0; j < this.BloodPressure.length; j++) {
          this.setBloodPressureWeb(this.BloodPressure[j])
        }
      }

      //体重
      var Weighttype = typeof this.saList[i].WeightMonthlyList.objChartWeight;
      if (Weighttype == 'object' && this.saList[i].WeightMonthlyList.objChartWeight.length == undefined) {
        var data = [];
        data.push(this.saList[i].WeightMonthlyList.objChartWeight);
        this.Weight = data;
      } else {
        this.Weight = this.saList[i].WeightMonthlyList.objChartWeight;
      }
      if (this.Weight) {
        for (var j = 0; j < this.Weight.length; j++) {
          this.setWeightWeb(this.Weight[j])
        }
      }

      //心跳
      var HeartRatetype = typeof this.saList[i].HeartRateMonthlyList.objChartHR;
      if (HeartRatetype == 'object' && this.saList[i].HeartRateMonthlyList.objChartHR.length == undefined) {
        var data = [];
        data.push(this.saList[i].HeartRateMonthlyList.objChartHR);
        this.HeartRate = data;
      } else {
        this.HeartRate = this.saList[i].HeartRateMonthlyList.objChartHR;
      }
      if (this.HeartRate) {
        for (var j = 0; j < this.HeartRate.length; j++) {
          this.setHeartRateWeb(this.HeartRate[j])
        }
      }

      //腰臀比
      var WHRtype = typeof this.saList[i].WaistHipMonthlyList.objChartWHR;
      if (WHRtype == 'object' && this.saList[i].WaistHipMonthlyList.objChartWHR.length == undefined) {
        var data = [];
        data.push(this.saList[i].WaistHipMonthlyList.objChartWHR);
        this.WHR = data;
      } else {
        this.WHR = this.saList[i].WaistHipMonthlyList.objChartWHR;
      }
      if (this.WHR) {
        for (var j = 0; j < this.WHR.length; j++) {
          this.setWHRWeb(this.WHR[j])
        }
      }

      console.log(this.BloodPressure)
    }

    this.getCase();

  }

  setVolunteer(kv) {
    var volunteer = new VolunteerServr();
    volunteer.addVolunteer(kv.VolId, kv.UserName).then((e) => {
      console.log(e);
    });
  }
  setSpecialty(kv) {
    var specialtyServe = new SpecialtyServe();
    specialtyServe.addSpecialty(kv.Name).then((e) => {
      console.log(e);
    });
  }
  setHosp(kv) {
    var hosiptalServe = new HosiptalServe();
    hosiptalServe.addHosiptal(kv.Name).then((e) => {
      console.log(e);
    });
  }
  setCase(kv) {
    var caseServe = new CaseServe();
    caseServe.addCase(kv.CaseId, kv.CaseNo, kv.QRCode, kv.ChiName_Disply, kv.Illness_Disply, kv.OtherIllness_Disply, kv.CarePlan_Disply, kv.Height,this.params.id ).then((e) => {
      console.log(e);
    });
  }

  setPhone(kv) {
    console.log(kv)
    var CallDate = AppUtil.FormatDate(new Date(kv.CallDate));
    var phone = new PhoneServe();
    if (kv) {
      phone.addPhoneWeb(CallDate, kv.CallEndTime, kv.CallStartTime, kv.CaseId, kv.Detail, kv.DetailOther, kv.OtherRemark, kv.Status, kv.SupportId, kv.UserName).then((e) => {
        console.log(e);
      });
    }

  }

  setVisitWeb(kv) {
    console.log(kv)
    var ScheduleDate = AppUtil.FormatDate(new Date(kv.ScheduleDate));
    var visit = new VisitServe();
    visit.addVisit(kv.Bmi, kv.CaseId, kv.CategoryTopic1, kv.CategoryTopic2, kv.CategoryTopic3, kv.EmotionAssessment, kv.EmotionAssessmentRemarks, kv.Hip, kv.LifeStyleMeasureBloodPressure, kv.LifeStyleMeasureBloodSuger, kv.LifeStyleMeasureBpLocation, kv.LifeStyleMeasureBpNoOfTime, kv.LifeStyleMeasureBpPeriod, kv.LifeStyleMeasureBsLocation, kv.LifeStyleMeasureBsNoOfTime, kv.LifeStyleMeasureBsPeriod, kv.LifeStyleQuestion1, kv.LifeStyleQuestion2, kv.LifeStyleQuestion3, kv.LifeStyleQuestion4, kv.LifeStyleQuestion5, kv.LifeStyleQuestion6, kv.Location, kv.LocationRemarks, kv.OtherAccident, kv.OtherAccidentNoOfDay, kv.OtherHospDisbete, kv.OtherHospDisbeteNoOfDay, kv.OtherHospHighBp, kv.OtherHospHighBpNoOfDay, kv.OtherHospOtherIllness, kv.OtherHospOtherIllnessNoOfDay, kv.OtherRemarks, kv.OtherSpecialNeed, kv.OtherSpecialNeedService, ScheduleDate, kv.ScheduleTime, kv.Status, kv.TaskId, kv.VisitDate_Disply, kv.VisitDetailIndoor, kv.VisitDetailIndoorRemarks, kv.VisitDetailOther, kv.VisitDetailOutdoor, kv.VisitDetailOutdoorRemarks, kv.VisitEndTime, kv.VisitId, kv.VisitStartTime, kv.VisitStatus, kv.VisitStatusRemarks, kv.WHRatio, kv.Waist, kv.Weight).then((e) => [
      console.log(e)
    ])

  }

  setActivityWeb(kv) {
    console.log(kv)
    var ActDate = AppUtil.FormatDate(new Date(kv.ActDate));
    //caseId, activityDate, activityStartTime, activityEndTime, presentVolunteer, actType, activityDetailType, remarks1, remarks2, remarks3, remarks4, otherActRemarks, otherContent
    var activity = new ActivityServe();
    activity.addActivityWeb(kv.ActivityId, kv.CaseId, ActDate, kv.ActStartTime, kv.ActEndTime, kv.ActivityVolList.objActivityVolApp.VolId, kv.ActType, kv.ActDetailType, kv.Remarks1, kv.Remarks2, kv.Remarks3, kv.Remarks4, kv.OtherActRemarks, kv.Remarks).then((e) => {

    })
  }

  setBloodPressureWeb(kv) {
    var bloodPressureServe = new BloodPressureServe();
    bloodPressureServe.addBloodPressureWeb(kv.CaseId, kv.Upper, kv.Lower, kv.Date).then((e) => {
      console.log(e)
    })
  }

  setWeightWeb(kv) {
    var weight = new WeightServe();
    weight.addWeight(kv.CaseId, kv.Weight, kv.date_swift_chart_display).then((e) => {
      console.log(e)
    })
  }

  setWHRWeb(kv) {
    var WHR = new WHRServe();
    WHR.addWHR(kv.CaseId, kv.Ratio, kv.date_swift_chart_display).then((e) => {
      console.log(e)
    })
  }

  setHeartRateWeb(kv) {
    var HeartRate = new HeartRateServe();
    HeartRate.addHeartRate(kv.CaseId, kv.HeartRate, kv.date_swift_chart_display).then((e) => {
      console.log(e)
    })
  }


}
