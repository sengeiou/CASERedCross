import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { CaseServe } from 'src/mgrServe/CaseServe';
import { VisitServe } from 'src/mgrServe/VisitServe';
import { VolunteerServr } from 'src/mgrServe/VolunteerServr';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.page.html',
  styleUrls: ['./visit.page.scss'],
})
export class VisitPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

    this.visit = {};
    this.casedata={};

  }
  ScheduleDate = '';//计划日期
  ScheduleTime = '';//计划时间
  VisitDate = ''; //实际日期
  VisitStartTime = '';//实际开始时间
  VisitEndTime = '';//实际结束时间
  Location = ''; //面见地点
  LocationRemarks = '';//其他地点输入
  VisitStatus = '';//探访状况
  VisitStatusRemarks = '';//未能探访输入
  presentVolunteer = ''; //出席义工
  supportVolunteer = ''; //支援义工
  indoorActivities = '';//室内活动
  otherIndoorActivities = '';//其他室内活动输入
  outdoorActivities = '';//室外活动
  otherOutdoorActivities = '';//其他室外活动输入
  otherServe = '';//其他服务
  targetTitle1 = '';//目标标题
  targetTitle2 = '';//目标标题
  targetTitle3 = '';//目标标题

  VisitDetailIndoor = '';
  VisitDetailIndoorRemarks = '';
  VisitDetailOutdoor = '';
  VisitDetailOutdoorRemarks = '';
  VisitDetailOther = '';
  CategoryTopic1 = '';
  CategoryTopic2 = '';
  CategoryTopic3 = '';

  Height = 0;
  Weight = 0;
  Bmi = 0;
  Waist = 0;
  Hip = 0;
  WHRatio = 0;
  SYS1 = 0;
  DlA1 = 0;
  SYS2 = 0;
  DlA2 = 0;
  heartBeats1 = 0;
  heartBeats2 = 0;

  LifeStyleQuestion1=0;
  LifeStyleQuestion2=0;
  LifeStyleQuestion3=0;
  LifeStyleQuestion4=0;
  LifeStyleQuestion5=0;
  LifeStyleQuestion6=0;
  LifeStyleMeasureBsLocation=0;
  LifeStyleMeasureBsPeriod=0;
  LifeStyleMeasureBsNoOfTime=0;
  LifeStyleMeasureBloodPressure=0;
  LifeStyleMeasureBpLocation=0;
  LifeStyleMeasureBpPeriod=0;
  LifeStyleMeasureBpNoOfTime=0;

  EmotionAssessment='';
  EmotionAssessmentRemarks='';

  OtherHospDisbete='';
  OtherHospDisbeteNoOfDay='';
  OtherHospHighBp='';
  OtherHospHighBpNoOfDay='';
  OtherHospOtherIllness='';
  OtherHospOtherIllnessNoOfDay='';
  OtherAccident='';
  OtherAccidentNoOfDay='';
  OtherSpecialNeed='';
  OtherSpecialNeedService='';
  OtherRemarks='';
  

  onMyLoad() {
    //参数
    this.params;
    this.getVolunteerList()
  }
  onMyShow() {
    this.getCase()
    this.getVisitId()
    if(AppBase.LastQrcode!=''){
      this.qrcodeHandle(AppBase.LastQrcode);
      AppBase.LastQrcode="";
      return;
    }
  }

  

  qrcodeHandle(code){
    alert(code);
  }
  LocalId = 0;
  casedata = null;



  getCase() {
    this.LocalId = this.params.LocalId;
    var cases = new CaseServe();
    cases.getCaseId(this.params.caseID).then((e) => {
      console.log(e)
      var casedata = e.res.rows;
      var data = Array.from(casedata)[0]
      this.casedata = data;
      console.log(data)
    })
  }

  visit = null;
  getVisitId() {
    console.log(this.LocalId);

    if (this.LocalId > 0) {
      var visit = new VisitServe();
      visit.getVisitId(this.LocalId).then((e) => {
        console.log(e)
        var casedata = e.res.rows;
        var data = Array.from(casedata)[0]
        this.visit = data;
        console.log(data);
      })
    }
  }

  Volunteer = [];
  getVolunteerList() {
    var volunteerServr = new VolunteerServr();
    volunteerServr.getAllVolunteerList().then((e) => {
      if (e.res.rows.length > 0) {
        console.log(Array.from(e.res.rows))
        this.Volunteer = Array.from(e.res.rows)
      }
    })
  }


  saveYuyue(visitId) {

    console.log(visitId, this.ScheduleDate, this.ScheduleTime, this.params.caseID)
    this.ScheduleDate = AppUtil.FormatDate(new Date(this.ScheduleDate));
    this.ScheduleTime = AppUtil.FormatTime(new Date(this.ScheduleTime));
    console.log(this.ScheduleDate)
    if (!this.visit.ScheduleDate) {
      var visit = new VisitServe();
      // AppUtil.FormatDate()
      visit.addVisit_yuyue(visitId, this.ScheduleDate, this.ScheduleTime, this.params.caseID).then((e) => {
        console.log(e)
        if (this.LocalId == 0 || this.LocalId == undefined) {
          this.LocalId = e.res.insertId;
          visit.saveVisitCaseId(this.params.caseID,e.res.insertId).then((e)=>{
            console.log(e)
          })
        }
        this.getVisitId()
      })
    }

  }

  getLocation(e) {
    console.log(e)
    this.Location = e;
  }

  getVisitStatus(e) {
    console.log(e)
    this.VisitStatus = e;
  }

  saveVisit_Neurou(visitId) {
    console.log(visitId, this.VisitDate, this.VisitStartTime, this.VisitEndTime, this.presentVolunteer, this.supportVolunteer, this.Location, this.LocationRemarks, this.VisitStatus, this.VisitStatusRemarks, this.params.caseID)
    // return;
    if (!this.VisitDate) {
      this.toast('你沒有填寫實際探訪日期');
      return;
    }
    if (!this.VisitStartTime || !this.VisitEndTime) {
      this.toast('你沒有填寫實際探訪時間');
      return;
    }
    if (!this.presentVolunteer) {
      this.toast('你沒有填寫出席義工一欄');
      return;
    }
    if (!this.VisitStatus) {
      this.toast('你沒有填寫探訪狀況');
      return;
    }
    if (this.VisitStatus == '2' && !this.VisitStatusRemarks) {
      this.toast('你沒有填寫未能探訪的原因');
      return;
    }

    if (!this.visit.VisitDate) {
      var visit = new VisitServe();
      this.VisitDate = AppUtil.FormatDate(new Date(this.VisitDate));
      this.VisitStartTime = AppUtil.FormatTime(new Date(this.VisitStartTime));
      this.VisitEndTime = AppUtil.FormatTime(new Date(this.VisitEndTime));
      // console.log(this.presentVolunteer, this.supportVolunteer)
      visit.addVisit_neurou(visitId, this.VisitDate, this.VisitStartTime, this.VisitEndTime, this.presentVolunteer, this.supportVolunteer, this.Location, this.LocationRemarks, this.VisitStatus, this.VisitStatusRemarks, this.params.caseID).then((e) => {
        console.log(e)
        if (this.LocalId == 0 || this.LocalId == undefined) {
          this.LocalId = e.res.insertId;
          visit.saveVisitCaseId(this.params.caseID,e.res.insertId).then((e)=>{
            console.log(e)
          })
        }
        this.toast('資料提交成功');
        this.getVisitId()
      })
    }
  }

  getVisitDetailIndoor(e) {
    console.log(e)
    this.VisitDetailIndoor = e;
  }
  getVisitDetailOutdoor(e) {
    console.log(e)
    this.VisitDetailOutdoor = e;
  }

  saveService_neurou(visitId) {
    console.log(visitId, this.VisitDetailIndoor, this.VisitDetailIndoorRemarks, this.VisitDetailOutdoor, this.VisitDetailOutdoorRemarks, this.VisitDetailOther, this.CategoryTopic1, this.CategoryTopic2, this.CategoryTopic3, this.params.caseID)
    if (!this.VisitDetailIndoor) {
      this.toast('你沒有填寫室內活動選項');
      return;
    }
    if (this.VisitDetailIndoor == '其他' && !this.VisitDetailIndoorRemarks) {
      this.toast('你沒有填寫室內活動的其他項目');
      return;
    }
    if (!this.VisitDetailOutdoor) {
      this.toast('你沒有填寫室外活動選項');
      return;
    }
    if (this.VisitDetailOutdoor == '其他' && !this.VisitDetailOutdoorRemarks) {
      this.toast('你沒有填寫室外活動的其他項目');
      return;
    }

    var visit = new VisitServe();
    visit.saveService_neurou(visitId, this.VisitDetailIndoor, this.VisitDetailIndoorRemarks, this.VisitDetailOutdoor, this.VisitDetailOutdoorRemarks, this.VisitDetailOther, this.CategoryTopic1, this.CategoryTopic2, this.CategoryTopic3, this.params.caseID).then((e) => {
      if (this.LocalId == 0 || this.LocalId == undefined) {
        this.LocalId = e.res.insertId;
        visit.saveVisitCaseId(this.params.caseID,e.res.insertId).then((e)=>{
          console.log(e)
        })
      }
      this.toast('資料提交成功');
      this.getVisitId()
    })
  }

  getWeight(e) {
    console.log(e)
    this.Weight = e;
    this.Bmi = this.Weight / (1.72 * 1.72)
  }

  getWaist(e) {
    this.Waist = e;
    this.WHRatio = this.Waist / this.Hip;
  }

  getHip(e) {
    this.Hip = e;
    this.WHRatio = this.Waist / this.Hip;
  }

  saveHeightWeight(visitId) {
    console.log(visitId, this.Weight, this.Bmi, this.Waist, this.Hip, this.WHRatio, this.SYS1, this.DlA1, this.SYS2, this.DlA2, this.heartBeats1, this.heartBeats2, this.params.caseID)
    this.WHRatio = this.Waist / this.Hip;
    this.Bmi = this.Weight / (1.72 * 1.72)
    var visit = new VisitServe();
    visit.saveHeightWeight(visitId, this.Weight, this.Bmi, this.Waist, this.Hip, this.WHRatio, this.SYS1, this.DlA1, this.SYS2, this.DlA2, this.heartBeats1, this.heartBeats2, this.params.caseID).then((e) => {
      if (this.LocalId == 0 || this.LocalId == undefined) {
        this.LocalId = e.res.insertId;
        visit.saveVisitCaseId(this.params.caseID,e.res.insertId).then((e)=>{
          console.log(e)
        })
      }
      this.toast('資料提交成功');
      this.getVisitId()
    })
  }

  getLifeHabit1(e) {
    console.log(e)
    this.LifeStyleQuestion1 = e;
  }
  getLifeHabit2(e) {
    console.log(e)
    this.LifeStyleQuestion2 = e;
  }
  getLifeHabit3(e) {
    console.log(e)
    this.LifeStyleQuestion3 = e;
  }
  getLifeHabit4(e) {
    console.log(e)
    this.LifeStyleQuestion4 = e;
  }
  getLifeHabit5(e) {
    console.log(e)
    this.LifeStyleQuestion5 = e;
  }
  getLifeHabit6(e) {
    console.log(e)
    this.LifeStyleQuestion6 = e;
  }

  saveLifeHabit(visitId){
    console.log(visitId, this.LifeStyleQuestion1,this.LifeStyleQuestion2,this.LifeStyleQuestion3,this.LifeStyleQuestion4,this.LifeStyleQuestion5,this.LifeStyleQuestion6, this.params.caseID)
    this.WHRatio = this.Waist / this.Hip;
    this.Bmi = this.Weight / (1.72 * 1.72)
    var visit = new VisitServe();
    visit.saveLifeHabit(visitId, this.LifeStyleQuestion1,this.LifeStyleQuestion2,this.LifeStyleQuestion3,this.LifeStyleQuestion4,this.LifeStyleQuestion5,this.LifeStyleQuestion6, this.params.caseID).then((e) => {
      if (this.LocalId == 0 || this.LocalId == undefined) {
        this.LocalId = e.res.insertId;
        visit.saveVisitCaseId(this.params.caseID,e.res.insertId).then((e)=>{
          console.log(e)
        })
      }
      this.toast('資料提交成功');
      this.getVisitId()
    })
  }

  getEmotion(e){
    console.log(e)
    this.EmotionAssessment = e;
  }

  saveEmotion(visitId){
    console.log(visitId, this.EmotionAssessment,this.params.caseID)
    this.WHRatio = this.Waist / this.Hip;
    this.Bmi = this.Weight / (1.72 * 1.72)
    var visit = new VisitServe();
    visit.saveEmotion(visitId, this.EmotionAssessment, this.params.caseID).then((e) => {
      if (this.LocalId == 0 || this.LocalId == undefined) {
        this.LocalId = e.res.insertId;
        visit.saveVisitCaseId(e.res.insertId,e.res.insertId).then((e)=>{
          console.log(e)
        })
      }
      this.toast('資料提交成功');
      this.getVisitId()
    })
  }

  getOtherHospDisbete(e){
    console.log(e)
    this.OtherHospDisbete=e
  }

  getOtherHospHighBp(e){
    console.log(e)
    this.OtherHospHighBp=e
  }

  getOtherHospOtherIllness(e){
    console.log(e)
    this.OtherHospOtherIllness=e
  }

  getOtherAccident(e){
    console.log(e)
    this.OtherAccident=e
  }

  getOtherSpecialNeed(e){
    console.log(e)
    this.OtherSpecialNeed=e
  }

  OtherSupplement(visitId){
    if (!this.OtherHospDisbete  ) {
      this.toast('你沒有填滿長者其他狀況補充1');
      return;
    }
    if (this.OtherHospDisbete=='1' && !this.OtherHospDisbeteNoOfDay  ) {
      this.toast('你沒有填滿長者其他狀況補充2');
      return;
    }

    if (!this.OtherHospHighBp  ) {
      this.toast('你沒有填滿長者其他狀況補充3');
      return;
    }
    if (this.OtherHospHighBp=='1' && !this.OtherHospHighBpNoOfDay  ) {
      this.toast('你沒有填滿長者其他狀況補充4');
      return;
    }

    if (!this.OtherHospOtherIllness  ) {
      this.toast('你沒有填滿長者其他狀況補充5');
      return;
    }
    if (this.OtherHospOtherIllness=='1' && !this.OtherHospOtherIllnessNoOfDay  ) {
      this.toast('你沒有填滿長者其他狀況補充6');
      return;
    }

    if (!this.OtherAccident  ) {
      this.toast('你沒有填滿長者其他狀況補充7');
      return;
    }
    if (this.OtherAccident=='1' && !this.OtherAccidentNoOfDay  ) {
      this.toast('你沒有填滿長者其他狀況補充8');
      return;
    }

    if (!this.OtherSpecialNeed  ) {
      this.toast('你沒有填滿長者其他狀況補充9');
      return;
    }
    if (this.OtherSpecialNeed=='1' && !this.OtherSpecialNeedService  ) {
      this.toast('你沒有填滿長者其他狀況補充10');
      return;
    }

    var visit = new VisitServe();
    visit.savaOtherSupplement(visitId,this.OtherHospDisbete,this.OtherHospDisbeteNoOfDay,this.OtherHospHighBp,this.OtherHospHighBpNoOfDay,this.OtherHospOtherIllness,this.OtherHospOtherIllnessNoOfDay,this.OtherAccident,this.OtherAccidentNoOfDay,this.OtherSpecialNeed,this.OtherSpecialNeedService,this.OtherRemarks,this.params.caseID).then((e)=>{
      if (this.LocalId == 0 || this.LocalId == undefined) {
        this.LocalId = e.res.insertId;
        visit.saveVisitCaseId(e.res.insertId,e.res.insertId).then((e)=>{
          console.log(e)
        })
      }
      this.toast('資料提交成功');
      this.getVisitId()
    })
  }






  visitList() {
    this.navigate('visilt-list', { caseid: this.params.caseID });
  }

  uploadimg(visitid) {
    console.log(visitid)
    // return
    if(visitid<0){
      this.toast('資料没有保存，请先保存!');
      return;
    }
    this.navigate('uploadimg', { visitid: visitid });
  }

  aa() {
    this.navigate('heart-rat', { caseid: this.params.caseID });
  }
  scan(){
    this.navigate("qrcodescan");
  }

  bloodPressure(){
    this.navigate('bloodpressure', { caseid: this.params.caseID });
  }

  whr(){
    this.navigate('whr', { caseid: this.params.caseID });
  }

  weight(){
    this.navigate('weight', { caseid: this.params.caseID });
  }

  
}