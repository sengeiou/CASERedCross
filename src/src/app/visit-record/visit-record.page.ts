import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MedicalRecordServe } from 'src/mgrServe/MedicalRecordServe';

@Component({
  selector: 'app-visit-record',
  templateUrl: './visit-record.page.html',
  styleUrls: ['./visit-record.page.scss'],
})
export class VisitRecordPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.MedicalRecord = [];
  }
  list = [{}, {}]
  AppointmentDate = '';
  AppointmentTime = '';
  Description = '';
  Reason = '';
  Hosp = '';
  Specialty = '';
  Status = 0;
  onMyLoad() {
    //参数
    this.params;
    this.getMedicalRecord()
  }
  onMyShow() {

  }
  LocalId = 0;
  MedicalRecord = null;
  getStatus(e) {
    console.log(e)
    this.Status = e
  }

  addMedicalRecord() {
    console.log(this.AppointmentDate, this.AppointmentTime, this.Description, this.Reason, this.Hosp, this.Specialty, this.params.caseid)
    // return;
    this.AppointmentDate = AppUtil.FormatDate(new Date(this.AppointmentDate));
    this.AppointmentTime = AppUtil.FormatTime(new Date(this.AppointmentTime));
    var medicalRecord = new MedicalRecordServe();
    medicalRecord.addMedicalRecord(this.AppointmentDate, this.AppointmentTime, this.Description, this.Reason, this.Hosp, this.Specialty, this.params.caseid).then((e) => {
      console.log(e)
      if (e.res.insertId) {
        this.toast('資料提交成功');
      }
    })
  }

  getMedicalRecord() {
    var medicalRecord = new MedicalRecordServe();

    medicalRecord.getMedicalRecordId(this.params.MedicalRecordId).then((e) => {
      console.log(e)
      var arr = null;
      arr = Array.from(e.res.rows);
      console.log(arr)
      this.MedicalRecord = arr[0];
    })
  }

  addMedicalRecordHospSpecialty() {
    console.log(this.Hosp, this.Specialty, this.params.caseid)
    // return;

    var medicalRecord = new MedicalRecordServe();
    medicalRecord.addMedicalRecordHospSpecialty(this.Hosp, this.Specialty, this.params.caseid).then((e) => {
      console.log(e)
      if (e.res.insertId) {
        this.toast('資料提交成功');
      }
    })
  }

  saveMedicalRecord() {
    console.log(this.AppointmentDate, this.AppointmentTime, this.Description, this.Reason, this.Status, this.LocalId)
    // return;
    this.AppointmentDate = AppUtil.FormatDate(new Date(this.AppointmentDate));
    this.AppointmentTime = AppUtil.FormatTime(new Date(this.AppointmentTime));
    var medicalRecord = new MedicalRecordServe();
    medicalRecord.saveMedicalRecord(this.AppointmentDate, this.AppointmentTime, this.Description, this.Reason, this.Status, this.LocalId).then((e) => {
      console.log(e)

      this.toast('保存成功');

    })
  }

  preserve(e) {
    if (e == 2) {
      this.addMedicalRecord()
      this.addMedicalRecordHospSpecialty()
    } else {
      if (this.LocalId != 0) {
        this.saveMedicalRecord()
      } else {
        this.addMedicalRecord()
      }
    }
  }
}