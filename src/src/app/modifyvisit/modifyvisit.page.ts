import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides, LoadingController } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { CaseServe } from 'src/mgrServe/CaseServe';
import { VisitServe } from 'src/mgrServe/VisitServe';
import { VolunteerServr } from 'src/mgrServe/VolunteerServr';
import { ServiceApi } from 'src/providers/service.api';
import { ImageServe } from 'src/mgrServe/ImageServe';
import { MedicalRecordServe } from 'src/mgrServe/MedicalRecordServe';

@Component({
  selector: 'app-modifyvisit',
  templateUrl: './modifyvisit.page.html',
  styleUrls: ['./modifyvisit.page.scss'],
  providers: [ServiceApi]
})
export class ModifyvisitPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public api: ServiceApi,
    public activeRoute: ActivatedRoute,
    public loadingController: LoadingController,
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
  WHRatio = null;
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

  DeletePicString = '';

  presentVolunteer_show = '';

  supportVolunteer_show = '';
  Volunteerlist_show = '';

  saomiao_show = false;
  time_type = ''

  presentVolunteerList_show = [];
  supportVolunteerList_show = [];
  onMyLoad() {
    //参数
    this.params;
    this.getVolunteerList()
    this.getCase()
    this.getVisitId()
  }
  onMyShow() {
    // this.getCase()
    // this.getVisitId()
    if (AppBase.LastQrcode != '') {
      this.qrcodeHandle(AppBase.LastQrcode);
      AppBase.LastQrcode = "";
      return;
    }
  }
  signOut() {
    if (this.visit.Status == 1) {
      this.showConfirm('未經保存的資料將會遺失，你確定要離開嗎？', (e) => {
        if (e == true) {
          this.back();
        }
      })
    } else {
      this.back();
    }
  }

  saomiao() {
    if (this.visit.Status == 1) {
      this.saomiao_show = true;
    }

  }

  saomiao2() {
    this.saomiao_show = false;
  }

  aas() {
    console.log(this.presentVolunteer);
    // return;
    this.presentVolunteer_show = ''
    var Volunteerlist = this.presentVolunteerList_show;
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
    this.supportVolunteer_show = ''
    var Volunteerlist = this.supportVolunteerList_show;
    console.log(Volunteerlist)
    var volunteerServr = new VolunteerServr();
    for (var i = 0; i < Volunteerlist.length; i++) {
      console.log(Volunteerlist[i])
      volunteerServr.getVolunteerId(Volunteerlist[i]).then((e) => {
        console.log(e)
        var data = Array.from(e.res.rows)[0];
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
    // var time=new Date(); 
    if (code == this.casedata.QRCode) {
      this.showAlert('掃描成功', (e) => {

      });
      this.VisitDate = AppUtil.FormatDate2(new Date())
      if (this.time_type == 'ss') {
        this.VisitStartTime = AppUtil.FormatTime(new Date());//实际开始时间
      }
      if (this.time_type == 'end') {
        this.VisitEndTime = AppUtil.FormatTime(new Date());//实际结束时间
      }
    } else {
      this.showAlert('你掃描的二維碼和你的探訪對象並不符合', (e) => {

      })
    }
    console.log('開始時間：' + this.VisitStartTime);
    console.log('結束時間' + this.VisitEndTime);
    // alert( AppBase.LastQrcode);
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
  medicAppointLogList = []
  imgList = [];
  LifeStyleMeasureBsLocation_name = ''
  LifeStyleMeasureBsPeriod_name = ''
  LifeStyleMeasureBpPeriod_name = ''
  LifeStyleMeasureBpLocation_name = ''
  hvImgKeepListStr = '';
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
        // this.VisitStatus = this.visit.VisitStatus;
        this.Bmi = this.visit.Bmi
        this.CategoryTopic1 = this.visit.CategoryTopic1
        this.CategoryTopic2 = this.visit.CategoryTopic2
        this.CategoryTopic3 = this.visit.CategoryTopic3
        this.EmotionAssessment = this.visit.EmotionAssessment
        this.EmotionAssessmentRemarks = this.visit.EmotionAssessmentRemarks
        this.Hip = this.visit.Hip
        this.LifeStyleMeasureBpPeriod = this.visit.LifeStyleMeasureBpPeriod
        this.LifeStyleMeasureBloodSuger = this.visit.LifeStyleMeasureBloodSuger
        this.LifeStyleMeasureBpLocation = this.visit.LifeStyleMeasureBpLocation
        this.LifeStyleMeasureBpNoOfTime = this.visit.LifeStyleMeasureBpNoOfTime
        this.LifeStyleMeasureBloodPressure = this.visit.LifeStyleMeasureBloodPressure
        this.LifeStyleMeasureBsLocation = this.visit.LifeStyleMeasureBsLocation
        this.LifeStyleMeasureBsNoOfTime = this.visit.LifeStyleMeasureBsNoOfTime
        this.LifeStyleMeasureBsPeriod = this.visit.LifeStyleMeasureBsPeriod
        this.LifeStyleQuestion1 = this.visit.LifeStyleQuestion1
        this.LifeStyleQuestion2 = this.visit.LifeStyleQuestion2
        this.LifeStyleQuestion3 = this.visit.LifeStyleQuestion3
        this.LifeStyleQuestion4 = this.visit.LifeStyleQuestion4
        this.LifeStyleQuestion5 = this.visit.LifeStyleQuestion5
        this.LifeStyleQuestion6 = this.visit.LifeStyleQuestion6
        this.Location = this.visit.Location
        this.LocationRemarks = this.visit.LocationRemarks
        this.OtherAccident = this.visit.OtherAccident
        this.OtherAccidentNoOfDay = this.visit.OtherAccidentNoOfDay
        this.OtherHospDisbete = this.visit.OtherHospDisbete
        this.OtherHospDisbeteNoOfDay = this.visit.OtherHospDisbeteNoOfDay
        this.OtherHospHighBp = this.visit.OtherHospHighBp
        this.OtherHospHighBpNoOfDay = this.visit.OtherHospHighBpNoOfDay
        this.OtherHospOtherIllness = this.visit.OtherHospOtherIllness
        this.OtherRemarks = this.visit.OtherRemarks
        this.OtherSpecialNeed = this.visit.OtherSpecialNeed
        this.OtherSpecialNeedService = this.visit.OtherSpecialNeedService
        this.ScheduleDate = this.visit.ScheduleDate
        this.ScheduleTime = this.visit.ScheduleTime
        this.VisitDate = this.visit.VisitDate
        this.VisitDetailIndoor = this.VisitDetailIndoor != '' ? this.VisitDetailIndoor : this.visit.VisitDetailIndoor
        this.VisitDetailIndoorRemarks = this.visit.VisitDetailIndoorRemarks
        this.VisitDetailOther = this.visit.VisitDetailOther
        this.VisitDetailOutdoor = this.visit.VisitDetailOutdoor
        this.VisitDetailOutdoorRemarks = this.visit.VisitDetailOutdoorRemarks
        this.VisitEndTime = this.visit.VisitEndTime
        this.VisitStartTime = this.visit.VisitStartTime
        this.VisitStatus = this.visit.VisitStatus
        this.VisitStatusRemarks = this.visit.VisitStatusRemarks
        this.WHRatio = this.visit.WHRatio
        this.Waist = this.visit.Waist
        this.Weight = this.visit.Weight
        this.NeedsContent = this.visit.NeedsContent
        this.SYS1 = this.visit.SYS1
        this.DlA1 = this.visit.DlA1
        this.SYS2 = this.visit.SYS2
        this.DlA2 = this.visit.DlA2
        this.heartBeats1 = this.visit.heartBeats1
        this.heartBeats2 = this.visit.heartBeats2
        this.presentVolunteer = this.visit.presentVolunteer
        this.supportVolunteer = this.visit.supportVolunteer
        this.OtherHospOtherIllnessNoOfDay = this.visit.OtherHospOtherIllnessNoOfDay




        if (this.visit.LifeStyleMeasureBsLocation == 1) {
          this.LifeStyleMeasureBsLocation_name = '家中'
        } else if (this.visit.LifeStyleMeasureBsLocation == 2) {
          this.LifeStyleMeasureBsLocation_name = '外出'
        }

        if (this.visit.LifeStyleMeasureBsPeriod == 1) {
          this.LifeStyleMeasureBsPeriod_name = '每日'
        } else if (this.visit.LifeStyleMeasureBsPeriod == 2) {
          this.LifeStyleMeasureBsPeriod_name = '每週'
        } else if (this.visit.LifeStyleMeasureBsPeriod == 3) {
          this.LifeStyleMeasureBsPeriod_name = '每月'
        }

        if (this.visit.LifeStyleMeasureBpLocation == 1) {
          this.LifeStyleMeasureBpLocation_name = '家中'
        } else if (this.visit.LifeStyleMeasureBpLocation == 2) {
          this.LifeStyleMeasureBpLocation_name = '外出'
        }

        if (this.visit.LifeStyleMeasureBpPeriod == 1) {
          this.LifeStyleMeasureBpPeriod_name = '每日'
        } else if (this.visit.LifeStyleMeasureBpPeriod == 2) {
          this.LifeStyleMeasureBpPeriod_name = '每週'
        } else if (this.visit.LifeStyleMeasureBpPeriod == 3) {
          this.LifeStyleMeasureBpPeriod_name = '每月'
        }



        var imgserver = new ImageServe();
        var visitId = this.LocalId;
        if (this.visit.VisitId > 0) {
          visitId = this.visit.VisitId;
        }

        imgserver.getImageList_old(visitId).then(e => {
          console.log('圖片', Array.from(e.res.rows))
          var oldList = [];
          oldList = Array.from(e.res.rows);
          var hvImgKeepListStr = '';
          for (var j = 0; j < oldList.length; j++) {
            if (hvImgKeepListStr == '') {
              hvImgKeepListStr = oldList[j].ImgId
            } else {
              hvImgKeepListStr = hvImgKeepListStr + ',' + oldList[j].ImgId
            }
          }

          this.hvImgKeepListStr = hvImgKeepListStr;
        })

        var medicalRecord = new MedicalRecordServe();
        var SavedStatus = 1;
        medicalRecord.getAllMedicalRecor_SavedStatus2(SavedStatus, this.params.caseID).then((e) => {
          this.medicAppointLogList = Array.from(e.res.rows);
          console.log(this.medicAppointLogList)
        })

        var Volunteerlist = this.visit.presentVolunteer.split(',');
        this.presentVolunteerList_show = this.visit.presentVolunteer.split(',');
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
        this.supportVolunteerList_show = this.visit.supportVolunteer.split(',');
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


        var visitDetailOutdoorlist = []
        visitDetailOutdoorlist = this.visit.VisitDetailOutdoor.split(',');
        for (var j = 0; j < visitDetailOutdoorlist.length; j++) {
          console.log('556' + visitDetailIndoorlist[j])
          if (visitDetailOutdoorlist[j] == '1') {
            this.VisitDetailOutdoorlist[0].type = true;
          }
          if (visitDetailOutdoorlist[j] == '2') {
            this.VisitDetailOutdoorlist[1].type = true;
          }
          if (visitDetailOutdoorlist[j] == '3') {
            this.VisitDetailOutdoorlist[2].type = true;
          }
          if (visitDetailOutdoorlist[j] == '4') {
            console.log('533' + visitDetailOutdoorlist[j])
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
    volunteerServr.getAllVolunteerList().then((e) => {
      if (e.res.rows.length > 0) {
        console.log(Array.from(e.res.rows))
        this.Volunteer = Array.from(e.res.rows)
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
    this.visit.Location = e;
  }

  getVisitStatus(e) {
    console.log(e)
    this.VisitStatus = e;
    this.visit.VisitStatus = e;
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

          // this.DeletePicString = ''

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
          this.visit.VisitStatus = 1;
          this.VisitStatusRemarks = '';
        }
      })
    }
  }

  saveVisit_Neurou(visitId) {
    console.log(visitId, this.VisitDate, this.VisitStartTime, this.VisitEndTime, this.presentVolunteer, this.supportVolunteer, this.Location, this.LocationRemarks, this.VisitStatus, this.VisitStatusRemarks, this.params.caseID)

    this.addVisit('no')

  }

  getVisitDetailIndoor(e) {
    console.log(e)
    this.VisitDetailIndoor = e;
  }
  getVisitDetailOutdoor(e) {

    this.VisitDetailOutdoor = e;
  }

  saveService_neurou(visitId) {

    this.addVisit('no')
  }

  getWeight(e) {
    console.log(e)
    this.Weight = e;
    this.Bmi = this.Weight / (1.72 * 1.72)
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
    this.visit.LifeStyleQuestion1 = e;
  }
  getLifeHabit2(e) {
    console.log(e)
    this.LifeStyleQuestion2 = e;
    this.visit.LifeStyleQuestion2 = e;
  }
  getLifeHabit3(e) {
    console.log(e)
    this.LifeStyleQuestion3 = e;
    this.visit.LifeStyleQuestion3 = e;
  }
  getLifeHabit4(e) {
    console.log(e)
    this.LifeStyleQuestion4 = e;
    this.visit.LifeStyleQuestion4 = e;
  }
  getLifeHabit5(e) {
    console.log(e)
    this.LifeStyleQuestion5 = e;
    this.visit.LifeStyleQuestion5 = e;
  }
  getLifeHabit6(e) {
    console.log(e)
    this.LifeStyleQuestion6 = e;
    this.visit.LifeStyleQuestion6 = e;
  }

  saveLifeHabit(visitId) {
    console.log(visitId)



    this.addVisit('no')
  }

  getEmotion(e) {
    console.log(e)
    this.EmotionAssessment = e;
    this.visit.EmotionAssessment = e;
  }

  saveEmotion(visitId) {
    console.log(visitId, this.EmotionAssessment, this.params.caseID)


    this.addVisit('no')
  }

  getOtherHospDisbete(e) {
    console.log(e)
    this.OtherHospDisbete = e
    this.visit.OtherHospDisbete = e
  }

  getOtherHospHighBp(e) {
    console.log(e)
    this.OtherHospHighBp = e
    this.visit.OtherHospHighBp = e
  }

  getOtherHospOtherIllness(e) {
    console.log(e)
    this.OtherHospOtherIllness = e
    this.visit.OtherHospOtherIllness = e
  }

  getOtherAccident(e) {
    console.log(e)
    this.OtherAccident = e
    this.visit.OtherAccident = e
  }

  getOtherSpecialNeed(e) {
    console.log(e)
    this.OtherSpecialNeed = e;
    this.visit.OtherSpecialNeed = e;
    if (e == 2) {
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
      this.OtherSpecialNeedService = '';
    }


  }
  getLifeStyleMeasureBloodSuger(e) {
    this.LifeStyleMeasureBloodSuger = e
    this.visit.LifeStyleMeasureBloodSuger = e
  }
  getLifeStyleMeasureBloodPressure(e) {
    this.LifeStyleMeasureBloodPressure = e
    this.visit.LifeStyleMeasureBloodPressure = e
  }

  OtherSupplement(visitId) {
    this.addVisit('no')
  }

  visit_web = [];
  imgList_web = [];

  addVisit(ret) {
    console.log('開始了')
    console.log(this.VisitDetailOutdoorlist)
    this.VisitDetailIndoor = '';
    for (var i = 0; i < this.VisitDetailIndoorlist.length; i++) {
      if (this.VisitDetailIndoorlist[i].type == true) {
        if (this.VisitDetailIndoor == '') {
          this.VisitDetailIndoor = String(this.VisitDetailIndoorlist[i].value);
        } else {
          this.VisitDetailIndoor = this.VisitDetailIndoor + ',' + this.VisitDetailIndoorlist[i].value
        }
      }
    }
    this.VisitDetailOutdoor = '';
    for (var j = 0; j < this.VisitDetailOutdoorlist.length; j++) {
      if (this.VisitDetailOutdoorlist[j].type == true) {
        if (this.VisitDetailOutdoor == '') {
          this.VisitDetailOutdoor = String(this.VisitDetailOutdoorlist[j].value);
        } else {
          this.VisitDetailOutdoor = this.VisitDetailOutdoor + ',' + this.VisitDetailOutdoorlist[j].value
        }
      }
    }

    console.log(this.VisitDetailOutdoor)
    this.EmotionAssessment = ''
    for (var i = 0; i < this.EmotionAssessmentlist.length; i++) {
      if (this.EmotionAssessmentlist[i].type == true) {
        if (this.EmotionAssessment == '') {
          this.EmotionAssessment = String(this.EmotionAssessmentlist[i].value);
        } else {
          this.EmotionAssessment = this.EmotionAssessment + ',' + this.EmotionAssessmentlist[i].value
        }
      }
    }

    this.NeedsContent = '';
    for (var i = 0; i < this.NeedsContenttlist.length; i++) {
      if (this.NeedsContenttlist[i].type == true) {
        if (this.NeedsContent == '') {
          this.NeedsContent = String(this.NeedsContenttlist[i].value);
        } else {
          this.NeedsContent = this.NeedsContent + ',' + this.NeedsContenttlist[i].value
        }
      }
    }

    this.supportVolunteer = '';
    for (var j = 0; j < this.supportVolunteerList_show.length; j++) {
      if (this.supportVolunteer == '') {
        this.supportVolunteer = this.supportVolunteerList_show[j];
      } else {
        this.supportVolunteer = this.supportVolunteer + ',' + this.supportVolunteerList_show[j]
      }
    }


    this.presentVolunteer = '';
    for (var j = 0; j < this.presentVolunteerList_show.length; j++) {
      if (this.presentVolunteer == '') {
        this.presentVolunteer = this.presentVolunteerList_show[j];
      } else {
        this.presentVolunteer = this.presentVolunteer + ',' + this.presentVolunteerList_show[j]
      }
    }




    var visit = new VisitServe();

    console.log(this.ScheduleTime);

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

    console.log(this.VisitDate)
    console.log(this.VisitStartTime)
    console.log(this.VisitEndTime)

    var VisitId = 0;
    var Status = 1;

    if (this.Weight != null && this.Weight > 0) {
      this.Bmi = this.Weight / (this.casedata.Height * this.casedata.Height);
      this.Bmi = Math.floor(this.Bmi * 100) / 100;
    }
    if (this.Waist > 0 && this.Waist != null && this.Hip > 0 && this.Hip != null) {
      this.WHRatio = this.Waist / this.Hip;
      this.WHRatio = Math.floor(this.WHRatio * 100) / 100;
    }

    if (this.Bmi == null || this.Bmi == Infinity) {
      this.Bmi = 0;
    }
    if (this.Weight == null) {
      this.Weight = 0;
    }
    if (this.Waist == null) {
      this.Waist = 0;
    }
    if (this.Hip == null) {
      this.Hip = 0;
    }
    if (this.WHRatio == null) {
      this.WHRatio = 0;
    }
    if (this.SYS1 == null || this.SYS1 == '') {
      this.SYS1 = 0;
    }
    if (this.DlA1 == null || this.DlA1 == '') {
      this.DlA1 = 0;
    }
    if (this.SYS2 == null || this.SYS2 == '') {
      this.SYS2 = 0
    }
    if (this.DlA2 == null || this.DlA2 == '') {
      this.DlA2 = 0;
    }
    if (this.heartBeats1 == null || this.heartBeats1 == '') {
      this.heartBeats1 = 0;
    }
    if (this.heartBeats2 == null || this.heartBeats2 == '') {
      this.heartBeats2 = 0;
    }

    if (this.LifeStyleMeasureBsNoOfTime == null || this.LifeStyleMeasureBsNoOfTime == '') {
      this.LifeStyleMeasureBsNoOfTime = 0;
    }
    if (this.LifeStyleMeasureBpNoOfTime == null || this.LifeStyleMeasureBpNoOfTime == '') {
      this.LifeStyleMeasureBpNoOfTime = 0;
    }
    if (this.OtherHospDisbeteNoOfDay == null || this.OtherHospDisbeteNoOfDay == '') {
      this.OtherHospDisbeteNoOfDay = 0;
    }
    if (this.OtherHospHighBpNoOfDay == null || this.OtherHospHighBpNoOfDay == '') {
      this.OtherHospHighBpNoOfDay = 0;
    }
    if (this.OtherHospOtherIllnessNoOfDay == null || this.OtherHospOtherIllnessNoOfDay == '') {
      this.OtherHospOtherIllnessNoOfDay = 0;
    }
    if (this.OtherAccidentNoOfDay == null || this.OtherAccidentNoOfDay == '') {
      this.OtherAccidentNoOfDay = 0;
    }

    console.log(this.VisitDetailOutdoor)

    console.log('驗證數據')
    if (this.ScheduleDate == '') {
      this.toast('你沒有選擇探訪日期');
      return;
    }
    if (this.VisitDate == '') {
      this.toast('你沒有填寫實際探訪日期');
      return;
    }

    var ScheduleDate_Display = ''
    if (this.ScheduleDate != '') {
      ScheduleDate_Display = AppUtil.FormatDate2(new Date(this.ScheduleDate));
    }

    if (this.VisitStartTime != '' && this.VisitEndTime != '') {

      if (this.VisitStartTime > this.VisitEndTime) {
        this.toast('開始時間不能遲於結束時間');
        return;
      }
      if (this.VisitStartTime == this.VisitEndTime) {
        this.toast('開始和結束時間不能一樣');
        return;
      }
    }

    if (ret == 'web') {
      if (this.VisitStartTime == '') {
        this.toast('你沒有輸入開始時間');
        return;
      }
      if (this.VisitEndTime == '') {
        this.toast('你沒有輸入結束時間');
        return;
      }

      if (this.VisitStartTime != '' && this.VisitEndTime != '') {

        if (this.VisitStartTime > this.VisitEndTime) {
          this.toast('開始時間不能遲於結束時間');
          return;
        }
        if (this.VisitStartTime == this.VisitEndTime) {
          this.toast('開始和結束時間不能一樣');
          return;
        }
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

        console.log(this.VisitDetailIndoor)
        if (this.VisitDetailIndoor == '') {
          this.toast('你沒有填寫室內活動選項');
          return;
        }
        if (this.VisitDetailIndoorlist[5].type == true && this.VisitDetailIndoorRemarks == '') {
          this.toast('你沒有填寫室內活動的其他項目');
          return;
        }

        if (this.VisitDetailIndoor == '' && this.VisitDetailOutdoor == '') {
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
          this.toast('你沒有填寫在家/外出(醫院／診所除外)*量度血糖');
          return;
        }

        if (this.LifeStyleMeasureBloodSuger == 1 && this.LifeStyleMeasureBsLocation == 0) {
          this.toast('你沒有填寫在家/外出(醫院／診所除外)*量度血糖 地點');
          return;
        }

        if (this.LifeStyleMeasureBloodSuger == 1 && this.LifeStyleMeasureBsPeriod == 0) {
          this.toast('你沒有填寫在家/外出(醫院／診所除外)*量度血糖 頻率');
          return;
        }

        if (this.LifeStyleMeasureBloodSuger == 1 && this.LifeStyleMeasureBsNoOfTime == 0) {
          this.toast('在家/外出(醫院／診所除外)*量度血糖次數必需大於0');
          return;
        }

        if (this.LifeStyleMeasureBloodPressure == 0) {
          this.toast('你沒有填寫在家/外出(醫院／診所除外)*量度血壓');
          return;
        }
        if (this.LifeStyleMeasureBloodPressure == 1 && this.LifeStyleMeasureBpLocation == 0) {
          this.toast('你沒有填寫在家/外出(醫院／診所除外)*量度血壓 地點');
          return;
        }
        if (this.LifeStyleMeasureBloodPressure == 1 && this.LifeStyleMeasureBpPeriod == 0) {
          this.toast('你沒有填寫在家/外出(醫院／診所除外)*量度血壓 頻率');
          return;
        }
        if (this.LifeStyleMeasureBloodPressure == 1 && this.LifeStyleMeasureBpNoOfTime == 0) {
          this.toast('在家/外出(醫院／診所除外)*量度血壓次數必需大於0');
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
          this.toast('因糖尿病曾經入院日數必需大於0');
          return;
        }

        if (this.OtherHospHighBp == 0) {
          this.toast('你沒有填寫是否因高血壓曾經入院');
          return;
        }
        if (this.OtherHospHighBp == 1 && this.OtherHospHighBpNoOfDay == 0) {
          this.toast('因高血壓曾經入院日數必需大於0');
          return;
        }

        if (this.OtherHospOtherIllness == 0) {
          this.toast('你沒有填寫是否因其他疾病曾經入院');
          return;
        }
        if (this.OtherHospOtherIllness == 1 && this.OtherHospOtherIllnessNoOfDay == 0) {
          this.toast('因其他疾病曾經入院日數必需大於0');
          return;
        }

        if (this.OtherAccident == 0) {
          this.toast('你沒有填寫是否曾發生突發事件');
          return;
        }
        if (this.OtherAccident == 1 && this.OtherAccidentNoOfDay == 0) {
          this.toast('曾發生突發事件次數必需大於0');
          return;
        }

        if (this.OtherSpecialNeed == 0) {
          this.toast('你沒有填寫有否提出特別需要');
          return;
        }
        if (this.OtherSpecialNeed == 1 && this.NeedsContent == '') {
          this.toast('你沒有填寫提出特別需要');
          return;
        }
        if (this.OtherSpecialNeed == 1 && this.OtherSpecialNeedService == '' && this.NeedsContenttlist[3].type == true) {
          this.toast('你沒有填寫其他特別需要说明');
          return;
        }

      }
    }
    console.log('保存')
    visit.saveVisit(this.visit.LocalId, this.Bmi, this.params.caseID, this.CategoryTopic1, this.CategoryTopic2, this.CategoryTopic3, this.EmotionAssessment, this.EmotionAssessmentRemarks,
      this.Hip, this.LifeStyleMeasureBloodPressure, this.LifeStyleMeasureBloodSuger, this.LifeStyleMeasureBpLocation, this.LifeStyleMeasureBpNoOfTime,
      this.LifeStyleMeasureBpPeriod, this.LifeStyleMeasureBsLocation, this.LifeStyleMeasureBsNoOfTime, this.LifeStyleMeasureBsPeriod, this.LifeStyleQuestion1,
      this.LifeStyleQuestion2, this.LifeStyleQuestion3, this.LifeStyleQuestion4, this.LifeStyleQuestion5, this.LifeStyleQuestion6, this.Location, this.LocationRemarks,
      this.OtherAccident, this.OtherAccidentNoOfDay, this.OtherHospDisbete, this.OtherHospDisbeteNoOfDay, this.OtherHospHighBp, this.OtherHospHighBpNoOfDay,
      this.OtherHospOtherIllness, this.OtherHospOtherIllnessNoOfDay, this.OtherRemarks, this.OtherSpecialNeed, this.OtherSpecialNeedService, this.ScheduleDate,
      this.ScheduleTime, Status, this.VisitDate, this.VisitDetailIndoor, this.VisitDetailIndoorRemarks, this.VisitDetailOther, this.VisitDetailOutdoor,
      this.VisitDetailOutdoorRemarks, this.VisitEndTime, this.VisitStartTime, this.VisitStatus, this.VisitStatusRemarks, this.WHRatio, this.Waist, this.Weight,
      this.NeedsContent, this.SYS1, this.DlA1, this.SYS2, this.DlA2, this.heartBeats1, this.heartBeats2, this.presentVolunteer, this.supportVolunteer, ScheduleDate_Display).then(e => {
        if (e) {
          console.log('保存55')
          if (ret != 'web') {
            this.toast('資料保存成功');
            // this.getVisitId()
            if (ret != 'no') {
              this.back();
            }
          }
          if (ret == 'web') {
            // this.getVisitId();
            // return;
            var visit = new VisitServe();
            visit.getVisitId(this.LocalId).then((e) => {
              console.log(e)
              var casedata = e.res.rows;
              var data = Array.from(casedata)
              this.visit_web = data;

              var hvvlList = [];
              var Volunteerlist = this.visit_web[0].presentVolunteer.split(',');
              console.log(Volunteerlist)
              for (var i = 0; i < Volunteerlist.length; i++) {
                console.log(Volunteerlist[i])
                for (var j = 0; j < this.Volunteer.length; j++) {
                  if (Volunteerlist[i] == this.Volunteer[j].VolId) {
                    console.log(this.Volunteer[j])
                    hvvlList.push(this.Volunteer[j]);
                  }
                }
              }
              var supportVolunteer = this.visit_web[0].supportVolunteer.split(',');
              console.log(supportVolunteer)
              for (var i = 0; i < supportVolunteer.length; i++) {
                console.log(supportVolunteer[i])
                for (var j = 0; j < this.Volunteer.length; j++) {
                  if (supportVolunteer[i] == this.Volunteer[j].VolId) {
                    hvvlList.push(this.Volunteer[j]);
                  }
                }
              }

              console.log('556', hvvlList);
              this.visit_web[0].hvvlList = hvvlList;
              // console.log('6388',this.imgList);
              var imgserver = new ImageServe();
              var visitId = this.LocalId;
              if (this.visit.VisitId > 0) {
                visitId = this.visit.VisitId;

                imgserver.getImageList_web(visitId).then(t => {

                  console.log('new', Array.from(t.res.rows))

                  this.imgList_web = Array.from(t.res.rows);

                  console.log('new2', this.imgList_web)

                  var medicalRecord = new MedicalRecordServe();

                  medicalRecord.getAllMedicalRecordList(this.params.caseID).then((e) => {
                    this.medicAppointLogList = Array.from(e.res.rows);
                    console.log(this.medicAppointLogList)
                    // return
                    this.uploadVisitListWeb('1')
                  })
                })
              }

              console.log('visitId', visitId)
              if (this.visit.VisitId == 0) {
                imgserver.getImageList_web2(visitId).then(t => {

                  console.log('new', Array.from(t.res.rows))

                  this.imgList_web = Array.from(t.res.rows);

                  console.log('new2', this.imgList_web)

                  var medicalRecord = new MedicalRecordServe();

                  medicalRecord.getAllMedicalRecordList(this.params.caseID).then((e) => {
                    this.medicAppointLogList = Array.from(e.res.rows);
                    console.log(this.medicAppointLogList)
                    // return
                    this.uploadVisitListWeb('1')
                  })
                })
                // this.uploadVisitListWeb('1')
              }
            })

          }
        }

      })

    // this.ScheduleDate = '';
    // this.ScheduleTime = '';
    // this.VisitDate = '';
    // this.VisitStartTime = '';
    // this.VisitEndTime = '';

  }

  visitList() {
    this.navigate('visilt-list', { caseid: this.params.caseID });
  }

  uploadimg(visitid) {
    console.log(visitid)
    // if(this.visit.Status==1){
    //   this.showConfirm('请先保存资料，在上传图片', (e) => {
    //     if (e == true) {
    //       this.addVisit('no');
    //       if (this.visit.VisitId != 0) {
    //         this.navigate('uploadimg', { visitid: this.visit.VisitId });
    //       } else {
    //         this.navigate('uploadimg', { visitid: visitid });
    //       }
    //     }
    //   })
    // }else{
    if (this.visit.VisitId != 0) {
      this.navigate('uploadimg', { VisitLocalId: visitid, visitid: this.visit.VisitId, uploadtype: 'Y', DeletePicString: this.visit.DeletePicString });
    } else {
      this.navigate('uploadimg', { VisitLocalId: visitid, visitid: 0, uploadtype: 'N' });
    }
    // }


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

  saveMedicalRecord_SavedStatus(kv) {
    var medicalRecord = new MedicalRecordServe();
    var s = 0;
    if (kv.SavedStatus == 1) {
      medicalRecord.saveMedicalRecord_SavedStatus(s, kv.LocalId).then(e => {
        console.log(e)
      })
    }
  }

  loading = null;
  async uploadVisitListWeb(e) {
    this.loading = await this.loadingController.create({
      message: '上傳中'
    });
    await this.loading.present();
    var hvLogList = [];
    hvLogList = this.visit_web;
    console.log(hvLogList);
    // return;
    hvLogList[0]['Height'] = this.casedata.Height;
    hvLogList[0]['hvImgKeepListStr'] = this.hvImgKeepListStr;
    if (this.imgList_web.length == undefined) {
      hvLogList[0]['hvNewImgQty'] = 0;
    }
    if (this.imgList_web.length >= 0) {
      hvLogList[0]['hvNewImgQty'] = this.imgList_web.length;
    }

    console.log(hvLogList)

    var activityLogList = [];
    var phoneSupportLogList = [];
    var medicAppointLogList = this.medicAppointLogList;

    this.api.SaveAll(hvLogList, phoneSupportLogList, activityLogList, medicAppointLogList, this.params.UserId, 'one').then((ret) => {
      console.log(ret)
      if (ret == undefined) {
        this.loading.dismiss();
        this.toast('未能傳送資料到數據庫');
      }
      if (ret.Result == 'true') {
        var AttchList = [];
        if (ret.AttachmentGroupLists != '') {
          console.log('上傳圖片')
          var listtype2 = typeof ret.AttachmentGroupLists.AttchList;
          if (listtype2 == 'object' && ret.AttachmentGroupLists.AttchList.length == undefined) {
            AttchList.push(ret.AttachmentGroupLists.AttchList);
          } else {
            AttchList = ret.AttachmentGroupLists.AttchList;
          }
          var AttachmentIdList = AttchList[0].AttachmentIDsStr.split(",");
          for (var i = 0; i < this.imgList_web.length; i++) {
            this.saveImage_AttachmentId(parseInt(AttachmentIdList[i]), this.imgList_web[i]);
          }

          console.log('imgList', this.imgList_web)
          var w = 0;
          for (var j = 0; j < this.imgList_web.length; j++) {
            console.log('上傳圖片、開始了');
            var Base64ImgString = this.imgList_web[j].Base64ImgString.split(",");
            console.log(Base64ImgString)
            this.api.UploadImgPart('HomeVisit', this.imgList_web[j].VisitId, Base64ImgString[1], ret.WorkingSetID, AttachmentIdList[j], this.imgList_web[j].ImgName).then(k => {
              console.log('UploadImgPart', k);
              if (k.Result == 'false') {
                this.loading.dismiss();
                this.toast('圖片上傳失败');
                return;
              }
              if (k.Result == 'true') {
                w++;
                if (w == this.imgList_web.length) {
                  this.api.ExecuteWorkingSet(ret.WorkingSetID, this.casedata.CaseId, this.params.UserId).then(e => {
                    console.log(e)
                    this.loading.dismiss();
                    if (e.Result == 'true') {
                      var objWorkingSetAttachmentMap = []
                      var listtype3 = typeof e.AttachmentsResult.objWorkingSetAttachmentMap;
                      if (listtype3 == 'object' && e.AttachmentsResult.objWorkingSetAttachmentMap.length == undefined) {
                        objWorkingSetAttachmentMap.push(e.AttachmentsResult.objWorkingSetAttachmentMap);
                      } else {
                        objWorkingSetAttachmentMap = e.AttachmentsResult.objWorkingSetAttachmentMap;
                      }

                      for (var i = 0; i < objWorkingSetAttachmentMap.length; i++) {
                        this.saveImage_ImgId(objWorkingSetAttachmentMap[i].RecordID, objWorkingSetAttachmentMap[i].AttachmentId);
                      }

                      var visit = new VisitServe();
                      visit.sevaVisitSavedStatus(this.LocalId).then(e => {
                      })

                      for (var t = 0; t < this.medicAppointLogList.length; t++) {
                        this.saveMedicalRecord_SavedStatus(this.medicAppointLogList[t]);
                      }
                      this.back();
                      this.toast('資料同步成功');
                    }
                  })
                }
              }

            })
          }

          // return;
          // this.api.ExecuteWorkingSet(ret.WorkingSetID, this.casedata.CaseId, this.params.UserId).then(e => {
          //   console.log(e)
          //   if (e.Result == 'true') {

          //     var objWorkingSetAttachmentMap=[]
          //     var listtype3 = typeof ret.AttachmentsResult.objWorkingSetAttachmentMap;
          //     if (listtype3 == 'object' && ret.AttachmentsResult.objWorkingSetAttachmentMap.length == undefined) {
          //       objWorkingSetAttachmentMap.push(ret.AttachmentsResult.objWorkingSetAttachmentMap);
          //     } else {
          //       objWorkingSetAttachmentMap = ret.AttachmentsResult.objWorkingSetAttachmentMap;
          //     }

          //     for(var i=0;i<objWorkingSetAttachmentMap.length;i++){
          //       this.saveImage_ImgId(objWorkingSetAttachmentMap[i].RecordID,objWorkingSetAttachmentMap[i].AttachmentId);
          //     }

          //     var visit = new VisitServe();
          //     visit.sevaVisitSavedStatus(this.LocalId).then(e => {
          //     })

          //     for (var j = 0; j < this.medicAppointLogList.length; j++) {
          //       this.saveMedicalRecord_SavedStatus(this.medicAppointLogList[j]);
          //     }

          //     this.toast('資料同步成功');
          //   }
          // })

        }
        else {
          this.api.ExecuteWorkingSet(ret.WorkingSetID, this.params.caseID, this.params.UserId).then(e => {
            if (e == undefined) {
              this.loading.dismiss();
              this.toast('資料上傳失败');
            }
            if (e.Result == 'true') {

              var visit = new VisitServe();
              visit.sevaVisitSavedStatus(this.LocalId).then(e => {

              })
              for (var j = 0; j < this.medicAppointLogList.length; j++) {
                this.saveMedicalRecord_SavedStatus(this.medicAppointLogList[j]);
              }
              this.loading.dismiss();
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

  saveImage_AttachmentId(AttachmentId, kv) {
    var imgserve = new ImageServe();
    imgserve.saveImage_AttachmentId(AttachmentId, kv.LocalId).then(e => {
      console.log(e)
    })
  }

  saveImage_ImgId(ImgId, AttachmentId) {
    var imgserve = new ImageServe();
    imgserve.saveImage_ImgId(ImgId, AttachmentId).then(e => {
      console.log(e)
    })
  }




}