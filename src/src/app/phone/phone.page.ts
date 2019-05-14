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

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss'],
})
export class PhonePage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

    this.phone = {};
  }


  CallDate = '';
  CallStartTime = '';
  CallEndTime = '';
  Detail = '';
  DetailOther = '';
  UserName = '';
  OtherRemark = ''
  PhoneID = 0;
  phone = null;
  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {
    this.getCase()
    this.getPhone()
  }

  casedata = {};
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

  getPhone() {
    if (this.params.LocalId > 0) {
      var phone = new PhoneServe();
      phone.getPhoneId(this.params.LocalId).then((e) => {
        var phonedata = e.res.rows;
        var data = Array.from(phonedata)[0];
        this.phone = data;
        console.log(data)
      })
    }
  }

  getDetail(e) {
    console.log(e)
    this.Detail = e;
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

    if (!this.Detail) {
      this.toast('你沒有填寫電話慰問內容');
      return;
    }
    if (this.Detail == '其他' && !this.DetailOther) {
      this.toast('你沒有填寫電話其他慰問內容');
      return;
    }
    this.CallDate = AppUtil.FormatDate(new Date(this.CallDate));
    this.CallStartTime = AppUtil.FormatTime(new Date(this.CallStartTime));
    this.CallEndTime = AppUtil.FormatTime(new Date(this.CallEndTime));
    this.PhoneID = this.params.PhoneID;
    phone.addPhone(this.PhoneID, this.params.caseID, this.CallDate, this.CallStartTime, this.CallEndTime, this.Detail, this.DetailOther, this.UserName, this.OtherRemark).then((e) => {
      console.log(e)
      if (e) {
        this.toast('資料提交成功');
      }
    })
  }


}
