import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { CaseServe } from 'src/mgrServe/CaseServe';
import { PhoneServe } from 'src/mgrServe/PhoneServe';
// import { timingSafeEqual } from 'crypto';
import { VisitServe } from 'src/mgrServe/VisitServe';
import { ServiceApi } from 'src/providers/service.api';
import { VolunteerServr } from 'src/mgrServe/VolunteerServr';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss'],
  providers: [ServiceApi]
})
export class PhonePage extends AppBase {

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

    this.phone = {};
    this.casedata = {}
  }


  CallDate = '';
  CallStartTime = '';
  CallEndTime = '';
  Detail = '';
  DetailOther = '';
  UserName = '';
  OtherRemark = ''
  CannotContact = 2;
  NextPhoneDate = ''
  NextPhoneTime = '';
  VolunteerName = '';

  NextPhoneDate2 = '';
  NextPhoneTime2 = '';

  PhoneID = 0;
  phone = null;

  disabled = true;

  DetailList = [{
    DetailType: false, value: 1
  }, {
    DetailType: false, value: 2
  }, {
    DetailType: false, value: 3
  }, {
    DetailType: false, value: 4
  }, {
    DetailType: false, value: 5
  }, {
    DetailType: false, value: 6
  }, {
    DetailType: false, value: 7
  }, {
    DetailType: false, value: 8
  }, {
    DetailType: false, value: 9
  }
  ]
  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {
    this.getCase()
    this.getPhone()
    this.getVolunteerList()
    this.getAllVisitScheduleDate()
    this.getVolunteer()
  }

  casedata = null;
  getCase() {
    var cases = new CaseServe();
    cases.getCaseId(this.params.caseID).then((e) => {
      // console.log(e)
      var casedata = e.res.rows;
      var data = Array.from(casedata)[0]
      this.casedata = data;
      console.log(data)
    })
  }
  CallDate_show = '';
  getPhone() {
    this.PhoneID = this.params.PhoneID;
    if (this.params.PhoneID > 0) {
      var phone = new PhoneServe();
      phone.getPhoneId(this.params.PhoneID).then((e) => {
        var phonedata = e.res.rows;
        var data = Array.from(phonedata)[0];
        this.phone = data;
        console.log(data)
        console.log(data["CallDate"])

        this.CallDate_show = AppUtil.FormatDate2(new Date(data["CallDate"]));
        console.log(this.phone)
      })
    }
  }

  VisitDate=null;
  getAllVisitScheduleDate() {
    var visit = new VisitServe();
    visit.getAllVisitScheduleDate(this.params.caseID).then((e) => {
      console.log(e);
      if (e.res.rows.length > 0) {
        console.log(e.res.rows);
        var arr = Array.from(e.res.rows)[0];
        // this.phone.ScheduleDate_show=AppUtil.FormatDate2(this.phone.VisitDate.ScheduleDate)
        this.phone.VisitDate = arr;
        this.VisitDate=arr;
        console.log(arr);
      }
      // alert(this.VisitDate)
      console.log(this.VisitDate);
    });
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

  getVolunteer() {
    var volunteerServr = new VolunteerServr();
    volunteerServr.getVolunteerId(this.params.UserId).then((e) => {
      console.log(e)
      var data = {}
      data = Array.from(e.res.rows)[0]
      console.log(data)
      this.Volunteer = data['VolId'];
      this.VolunteerName = data['VolunteerName'];
    })
  }

  getDetail(e) {
    console.log(e)
    this.Detail = e;
  }

  getLiaison(e) {
    console.log(e)
    if (e == 1) {
      this.showConfirm('一旦按選，在這按鈕以下的資料將會清空，你確定要按選嗎？', (ret) => {
        if (ret) {
          this.CannotContact = e;
          this.Detail = '';
          this.DetailOther = '';
          this.OtherRemark = ''
          this.NextPhoneDate = ''
          this.NextPhoneTime = '';
          this.DetailList = [{
            DetailType: false, value: 1
          }, {
            DetailType: false, value: 2
          }, {
            DetailType: false, value: 3
          }, {
            DetailType: false, value: 4
          }, {
            DetailType: false, value: 5
          }, {
            DetailType: false, value: 6
          }, {
            DetailType: false, value: 7
          }, {
            DetailType: false, value: 8
          }, {
            DetailType: false, value: 9
          }
          ]
        }
      })
    } else {
      this.CannotContact = e;
    }
  }

  savePhone(ret) {
    var phone = new PhoneServe();

    if (this.CannotContact != 1) {
      for (var i = 0; i < this.DetailList.length; i++) {
        if (this.DetailList[i].DetailType == true) {
          if (this.Detail == '') {
            this.Detail = String(this.DetailList[i].value);
          } else {
            this.Detail = this.Detail + ',' + this.DetailList[i].value
          }
        }
      }
      // this.Detail = this.Detail != '' ? this.Detail : this.phone.Detail
    } else {
      this.Detail = '';
    }

    if (!this.CallDate) {
      this.toast('你沒有輸入電話慰問日期');
      return;
    }
    
    if (ret == 'web') {
      if (this.CallStartTime == '' || this.CallEndTime == '') {
        this.toast('你沒有輸入電話慰問時間');
        return;
      }

      if (oDate1 == oDate2) {
        this.toast('開始和結束時間不能一樣');
        return;
      }
      var oDate1 = new Date(this.CallStartTime);
      var oDate2 = new Date(this.CallEndTime);
      if (oDate1.getTime() > oDate2.getTime()) {
        this.toast('開始時間不能遲於結束時間');
        return;
      }
      if (this.CannotContact == 0) {
        this.toast('你沒有輸入聯絡状态');
        return;
      }
      
      if (this.CannotContact == 2) {
        if (this.Detail == '') {
          this.toast('你沒有輸入慰問內容');
          return;
        }
        if (this.DetailList[7].DetailType == true) {
          if (this.NextPhoneDate2 == '') {
            this.toast('你沒有輸入下次探訪日期');
            return;
          }

          if (this.NextPhoneTime2 == '') {
            this.toast('你沒有輸入下次探訪時間');
            return;
          }
        }

        if (this.DetailList[8].DetailType == true) {
          if (this.DetailOther == '') {
            this.toast('你沒有輸入其他電話慰問內容');
            return;
          }
        }
      }

    }




    var CallDate_Display = AppUtil.FormatDate2(new Date(this.CallDate));
    if (this.CallStartTime != '') {
      this.CallStartTime = AppUtil.FormatTime(new Date(this.CallStartTime));
    }
    if (this.CallEndTime != '') {
      this.CallEndTime = AppUtil.FormatTime(new Date(this.CallEndTime));
    }

    if (this.NextPhoneDate2 != '') {
      this.NextPhoneDate = AppUtil.FormatDate2(new Date(this.NextPhoneDate2));
    }

    if (this.NextPhoneTime2 != '') {
      this.NextPhoneTime = AppUtil.FormatTime(new Date(this.NextPhoneTime2));
    }

    this.PhoneID = this.params.PhoneID;
    phone.addPhone(this.PhoneID, this.params.caseID, this.CallDate, CallDate_Display, this.CallStartTime, this.CallEndTime, this.Detail, this.DetailOther, this.UserName, this.OtherRemark, this.CannotContact, this.NextPhoneDate, this.NextPhoneTime).then((e) => {
      console.log(e)
      if (this.PhoneID == 0 || this.PhoneID == undefined) {
        this.PhoneID = e.res.insertId;
        phone.savePhoneCaseId(this.params.caseID, e.res.insertId).then((e) => {
          console.log(e)
        })
      }
      if (e) {
        if (ret == 'no') {
          this.back();
          this.toast('資料保存成功');
        }
        if (ret == 'web') {
          this.uploadPhoneListWeb();
        }
      }
    })
  }

  uploadPhoneListWeb() {

    if (this.PhoneID == 0) {
      this.showConfirm('资料没有保存？请先保存', (e) => {

      })
    } else {
      var phone = new PhoneServe();
      phone.getPhoneId(this.PhoneID).then((e) => {
        console.log(e)
        var datas = Array.from(e.res.rows);

        datas[0]['ResponsibleVol'] = this.params.UserId;
        console.log(datas[0])
        // return

        var hvLogList = [];
        var activityLogList = [];
        var phoneSupportLogList = datas;
        var medicAppointLogList = []

        this.api.SaveAll(hvLogList, phoneSupportLogList, activityLogList, medicAppointLogList, this.params.UserId, 'one').then((ret) => {
          console.log(ret)
          if (ret.Result == 'true') {
            this.api.ExecuteWorkingSet(ret.WorkingSetID, this.params.caseID, this.params.UserId).then(e => {
              console.log(e)
              if (e.Result == 'true') {
                this.toast('資料提交成功');
                this.back();
                phone.sevaPhoneSavedStatus(this.PhoneID).then((e) => {
                  console.log(e)
                })
              }
            })
          }
        });

      })

    }
  }


}
