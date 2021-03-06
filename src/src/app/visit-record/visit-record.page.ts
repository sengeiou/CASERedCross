import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MedicalRecordServe } from 'src/mgrServe/MedicalRecordServe';
import { HosiptalServe } from 'src/mgrServe/HosiptalServe';
import { SpecialtyServe } from 'src/mgrServe/SpecialtyServe';

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
    this.MedicalRecord = {};
  }
  list = [{}, {}]
  AppointmentDate = '';
  AppointmentTime = '';
  AppointmentDate2 = '';
  AppointmentTime2 = '';
  Description = '';
  Reason = '';
  Hosp = '';
  Specialty = '';
  Status = 1;
  onMyLoad() {
    //参数
    this.params;
    this.LocalId = this.params.MedicalRecordId
  }
  onMyShow() {
    this.AppointmentDate = '';
    this.AppointmentTime = '';
    this.Description = '';
    this.Reason = '';
    this.Hosp = '';
    this.Specialty = '';
    this.Status = 1;
    // this.MedicalRecord = null;

    this.getMedicalRecord()
    this.getAllHosiptalList()
    this.getAllSpecialtylList()
  }
  LocalId = 0;
  MedicalRecord = null;
  Hosiptal = [];
  Specialtyl = [];
  getStatus(e) {
    console.log(e)
    this.Status = e
  }

  addMedicalRecord(ret) {
    console.log(this.AppointmentDate, this.AppointmentTime, this.Description, this.Reason, this.Hosp, this.Specialty, this.params.caseid)
    // return;

    if (!this.Hosp) {
      this.toast('你沒有填寫醫院');
      return;
    }
    if (!this.Specialty) {
      this.toast('你沒有填寫门诊');
      return;
    }

    if (this.AppointmentTime2 != '') {
      this.AppointmentTime = AppUtil.FormatTime(new Date(this.AppointmentTime2));
    }


    var medicalRecord = new MedicalRecordServe();
    medicalRecord.addMedicalRecord(this.AppointmentDate, this.AppointmentTime, this.Description, this.Reason, this.Hosp, this.Specialty, this.params.caseid, this.Status).then((e) => {
      console.log(e)
      if (e.res.insertId) {
        if (ret == 2) {
          this.addMedicalRecordHospSpecialty()
        } else {
          this.toast('資料提交成功');
          this.back()
        }
      }
    })
  }

  getMedicalRecord() {
    var medicalRecord = new MedicalRecordServe();
    
    if (this.LocalId > 0) {
      medicalRecord.getMedicalRecordId(this.LocalId).then((e) => {
        console.log(e)
        var arr = null;
        arr = Array.from(e.res.rows)[0];
        console.log(arr)
        this.MedicalRecord = arr;

        this.AppointmentDate = this.MedicalRecord.AppointmentDate;
        this.AppointmentTime = this.MedicalRecord.AppointmentTime;
        this.Hosp = this.MedicalRecord.Hosp;
        this.Specialty = this.MedicalRecord.Specialty;
        this.Description = this.MedicalRecord.Description;
        this.Reason = this.MedicalRecord.Reason;
        this.Status = this.MedicalRecord.Status;
        this.getSpecialty()
        this.gethosiptal()
        if (this.MedicalRecord) {
          if (this.MedicalRecord.AppointmentDate) {
            var AppointmentDate_Display = AppUtil.FormatDate2(new Date(this.MedicalRecord.AppointmentDate));
            console.log(this.MedicalRecord)
            this.MedicalRecord.AppointmentDate_Display = AppointmentDate_Display
          }
        }


      })
    }

  }

  getSpecialty() {
    var secialtyServe = new SpecialtyServe();
    secialtyServe.getSpecialtyId(this.Specialty).then(e => {

      var data = Array.from(e.res.rows)[0];
      this.MedicalRecord.Specialty_name = data['Name'];
    })
  }

  gethosiptal() {
    var hosiptalServe = new HosiptalServe()
    hosiptalServe.getHosiptalId(this.Hosp).then(e => {

      var data = Array.from(e.res.rows)[0];
      this.MedicalRecord.Hosp_name = data['Name'];
    })
  }

  getAllHosiptalList() {
    var hosiptalServe = new HosiptalServe();
    hosiptalServe.getAllHosiptalList().then((e) => {
      console.log(e)
      var arr = null;
      arr = Array.from(e.res.rows);
      console.log(arr)
      this.Hosiptal = arr;
    })
  }

  getAllSpecialtylList() {
    var specialtyServe = new SpecialtyServe();
    specialtyServe.getAllSpecialtyList().then((e) => {
      console.log(e)
      var arr = null;
      arr = Array.from(e.res.rows);
      console.log(arr)
      this.Specialtyl = arr;
    })
  }

  addMedicalRecordHospSpecialty() {
    console.log(this.MedicalRecord.Hosp, this.MedicalRecord.Specialty, this.params.caseid)
    // return;
    var medicalRecord = new MedicalRecordServe();
    medicalRecord.addMedicalRecordHospSpecialty(this.MedicalRecord.Hosp, this.MedicalRecord.Specialty, this.params.caseid).then((e) => {
      console.log(e)
      if (e.res.insertId) {
        // this.back()
        
        // this.navigate("visit-record", { MedicalRecordId: e.res.insertId, caseid: this.params.caseid });
        this.toast('保存成功');
        this.LocalId=e.res.insertId;
        this.onMyShow();
        

      }
    })
  }

  saveMedicalRecord(ret) {
    console.log(this.AppointmentDate, this.AppointmentTime, this.Description, this.Reason, this.Status, this.LocalId)
    // return;
    if (this.AppointmentTime2 != '') {
      this.AppointmentTime = AppUtil.FormatTime(new Date(this.AppointmentTime2));
    }
   
    if (this.Hosp == '') {
      this.toast('你沒有填寫醫院');
      return;
    }
    // if (this.Specialty=='') {
    //   this.toast('你沒有填寫门诊');
    //   return;
    // }
    if (this.Status == 0) {
      this.toast('你沒有填寫就诊状态');
      return;
    }
    if (this.Status == 3 && this.Reason == '') {
      this.toast('你沒有填寫無覆診原因');
      return;
    }

    var medicalRecord = new MedicalRecordServe();
    medicalRecord.saveMedicalRecord(this.AppointmentDate, this.AppointmentTime, this.Hosp, this.Specialty, this.Description, this.Reason, this.Status, this.LocalId).then((e) => {
      console.log(e)
      if(ret!=2){
        this.back()
      }
      this.toast('保存成功');
    })
  }

  preserve(e) {
    if (e == 2) {
      if(this.LocalId != 0){
        this.saveMedicalRecord(2)
      }else{
        this.addMedicalRecord(e)
      }
      
      this.addMedicalRecordHospSpecialty()
     
    } else {
      if (this.LocalId != 0) {
        this.saveMedicalRecord(1)
      } else {
        this.addMedicalRecord(e)
      }
    }
  }

  deleteRecord() {
    var medicalRecord = new MedicalRecordServe();
    this.showConfirm('你確定要刪除嗎？', (e) => {
      if (e) {
        medicalRecord.deleteMedicalRecord_id(this.params.MedicalRecordId).then(e => {
          if (e) {
            this.toast('刪除成功');
            this.back()
          }
        })
      }
    })

  }
}