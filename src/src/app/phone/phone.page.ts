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
  CannotContact = 0;
  NextPhoneDate = ''
  NextPhoneTime = '';
  VolunteerName = '';
  PhoneID = 0;
  phone = null;
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
        this.CallDate_show = AppUtil.FormatDate(new Date(data["CallDate"]));
      })
    }
  }
  getAllVisitScheduleDate() {
    var visit = new VisitServe();
    visit.getAllVisitScheduleDate(this.params.caseID).then((e) => {
      console.log(e);
      if (e.res.rows.length > 0) {
        console.log(e.res.rows);
        var arr = Array.from(e.res.rows)[0];
        this.phone.VisitDate = arr;
      }
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
      var data={}
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

  getLiaison(e){
    console.log(e)
    this.CannotContact=e;
  }

  savePhone() {
    var phone = new PhoneServe();
    if (!this.CallDate) {
      this.toast('你沒有輸入電話慰問日期');
      return;
    }
    if (!this.CallStartTime || !this.CallEndTime) {
      this.toast('你沒有輸入電話慰問時間');
      return;
    }
    if (this.CallStartTime == this.CallEndTime) {
      this.toast('開始和結束時間不能一樣');
      return;
    }

    var oDate1 = new Date(this.CallStartTime);
    var oDate2 = new Date(this.CallEndTime);
    if (oDate1.getTime() > oDate2.getTime()) {
      this.toast('開始時間不能遲於結束時間');
      return;
    }

    // if (!this.Detail) {
    //   this.toast('你沒有填寫電話慰問內容');
    //   return;
    // }
    // if (this.Detail == '其他' && !this.DetailOther) {
    //   this.toast('你沒有填寫電話其他慰問內容');
    //   return;
    // }
    this.CallDate = AppUtil.FormatDate(new Date(this.CallDate));
    this.CallStartTime = AppUtil.FormatTime(new Date(this.CallStartTime));
    this.CallEndTime = AppUtil.FormatTime(new Date(this.CallEndTime));
    this.PhoneID = this.params.PhoneID;
    phone.addPhone(this.PhoneID, this.params.caseID, this.CallDate, this.CallStartTime, this.CallEndTime, this.Detail, this.DetailOther, this.UserName, this.OtherRemark).then((e) => {
      console.log(e)
      if (this.PhoneID == 0 || this.PhoneID == undefined) {
        this.PhoneID = e.res.insertId;
        phone.savePhoneCaseId(this.params.caseID, e.res.insertId).then((e) => {
          console.log(e)
        })
      }
      if (e) {
        this.toast('資料提交成功');
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
        

        var  hvLogList=[];
        var activityLogList =[];
        var phoneSupportLogList=datas;
        var medicAppointLogList=[]
        if (phoneSupportLogList["SavedStatus"] != 0) {
          this.api.SaveAll(hvLogList,phoneSupportLogList,activityLogList,medicAppointLogList).then((ret) => {
            console.log(ret)
            this.api.ExecuteWorkingSet(ret.WorkingSetID,this.params.caseID,this.params.UserId).then(e=>{
              console.log(e)
            })
          });
        }
  

      })

    }
  }


}
