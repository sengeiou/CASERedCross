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

  LifeStyleQuestion1 = 0;
  LifeStyleQuestion2 = 0;
  LifeStyleQuestion3 = 0;
  LifeStyleQuestion4 = 0;
  LifeStyleQuestion5 = 0;
  LifeStyleQuestion6 = 0;
  LifeStyleMeasureBloodSuger = 0;
  LifeStyleMeasureBsLocation = 0;
  LifeStyleMeasureBsPeriod = 0;
  LifeStyleMeasureBsNoOfTime = 0;
  LifeStyleMeasureBloodPressure = 0;
  LifeStyleMeasureBpLocation = 0;
  LifeStyleMeasureBpPeriod = 0;
  LifeStyleMeasureBpNoOfTime = 0;

  EmotionAssessment = '';
  EmotionAssessmentRemarks = '';

  OtherHospDisbete = 0;
  OtherHospDisbeteNoOfDay = 0;
  OtherHospHighBp = 0;
  OtherHospHighBpNoOfDay = 0;
  OtherHospOtherIllness = 0;
  OtherHospOtherIllnessNoOfDay = 0;
  OtherAccident = 0;
  OtherAccidentNoOfDay = 0;
  OtherSpecialNeed = 0;
  OtherSpecialNeedService = '';
  OtherRemarks = '';
  NeedsContent = '';

  DeletePicString = ''

  presentVolunteer_show = ''
  supportVolunteer_show = ''
  Volunteerlist_show = ''

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
    this.supportVolunteer_show = ''
    var Volunteerlist = this.supportVolunteer;
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
      this.showAlert('掃描成功');
      this.VisitDate = AppUtil.FormatDate2(new Date())
      if (this.time_type == 'ss') {
        this.VisitStartTime = AppUtil.FormatTime(new Date());//实际开始时间
      } else {
        this.VisitEndTime = AppUtil.FormatTime(new Date());//实际结束时间
      }
    }else{
      this.showAlert('你掃描的二維碼和你的探訪對象並不符合').then(e=>{
        
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


        // alert(this.visit.VisitDetailOutdoor)\
        var a = '4,5'
        // console.log('557'+a)
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
    // volunteerServr.getAllVolunteerList().then((e) => {
    //   if (e.res.rows.length > 0) {
    //     console.log(Array.from(e.res.rows))
    //     this.Volunteer = Array.from(e.res.rows)
    //   }
    // })
  }


  saveYuyue(visitId) {

    console.log(visitId, this.ScheduleDate, this.ScheduleTime, this.params.caseID)
    // this.ScheduleDate = AppUtil.FormatDate(new Date(this.ScheduleDate));
    // this.ScheduleTime = AppUtil.FormatTime(new Date(this.ScheduleTime));
    // console.log(this.ScheduleDate)
    // if (!this.visit.ScheduleDate) {
    //   var visit = new VisitServe();
    //   visit.addVisit_yuyue(visitId, this.ScheduleDate, this.ScheduleTime, this.params.caseID).then((e) => {
    //     console.log(e)
    //     if (this.LocalId == 0 || this.LocalId == undefined) {
    //       this.LocalId = e.res.insertId;
    //       visit.saveVisitCaseId(this.params.caseID, e.res.insertId).then((e) => {
    //         console.log(e)
    //       })
    //     }
    //     this.getVisitId()
    //   })

    // }
    this.addVisit()

  }

  getLocation(e) {
    console.log(e)
    this.Location = e;
  }

  getVisitStatus(e) {
    console.log(e)
    this.VisitStatus = e;
    if (e == 2) {
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
    }
  }

  saveVisit_Neurou(visitId) {
    console.log(visitId, this.VisitDate, this.VisitStartTime, this.VisitEndTime, this.presentVolunteer, this.supportVolunteer, this.Location, this.LocationRemarks, this.VisitStatus, this.VisitStatusRemarks, this.params.caseID)
    // return;
    // if (!this.VisitDate) {
    //   this.toast('你沒有填寫實際探訪日期');
    //   return;
    // }
    // if (!this.VisitStartTime || !this.VisitEndTime) {
    //   this.toast('你沒有填寫實際探訪時間');
    //   return;
    // }
    // if (!this.presentVolunteer) {
    //   this.toast('你沒有填寫出席義工一欄');
    //   return;
    // }
    // if (!this.VisitStatus) {
    //   this.toast('你沒有填寫探訪狀況');
    //   return;
    // }
    // if (this.VisitStatus == 2 && !this.VisitStatusRemarks) {
    //   this.toast('你沒有填寫未能探訪的原因');
    //   return;
    // }
    this.addVisit()
    // if (!this.visit.VisitDate) {
    // var visit = new VisitServe();
    // this.VisitDate = AppUtil.FormatDate(new Date(this.VisitDate));
    // this.VisitStartTime = AppUtil.FormatTime(new Date(this.VisitStartTime));
    // this.VisitEndTime = AppUtil.FormatTime(new Date(this.VisitEndTime));
    // console.log(this.presentVolunteer, this.supportVolunteer)
    // visit.addVisit_neurou(visitId, this.VisitDate, this.VisitStartTime, this.VisitEndTime, this.presentVolunteer, this.supportVolunteer, this.Location, this.LocationRemarks, this.VisitStatus, this.VisitStatusRemarks, this.params.caseID).then((e) => {
    //   console.log(e)
    //   if (this.LocalId == 0 || this.LocalId == undefined) {
    //     this.LocalId = e.res.insertId;
    //     visit.saveVisitCaseId(this.params.caseID, e.res.insertId).then((e) => {
    //       console.log(e)
    //     })
    //   }
    //   this.toast('資料提交成功');
    //   this.getVisitId()
    // })
    // this.addVisit()
    // }
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
    // if (!this.VisitDetailIndoor) {
    //   this.toast('你沒有填寫室內活動選項');
    //   return;
    // }
    // if (this.VisitDetailIndoor == '其他' && !this.VisitDetailIndoorRemarks) {
    //   this.toast('你沒有填寫室內活動的其他項目');
    //   return;
    // }
    // if (!this.VisitDetailOutdoor) {
    //   this.toast('你沒有填寫室外活動選項');
    //   return;
    // }
    // if (this.VisitDetailOutdoor == '其他' && !this.VisitDetailOutdoorRemarks) {
    //   this.toast('你沒有填寫室外活動的其他項目');
    //   return;
    // }

    // var visit = new VisitServe();
    // visit.saveService_neurou(visitId, this.VisitDetailIndoor, this.VisitDetailIndoorRemarks, this.VisitDetailOutdoor, this.VisitDetailOutdoorRemarks, this.VisitDetailOther, this.CategoryTopic1, this.CategoryTopic2, this.CategoryTopic3, this.params.caseID).then((e) => {
    //   if (this.LocalId == 0 || this.LocalId == undefined) {
    //     this.LocalId = e.res.insertId;
    //     visit.saveVisitCaseId(this.params.caseID, e.res.insertId).then((e) => {
    //       console.log(e)
    //     })
    //   }
    //   this.toast('資料提交成功');
    //   this.getVisitId()
    // })

    this.addVisit()
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
    // var visit = new VisitServe();
    // visit.saveHeightWeight(visitId, this.Weight, this.Bmi, this.Waist, this.Hip, this.WHRatio, this.SYS1, this.DlA1, this.SYS2, this.DlA2, this.heartBeats1, this.heartBeats2, this.params.caseID).then((e) => {
    //   if (this.LocalId == 0 || this.LocalId == undefined) {
    //     this.LocalId = e.res.insertId;
    //     visit.saveVisitCaseId(this.params.caseID, e.res.insertId).then((e) => {
    //       console.log(e)
    //     })
    //   }
    //   this.toast('資料提交成功');
    //   this.getVisitId()
    // })
    this.addVisit()
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
    console.log(visitId, this.LifeStyleQuestion1, this.LifeStyleQuestion2, this.LifeStyleQuestion3, this.LifeStyleQuestion4, this.LifeStyleQuestion5, this.LifeStyleQuestion6, this.params.caseID)
    this.WHRatio = this.Waist / this.Hip;
    this.Bmi = this.Weight / (1.72 * 1.72)
    // var visit = new VisitServe();
    // visit.saveLifeHabit(visitId, this.LifeStyleQuestion1, this.LifeStyleQuestion2, this.LifeStyleQuestion3, this.LifeStyleQuestion4, this.LifeStyleQuestion5, this.LifeStyleQuestion6, this.params.caseID).then((e) => {
    //   if (this.LocalId == 0 || this.LocalId == undefined) {
    //     this.LocalId = e.res.insertId;
    //     visit.saveVisitCaseId(this.params.caseID, e.res.insertId).then((e) => {
    //       console.log(e)
    //     })
    //   }
    //   this.toast('資料提交成功');
    //   this.getVisitId()
    // })
    this.addVisit()
  }

  getEmotion(e) {
    console.log(e)
    this.EmotionAssessment = e;
  }

  saveEmotion(visitId) {
    console.log(visitId, this.EmotionAssessment, this.params.caseID)
    this.WHRatio = this.Waist / this.Hip;
    this.Bmi = this.Weight / (1.72 * 1.72)

    this.addVisit()
    // var visit = new VisitServe();
    // visit.saveEmotion(visitId, this.EmotionAssessment, this.params.caseID).then((e) => {
    //   if (this.LocalId == 0 || this.LocalId == undefined) {
    //     this.LocalId = e.res.insertId;
    //     visit.saveVisitCaseId(e.res.insertId, e.res.insertId).then((e) => {
    //       console.log(e)
    //     })
    //   }
    //   this.toast('資料提交成功');
    //   this.getVisitId()
    // })
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
    // if (!this.OtherHospDisbete) {
    //   this.toast('你沒有填滿長者其他狀況補充1');
    //   return;
    // }
    // if (this.OtherHospDisbete == 1 && !this.OtherHospDisbeteNoOfDay) {
    //   this.toast('你沒有填滿長者其他狀況補充2');
    //   return;
    // }

    // if (!this.OtherHospHighBp) {
    //   this.toast('你沒有填滿長者其他狀況補充3');
    //   return;
    // }
    // if (this.OtherHospHighBp == 1 && !this.OtherHospHighBpNoOfDay) {
    //   this.toast('你沒有填滿長者其他狀況補充4');
    //   return;
    // }

    // if (!this.OtherHospOtherIllness) {
    //   this.toast('你沒有填滿長者其他狀況補充5');
    //   return;
    // }
    // if (this.OtherHospOtherIllness == 1 && !this.OtherHospOtherIllnessNoOfDay) {
    //   this.toast('你沒有填滿長者其他狀況補充6');
    //   return;
    // }

    // if (!this.OtherAccident) {
    //   this.toast('你沒有填滿長者其他狀況補充7');
    //   return;
    // }
    // if (this.OtherAccident == 1 && !this.OtherAccidentNoOfDay) {
    //   this.toast('你沒有填滿長者其他狀況補充8');
    //   return;
    // }

    // if (!this.OtherSpecialNeed) {
    //   this.toast('你沒有填滿長者其他狀況補充9');
    //   return;
    // }
    // if (this.OtherSpecialNeed == 1 && !this.OtherSpecialNeedService) {
    //   this.toast('你沒有填滿長者其他狀況補充10');
    //   return;
    // }

    this.addVisit()

    // var visit = new VisitServe();
    // visit.savaOtherSupplement(visitId, this.OtherHospDisbete, this.OtherHospDisbeteNoOfDay, this.OtherHospHighBp, this.OtherHospHighBpNoOfDay, this.OtherHospOtherIllness, this.OtherHospOtherIllnessNoOfDay, this.OtherAccident, this.OtherAccidentNoOfDay, this.OtherSpecialNeed, this.OtherSpecialNeedService, this.OtherRemarks, this.params.caseID).then((e) => {
    //   if (this.LocalId == 0 || this.LocalId == undefined) {
    //     this.LocalId = e.res.insertId;
    //     visit.saveVisitCaseId(e.res.insertId, e.res.insertId).then((e) => {
    //       console.log(e)
    //     })
    //   }
    //   this.toast('資料提交成功');
    //   this.getVisitId()
    // })
  }

  addVisit() {
    // if (this.visit.SavedStatus == 0) {
    //   this.toast('已上傳過的的資料，無法修改');
    //   return;
    // }

    for (var i = 0; i < this.VisitDetailIndoorlist.length; i++) {
      if (this.VisitDetailIndoorlist[i].type == true) {
        if (this.VisitDetailOutdoor == '') {
          this.VisitDetailIndoor = String(this.VisitDetailIndoorlist[i].value);
        } else {
          this.VisitDetailIndoor = this.VisitDetailIndoor + ',' + this.VisitDetailIndoorlist[i].value
        }
      }
    }

    for (var i = 0; i < this.VisitDetailOutdoorlist.length; i++) {
      if (this.VisitDetailOutdoorlist[i].type == true) {
        if (this.VisitDetailOutdoor == '') {
          this.EmotionAssessment = String(this.VisitDetailOutdoorlist[i].value);
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
      this.ScheduleDate = AppUtil.FormatDate2(new Date(this.ScheduleDate));
    }

    if (this.ScheduleTime != '') {
      this.ScheduleTime = AppUtil.FormatTime(new Date(this.ScheduleTime));
    }

    if (this.VisitDate != '') {
      this.VisitDate = AppUtil.FormatDate2(new Date(this.VisitDate));
    }

    if (this.VisitStartTime != '') {
      this.VisitStartTime = AppUtil.FormatTime(new Date(this.VisitStartTime));
    }

    if (this.VisitEndTime != '') {
      this.VisitEndTime = AppUtil.FormatTime(new Date(this.VisitEndTime));
    }

    var VisitId = 0;
    var Status = 1;
    var TaskId = 0;

    this.Bmi = this.Bmi != 0 ? this.Bmi : this.visit.Bmi
    this.CategoryTopic1 = this.CategoryTopic1 != '' ? this.Bmi : this.visit.CategoryTopic1
    this.CategoryTopic2 = this.CategoryTopic2 != '' ? this.Bmi : this.visit.CategoryTopic2
    this.CategoryTopic3 = this.CategoryTopic3 != '' ? this.CategoryTopic3 : this.visit.CategoryTopic3
    this.EmotionAssessment = this.EmotionAssessment != '' ? this.Bmi : this.visit.EmotionAssessment
    this.EmotionAssessmentRemarks = this.EmotionAssessmentRemarks != '' ? this.Bmi : this.visit.EmotionAssessmentRemarks
    this.Hip = this.Hip != 0 ? this.Hip : this.visit.Hip
    this.LifeStyleMeasureBpPeriod = this.LifeStyleMeasureBpPeriod != 0 ? this.LifeStyleMeasureBpPeriod : this.visit.LifeStyleMeasureBpPeriod
    this.LifeStyleMeasureBloodSuger = this.LifeStyleMeasureBloodSuger != 0 ? this.LifeStyleMeasureBloodSuger : this.visit.LifeStyleMeasureBloodSuger
    this.LifeStyleMeasureBpLocation = this.LifeStyleMeasureBpLocation != 0 ? this.LifeStyleMeasureBpLocation : this.visit.LifeStyleMeasureBpLocation
    this.LifeStyleMeasureBpNoOfTime = this.LifeStyleMeasureBpNoOfTime != 0 ? this.LifeStyleMeasureBpNoOfTime : this.visit.LifeStyleMeasureBpNoOfTime
    this.LifeStyleMeasureBloodPressure = this.LifeStyleMeasureBloodPressure != 0 ? this.LifeStyleMeasureBloodPressure : this.visit.LifeStyleMeasureBloodPressure
    this.LifeStyleMeasureBsLocation = this.LifeStyleMeasureBsLocation != 0 ? this.LifeStyleMeasureBsLocation : this.visit.LifeStyleMeasureBsLocation
    this.LifeStyleMeasureBsNoOfTime = this.LifeStyleMeasureBsNoOfTime != 0 ? this.LifeStyleMeasureBsNoOfTime : this.visit.LifeStyleMeasureBsNoOfTime
    this.LifeStyleMeasureBsPeriod = this.LifeStyleMeasureBsPeriod != 0 ? this.LifeStyleMeasureBsPeriod : this.visit.LifeStyleMeasureBsPeriod
    this.LifeStyleQuestion1 = this.LifeStyleQuestion1 != 0 ? this.LifeStyleQuestion1 : this.visit.LifeStyleQuestion1
    this.LifeStyleQuestion2 = this.LifeStyleQuestion2 != 0 ? this.LifeStyleQuestion2 : this.visit.LifeStyleQuestion2
    this.LifeStyleQuestion3 = this.LifeStyleQuestion3 != 0 ? this.LifeStyleQuestion3 : this.visit.LifeStyleQuestion3
    this.LifeStyleQuestion4 = this.LifeStyleQuestion4 != 0 ? this.LifeStyleQuestion4 : this.visit.LifeStyleQuestion4
    this.LifeStyleQuestion5 = this.LifeStyleQuestion5 != 0 ? this.LifeStyleQuestion5 : this.visit.LifeStyleQuestion5
    this.LifeStyleQuestion6 = this.LifeStyleQuestion6 != 0 ? this.LifeStyleQuestion6 : this.visit.LifeStyleQuestion6
    this.Location = this.Location != 0 ? this.Location : this.visit.Location
    this.LocationRemarks = this.LocationRemarks != '' ? this.LocationRemarks : this.visit.LocationRemarks
    this.OtherAccident = this.OtherAccident != 0 ? this.OtherAccident : this.visit.OtherAccident
    this.OtherAccidentNoOfDay = this.OtherAccidentNoOfDay != 0 ? this.OtherAccidentNoOfDay : this.visit.OtherAccidentNoOfDay
    this.OtherHospDisbete = this.OtherHospDisbete != 0 ? this.OtherHospDisbete : this.visit.OtherHospDisbete
    this.OtherHospDisbeteNoOfDay = this.OtherHospDisbeteNoOfDay != 0 ? this.OtherHospDisbeteNoOfDay : this.visit.OtherHospDisbeteNoOfDay
    this.OtherHospHighBp = this.OtherHospHighBp != 0 ? this.OtherHospHighBp : this.visit.OtherHospHighBp
    this.OtherHospHighBpNoOfDay = this.OtherHospHighBpNoOfDay != 0 ? this.OtherHospHighBpNoOfDay : this.visit.OtherHospHighBpNoOfDay
    this.OtherHospOtherIllness = this.OtherHospOtherIllness != 0 ? this.OtherHospOtherIllness : this.visit.OtherHospOtherIllness
    this.OtherRemarks = this.OtherRemarks != '' ? this.OtherRemarks : this.visit.OtherRemarks
    this.OtherSpecialNeed = this.OtherSpecialNeed != 0 ? this.OtherSpecialNeed : this.visit.OtherSpecialNeed
    this.OtherSpecialNeedService = this.OtherSpecialNeedService != '' ? this.OtherSpecialNeedService : this.visit.OtherSpecialNeedService
    this.ScheduleDate = this.ScheduleDate != '' ? this.ScheduleDate : this.visit.ScheduleDate
    this.ScheduleTime = this.ScheduleTime != '' ? this.ScheduleTime : this.visit.ScheduleTime
    this.VisitDate = this.VisitDate != '' ? this.VisitDate : this.visit.VisitDate
    this.VisitDetailIndoor = this.VisitDetailIndoor != '' ? this.VisitDetailIndoor : this.visit.VisitDetailIndoor
    this.VisitDetailIndoorRemarks = this.VisitDetailIndoorRemarks != '' ? this.VisitDetailIndoorRemarks : this.visit.VisitDetailIndoorRemarks
    this.VisitDetailOther = this.VisitDetailOther != '' ? this.VisitDetailOther : this.visit.VisitDetailOther
    this.VisitDetailOutdoor = this.VisitDetailOutdoor != '' ? this.VisitDetailOutdoor : this.visit.VisitDetailOutdoor
    this.VisitDetailOutdoorRemarks = this.VisitDetailOutdoorRemarks != '' ? this.VisitDetailOutdoorRemarks : this.visit.VisitDetailOutdoorRemarks
    this.VisitEndTime = this.VisitEndTime != '' ? this.VisitEndTime : this.visit.VisitEndTime
    this.VisitStartTime = this.VisitStartTime != '' ? this.VisitStartTime : this.visit.VisitStartTime
    this.VisitStatus = this.VisitStatus != 0 ? this.VisitStatus : this.visit.VisitStatus
    this.VisitStatusRemarks = this.VisitStatusRemarks != '' ? this.VisitStatusRemarks : this.visit.VisitStatusRemarks
    this.WHRatio = this.WHRatio != 0 ? this.WHRatio : this.visit.WHRatio
    this.Waist = this.Waist != 0 ? this.Waist : this.visit.Waist
    this.Weight = this.Weight != 0 ? this.Weight : this.visit.Weight
    this.NeedsContent = this.NeedsContent != '' ? this.NeedsContent : this.visit.NeedsContent
    this.SYS1 = this.SYS1 != 0 ? this.SYS1 : this.visit.SYS1
    this.DlA1 = this.DlA1 != 0 ? this.DlA1 : this.visit.DlA1
    this.SYS2 = this.SYS2 != 0 ? this.SYS2 : this.visit.SYS2
    this.DlA2 = this.DlA2 != 0 ? this.DlA2 : this.visit.DlA2
    this.heartBeats1 = this.heartBeats1 != 0 ? this.heartBeats1 : this.visit.heartBeats1
    this.heartBeats2 = this.heartBeats2 != 0 ? this.heartBeats2 : this.visit.heartBeats2
    this.presentVolunteer = this.presentVolunteer != '' ? this.presentVolunteer : this.visit.presentVolunteer
    this.supportVolunteer = this.supportVolunteer != '' ? this.supportVolunteer : this.visit.supportVolunteer



    if (this.ScheduleDate == '') {
      this.toast('你沒有選擇探訪日期');
      return;
    }
    visit.saveVisit(this.visit.LocalId, this.Bmi, this.params.caseID, this.CategoryTopic1, this.CategoryTopic2, this.CategoryTopic3, this.EmotionAssessment, this.EmotionAssessmentRemarks,
      this.Hip, this.LifeStyleMeasureBloodPressure, this.LifeStyleMeasureBloodSuger, this.LifeStyleMeasureBpLocation, this.LifeStyleMeasureBpNoOfTime,
      this.LifeStyleMeasureBpPeriod, this.LifeStyleMeasureBsLocation, this.LifeStyleMeasureBsNoOfTime, this.LifeStyleMeasureBsPeriod, this.LifeStyleQuestion1,
      this.LifeStyleQuestion2, this.LifeStyleQuestion3, this.LifeStyleQuestion4, this.LifeStyleQuestion5, this.LifeStyleQuestion6, this.Location, this.LocationRemarks,
      this.OtherAccident, this.OtherAccidentNoOfDay, this.OtherHospDisbete, this.OtherHospDisbeteNoOfDay, this.OtherHospHighBp, this.OtherHospHighBpNoOfDay,
      this.OtherHospOtherIllness, this.OtherHospOtherIllnessNoOfDay, this.OtherRemarks, this.OtherSpecialNeed, this.OtherSpecialNeedService, this.ScheduleDate,
      this.ScheduleTime, Status, TaskId, this.VisitDate, this.VisitDetailIndoor, this.VisitDetailIndoorRemarks, this.VisitDetailOther, this.VisitDetailOutdoor,
      this.VisitDetailOutdoorRemarks, this.VisitEndTime, VisitId, this.VisitStartTime, this.VisitStatus, this.VisitStatusRemarks, this.WHRatio, this.Waist, this.Weight,
      this.NeedsContent, this.SYS1, this.DlA1, this.SYS2, this.DlA2, this.heartBeats1, this.heartBeats2, this.presentVolunteer, this.supportVolunteer, this.DeletePicString).then(e => {
        if (e) {
          this.toast('資料保存成功');
          this.back();
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
    this.navigate('uploadimg', { visitid: visitid });
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


  uploadVisitListWeb(e) {
    if (e == 0) {
      this.toast('已上傳過的的資料，無需上傳');
      return;
    }
    if (this.LocalId == 0 || this.LocalId == undefined) {
      this.showConfirm('资料没有保存？请先保存', (e) => {

      })
    } else {
      var hvLogList = [];
      hvLogList.push(this.visit);
      hvLogList[0]['Height'] = this.casedata.Height;
      console.log(hvLogList)
      // return
      var activityLogList = [];
      var phoneSupportLogList = [];
      var medicAppointLogList = []
      if (activityLogList["SavedStatus"] != 0) {
        this.api.SaveAll(hvLogList, phoneSupportLogList, activityLogList, medicAppointLogList, this.params.UserId).then((ret) => {
          console.log(ret)
          if (ret.Result == 'true') {
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

        });
      }

    }
  }




}