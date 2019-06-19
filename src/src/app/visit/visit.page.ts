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
import { ServiceApi } from 'src/providers/service.api';
import { ImageServe } from 'src/mgrServe/ImageServe';
import { MedicalRecordServe } from 'src/mgrServe/MedicalRecordServe';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.page.html',
  styleUrls: ['./visit.page.scss'],
  providers: [ServiceApi]
})
export class VisitPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public api: ServiceApi,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

    this.visit = {};
    this.casedata = {};

  }
  ScheduleDate = '';//计划日期
  ScheduleTime = '';//计划时间
  VisitDate = ''; //实际日期
  VisitStartTime = '';//实际开始时间
  VisitEndTime = '';//实际结束时间

  ScheduleTime2 = '';
  VisitDate2 = ''; 
  VisitStartTime2 = '';
  VisitEndTime2 = '';


  Location = 0; //面见地点
  LocationRemarks = '';//其他地点输入
  VisitStatus = 0;//探访状况
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
  Weight = null;
  Bmi = 0;
  Waist = null;
  Hip = null;
  WHRatio =null;
  SYS1 = null;
  DlA1 = null;
  SYS2 = null;
  DlA2 = null;
  heartBeats1 = null;
  heartBeats2 = null;

  LifeStyleQuestion1 = 0;
  LifeStyleQuestion2 = 0;
  LifeStyleQuestion3 = 0;
  LifeStyleQuestion4 = 0;
  LifeStyleQuestion5 = 0;
  LifeStyleQuestion6 = 0;
  LifeStyleMeasureBloodSuger = 0;
  LifeStyleMeasureBsLocation = 0;
  LifeStyleMeasureBsPeriod = 0;
  LifeStyleMeasureBsNoOfTime = null;
  LifeStyleMeasureBloodPressure = 0;
  LifeStyleMeasureBpLocation = 0;
  LifeStyleMeasureBpPeriod = 0;
  LifeStyleMeasureBpNoOfTime = null;

  EmotionAssessment = '';
  EmotionAssessmentRemarks = '';

  OtherHospDisbete = 0;
  OtherHospDisbeteNoOfDay = null;
  OtherHospHighBp = 0;
  OtherHospHighBpNoOfDay = null;
  OtherHospOtherIllness = 0;
  OtherHospOtherIllnessNoOfDay = null;
  OtherAccident = 0;
  OtherAccidentNoOfDay = null;
  OtherSpecialNeed = 0;
  OtherSpecialNeedService = '';
  OtherRemarks = '';
  NeedsContent = '';

  DeletePicString = ''

  presentVolunteer_show = ''
  supportVolunteer_show = ''
  Volunteerlist_show = ''
  ScheduleDate_Display = ''
  disabled = true;

  saomiao_show = false;
  time_type = ''

  onMyLoad() {
    //参数
    this.params;
    this.getVolunteerList()
  }
  onMyShow() {
    this.getCase()
    this.getVisitId()
    if (AppBase.LastQrcode != '') {
      this.qrcodeHandle(AppBase.LastQrcode);
      AppBase.LastQrcode = "";
      return;
    }

    // this.ScheduleDate = '';//计划日期
    // this.ScheduleTime = '';//计划时间
    // this.VisitDate = ''; //实际日期
    // this.VisitStartTime = '';//实际开始时间
    // this.VisitEndTime = '';//实际结束时间
    // this.Location = 0; //面见地点
    // this.LocationRemarks = '';//其他地点输入
    // this.VisitStatus = 0;//探访状况
    // this.VisitStatusRemarks = '';//未能探访输入
    // this.presentVolunteer = ''; //出席义工
    // this.supportVolunteer = ''; //支援义工
    // this.indoorActivities = '';//室内活动
    // this.otherIndoorActivities = '';//其他室内活动输入
    // this.outdoorActivities = '';//室外活动
    // this.otherOutdoorActivities = '';//其他室外活动输入
    // this.otherServe = '';//其他服务
    // this.targetTitle1 = '';//目标标题
    // this.targetTitle2 = '';//目标标题
    // this.targetTitle3 = '';//目标标题

    // this.VisitDetailIndoor = '';
    // this.VisitDetailIndoorRemarks = '';
    // this.VisitDetailOutdoor = '';
    // this.VisitDetailOutdoorRemarks = '';
    // this.VisitDetailOther = '';
    // this.CategoryTopic1 = '';
    // this.CategoryTopic2 = '';
    // this.CategoryTopic3 = '';

    // this.Height = 0;
    // this.Weight = 0;
    // this.Bmi = 0;
    // this.Waist = 0;
    // this.Hip = 0;
    // this.WHRatio = 0;
    // this.SYS1 = 0;
    // this.DlA1 = 0;
    // this.SYS2 = 0;
    // this.DlA2 = 0;
    // this.heartBeats1 = 0;
    // this.heartBeats2 = 0;

    // this.LifeStyleQuestion1 = 0;
    // this.LifeStyleQuestion2 = 0;
    // this.LifeStyleQuestion3 = 0;
    // this.LifeStyleQuestion4 = 0;
    // this.LifeStyleQuestion5 = 0;
    // this.LifeStyleQuestion6 = 0;
    // this.LifeStyleMeasureBloodSuger = 0;
    // this.LifeStyleMeasureBsLocation = 0;
    // this.LifeStyleMeasureBsPeriod = 0;
    // this.LifeStyleMeasureBsNoOfTime = 0;
    // this.LifeStyleMeasureBloodPressure = 0;
    // this.LifeStyleMeasureBpLocation = 0;
    // this.LifeStyleMeasureBpPeriod = 0;
    // this.LifeStyleMeasureBpNoOfTime = 0;

    // this.EmotionAssessment = '';
    // this.EmotionAssessmentRemarks = '';

    // this.OtherHospDisbete = 0;
    // this.OtherHospDisbeteNoOfDay = 0;
    // this.OtherHospHighBp = 0;
    // this.OtherHospHighBpNoOfDay = 0;
    // this.OtherHospOtherIllness = 0;
    // this.OtherHospOtherIllnessNoOfDay = 0;
    // this.OtherAccident = 0;
    // this.OtherAccidentNoOfDay = 0;
    // this.OtherSpecialNeed = 0;
    // this.OtherSpecialNeedService = '';
    // this.OtherRemarks = '';
    // this.NeedsContent = '';

    // this.DeletePicString = ''

    // this.presentVolunteer_show = ''
    // this.supportVolunteer_show = ''
    // this.Volunteerlist_show = ''
    // this.ScheduleDate_Display = ''


  }

  saomiao() {

    this.saomiao_show = true;
  }

  saomiao2() {
    this.saomiao_show = false;
  }

  aas() {
    console.log(this.presentVolunteer);
    // return;
    this.presentVolunteer_show = '';
    var Volunteerlist = this.presentVolunteer;
    console.log(Volunteerlist)
    var volunteerServr = new VolunteerServr();
    for (var i = 0; i < Volunteerlist.length; i++) {
      console.log(Volunteerlist[i])
      volunteerServr.getVolunteerId(Volunteerlist[i]).then((e) => {
        console.log(e)
        var data = Array.from(e.res.rows)[0]
        console.log(data)
        if (data) {
          if (this.presentVolunteer_show == '') {
            this.presentVolunteer_show = data['VolunteerName'];
          } else {
            this.presentVolunteer_show = this.presentVolunteer_show + ',' + data['VolunteerName'];
          }
        }
      })
    }
  }

  aab() {
    console.log(this.supportVolunteer);
    // return;
    this.supportVolunteer_show = '';
    var Volunteerlist = this.supportVolunteer;
    console.log(Volunteerlist)
    var volunteerServr = new VolunteerServr();
    for (var i = 0; i < Volunteerlist.length; i++) {
      console.log(Volunteerlist[i])
      volunteerServr.getVolunteerId(Volunteerlist[i]).then((e) => {
        console.log(e)
        var data = Array.from(e.res.rows)[0]
        console.log(data)
        if (data) {
          if (this.supportVolunteer_show == '') {
            this.supportVolunteer_show = data['VolunteerName'];
          } else {
            this.supportVolunteer_show = this.supportVolunteer_show + ',' + data['VolunteerName'];
          }
        }
      })
    }
  }

  qrcodeHandle(code) {
    if (code == this.casedata.QRCode) {
      this.showAlert('掃描成功');
      this.VisitDate = AppUtil.FormatDate2(new Date())
      if (this.time_type == 'ss') {
        this.VisitStartTime = AppUtil.FormatTime(new Date());//实际开始时间
      }
      if (this.time_type == 'end') {
        this.VisitEndTime = AppUtil.FormatTime(new Date());//实际结束时间
      }
    } else {
      this.showAlert('你掃描的二維碼和你的探訪對象並不符合').then(e => {

      })
    }
    console.log('開始時間：' + this.VisitStartTime);
    console.log('結束時間' + this.VisitEndTime);
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
  VisitDetailIndoorlist = [{
    type: false, value: 1
  }, {
    type: false, value: 2
  }, {
    type: false, value: 3
  }, {
    type: false, value: 4
  }, {
    type: false, value: 5
  }, {
    type: false, value: 6
  }
  ]

  VisitDetailOutdoorlist = [{
    type: false, value: 1
  }, {
    type: false, value: 2
  }, {
    type: false, value: 3
  }, {
    type: false, value: 4
  }
  ]

  EmotionAssessmentlist = [{
    type: false, value: 1
  }, {
    type: false, value: 2
  }, {
    type: false, value: 3
  }, {
    type: false, value: 4
  }
  ]

  NeedsContenttlist = [{
    type: false, value: 1
  }, {
    type: false, value: 2
  }, {
    type: false, value: 3
  }, {
    type: false, value: 4
  }
  ]

  medicAppointLogList = [];
  imgList=[];
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

        var imgserver = new ImageServe();
        imgserver.getImageList_web(this.visit.LocalId).then(e => {
          console.log(Array.from(e.res.rows))
          var ImgList = [];
          ImgList = Array.from(e.res.rows);
          this.imgList=Array.from(e.res.rows);
          var hvImgKeepListStr = '';
          for (var j = 0; j < ImgList.length; j++) {
            if (hvImgKeepListStr = '') {
              hvImgKeepListStr = ImgList[j].LocalId
            } else {
              hvImgKeepListStr = hvImgKeepListStr + ',' + ImgList[j].LocalId
            }
          }
          this.visit.hvImgKeepListStr = hvImgKeepListStr;
          this.visit.hvNewImgQty = ImgList.length;
        })

        var medicalRecord = new MedicalRecordServe();
        medicalRecord.getAllMedicalRecordList(this.params.caseid).then((e) => {
          this.medicAppointLogList = Array.from(e.res.rows);
        })

        var Volunteerlist = this.visit.presentVolunteer.split(',');
        console.log(Volunteerlist)
        var volunteerServr = new VolunteerServr();
        for (var i = 0; i < Volunteerlist.length; i++) {
          console.log(Volunteerlist[i])
          volunteerServr.getVolunteerId(Volunteerlist[i]).then((e) => {
            console.log(e)
            var data = Array.from(e.res.rows)[0]
            console.log(data)
            if (data) {
              if (this.presentVolunteer_show == '') {
                this.presentVolunteer_show = data['VolunteerName'];
              } else {
                this.presentVolunteer_show = this.presentVolunteer_show + ',' + data['VolunteerName'];
              }
            }
          })
        }

        var supportVolunteer = this.visit.supportVolunteer.split(',');
        console.log(supportVolunteer)
        for (var i = 0; i < supportVolunteer.length; i++) {
          console.log(supportVolunteer[i])
          volunteerServr.getVolunteerId(supportVolunteer[i]).then((e) => {
            console.log(e)
            var data = Array.from(e.res.rows)[0]
            console.log(data)
            if (data) {
              if (this.supportVolunteer_show == '') {
                this.supportVolunteer_show = data['VolunteerName'];
              } else {
                this.supportVolunteer_show = this.supportVolunteer_show + ',' + data['VolunteerName'];
              }
            }
          })
        }

        var visitDetailIndoorlist = this.visit.VisitDetailIndoor.split(',');
        for (var i = 0; i < visitDetailIndoorlist.length; i++) {
          console.log(visitDetailIndoorlist[i])
          if (visitDetailIndoorlist[i] == 1) {
            this.VisitDetailIndoorlist[0].type = true;
          }
          if (visitDetailIndoorlist[i] == 2) {
            this.VisitDetailIndoorlist[1].type = true;
          }
          if (visitDetailIndoorlist[i] == 3) {
            this.VisitDetailIndoorlist[2].type = true;
          }
          if (visitDetailIndoorlist[i] == 4) {
            this.VisitDetailIndoorlist[3].type = true;
          }
          if (visitDetailIndoorlist[i] == 5) {
            this.VisitDetailIndoorlist[4].type = true;
          }
          if (visitDetailIndoorlist[i] == 6) {
            this.VisitDetailIndoorlist[5].type = true;
          }
        }

        var visitDetailOutdoorlist = this.visit.VisitDetailOutdoor.split(',');
        for (var i = 0; i < visitDetailIndoorlist.length; i++) {
          console.log(visitDetailOutdoorlist[i])
          if (visitDetailOutdoorlist[i] == 1) {
            this.VisitDetailOutdoorlist[0].type = true;
          }
          if (visitDetailOutdoorlist[i] == 2) {
            this.VisitDetailOutdoorlist[1].type = true;
          }
          if (visitDetailOutdoorlist[i] == 3) {
            this.VisitDetailOutdoorlist[2].type = true;
          }
          if (visitDetailOutdoorlist[i] == 4) {
            this.VisitDetailOutdoorlist[3].type = true;
          }

        }

        var emotionAssessmentlist = this.visit.EmotionAssessment.split(',');
        for (var i = 0; i < emotionAssessmentlist.length; i++) {
          console.log(emotionAssessmentlist[i])
          if (emotionAssessmentlist[i] == 1) {
            this.EmotionAssessmentlist[0].type = true;
          }
          if (emotionAssessmentlist[i] == 2) {
            this.EmotionAssessmentlist[1].type = true;
          }
          if (emotionAssessmentlist[i] == 3) {
            this.EmotionAssessmentlist[2].type = true;
          }
          if (emotionAssessmentlist[i] == 4) {
            this.EmotionAssessmentlist[3].type = true;
          }

        }

        var needsContentlist = this.visit.NeedsContent.split(',');
        for (var i = 0; i < needsContentlist.length; i++) {
          console.log(needsContentlist[i])
          if (needsContentlist[i] == 1) {
            this.NeedsContenttlist[0].type = true;
          }
          if (needsContentlist[i] == 2) {
            this.NeedsContenttlist[1].type = true;
          }
          if (needsContentlist[i] == 3) {
            this.NeedsContenttlist[2].type = true;
          }
          if (needsContentlist[i] == 4) {
            this.NeedsContenttlist[3].type = true;
          }

        }

      })
    }
  }

  Volunteer = [];
  presentVolunteerList = [];
  supportVolunteerList = [];
  getVolunteerList() {
    var volunteerServr = new VolunteerServr();
   
    volunteerServr.getAllVolunteerList_VolType('1').then((e) => {
      if (e.res.rows.length > 0) {
        console.log(Array.from(e.res.rows))
        this.presentVolunteerList = Array.from(e.res.rows)
      }
    })

    volunteerServr.getAllVolunteerList_VolType('2').then((e) => {
      if (e.res.rows.length > 0) {
        console.log(Array.from(e.res.rows))
        this.supportVolunteerList = Array.from(e.res.rows)
      }
    })
  }


  saveYuyue(visitId) {

    console.log(visitId, this.ScheduleDate, this.ScheduleTime, this.params.caseID)
    
    this.addVisit('no')

  }

  getLocation(e) {
    console.log(e)
    this.Location = e;

  }

  getVisitStatus(e) {
    console.log(e)
    this.VisitStatus = e;
    if (e == 2) {
      this.showConfirm('一旦按選，在這按鈕以下的資料將會清空，你確定要按選嗎？', (e) => {
        if (e) {
          this.otherIndoorActivities = '';//其他室内活动输入
          this.outdoorActivities = '';//室外活动
          this.otherOutdoorActivities = '';//其他室外活动输入
          this.otherServe = '';//其他服务
          this.targetTitle1 = '';//目标标题
          this.targetTitle2 = '';//目标标题
          this.targetTitle3 = '';//目标标题

          this.VisitDetailIndoor = '';
          this.VisitDetailIndoorRemarks = '';
          this.VisitDetailOutdoor = '';
          this.VisitDetailOutdoorRemarks = '';
          this.VisitDetailOther = '';
          this.CategoryTopic1 = '';
          this.CategoryTopic2 = '';
          this.CategoryTopic3 = '';

          this.Height = 0;
          this.Weight = 0;
          this.Bmi = 0;
          this.Waist = 0;
          this.Hip = 0;
          this.WHRatio = 0;
          this.SYS1 = 0;
          this.DlA1 = 0;
          this.SYS2 = 0;
          this.DlA2 = 0;
          this.heartBeats1 = 0;
          this.heartBeats2 = 0;

          this.LifeStyleQuestion1 = 0;
          this.LifeStyleQuestion2 = 0;
          this.LifeStyleQuestion3 = 0;
          this.LifeStyleQuestion4 = 0;
          this.LifeStyleQuestion5 = 0;
          this.LifeStyleQuestion6 = 0;
          this.LifeStyleMeasureBloodSuger = 0;
          this.LifeStyleMeasureBsLocation = 0;
          this.LifeStyleMeasureBsPeriod = 0;
          this.LifeStyleMeasureBsNoOfTime = 0;
          this.LifeStyleMeasureBloodPressure = 0;
          this.LifeStyleMeasureBpLocation = 0;
          this.LifeStyleMeasureBpPeriod = 0;
          this.LifeStyleMeasureBpNoOfTime = 0;

          this.EmotionAssessment = '';
          this.EmotionAssessmentRemarks = '';

          this.OtherHospDisbete = 0;
          this.OtherHospDisbeteNoOfDay = 0;
          this.OtherHospHighBp = 0;
          this.OtherHospHighBpNoOfDay = 0;
          this.OtherHospOtherIllness = 0;
          this.OtherHospOtherIllnessNoOfDay = 0;
          this.OtherAccident = 0;
          this.OtherAccidentNoOfDay = 0;
          this.OtherSpecialNeed = 0;
          this.OtherSpecialNeedService = '';
          this.OtherRemarks = '';
          this.NeedsContent = '';

          this.DeletePicString = ''

          // this.presentVolunteer_show = ''
          // this.supportVolunteer_show = ''
          // this.Volunteerlist_show=''
          // this.ScheduleDate_Display=''

          this.VisitDetailIndoorlist = [{
            type: false, value: 1
          }, {
            type: false, value: 2
          }, {
            type: false, value: 3
          }, {
            type: false, value: 4
          }, {
            type: false, value: 5
          }, {
            type: false, value: 6
          }
          ]

          this.VisitDetailOutdoorlist = [{
            type: false, value: 1
          }, {
            type: false, value: 2
          }, {
            type: false, value: 3
          }, {
            type: false, value: 4
          }
          ]

          this.EmotionAssessmentlist = [{
            type: false, value: 1
          }, {
            type: false, value: 2
          }, {
            type: false, value: 3
          }, {
            type: false, value: 4
          }
          ]

          this.NeedsContenttlist = [{
            type: false, value: 1
          }, {
            type: false, value: 2
          }, {
            type: false, value: 3
          }, {
            type: false, value: 4
          }
          ]
        } else {
          this.VisitStatus = 1;
        }
      })
    }
  }

  saveVisit_Neurou(visitId) {
   
    this.addVisit('no')

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
    
    this.addVisit('no')
  }

  getWeight(e) {
    console.log(e)
    this.Weight = e;
  }

  getWaist(e) {
    this.Waist = e;
   
  }

  getHip(e) {
    this.Hip = e;

  }

  saveHeightWeight(visitId) {
    

    this.addVisit('no')
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

  saveLifeHabit(visitId) {
   
    this.addVisit('no')
  }

  getEmotion(e) {
    console.log(e)
    this.EmotionAssessment = e;
  }

  saveEmotion(visitId) {
    
   

    this.addVisit('no')
   
  }

  getOtherHospDisbete(e) {
    console.log(e)
    this.OtherHospDisbete = e
  }

  getOtherHospHighBp(e) {
    console.log(e)
    this.OtherHospHighBp = e
  }

  getOtherHospOtherIllness(e) {
    console.log(e)
    this.OtherHospOtherIllness = e
  }

  getOtherAccident(e) {
    console.log(e)
    this.OtherAccident = e
  }

  getOtherSpecialNeed(e) {
    console.log(e)
    this.OtherSpecialNeed = e
  }

  OtherSupplement(visitId) {
    

    this.addVisit('no')

  }

  addVisit(ret) {

    for (var i = 0; i < this.VisitDetailIndoorlist.length; i++) {
      if (this.VisitDetailIndoorlist[i].type == true) {
        if (this.VisitDetailIndoor == '') {
          this.VisitDetailIndoor = String(this.VisitDetailIndoorlist[i].value);
        } else {
          this.VisitDetailIndoor = this.VisitDetailIndoor + ',' + this.VisitDetailIndoorlist[i].value
        }
      }
    }

    for (var i = 0; i < this.VisitDetailOutdoorlist.length; i++) {
      if (this.VisitDetailOutdoorlist[i].type == true) {
        if (this.VisitDetailOutdoor == '') {
          this.VisitDetailOutdoor = String(this.VisitDetailOutdoorlist[i].value);
        } else {
          this.VisitDetailOutdoor = this.VisitDetailOutdoor + ',' + this.VisitDetailOutdoorlist[i].value
        }
      }
    }

    for (var i = 0; i < this.EmotionAssessmentlist.length; i++) {
      if (this.EmotionAssessmentlist[i].type == true) {
        if (this.EmotionAssessment == '') {
          this.EmotionAssessment = String(this.EmotionAssessmentlist[i].value);
        } else {
          this.EmotionAssessment = this.EmotionAssessment + ',' + this.EmotionAssessmentlist[i].value
        }
      }
    }


    for (var i = 0; i < this.NeedsContenttlist.length; i++) {
      if (this.NeedsContenttlist[i].type == true) {
        if (this.NeedsContent == '') {
          this.NeedsContent = String(this.NeedsContenttlist[i].value);
        } else {
          this.NeedsContent = this.NeedsContent + ',' + this.NeedsContenttlist[i].value
        }
      }
    }

    var visit = new VisitServe();
    if (this.ScheduleDate != '') {
      this.ScheduleDate_Display = AppUtil.FormatDate2(new Date(this.ScheduleDate));
    }

    if (this.ScheduleTime2 != '') {
      this.ScheduleTime = AppUtil.FormatTime(new Date(this.ScheduleTime2));
    }

    if (this.VisitDate2 != '') {
      this.VisitDate = AppUtil.FormatDate2(new Date(this.VisitDate2));
    }

    if (this.VisitStartTime2 != '') {
      this.VisitStartTime = AppUtil.FormatTime(new Date(this.VisitStartTime2));
    }

    if (this.VisitEndTime2 != '') {
      this.VisitEndTime = AppUtil.FormatTime(new Date(this.VisitEndTime2));
    }

    if (this.Weight != null ) {
      this.Bmi = this.Weight / (this.casedata.Height * this.casedata.Height);
      this.Bmi=Math.floor(this.Bmi*100)/100;
    }
    if (this.Waist != null && this.Hip != null) {
      this.WHRatio = this.Waist / this.Hip;
      this.WHRatio=Math.floor(this.WHRatio*100)/100;
    }

    var VisitId = 0;
    var Status = 1;
    var TaskId = 0;

    
    if(this.Weight == null){
      this.Weight = 0;
    }
    if(this.Waist == null){
      this.Waist = 0;
    }
    if(this.Hip == null){
      this.Hip = 0;
    }
    if(this.WHRatio ==null){
      this.WHRatio =0;
    }
    if(this.SYS1 == null){
      this.SYS1 = 0;
    }
    if(this.DlA1 == null){
      this.DlA1 = 0;
    }
    if(this.SYS2 == null){
      this.SYS2 = 0
    }
    if(this.DlA2 == null){
      this.DlA2 = 0;
    }
    if(this.heartBeats1 == null){
      this.heartBeats1 = 0;
    }
    if(this.heartBeats2 == null){
      this.heartBeats2 = 0;
    }

    if(this.LifeStyleMeasureBsNoOfTime == null){
      this.LifeStyleMeasureBsNoOfTime = 0;
    }
    if(this.LifeStyleMeasureBpNoOfTime == null){
      this.LifeStyleMeasureBpNoOfTime = 0
    }
    if(this.OtherHospDisbeteNoOfDay == null){
      this.OtherHospDisbeteNoOfDay = 0;
    }
    if(this.OtherHospHighBpNoOfDay == null){
      this.OtherHospHighBpNoOfDay = 0;
    }
    if(this.OtherHospOtherIllnessNoOfDay == null){
      this.OtherHospOtherIllnessNoOfDay = 0;
    }
    if(this.OtherAccidentNoOfDay == null){
      this.OtherAccidentNoOfDay = 0;
    }
  

    if (this.ScheduleDate == '') {
      this.toast('你沒有選擇探訪日期');
      return;
    }
    if (ret == 'web') {

      if (!this.VisitDate) {
        this.toast('你沒有填寫實際探訪日期');
        return;
      }
      if (!this.VisitStartTime || !this.VisitEndTime) {
        this.toast('你沒有填寫實際探訪時間');
        return;
      }
      if (this.Location == 0) {
        this.toast('你沒有填寫面見地點');
        return;
      }
      if (this.Location == 2 && this.LocationRemarks == '') {
        this.toast('你沒有填寫其他面見地點');
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
      if (this.VisitStatus == 2 && !this.VisitStatusRemarks) {
        this.toast('你沒有填寫未能探訪的原因');
        return;
      }
      if (this.VisitStatus == 1) {

        if (this.VisitDetailIndoor == '') {
          this.toast('你沒有填寫室內活動選項');
          return;
        }
        if (this.VisitDetailIndoorlist[5].type == true && this.VisitDetailIndoorRemarks == '') {
          this.toast('你沒有填寫室內活動的其他項目');
          return;
        }
        if (this.VisitDetailOutdoor == '') {
          this.toast('你沒有填寫室外活動選項');
          return;
        }
        if (this.VisitDetailOutdoorlist[3].type == true && this.VisitDetailOutdoorRemarks == '') {
          this.toast('你沒有填寫室外活動的其他項目');
          return;
        }

        if (this.LifeStyleQuestion1 == 0) {
          this.toast('你沒有填寫根據醫生處方服食藥物');
          return;
        }
        if (this.LifeStyleQuestion2 == 0) {
          this.toast('你沒有填寫根據低鈉原則選擇食物');
          return;
        }
        if (this.LifeStyleQuestion3 == 0) {
          this.toast('你沒有填寫按低脂及低膽固醇原則選擇食物');
          return;
        }
        if (this.LifeStyleQuestion4 == 0) {
          this.toast('你沒有填寫根據高纖維原則選擇食物');
          return;
        }
        if (this.LifeStyleQuestion5 == 0) {
          this.toast('你沒有填寫能維持每星期運動至少3次及每次30分鐘');
          return;
        }
        if (this.LifeStyleQuestion6 == 0) {
          this.toast('你沒有填寫家居環境安全');
          return;
        }
        if (this.LifeStyleMeasureBloodSuger == 0) {
          this.toast('在家/外出(醫院／診所除外)*量度血糖');
          return;
        }
        if (this.LifeStyleMeasureBloodPressure == 0) {
          this.toast('你沒有填寫在家/外出(醫院／診所除外)*量度血壓');
          return;
        }

        if (this.EmotionAssessment == '') {
          this.toast('你沒有填寫情緒評估');
          return;
        }

        if (this.EmotionAssessmentlist[3].type == true && this.EmotionAssessmentRemarks == '') {
          this.toast('你沒有填寫其他情緒');
          return;
        }

        if (this.OtherHospDisbete == 0) {
          this.toast('你沒有填寫是否因糖尿病曾經入院');
          return;
        }
        if (this.OtherHospDisbete == 1 && this.OtherHospDisbeteNoOfDay == 0) {
          this.toast('你沒有填寫糖尿病曾經入院日數');
          return;
        }

        if (this.OtherHospHighBp == 0) {
          this.toast('你沒有填寫是否因高血壓曾經入院');
          return;
        }
        if (this.OtherHospHighBp == 1 && this.OtherHospHighBpNoOfDay == 0) {
          this.toast('你沒有填寫長者因高血壓曾經入院日數');
          return;
        }

        if (this.OtherHospOtherIllness == 0) {
          this.toast('你沒有填寫是否因其他疾病曾經入院');
          return;
        }
        if (this.OtherHospOtherIllness == 1 && this.OtherHospOtherIllnessNoOfDay == 0) {
          this.toast('你沒有填寫是否因其他疾病曾經入院日數');
          return;
        }

        if (this.OtherAccident == 0) {
          this.toast('你沒有填寫是否曾發生突發事件');
          return;
        }
        if (this.OtherAccident == 1 && this.OtherAccidentNoOfDay == 0) {
          this.toast('你沒有填寫曾發生突發事件');
          return;
        }

        if (this.OtherSpecialNeed == 0) {
          this.toast('你沒有填寫有否提出特別需要');
          return;
        }
        if (this.OtherSpecialNeed == 1 && this.OtherSpecialNeedService == '') {
          this.toast('你沒有填寫提出特別需要');
          return;
        }
        if (this.OtherSpecialNeed == 1 && this.OtherSpecialNeedService == '' && this.NeedsContenttlist[3].type==true) {
          this.toast('你沒有填寫其他特別需要说明');
          return;
        }
        // if (this.OtherRemarks == '') {
        //   this.toast('你沒有填寫其他狀況');
        //   return;
        // }
      }
    }
    visit.addVisit(this.Bmi, this.params.caseID, this.CategoryTopic1, this.CategoryTopic2, this.CategoryTopic3, this.EmotionAssessment, this.EmotionAssessmentRemarks,
      this.Hip, this.LifeStyleMeasureBloodPressure, this.LifeStyleMeasureBloodSuger, this.LifeStyleMeasureBpLocation, this.LifeStyleMeasureBpNoOfTime,
      this.LifeStyleMeasureBpPeriod, this.LifeStyleMeasureBsLocation, this.LifeStyleMeasureBsNoOfTime, this.LifeStyleMeasureBsPeriod, this.LifeStyleQuestion1,
      this.LifeStyleQuestion2, this.LifeStyleQuestion3, this.LifeStyleQuestion4, this.LifeStyleQuestion5, this.LifeStyleQuestion6, this.Location, this.LocationRemarks,
      this.OtherAccident, this.OtherAccidentNoOfDay, this.OtherHospDisbete, this.OtherHospDisbeteNoOfDay, this.OtherHospHighBp, this.OtherHospHighBpNoOfDay,
      this.OtherHospOtherIllness, this.OtherHospOtherIllnessNoOfDay, this.OtherRemarks, this.OtherSpecialNeed, this.OtherSpecialNeedService, this.ScheduleDate,
      this.ScheduleTime, Status, TaskId, this.VisitDate, this.VisitDetailIndoor, this.VisitDetailIndoorRemarks, this.VisitDetailOther, this.VisitDetailOutdoor,
      this.VisitDetailOutdoorRemarks, this.VisitEndTime, VisitId, this.VisitStartTime, this.VisitStatus, this.VisitStatusRemarks, this.WHRatio, this.Waist, this.Weight,
      this.NeedsContent, this.SYS1, this.DlA1, this.SYS2, this.DlA2, this.heartBeats1, this.heartBeats2, this.presentVolunteer, this.supportVolunteer, this.DeletePicString, this.ScheduleDate_Display).then(e => {
        if (e) {
          if (ret != 'web') {
            this.toast('資料保存成功');
            if(ret=='mm'){
              this.back();
            }
          } else {
            var visit = new VisitServe();
            visit.getVisitId(e.res.insertId).then((e) => {
              console.log(e)
              var casedata = e.res.rows;
              var data = Array.from(casedata)[0]
              this.visit = data;
              console.log(data);
              // return;
              var imgserver = new ImageServe();
              imgserver.getImageList_web(this.visit.LocalId).then(e => {
                console.log(Array.from(e.res.rows))
                var ImgList = [];
                ImgList = Array.from(e.res.rows);
                var hvImgKeepListStr = '';
                for (var j = 0; j < ImgList.length; j++) {
                  if (hvImgKeepListStr = '') {
                    hvImgKeepListStr = ImgList[j].LocalId
                  } else {
                    hvImgKeepListStr = hvImgKeepListStr + ',' + ImgList[j].LocalId
                  }
                }
                this.visit.hvImgKeepListStr = hvImgKeepListStr;
                this.visit.hvNewImgQty = ImgList.length;

                // this.uploadVisitListWeb()
              })

              var medicalRecord = new MedicalRecordServe();
              medicalRecord.getAllMedicalRecordList(this.params.caseid).then((e) => {
                this.medicAppointLogList = Array.from(e.res.rows);
              })

              this.uploadVisitListWeb()
            })

          }
        }

      })
  }




  visitList() {
    this.navigate('visilt-list', { caseid: this.params.caseID });
  }

  uploadimg(visitid) {
    console.log(visitid)
    // return
    if (visitid < 0) {
      this.toast('資料没有保存，请先保存!');
      return;
    }
    if (this.visit.VisitId != 0) {
      this.navigate('uploadimg', { visitid: this.visit.VisitId });
    } else {
      this.navigate('uploadimg', { visitid: visitid });
    }

  }


  aa() {
    this.navigate('heart-rat', { caseid: this.params.caseID });
  }
  scan(e) {
    this.saomiao_show = false;
    this.time_type = e
    this.navigate("qrcodescan");
  }

  bloodPressure() {
    this.navigate('bloodpressure', { caseid: this.params.caseID });
  }

  whr() {
    this.navigate('whr', { caseid: this.params.caseID });
  }

  weight() {
    this.navigate('weight', { caseid: this.params.caseID });
  }


  uploadVisitListWeb() {

    // if (this.LocalId == 0 || this.LocalId == undefined) {
    //   this.showConfirm('资料没有保存？请先保存', (e) => {

    //   })
    // } else {
    var hvLogList = [];
    var activityLogList = [];
    var phoneSupportLogList = [];
    var medicAppointLogList = this.medicAppointLogList

    hvLogList.push(this.visit);
    hvLogList[0]['Height'] = this.casedata.Height;
    console.log(hvLogList)

    this.api.SaveAll(hvLogList, phoneSupportLogList, activityLogList, medicAppointLogList, this.params.UserId, 'one').then((ret) => {
      console.log(ret)
      if (ret.Result == 'true') {
        var AttachmentGroupLists = [];
        var AttchList = []
        if (ret.AttachmentGroupLists) {
          var listtype = typeof ret.AttachmentGroupLists;
          if (listtype == 'object' && ret.AttachmentGroupLists.length == undefined) {
            AttachmentGroupLists.push(ret.AttachmentGroupLists.AttchList);
          } else {
            AttachmentGroupLists = ret.AttachmentGroupLists.AttchList;
          }
          if (AttachmentGroupLists.length > 0) {
            for (var i = 0; i < AttachmentGroupLists.length; i++) {
              var listtype2 = typeof ret.AttachmentGroupLists.AttchList;
              if (listtype2 == 'object' && ret.AttachmentGroupLists.AttchList.length == undefined) {
                AttchList.push(ret.AttachmentGroupLists.AttchList);
              } else {
                AttchList = ret.AttachmentGroupLists.AttchList;
              }
            }
          }

          for (var j = 0; j < this.imgList.length; j++) {
            this.api.UploadImgPart('HomeVisit', this.imgList[j].VisitId, this.imgList[j].Base64ImgString).then(e => {
              console.log(e)
            })
          }
          this.api.ExecuteWorkingSet(ret.WorkingSetID, this.casedata.CaseId, this.params.UserId).then(e => {
            console.log(e)
            if (e.Result == 'true') {
              var visit = new VisitServe();
              visit.sevaVisitSavedStatus(this.LocalId).then(e => {

              })
              this.toast('資料同步成功');
            }
          })

        } else {
          this.api.ExecuteWorkingSet(ret.WorkingSetID, this.params.caseID, this.params.UserId).then(e => {
            if (e.Result == 'true') {

              var visit = new VisitServe();
              visit.sevaVisitSavedStatus(this.LocalId).then(e => {

              })
              this.toast('資料提交成功');
              this.back();
            } else {
              this.toast('資料提交失敗');
            }
          })
        }
      }

    });
  }
  // }




}