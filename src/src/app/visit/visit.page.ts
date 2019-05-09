import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { CaseServe } from 'src/mgrServe/CaseServe';
import { VisitServe } from 'src/mgrServe/VisitServe';

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
  presentVolunteer = '';
  supportVolunteer = '';
  indoorActivities = '';//室内活动
  otherIndoorActivities = '';//其他室内活动输入
  outdoorActivities = '';//室外活动
  otherOutdoorActivities = '';//其他室外活动输入
  otherServe = '';//其他服务
  targetTitle1 = '';//目标标题
  targetTitle2 = '';//目标标题
  targetTitle3 = '';//目标标题
  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {
    this.getCase()
    this.getVisitId()
  }
  LocalId = 0;
  casedata = {};



  getCase() {
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
    console.log(this.params.LocalId);
    this.LocalId = this.params.LocalId;
    if (this.LocalId > 0) {
      var visit = new VisitServe();
      visit.getVisitId(this.params.LocalId).then((e) => {
        console.log(e)
        var casedata = e.res.rows;
        var data = Array.from(casedata)[0]
        this.visit = data;
        console.log(data);
      })
    }
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


  saveYuyue(visitId) {
    console.log(visitId, this.ScheduleDate, this.ScheduleTime, this.params.caseID)
    this.ScheduleDate=AppUtil.FormatDate(new Date( this.ScheduleDate));
    this.ScheduleTime=AppUtil.FormatTime(new Date( this.ScheduleTime));
    console.log(this.ScheduleDate)
    if (!this.visit.ScheduleDate) {
      var visit = new VisitServe();
      // AppUtil.FormatDate()
      visit.addVisit_yuyue(visitId, this.ScheduleDate, this.ScheduleTime, this.params.caseID).then((e) => {
        console.log(e)
        if (this.LocalId == 0) {
          this.LocalId = e.res.insertId;
        }

        this.getVisitId()
      })
    }

  }

  saveNeurou(visitId) {
    // if (!this.visit.VisitDate) {
    var visit = new VisitServe();
    this.VisitDate=AppUtil.FormatDate(new Date( this.VisitDate));
    this.VisitStartTime=AppUtil.FormatTime(new Date( this.VisitStartTime));
    this.VisitEndTime=AppUtil.FormatTime(new Date( this.VisitEndTime));
    console.log(visitId)
    visit.addVisit_neurou(visitId, this.VisitDate, this.VisitStartTime, this.VisitEndTime, this.presentVolunteer, this.supportVolunteer, this.Location, this.LocationRemarks, this.VisitStatus, this.VisitStatusRemarks, this.params.caseID).then((e) => {
      console.log(e)
      if (this.LocalId == 0) {
        this.LocalId = e.res.insertId;
      }
      this.getVisitId()
    })
    // }

  }

  visitList(visitid) {
    this.navigate('visilt-list', { visitid: visitid });
  }

  uploadimg(visitid) {
    this.navigate('uploadimg', { visitid: visitid });
  }

  scan() {

  }

  aa(visitid) {
    this.navigate('chartdemo', { visitid: visitid });
  }
}