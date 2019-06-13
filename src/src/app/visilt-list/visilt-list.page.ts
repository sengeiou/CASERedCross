import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MedicalRecordServe } from 'src/mgrServe/MedicalRecordServe';
import { SpecialtyServe } from 'src/mgrServe/SpecialtyServe';
import { HosiptalServe } from 'src/mgrServe/HosiptalServe';

@Component({
  selector: 'app-visilt-list',
  templateUrl: './visilt-list.page.html',
  styleUrls: ['./visilt-list.page.scss'],
})
export class VisiltListPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  list = [{}, {}]
  Specialty_name = ''

  onMyLoad() {
    //参数
    this.params;
    console.log(this.params)
  }
  onMyShow() {
    this.getMedicalRecordServeList()
  }
  medicalRecordList = []
  getMedicalRecordServeList() {
    var that = this;
    var medicalRecord = new MedicalRecordServe();
    medicalRecord.getAllMedicalRecordList(this.params.caseid).then((e) => {

      var arr = null;
      arr = Array.from(e.res.rows);

      this.medicalRecordList = arr;
      var secialtyServe = new SpecialtyServe();
     
      for (var i = 0; i < this.medicalRecordList.length; i++) {
        var AppointmentDate_Display = AppUtil.FormatDate2(new Date(this.medicalRecordList[i].AppointmentDate));
        console.log(this.medicalRecordList[i])
        this.medicalRecordList[i].AppointmentDate_Display=AppointmentDate_Display
        this.getSpecialty(this.medicalRecordList[i].Specialty, i)
        this.gethosiptal(this.medicalRecordList[i].Hosp, i)
      }

    })
  }

  getSpecialty(id, idx) {
    var secialtyServe = new SpecialtyServe();
    secialtyServe.getSpecialtyId(id).then(e => {
      console.log(this.medicalRecordList[idx])
      var data = Array.from(e.res.rows)[0];
      this.medicalRecordList[idx].Specialty_name = data['Name'];
    })
  }

  gethosiptal(id,idx){
    var hosiptalServe = new HosiptalServe()
    hosiptalServe.getHosiptalId(id).then(e => {
      console.log(this.medicalRecordList[idx])
      var data = Array.from(e.res.rows)[0];
      this.medicalRecordList[idx].Hosp_name = data['Name'];
    })
  }




  record(MedicalRecordId) {
    this.navigate('visit-record', { MedicalRecordId: MedicalRecordId, caseid: this.params.caseid });
  }
}