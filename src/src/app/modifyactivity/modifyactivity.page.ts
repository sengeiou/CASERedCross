import { Component, ViewChild } from '@angular/core';
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
  selector: 'app-modifyactivity',
  templateUrl: './modifyactivity.page.html',
  styleUrls: ['./modifyactivity.page.scss'],
  providers: [ServiceApi]
})
export class ModifyactivityPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public api: ServiceApi,
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

  Volunteerlist = [];
  Volunteerlist_show = ''

  disabled = true;

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
  casedata = null;
  LocalId = 0;
  activity = null;
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

        var Volunteerlist = this.activity.PresentVolunteer.split(',');
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

        var ActDetailTypelist = this.activity.ActDetailType.split(',');
        for (var i = 0; i < ActDetailTypelist.length; i++) {
          console.log(ActDetailTypelist[i])
          if (ActDetailTypelist[i] == 1) {
            this.actDetailTypelist[0].actDetailType = true;
          }
          if (ActDetailTypelist[i] == 2) {
            this.actDetailTypelist[1].actDetailType = true;
          }
          if (ActDetailTypelist[i] == 3) {
            this.actDetailTypelist[2].actDetailType = true;
          }
          if (ActDetailTypelist[i] == 4) {
            this.actDetailTypelist[3].actDetailType = true;
          }
          if (ActDetailTypelist[i] == 5) {
            this.actDetailTypelist[4].actDetailType = true;
          }
        }

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

  saveActivity() {
    // alert(this.actDetailTypelist[0].actDetailType1);
    // return;
    if(this.activityStartTime){
      this.activityStartTime = AppUtil.FormatTime(new Date(this.activityStartTime));
    }
    if(this.activityEndTime){
      this.activityEndTime = AppUtil.FormatTime(new Date(this.activityEndTime));
    }
    
    console.log(this.activityStartTime)
    console.log(this.activityEndTime)
    // return
    this.activityDate = this.activityDate ? this.activityDate : this.activity.ActDate
    this.activityStartTime = this.activityStartTime ? this.activityStartTime : this.activity.ActStartTime
    this.activityEndTime = this.activityEndTime ? this.activityEndTime : this.activity.ActEndTime
    this.presentVolunteer = this.presentVolunteer ? this.presentVolunteer : this.activity.ActDetailType
    this.actType = this.actType ? this.actType : this.activity.ActType

    this.remarks1 = this.remarks1 ? this.remarks1 : this.activity.Remarks1
    this.remarks2 = this.remarks2 ? this.remarks2 : this.activity.remarks2
    this.remarks3 = this.remarks3 ? this.remarks3 : this.activity.Remarks3
    this.remarks4 = this.remarks4 ? this.remarks4 : this.activity.Remarks4
    this.otherActRemarks = this.otherActRemarks ? this.otherActRemarks : this.activity.OtherActRemarks
    this.otherContent = this.otherContent ? this.otherContent : this.activity.Remarks

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
      this.activityDetailType = this.activityDetailType ? this.activityDetailType : this.activity.ActDetailType
      this.otherActRemarks = ''
      // return;
    } else {
      this.activityDetailType = '';
      this.remarks1 = ''
      this.remarks2 = ''
      this.remarks3 = ''
      this.remarks4 = ''
    }


    // if (!this.presentVolunteer) {
    //   this.toast('你沒有出席義工一欄');
    //   return;
    // }
    // if (this.actType == 0) {
    //   this.toast('你沒有揀選活動內容');
    //   return;
    // }
    // if (this.actType == 1 && !this.otherActRemarks && this.activityDetailType=='其他') {
    //   this.toast('你沒有填寫電話其他慰問內容');
    //   return;
    // }
    // if (this.actType == 1 && !this.remarks1 && this.activityDetailType=='參觀病人資源中心') {
    //   this.toast('你沒有填寫參觀病人資源中心的活動地點');
    //   return;
    // }
    // if (this.actType == 1 && !this.remarks2 && this.activityDetailType=='出席健康講座') {
    //   this.toast('你沒有填寫健康講座的主題');
    //   return;
    // }
    // if (this.actType == 1 && !this.remarks3 && this.activityDetailType=='出席與運動有關活動') {
    //   this.toast('你沒有填寫與運動有關活動的活動主題');
    //   return;
    // }
    // if (this.actType == 2 && !this.otherContent) {
    //   this.toast('你沒有填寫其他的活動內容');
    //   return;
    // }


    this.activityDate = AppUtil.FormatDate(new Date(this.activityDate));


    this.LocalId = this.params.LocalId;



    activity.saveActivity(this.LocalId, this.params.caseID, this.activityDate, this.activityStartTime, this.activityEndTime, this.presentVolunteer, this.actType, this.activityDetailType, this.remarks1, this.remarks2, this.remarks3, this.remarks4, this.otherActRemarks, this.Remarks).then((e) => {
      console.log(e)
      if (e) {
        // this.navigate("home", { id: this.params.UserId });
        // this.back();
        this.toast('資料保存成功');
        this.back();
      }
    })
  }


  uploadActiveListWeb() {

    if (this.LocalId == 0 || this.LocalId == undefined) {
      this.showConfirm('资料没有保存？请先保存', (e) => {

      })
    } else {
      var  hvLogList=[];
      var activityLogList =[];
      activityLogList.push(this.activity)
      var phoneSupportLogList=[];
      var medicAppointLogList=[]
      if (activityLogList["SavedStatus"] != 0) {
        this.api.SaveAll(hvLogList,phoneSupportLogList,activityLogList,medicAppointLogList,this.params.UserId).then((ret) => {
          console.log(ret)
          if(ret.Result=='true'){
            this.api.ExecuteWorkingSet(ret.WorkingSetID,this.params.caseID,this.params.UserId).then(e=>{
              console.log(e)
              if(e.Result){
                var activity = new ActivityServe();
                
                activity.sevaActivitySavedStatus(this.LocalId).then(e=>{

                })
                this.toast('資料提交成功');
                this.back();
              }
            })
          }
          
        });
      }

    }
  }

}
