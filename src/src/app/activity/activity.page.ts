import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { CaseServe } from 'src/mgrServe/CaseServe';
import { ActivityServe } from 'src/mgrServe/ActivityServe';
import { VolunteerServr } from 'src/mgrServe/VolunteerServr';
import { ServiceApi } from 'src/providers/service.api';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
  providers: [ServiceApi]
})
export class ActivityPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public api: ServiceApi,
    public elementref:ElementRef,
    public sanitizer: DomSanitizer) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.activity = {};
    this.casedata = {}
  }

  activityDate = '';
  activityStartTime = '';
  activityEndTime = '';
  presentVolunteer = '';
  actType = 0;
  activityDetailType = '';
  actDetailType1 = false;
  actDetailType2 = false;
  actDetailType3 = false;
  actDetailType4 = false;
  actDetailType5 = false;
  remarks1 = '';
  remarks2 = '';
  remarks3 = '';
  remarks4 = '';
  otherActRemarks = '';
  otherContent = '';
  Remarks = '';
  ActTypes = '';

  disabled = true;
  PresentVolunteer_show = '';

  actDetailTypelist = [{
    actDetailType: false, value: 1
  }, {
    actDetailType: false, value: 2
  }, {
    actDetailType: false, value: 3
  }, {
    actDetailType: false, value: 4
  }, {
    actDetailType: false, value: 5
  }
  ]


  onMyLoad() {
    //参数
    this.params;

  }
  onMyShow() {
    this.getCase()
    this.getActivity()
    this.getVolunteerList()
  }


  inputfocus(hh){
    setTimeout(()=>{
      var obj = this.elementref.nativeElement.querySelector('#'+hh);
      console.log(obj);
      if(obj!=null){
        obj.focus();
      }
    },100);
  }

  casedata = null;
  LocalId = 0;
  activity = null;
  Volunteerlist_show = ''
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

  getActivity() {
    console.log(this.activity)
    if (this.LocalId > 0) {
      var activity = new ActivityServe();
      activity.getActivity(this.LocalId).then((e) => {
        console.log(e)
        var casedata = e.res.rows;
        var data = Array.from(casedata)[0]
        this.activity = data;
        console.log(data);
      })
    }
  }

  Volunteer = [];
  getVolunteerList() {
    var volunteerServr = new VolunteerServr();
    volunteerServr.getAllVolunteerList_VolType(1).then((e) => {
      if (e.res.rows.length > 0) {
        console.log(Array.from(e.res.rows))
        this.Volunteer = Array.from(e.res.rows)
      }
    })
  }

  getActtype(e) {
    console.log(e)
    if (e == 1) {
      this.disabled = false;
      this.otherContent = '';
    }
    if (e == 2) {
      this.disabled = true;
      this.actDetailType1 = false;
      this.actDetailType2 = false;
      this.actDetailType3 = false;
      this.actDetailType4 = false;
      this.actDetailType5 = false;
      this.actDetailTypelist = [{
        actDetailType: false, value: 1
      }, {
        actDetailType: false, value: 2
      }, {
        actDetailType: false, value: 3
      }, {
        actDetailType: false, value: 4
      }, {
        actDetailType: false, value: 5
      }
      ]
    }
    this.actType = e;
  }

  getActDetail(e) {
    console.log(e)
    this.activityDetailType = e;
  }

  getActDetail1(e) {
    console.log(e)

    // if (this.actDetailType1 == true) {
    //   this.actDetailType1 = false;
    //   this.actDetailTypelist[0].actDetailType1 = false;
    // } else {
    //   this.actDetailType1 = true;
    //   this.actDetailTypelist[0].actDetailType1 = false;
    // }
    // console.log(this.actDetailType1)

  }
  getActDetail2(e) {
    console.log(e)
    // if (this.actDetailType2 == true) {
    //   this.actDetailType2 = false;
    //   this.actDetailTypelist[1].actDetailType = false;
    // } else {
    //   this.actDetailType2 = true;
    //   this.actDetailTypelist[1].actDetailType = true;
    // }

  }
  getActDetail3(e) {
    console.log(e)
    if (this.actDetailType3 == true) {
      this.actDetailType3 = false;
      this.actDetailTypelist[2].actDetailType = false;
    } else {
      this.actDetailType3 = true;
      this.actDetailTypelist[2].actDetailType = true;
    }

  }
  getActDetail4(e) {
    console.log(e)
    this.actDetailType4 = true;
    this.actDetailTypelist[0].actDetailType = true;
  }
  getActDetail5(e) {
    console.log(e)
    this.actDetailType5 = true;
    this.actDetailTypelist[0].actDetailType = true;
  }

  aas() {
    console.log(this.presentVolunteer);
    // return;
    this.Volunteerlist_show = ''
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
          if (this.Volunteerlist_show == '') {
            this.Volunteerlist_show = data['VolunteerName'];
          } else {
            this.Volunteerlist_show = this.Volunteerlist_show + ',' + data['VolunteerName'];
          }
        }
      })
    }
  }

  saveActivity() {
    // alert(this.actDetailTypelist[0].actDetailType1);
    // return;
    var activity = new ActivityServe();
    if (this.activityDate == '') {
      this.toast('你沒有輸入活動日期');
      return;
    }
    if (this.activityStartTime) {
      var oDate1 = new Date(this.activityStartTime);
      var oDate2 = new Date(this.activityEndTime);
      if (oDate1.getTime() > oDate2.getTime()) {
        this.toast('開始時間不能遲於結束時間');
        return;
      }
      if (oDate1.getTime() == oDate2.getTime()) {
        this.toast('開始和結束時間不能一樣');
        return;
      }
    }

    if (this.actType == 1) {
      for (var i = 0; i < this.actDetailTypelist.length; i++) {
        if (this.actDetailTypelist[i].actDetailType == true) {
          if (this.activityDetailType == '') {
            this.activityDetailType = String(this.actDetailTypelist[i].value);
          } else {
            this.activityDetailType = this.activityDetailType + ',' + this.actDetailTypelist[i].value
          }

        }
      }
      console.log(this.activityDetailType)
    }
    var ActDate_Display = AppUtil.FormatDate2(new Date(this.activityDate));
    if (this.activityStartTime != '') {
      this.activityStartTime = AppUtil.FormatTime(new Date(this.activityStartTime));
    }
    if (this.activityEndTime != '') {
      this.activityEndTime = AppUtil.FormatTime(new Date(this.activityEndTime));
    }

    this.LocalId = this.params.LocalId;
    console.log(this.LocalId, this.params.caseID, this.activityDate, this.activityStartTime, this.activityEndTime, this.presentVolunteer, this.actType, this.activityDetailType, this.remarks1, this.remarks2, this.remarks3, this.remarks4, this.otherActRemarks, this.otherContent)

    activity.saveActivity(this.LocalId, this.params.caseID, this.activityDate, this.activityStartTime, this.activityEndTime, this.presentVolunteer, this.actType, this.activityDetailType, this.remarks1, this.remarks2, this.remarks3, this.remarks4, this.otherActRemarks, this.otherContent, ActDate_Display).then((e) => {
      console.log(e)
      if (e) {
        this.navigate("home", { id: this.params.UserId });
        this.toast('資料提交成功');
      }
    })
  }

  saveActivity2() {
    var activity = new ActivityServe();
    if (this.activityDate == '') {
      this.toast('你沒有輸入活動日期');
      return;
    }
    if (this.activityStartTime == '') {
      this.toast('你沒有輸入開始時間');
      return;
    }
    if (this.activityEndTime == '') {
      this.toast('你沒有輸入結束時間');
      return;
    }
    if (this.activityStartTime != '' && this.activityEndTime != '') {
      var oDate1 = new Date(this.activityStartTime);
      var oDate2 = new Date(this.activityEndTime);
      if (oDate1.getTime() > oDate2.getTime()) {
        this.toast('開始時間不能遲於結束時間');
        return;
      }
      if (oDate1.getTime() == oDate2.getTime()) {
        this.toast('開始和結束時間不能一樣');
        return;
      }
    }

    if (this.actType == 1) {
      for (var i = 0; i < this.actDetailTypelist.length; i++) {
        if (this.actDetailTypelist[i].actDetailType == true) {
          if (this.activityDetailType == '') {
            this.activityDetailType = String(this.actDetailTypelist[i].value);
          } else {
            this.activityDetailType = this.activityDetailType + ',' + this.actDetailTypelist[i].value
          }
        }
      }
      console.log(this.activityDetailType)
    }

    if (!this.presentVolunteer) {
      this.toast('你沒有出席義工一欄');
      return;
    }
    if (this.actType == 0) {
      this.toast('你沒有揀選活動內容');
      return;
    }
    if (this.actType == 1) {
      if (this.remarks1 == '' && this.actDetailTypelist[0].actDetailType == true) {
        this.toast('你沒有填寫參觀病人資源中心的活動地點');
        return;
      }
      if (this.remarks2 == '' && this.actDetailTypelist[1].actDetailType == true) {
        this.toast('你沒有填寫出席健康講座的講座主題');
        return;
      }
      if (this.remarks3 == '' && this.actDetailTypelist[2].actDetailType == true) {
        this.toast('你沒有填寫出席與運動有關活動的活動主題');
        return;
      }
      if (this.remarks4 == '' && this.actDetailTypelist[4].actDetailType == true) {
        this.toast('你沒有填寫其他的活動內容');
        return;
      }
    }
    if (this.actType == 2 && this.otherActRemarks == '') {
      this.toast('你沒有填寫其他的活動內容');
      return;
    }

    var ActDate_Display = AppUtil.FormatDate2(new Date(this.activityDate));
    if (this.activityStartTime != '') {
      this.activityStartTime = AppUtil.FormatTime(new Date(this.activityStartTime));
    }
    if (this.activityEndTime != '') {
      this.activityEndTime = AppUtil.FormatTime(new Date(this.activityEndTime));
    }
    this.LocalId = this.params.LocalId;
    console.log(this.LocalId, this.params.caseID, this.activityDate, this.activityStartTime, this.activityEndTime, this.presentVolunteer, this.actType, this.activityDetailType, this.remarks1, this.remarks2, this.remarks3, this.remarks4, this.otherActRemarks, this.otherContent)
    // return;
    activity.saveActivity(this.LocalId, this.params.caseID, this.activityDate, this.activityStartTime, this.activityEndTime, this.presentVolunteer, this.actType, this.activityDetailType, this.remarks1, this.remarks2, this.remarks3, this.remarks4, this.otherActRemarks, this.otherContent, ActDate_Display).then((e) => {
      console.log(e)
      if (e.res.insertId > 0) {
        var activity = new ActivityServe();
        activity.getActivity(e.res.insertId).then((ret) => {
          console.log(ret)
          this.LocalId = e.res.insertId;
          var activity = ret.res.rows;
          var data = Array.from(activity)
          this.activity = data;

          var alvList = [];
          var Volunteerlist = this.activity[0].PresentVolunteer.split(',');
          
          for (var t = 0; t < Volunteerlist.length; t++) {
            console.log(Volunteerlist[t])
            for (var j = 0; j < this.Volunteer.length; j++) {
              if (Volunteerlist[t] == this.Volunteer[j].VolId.toString()) {
                alvList.push(this.Volunteer[j]);
              }
            }
          }

          this.activity[0].alvList = alvList;
          this.uploadActiveListWeb();
        })
      }
    })
  }

  uploadActiveListWeb() {
    var hvLogList = [];
    var activityLogList = [];
    activityLogList = this.activity;
    var phoneSupportLogList = [];
    var medicAppointLogList = []
    this.api.SaveAll(hvLogList, phoneSupportLogList, activityLogList, medicAppointLogList, this.params.UserId, 'one').then((ret) => {
      console.log(ret)
      if (ret.Result == 'true') {
        this.api.ExecuteWorkingSet(ret.WorkingSetID, this.params.caseID, this.params.UserId).then(e => {

          if (e.Result == 'true') {
            var activity = new ActivityServe();
            activity.sevaActivitySavedStatus(this.LocalId).then(e => {
            })
            this.toast('資料提交成功');
            this.back();
          }
        })
      }
    });


  }

  // uploadActiveListWeb(activityid) {
  //   if (this.LocalId == 0 || this.LocalId == undefined) {
  //     this.saveActivity();
  //   } else {
  //     var hvLogList = [];
  //     var activityLogList = [];
  //     activityLogList.push(this.activity)
  //     var phoneSupportLogList = [];
  //     var medicAppointLogList = []
  //     if (activityid > 0) {
  //       var activity = new ActivityServe();
  //       activity.getActivity(activityid).then((e) => {
  //         console.log(e)
  //         var casedata = e.res.rows;
  //         activityLogList = Array.from(casedata)

  //         if (activityLogList[0].presentVolunteer=='') {
  //           this.toast('你沒有出席義工一欄');
  //           return;
  //         }
  //         if (activityLogList[0].actType == 0) {
  //           this.toast('你沒有揀選活動內容');
  //           return;
  //         }

  //         if (activityLogList[0].actType == 2 && activityLogList[0].otherContent=='') {
  //           this.toast('你沒有填寫其他的活動內容');
  //           return;
  //         }

  //         this.api.SaveAll(hvLogList, phoneSupportLogList, activityLogList, medicAppointLogList, this.params.UserId,'one').then((ret) => {
  //           console.log(ret)
  //           if (ret.Result == 'true') {
  //             this.api.ExecuteWorkingSet(ret.WorkingSetID, this.params.caseID, this.params.UserId).then(e => {
  //               console.log(e)
  //               if (e.Result) {
  //                 var activity = new ActivityServe();

  //                 activity.sevaActivitySavedStatus(activityid).then(e => {

  //                 })
  //                 this.toast('資料提交成功');
  //                 this.back();
  //               }
  //             })
  //           }

  //         });
  //       })
  //     }


  //   }
  // }





}


