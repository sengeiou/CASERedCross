import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides, LoadingController } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivityServe } from 'src/mgrServe/ActivityServe';
import { ServiceApi } from 'src/providers/service.api';
import { CaseServe } from 'src/mgrServe/CaseServe';
import { VisitServe } from 'src/mgrServe/VisitServe';
import { PhoneServe } from 'src/mgrServe/PhoneServe';
import { VolunteerServr } from 'src/mgrServe/VolunteerServr';
import { SpecialtyServe } from 'src/mgrServe/SpecialtyServe';
import { HosiptalServe } from 'src/mgrServe/HosiptalServe';
import { BloodPressureServe } from 'src/mgrServe/BloodPressureServe';
import { WeightServe } from 'src/mgrServe/WeightServe';
import { WHRServe } from 'src/mgrServe/WHRServe';
import { HeartRateServe } from 'src/mgrServe/HeartRateServe';
import { MedicalRecordServe } from 'src/mgrServe/MedicalRecordServe';
import { Network } from '@ionic-native/network/ngx';
import { ImageServe } from 'src/mgrServe/ImageServe';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ServiceApi, FileTransfer, File, Base64]
})
export class HomePage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public api: ServiceApi,
    public network: Network,
    public loadingController: LoadingController,
    private transfer: FileTransfer, private file: File,
    private base64: Base64
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  n = 1500;
  list = [{}, {}]
  caselist = [];
  wangluo = ''
  UserId = 0;
  imgList = [];

  allImgList = [];

  onMyLoad() {
    //参数
    this.params;
    this.getActivityList()
    this.UserId = this.params.id;
  }
  onMyShow() {

    this.getActivityList()
    this.getCase()
    // this.getAllImg()
    this.wangluo = this.network.type;
    console.log(this.network.type)

    // var imgserver = new ImageServe();
    // imgserver.deleteImage2();

    // window.onload = function () {
    //   var seewid = document.documentElement.clientWidth;
    //   var seehei = document.documentElement.clientHeight;
    //   console.log('可视区高' + seehei + '可视区宽' + seewid);
    // }

    var volunteerServr = new VolunteerServr();
    volunteerServr.getAllVolunteerList().then((e) => {
      if (e.res.rows.length > 0) {
        console.log(Array.from(e.res.rows))
        this.Volunteer = Array.from(e.res.rows)
      }
    })
  }

  visiltList_web = [];
  getSavedStatus() {
    var SavedStatus = 1;
    var visit = new VisitServe();
    var imgserver = new ImageServe();
    visit.getVisit_SavedStatus(SavedStatus).then(e => {
      this.visiltList_web = Array.from(e.res.rows);
      for (var i = 0; i < this.visiltList_web.length; i++) {
        this.visiltList_web[i].hvImgKeepListStr = '';
        this.visiltList_web[i].hvNewImgQty = 0;
        this.visiltList_web[i].Height = 0;
        var visitId = this.visiltList_web[i].LocalId;
        if (this.visiltList_web[i].VisitId > 0) {
          visitId = this.visiltList_web[i].VisitId;
        }
      }
    })

    var activity = new ActivityServe();
    var phone = new PhoneServe();
    var medicalRecordServe = new MedicalRecordServe();
  }

  logout() { //退出登录
    this.showConfirm('你確定要登出嗎？', (e) => {
      if (e) {
        this.navCtrl.navigateBack('test');
      }
    })
  }

  upload() { //上传资料到服务器
    this.wangluo = this.network.type;
    if (this.wangluo == 'none') {
      this.showConfirm('流動裝置沒有連接到互聯網', (e) => { })
      return;
    }

    this.showConfirm('你確定要同步資料嗎？', (e) => {
      if (e == true) {
        this.presentLoading();

        // this.countDown(this, 180)
      }
    })
  }

  countDown(that, count) { //倒计时
    if (count == 0) {
      this.loading.dismiss();
      this.toast('資料同步失败');
      return;
    }
    setTimeout(function () {
      count--;
      that.countDown(that, count);
    }, 1000);

  }

  getAllImg() { //全部新的圖片
    var imgserver = new ImageServe();
    imgserver.getAllImageList().then(e => {
      console.log('全部新的圖片', Array.from(e.res.rows));
      this.allImgList = Array.from(e.res.rows);

      imgserver.getAllImageList2().then(k => {
        console.log('全部新的圖片2', Array.from(k.res.rows));
        var img = [];
        img = Array.from(k.res.rows)
        this.allImgList = this.allImgList.concat(img);
        console.log('全部新的圖片3', this.allImgList);
      })
    })

  }

  loading = null;
  async presentLoading() {

    this.loading = await this.loadingController.create({
      message: '同步中'
    });
    await this.loading.present();
    var phoneList = [];
    var activityList = [];
    var visiltList = [];
    var medicAppointLogList = [];
    console.log('aa')
    // console.log(this.caselist);
    // for (var i = 0; i < this.caselist.length; i++) {
    //   visiltList = visiltList.concat(this.caselist[i].visitList)
    //   activityList = activityList.concat(this.caselist[i].activityList)
    //   phoneList = phoneList.concat(this.caselist[i].phoneList)
    //   medicAppointLogList = medicAppointLogList.concat(this.caselist[i].medicAppointLogList)
    // }

    var visit = new VisitServe();
    var imgserver = new ImageServe();
    let SavedStatus = 1;
    visit.getVisit_SavedStatus(SavedStatus).then(e => {
      if (e.res.rows.length > 0) {
        console.log(e.res.rows);
        // var visiltList = [];
        visiltList = Array.from(e.res.rows);
        for (var i = 0; i < visiltList.length; i++) {
          visiltList[i].hvImgKeepListStr = '';
          visiltList[i].hvNewImgQty = 0;
          // visitList[i].Height = kv.Height;
          var visitId = visiltList[i].LocalId;
          if (visiltList[i].VisitId > 0) {
            visitId = visiltList[i].VisitId;
          }
          var hvvlList = [];
          var Volunteerlist = visiltList[i].presentVolunteer.split(',');
          console.log(Volunteerlist)

          for (var t = 0; t < Volunteerlist.length; t++) {
            console.log(Volunteerlist[t])
            for (var j = 0; j < this.Volunteer.length; j++) {
              if (Volunteerlist[t] == this.Volunteer[j].VolId.toString()) {
                hvvlList.push(this.Volunteer[j]);
              }
            }
          }

          var supportVolunteer = visiltList[i].supportVolunteer.split(',');
          console.log(supportVolunteer)
          for (var t = 0; t < supportVolunteer.length; t++) {
            console.log(supportVolunteer[i])
            for (var j = 0; j < this.Volunteer.length; j++) {
              if (supportVolunteer[t] == this.Volunteer[j].VolId.toString()) {
                hvvlList.push(this.Volunteer[j]);
              }
            }
          }

          visiltList[i].hvvlList = hvvlList;
          let visitListdd = visiltList[i]
          imgserver.getImageList_old(visitId).then(e => { //舊的圖片
            console.log('旧圖片', Array.from(e.res.rows))
            var oldList = [];
            oldList = Array.from(e.res.rows);
            var hvImgKeepListStr = '';
            for (var j = 0; j < oldList.length; j++) {
              if (hvImgKeepListStr == '') {
                hvImgKeepListStr = oldList[j].ImgId
              } else {
                hvImgKeepListStr = hvImgKeepListStr + ',' + oldList[j].ImgId
              }
            }
            visitListdd['hvImgKeepListStr'] = hvImgKeepListStr;
          })

          if (visitListdd.VisitId != 0) {
            imgserver.getImageList_web(visitId).then(e => { //新的圖片
              console.log('有新的图片', Array.from(e.res.rows))
              var ImgList = [];
              ImgList = Array.from(e.res.rows);
              visitListdd['hvNewImgQty'] = ImgList.length;
            })
          }

          if (visitListdd.VisitId == 0) {
            imgserver.getImageList_web2(visitId).then(k => { //新的圖片
              console.log('有新的图片2', Array.from(k.res.rows))
              var ImgList2 = [];
              ImgList2 = Array.from(k.res.rows);
              visitListdd['hvNewImgQty'] = ImgList2.length;
            })
          }
        }
      }
      var phone = new PhoneServe();  //电话
      phone.getPhone_SavedStatus(SavedStatus).then((e) => {
        console.log(e);
        // let phoneList = [];
        if (e.res.rows.length > 0) {
          console.log(e.res.rows);
          phoneList = Array.from(e.res.rows);
        }

        var activity = new ActivityServe();  //活动
        activity.getActivity_SavedStatus(SavedStatus).then((e) => {
          console.log(e);
          // let activityList = [];
          if (e.res.rows.length > 0) {
            console.log(e.res.rows);
            activityList = Array.from(e.res.rows);
            for (var i = 0; i < activityList.length; i++) {
              var alvList = [];
              var Volunteerlist = activityList[i].PresentVolunteer.split(',');
              for (var t = 0; t < Volunteerlist.length; t++) {
                console.log(Volunteerlist[t])
                for (var j = 0; j < this.Volunteer.length; j++) {
                  if (Volunteerlist[t] == this.Volunteer[j].VolId.toString()) {
                    alvList.push(this.Volunteer[j]);
                  }
                }
              }
              activityList[i].alvList = alvList;
            }
          }

          var medicalRecordServe = new MedicalRecordServe(); //复诊
          medicalRecordServe.getAllMedicalRecor_SavedStatus(SavedStatus).then((e) => {
            console.log(e);
            // let medicAppointLogList=[];
            if (e.res.rows.length > 0) {
              console.log(e.res.rows);
              medicAppointLogList = Array.from(e.res.rows);
            }


            imgserver.getAllImageList().then(e => {
              console.log('全部新的圖片', Array.from(e.res.rows));
              this.allImgList = Array.from(e.res.rows);

              imgserver.getAllImageList2().then(k => {
                console.log('全部新的圖片2', Array.from(k.res.rows));
                var img = [];
                img = Array.from(k.res.rows)
                this.allImgList = this.allImgList.concat(img);


                this.SaveAll(visiltList, phoneList, activityList, medicAppointLogList);
              })
            })

          });

        });

      });


    })


    console.log(visiltList);
    // this.SaveAll(visiltList, phoneList, activityList, medicAppointLogList);


    if (this.caselist.length == 0) {
      console.log('565')
      this.SysnAllWeb();
    }
  }

  SaveAll(visitList, phoneList, activityList, medicAppointLogList) {
    console.log(visitList)
    this.api.SaveAll(visitList, phoneList, activityList, medicAppointLogList, this.UserId, 'all').then((ret) => {
      console.log(ret)
      // return
      if (ret.Result == 'true') {

        var AttchList = []
        if (ret.AttachmentGroupLists != '') {
          var listtype2 = typeof ret.AttachmentGroupLists.AttchList;
          if (listtype2 == 'object' && ret.AttachmentGroupLists.AttchList.length == undefined) {
            AttchList.push(ret.AttachmentGroupLists.AttchList);
          } else {
            AttchList = ret.AttachmentGroupLists.AttchList;
          }
          var AttachmentIdList = AttchList[0].AttachmentIDsStr.split(",");
          for (let i = 0; i < this.allImgList.length; i++) {

            this.saveImage_AttachmentId(parseInt(AttachmentIdList[i]), this.allImgList[i]);
          }

          var w = 0;
          for (var j = 0; j < this.allImgList.length; j++) {
            console.log('上傳圖片、開始了');

            var Base64ImgString = this.allImgList[j].Base64ImgString.split(",");
            console.log(Base64ImgString)

            this.api.UploadImgPart('HomeVisit', this.allImgList[j].VisitId, Base64ImgString[1], ret.WorkingSetID, AttachmentIdList[j], this.allImgList[j].ImgName).then(k => {
              console.log('UploadImgPart', k)
              if (k.Result == 'true') {
                w++;
                if (w == this.allImgList.length) {
                  this.api.ExecuteWorkingSet(ret.WorkingSetID, 0, this.UserId).then(e => {
                    console.log(e)
                    if (e == undefined) {
                      this.loading.dismiss();
                      this.toast('資料同步失败');
                    }
                    if (e.Result == 'true') {
                      var objWorkingSetAttachmentMap = []
                      var listtype3 = typeof e.AttachmentsResult.objWorkingSetAttachmentMap;
                      if (listtype3 == 'object' && e.AttachmentsResult.objWorkingSetAttachmentMap.length == undefined) {
                        objWorkingSetAttachmentMap.push(e.AttachmentsResult.objWorkingSetAttachmentMap);
                      } else {
                        objWorkingSetAttachmentMap = e.AttachmentsResult.objWorkingSetAttachmentMap;
                      }

                      for (var i = 0; i < objWorkingSetAttachmentMap.length; i++) {
                        this.saveImage_ImgId(objWorkingSetAttachmentMap[i].RecordID, objWorkingSetAttachmentMap[i].AttachmentId);
                      }
                      this.SysnAllWeb();
                      this.toast('資料同步成功');
                    } else {
                      this.loading.dismiss();
                      this.toast('資料同步失败');
                    }

                  })
                }
              }
            })
          }

        } else {
          this.api.ExecuteWorkingSet(ret.WorkingSetID, 0, this.UserId).then(e => {
            console.log(e)
            if (e == undefined) {
              this.loading.dismiss();
              this.toast('資料同步失败');
            }
            if (e.Result == 'true') {
              this.SysnAllWeb();
              this.toast('資料同步成功');
            } else {
              this.loading.dismiss();
              this.toast('資料同步失败');
            }
          })
        }
      }
      console.log(ret)
    })
  }



  phone(caseID, LocalId) {
    console.log(caseID, LocalId)
    this.navigate("phone", { caseID: caseID, PhoneID: LocalId, UserId: this.UserId });
  }

  modifyphone(caseID, LocalId) {
    this.navigate("modifyphone", { caseID: caseID, PhoneID: LocalId, UserId: this.UserId });
  }


  activity(caseID, LocalId) {
    console.log(caseID, LocalId);
    this.navigate('activity', { caseID: caseID, LocalId: LocalId, UserId: this.UserId });
  }

  modifyactivity(caseID, LocalId) {
    console.log(caseID, LocalId);
    this.navigate('modifyactivity', { caseID: caseID, LocalId: LocalId, UserId: this.UserId });
  }

  visit(caseID, LocalId) {
    console.log(caseID, LocalId)
    this.navigate('visit', { caseID: caseID, LocalId: LocalId, UserId: this.UserId });
  }

  modifyvisit(caseID, LocalId) {
    console.log(caseID, LocalId)
    this.navigate('modifyvisit', { caseID: caseID, LocalId: LocalId, UserId: this.UserId });
  }

  getActivityList() {
    var visit = new VisitServe();

    var activity = new ActivityServe();
    activity.getAllActivityList().then((e) => {
      console.log(e)
    })
  }

  getCase() {
    var cases = new CaseServe();
    var UserId = this.UserId
    cases.getCaseVolVisitGrpId(UserId).then((e) => {
      console.log(e);
      console.log(this.caselist);
      var arr = null;
      arr = Array.from(e.res.rows);
      for (var i = 0; i < arr.length; i++) {
        arr[i].activityList = [];
        arr[i].visitList = [];
        arr[i].phoneList = [];
        arr[i].medicAppointLogList = [];
      }
      this.caselist = arr;
      for (var i = 0; i < this.caselist.length; i++) {
        this.setVisit(this.caselist[i]);
        this.setPhnoe(this.caselist[i]);
        this.setActivity(this.caselist[i]);
        this.getAllMedicalRecordList(this.caselist[i]);
      }
      console.log(this.caselist)

      this.loading.dismiss();
    })
  }


  setVisit(kv) {
    var visit = new VisitServe();
    var imgserver = new ImageServe();
    visit.getVisitCaseId(kv.CaseId).then((e) => {
      console.log(e);
      if (e.res.rows.length > 0) {
        console.log(e.res.rows);
        kv.visitList = Array.from(e.res.rows);

        for (var i = 0; i < kv.visitList.length; i++) {
          kv.visitList[i].hvImgKeepListStr = '';
          kv.visitList[i].hvNewImgQty = 0;
          kv.visitList[i].Height = kv.Height;
          var visitId = kv.visitList[i].LocalId;
          if (kv.visitList[i].VisitId > 0) {
            visitId = kv.visitList[i].VisitId;
          }

          var hvvlList = [];
          var Volunteerlist = kv.visitList[i].presentVolunteer.split(',');
          console.log(Volunteerlist)

          for (var t = 0; t < Volunteerlist.length; t++) {
            console.log(Volunteerlist[t])
            for (var j = 0; j < this.Volunteer.length; j++) {
              if (Volunteerlist[t] == this.Volunteer[j].VolId.toString()) {
                hvvlList.push(this.Volunteer[j]);
              }
            }
          }

          var supportVolunteer = kv.visitList[i].supportVolunteer.split(',');
          console.log(supportVolunteer)
          for (var t = 0; t < supportVolunteer.length; t++) {
            console.log(supportVolunteer[i])
            for (var j = 0; j < this.Volunteer.length; j++) {
              if (supportVolunteer[t] == this.Volunteer[j].VolId.toString()) {
                hvvlList.push(this.Volunteer[j]);
              }
            }
          }

          kv.visitList[i].hvvlList = hvvlList;

          let visitListdd = kv.visitList[i]

          // imgserver.getImageList_old(visitId).then(e => { //舊的圖片
          //   console.log('旧圖片', Array.from(e.res.rows))
          //   var oldList = [];
          //   oldList = Array.from(e.res.rows);
          //   var hvImgKeepListStr = '';
          //   for (var j = 0; j < oldList.length; j++) {
          //     if (hvImgKeepListStr == '') {
          //       hvImgKeepListStr = oldList[j].ImgId
          //     } else {
          //       hvImgKeepListStr = hvImgKeepListStr + ',' + oldList[j].ImgId
          //     }
          //   }
          //   visitListdd['hvImgKeepListStr'] = hvImgKeepListStr;
          // })

          // imgserver.getImageList_web(visitId).then(e => { //新的圖片
          //   console.log('有新的图片', Array.from(e.res.rows))
          //   var ImgList = [];
          //   ImgList = Array.from(e.res.rows);
          //   visitListdd['hvNewImgQty'] = ImgList.length;


          // })

          // if (visitListdd.VisitId == 0) {
          //   imgserver.getImageList_web2(visitId).then(k => { //新的圖片
          //     console.log('有新的图片2', Array.from(k.res.rows))
          //     var ImgList2 = [];
          //     ImgList2 = Array.from(k.res.rows);
          //     visitListdd['hvNewImgQty'] = ImgList2.length;
          //   })
          // }
        }
      }
    });
  }



  setPhnoe(kv) {
    var phone = new PhoneServe();
    phone.getPhoneCaseId(kv.CaseId).then((e) => {
      console.log(e);
      if (e.res.rows.length > 0) {
        console.log(e.res.rows);
        kv.phoneList = Array.from(e.res.rows);
      }
    });
  }

  setActivity(kv) {
    var activity = new ActivityServe();
    activity.getAllActivityListCaseId(kv.CaseId).then((e) => {
      console.log(e);
      if (e.res.rows.length > 0) {
        console.log(e.res.rows);
        kv.activityList = Array.from(e.res.rows);
        for (var i = 0; i < kv.activityList.length; i++) {
          var alvList = [];
          var Volunteerlist = kv.activityList[i].PresentVolunteer.split(',');
          for (var t = 0; t < Volunteerlist.length; t++) {
            console.log(Volunteerlist[t])
            for (var j = 0; j < this.Volunteer.length; j++) {
              if (Volunteerlist[t] == this.Volunteer[j].VolId.toString()) {
                alvList.push(this.Volunteer[j]);
              }
            }
          }
          kv.activityList[i].alvList = alvList;
        }

      }
    });
  }

  getAllMedicalRecordList(kv) {
    var medicalRecordServe = new MedicalRecordServe();
    medicalRecordServe.getAllMedicalRecordList(kv.CaseId).then((e) => {
      console.log(e);
      if (e.res.rows.length > 0) {
        console.log(e.res.rows);
        kv.medicAppointLogList = Array.from(e.res.rows);
      }
    });
  }

  Caselist = [];
  visiltList = [];
  Phonelist = [];
  Activitylists = [];
  Volunteer = [];
  Specialty = [];
  Hosp = [];
  saList = [];
  BloodPressure = []; //血压
  Weight = []; //重量
  WHR = []; //腰臀比
  HeartRate = []; //心跳
  maList = [];//復診

  SysnAllWeb() {
    var VolId = this.UserId
    this.api.SysnAllResultRecord(VolId).then((ret) => {
      console.log(ret)
      if (ret.Result == "false") {
        this.Volunteer = ret.vList.VolunteerApp
        this.Specialty = ret.msList.objMSpecialtyApp
        this.Hosp = ret.mhList.objMHospApp
        this.saList = ret.saList.objSysnAllApp
        var saListtype = typeof this.saList;
        console.log(typeof this.saList)
        console.log(this.saList.length)
        if (saListtype == 'object' && this.saList.length == undefined) {
          var a = [];
          a.push(this.saList);
          this.saList = a;
        }

        this.updateData(); //同步数据到本地数据库

        // this.loading.dismiss();
      } else {
        // alert("失败:" + ret.strMsg);
        this.toast('未能連線，無法登入');
      }
    });
  }

  updateData() {
    var volunteer = new VolunteerServr();
    volunteer.deleteVolunteer();
    var specialtyServe = new SpecialtyServe();
    specialtyServe.deleteSpecialty()
    var hosiptalServe = new HosiptalServe();
    hosiptalServe.deleteHosiptal()
    var cases = new CaseServe();
    cases.deleteCase()
    var visit = new VisitServe();
    visit.deleteVisit()
    var phone = new PhoneServe();
    phone.deletePhone()
    var activity = new ActivityServe();
    activity.deleteActivity()

    var HeartRate = new HeartRateServe();
    HeartRate.deleteHeartRate()

    var weight = new WeightServe();
    weight.deleteWeight()

    var whr = new WHRServe();
    whr.deleteWHR()

    var bloodPressureServe = new BloodPressureServe();
    bloodPressureServe.deleteBloodPressure();

    var medicalRecordServe = new MedicalRecordServe();
    medicalRecordServe.deleteMedicalRecord();

    var imgserver = new ImageServe();
    imgserver.deleteImage2();


    for (var i = 0; i < this.Specialty.length; i++) {
      this.setSpecialty(this.Specialty[i]);
    }
    for (var i = 0; i < this.Hosp.length; i++) {
      this.setHosp(this.Hosp[i]);
    }

    if (this.saList[0].Support_VolunteerList) {
      var Support_VolunteerList = [];
      var listtype = typeof this.saList[0].Support_VolunteerList.SupportGroupApp;
      if (listtype == 'object' && this.saList[0].Support_VolunteerList.SupportGroupApp.length == undefined) {
        Support_VolunteerList.push(this.saList[0].Support_VolunteerList.SupportGroupApp);
      } else {
        Support_VolunteerList = this.saList[0].Support_VolunteerList.SupportGroupApp;
      }
      for (var j = 0; j < Support_VolunteerList.length; j++) {
        this.setVolunteer_s(Support_VolunteerList[j]);
        console.log('志願者1')
      }
    }

    if (this.saList[0].VisitGroup_VolunteerList) {
      var VisitGroup_VolunteerList = [];
      var listtype = typeof this.saList[0].VisitGroup_VolunteerList.VolunteerGroupApp;
      if (listtype == 'object' && this.saList[0].VisitGroup_VolunteerList.VolunteerGroupApp.length == undefined) {
        VisitGroup_VolunteerList.push(this.saList[0].VisitGroup_VolunteerList.VolunteerGroupApp);
      } else {
        VisitGroup_VolunteerList = this.saList[0].VisitGroup_VolunteerList.VolunteerGroupApp;
      }
      for (var j = 0; j < VisitGroup_VolunteerList.length; j++) {
        this.setVolunteer_v(VisitGroup_VolunteerList[j]);
        console.log('志願者2')
      }
    }

    for (var i = 0; i < this.saList.length; i++) {

      // if (this.saList[0].Support_VolunteerList) {
      //   var Support_VolunteerList = [];
      //   var listtype = typeof this.saList[i].Support_VolunteerList.SupportGroupApp;
      //   if (listtype == 'object' && this.saList[i].Support_VolunteerList.SupportGroupApp.length == undefined) {
      //     Support_VolunteerList.push(this.saList[i].Support_VolunteerList.SupportGroupApp);
      //   } else {
      //     Support_VolunteerList = this.saList[i].Support_VolunteerList.SupportGroupApp;
      //   }
      //   for (var j = 0; j < Support_VolunteerList.length; j++) {
      //     this.setVolunteer_s(Support_VolunteerList[j]);
      //     console.log('志願者1')
      //   }
      // }

      // console.log(this.saList[i])
      // if (this.saList[0].VisitGroup_VolunteerList) {
      //   var VisitGroup_VolunteerList = [];
      //   var listtype = typeof this.saList[i].VisitGroup_VolunteerList.VolunteerGroupApp;
      //   if (listtype == 'object' && this.saList[i].VisitGroup_VolunteerList.VolunteerGroupApp.length == undefined) {
      //     VisitGroup_VolunteerList.push(this.saList[i].VisitGroup_VolunteerList.VolunteerGroupApp);
      //   } else {
      //     VisitGroup_VolunteerList = this.saList[i].VisitGroup_VolunteerList.VolunteerGroupApp;
      //   }
      //   for (var j = 0; j < VisitGroup_VolunteerList.length; j++) {
      //     this.setVolunteer_v(VisitGroup_VolunteerList[j]);
      //     console.log('志願者2')
      //   }
      // }

      //案例
      this.setCase(this.saList[i].caseObj);

      //电话
      var Phonelisttype = typeof this.saList[i].psaList.objPhoneSupportApp;
      if (Phonelisttype == 'object' && this.saList[i].psaList.objPhoneSupportApp.length == undefined) {
        var data = [];
        data.push(this.saList[i].psaList.objPhoneSupportApp)
        this.Phonelist = data;
      } else {
        this.Phonelist = this.saList[i].psaList.objPhoneSupportApp;
      }
      console.log(this.Phonelist)
      if (this.saList[i].psaList.objPhoneSupportApp) {
        for (var j = 0; j < this.Phonelist.length; j++) {
          this.setPhone(this.Phonelist[j])
          console.log(this.Phonelist[j])
        }
      }

      //探访
      var visiltListtype = typeof this.saList[i].hvList.objHomeVisitApp;
      if (visiltListtype == 'object' && this.saList[i].hvList.objHomeVisitApp.length == undefined) {
        var data = [];
        data.push(this.saList[i].hvList.objHomeVisitApp);
        this.visiltList = data;
      } else {
        this.visiltList = this.saList[i].hvList.objHomeVisitApp;
      }
      if (this.saList[i].hvList.objHomeVisitApp) {
        for (var j = 0; j < this.visiltList.length; j++) {
          this.setVisitWeb(this.visiltList[j], this.saList[i].caseObj.Height)
        }
      }

      //活动
      var Activitylisttype = typeof this.saList[i].aList.objActivityApp;
      if (Activitylisttype == 'object' && this.saList[i].aList.objActivityApp.length == undefined) {
        var data = [];
        data.push(this.saList[i].aList.objActivityApp);
        this.Activitylists = data;
      } else {
        this.Activitylists = this.saList[i].aList.objActivityApp;
      }
      console.log(this.Activitylists)
      if (this.Activitylists) {
        console.log('555555hhhhh ')
        for (var j = 0; j < this.Activitylists.length; j++) {
          console.log('hhhhh ')
          if (this.Activitylists[j]) {
            this.setActivityWeb(this.Activitylists[j])
          }

          console.log(this.Activitylists[j])
        }
      }

      //血压
      var blood = this.saList[i].BloodPressureMonthlyList.objChartBP
      var BloodPressuretype = typeof this.saList[i].BloodPressureMonthlyList.objChartBP;
      if (this.saList[i].BloodPressureMonthlyList) {
        console.log('血压rr' + BloodPressuretype)
        console.log('血压rd' + this.saList[i].BloodPressureMonthlyList.objChartBP.length)
        if (BloodPressuretype == 'object' && this.saList[i].BloodPressureMonthlyList.objChartBP.length == undefined) {
          var data = [];
          data.push(this.saList[i].BloodPressureMonthlyList.objChartBP);
          this.BloodPressure = data;
          console.log('血压rr')
        } else {
          this.BloodPressure = this.saList[i].BloodPressureMonthlyList.objChartBP;
          console.log('血压ff')
        }
        console.log(this.BloodPressure)
        // return
        if (this.BloodPressure) {
          for (var j = 0; j < this.BloodPressure.length; j++) {
            console.log('血壓ss')
            this.setBloodPressureWeb(this.BloodPressure[j])
          }
        }
      }
      //体重
      var Weighttype = typeof this.saList[i].WeightMonthlyList.objChartWeight;
      if (Weighttype == 'object' && this.saList[i].WeightMonthlyList.objChartWeight.length == undefined) {
        var data = [];
        data.push(this.saList[i].WeightMonthlyList.objChartWeight);
        this.Weight = data;
      } else {
        this.Weight = this.saList[i].WeightMonthlyList.objChartWeight;
      }
      if (this.Weight) {
        for (var j = 0; j < this.Weight.length; j++) {
          this.setWeightWeb(this.Weight[j])
        }
      }

      //心跳
      var HeartRatetype = typeof this.saList[i].HeartRateMonthlyList.objChartHR;
      if (HeartRatetype == 'object' && this.saList[i].HeartRateMonthlyList.objChartHR.length == undefined) {
        var data = [];
        data.push(this.saList[i].HeartRateMonthlyList.objChartHR);
        this.HeartRate = data;
      } else {
        this.HeartRate = this.saList[i].HeartRateMonthlyList.objChartHR;
      }
      if (this.HeartRate) {
        for (var j = 0; j < this.HeartRate.length; j++) {
          this.setHeartRateWeb(this.HeartRate[j])
        }
      }

      //腰臀比
      var WHRtype = typeof this.saList[i].WaistHipMonthlyList.objChartWHR;
      if (WHRtype == 'object' && this.saList[i].WaistHipMonthlyList.objChartWHR.length == undefined) {
        var data = [];
        data.push(this.saList[i].WaistHipMonthlyList.objChartWHR);
        this.WHR = data;
      } else {
        this.WHR = this.saList[i].WaistHipMonthlyList.objChartWHR;
      }
      if (this.WHR) {
        for (var j = 0; j < this.WHR.length; j++) {
          this.setWHRWeb(this.WHR[j])
        }
      }

      console.log(this.BloodPressure)



      //復診
      var maListtype = typeof this.saList[i].maList.objMedicalAppointmentApp;
      if (maListtype == 'object' && this.saList[i].maList.objMedicalAppointmentApp.length == undefined) {
        var data = [];
        data.push(this.saList[i].maList.objMedicalAppointmentApp);
        this.maList = data;
      } else {
        this.maList = this.saList[i].maList.objMedicalAppointmentApp;
      }
      if (this.maList) {
        for (var j = 0; j < this.maList.length; j++) {
          console.log('復診 ss')
          this.setMedicalRecordWeb(this.maList[j])
        }
      }

    }


    this.getCase();

    // this.loading.dismiss();
  }

  setVolunteer_s(kv) {
    var volunteer = new VolunteerServr();
    volunteer.addVolunteer(kv.VolId, kv.VolGrpId, kv.UserName, 2).then((e) => {
      console.log(e);
    });
  }

  setVolunteer_v(kv) {
    var volunteer = new VolunteerServr();
    volunteer.addVolunteer(kv.VolId, kv.VolGrpId, kv.UserName, 1).then((e) => {
      console.log(e);
    });
  }
  setSpecialty(kv) {
    var specialtyServe = new SpecialtyServe();
    specialtyServe.addSpecialty(kv.Id, kv.Name).then((e) => {
      console.log(e);
    });
  }
  setHosp(kv) {
    var hosiptalServe = new HosiptalServe();
    hosiptalServe.addHosiptal(kv.Id, kv.Name).then((e) => {
      console.log(e);
    });
  }
  setCase(kv) {
    var caseServe = new CaseServe();
    caseServe.addCase(kv.CaseId, kv.CaseNo, kv.QRCode, kv.ChiName_Disply, kv.Illness_Disply, kv.OtherIllness_Disply, kv.CarePlan_Disply, kv.Height, this.UserId).then((e) => {
      console.log(e);
    });
  }

  setPhone(kv) {
    console.log(kv)
    var CallDate_Display = AppUtil.FormatDate2(new Date(kv.CallDate));
    var phone = new PhoneServe();
    if (kv) {
      phone.addPhoneWeb(kv.CallDate, kv.CallEndTime, kv.CallStartTime, kv.CaseId, kv.Detail, kv.DetailOther, kv.OtherRemark, kv.Status, kv.SupportId, kv.UserName, kv.CannotContact, kv.NextPhoneDate, kv.NextPhoneTime, CallDate_Display).then((e) => {
        console.log(e);
      });
    }
  }

  setVisitWeb(kv, Height) {
    console.log(kv)
    // var ScheduleDate = AppUtil.FormatDate2(new Date(kv.ScheduleDate));
    var ScheduleDate_Display = kv.ScheduleDate_Disply;
    console.log('志願者0')


    if (kv.HomeVisitVolList) {
      var HomeVisitVolList = [];
      var listtype = typeof kv.HomeVisitVolList.objHomeVisitVolAPP;
      if (listtype == 'object' && kv.HomeVisitVolList.objHomeVisitVolAPP.length == undefined) {
        HomeVisitVolList.push(kv.HomeVisitVolList.objHomeVisitVolAPP);
      } else {
        HomeVisitVolList = kv.HomeVisitVolList.objHomeVisitVolAPP;
      }
      var presentVolunteer = ''
      var supportVolunteer = ''
      for (var i = 0; i < HomeVisitVolList.length; i++) {
        if (HomeVisitVolList[i].VolType == '1') {
          if (presentVolunteer == '') {
            presentVolunteer = HomeVisitVolList[i].VolId
          } else {
            presentVolunteer = presentVolunteer + ',' + HomeVisitVolList[i].VolId
          }
        }

        if (HomeVisitVolList[i].VolType == '2') {
          if (supportVolunteer == '') {
            supportVolunteer = HomeVisitVolList[i].VolId
          } else {
            supportVolunteer = supportVolunteer + ',' + HomeVisitVolList[i].VolId
          }
        }
      }
    } else {
      var presentVolunteer = ''
      var supportVolunteer = ''
    }

    if (kv.BloodPressureList) {
      var bloodPressureList = [];
      var listtype = typeof kv.BloodPressureList.objBloodPressureAPP;
      if (listtype == 'object' && kv.BloodPressureList.objBloodPressureAPP.length == undefined) {
        bloodPressureList.push(kv.BloodPressureList.objBloodPressureAPP);
      } else {
        bloodPressureList = kv.BloodPressureList.objBloodPressureAPP;
      }

      kv.SYS1 = bloodPressureList[0].Upper
      kv.DlA1 = bloodPressureList[0].Lower
      if (bloodPressureList.length == 2) {
        kv.SYS2 = bloodPressureList[1].Upper
        kv.DlA2 = bloodPressureList[1].Lower
      } else {
        kv.SYS2 = 0;
        kv.DlA2 = 0;
      }

    } else {
      kv.SYS1 = 0;
      kv.DlA1 = 0;
      kv.SYS2 = 0;
      kv.DlA2 = 0;
    }

    if (kv.HeartRateList) {
      var heartRateList = [];
      var listtype = typeof kv.HeartRateList.objHeartRateApp;
      if (listtype == 'object' && kv.HeartRateList.objHeartRateApp.length == undefined) {
        heartRateList.push(kv.HeartRateList.objHeartRateApp);
      } else {
        heartRateList = kv.HeartRateList.objHeartRateApp;
      }

      kv.heartBeats1 = heartRateList[0].RatePerMin
      if (heartRateList.length == 2) {
        kv.heartBeats2 = heartRateList[1].RatePerMin
      } else {
        kv.heartBeats2 = 0;
      }

    } else {
      kv.heartBeats1 = 0;
      kv.heartBeats2 = 0;
    }

    var visit = new VisitServe();
    visit.addVisitWeb(kv.Bmi, kv.CaseId, kv.CategoryTopic1, kv.CategoryTopic2,
      kv.CategoryTopic3, kv.EmotionAssessment, kv.EmotionAssessmentRemarks,
      kv.Hip, kv.LifeStyleMeasureBloodPressure, kv.LifeStyleMeasureBloodSuger,
      kv.LifeStyleMeasureBpLocation, kv.LifeStyleMeasureBpNoOfTime, kv.LifeStyleMeasureBpPeriod,
      kv.LifeStyleMeasureBsLocation, kv.LifeStyleMeasureBsNoOfTime, kv.LifeStyleMeasureBsPeriod,
      kv.LifeStyleQuestion1, kv.LifeStyleQuestion2, kv.LifeStyleQuestion3, kv.LifeStyleQuestion4,
      kv.LifeStyleQuestion5, kv.LifeStyleQuestion6, kv.Location, kv.LocationRemarks, kv.OtherAccident,
      kv.OtherAccidentNoOfDay, kv.OtherHospDisbete, kv.OtherHospDisbeteNoOfDay, kv.OtherHospHighBp,
      kv.OtherHospHighBpNoOfDay, kv.OtherHospOtherIllness, kv.OtherHospOtherIllnessNoOfDay,
      kv.OtherRemarks, kv.OtherSpecialNeed, kv.OtherSpecialNeedService, kv.ScheduleDate, kv.ScheduleTime,
      kv.Status, kv.TaskId, kv.VisitDate_Disply, kv.VisitDetailIndoor, kv.VisitDetailIndoorRemarks,
      kv.VisitDetailOther, kv.VisitDetailOutdoor, kv.VisitDetailOutdoorRemarks, kv.VisitEndTime,
      kv.VisitId, kv.VisitStartTime, kv.VisitStatus, kv.VisitStatusRemarks, kv.WHRatio, kv.Waist,
      kv.Weight, presentVolunteer, supportVolunteer, ScheduleDate_Display, kv.DlA1, kv.DlA2, kv.SYS1, kv.SYS2, kv.heartBeats1, kv.heartBeats2, kv.NeedsContent, Height).then((e) => {
        console.log(e);
      });

    var objHomeVisitUploadImgAppInfoList = kv.UploadImgInfoList.objHomeVisitUploadImgAppInfo;

    var imgserve = new ImageServe();
    if (objHomeVisitUploadImgAppInfoList != undefined) {
      if (Array.isArray(objHomeVisitUploadImgAppInfoList)) {
        for (let item of objHomeVisitUploadImgAppInfoList) {
          imgserve.addImage(item.ImgId, item.VisitId, item.ImgPath, this.transfer, this.file, this.base64);
          console.log('img22')
        }
      } else {
        imgserve.addImage(objHomeVisitUploadImgAppInfoList.ImgId,
          objHomeVisitUploadImgAppInfoList.VisitId,
          objHomeVisitUploadImgAppInfoList.ImgPath, this.transfer, this.file, this.base64);
        console.log('img233')
      }
    }
  }

  setActivityWeb(kv) {
    console.log(kv)
    var ActDate_Display = AppUtil.FormatDate2(new Date(kv.ActDate));
    if (kv.ActivityVolList) {
      var ActivityVolList = [];
      var listtype = typeof kv.ActivityVolList.objActivityVolApp;
      if (listtype == 'object' && kv.ActivityVolList.objActivityVolApp.length == undefined) {
        ActivityVolList.push(kv.ActivityVolList.objActivityVolApp);
      } else {
        ActivityVolList = kv.ActivityVolList.objActivityVolApp;
      }
      var presentVolunteer = ''
      for (var i = 0; i < ActivityVolList.length; i++) {
        if (presentVolunteer == '') {
          presentVolunteer = ActivityVolList[i].VolId
        } else {
          presentVolunteer = presentVolunteer + ',' + ActivityVolList[i].VolId
        }

      }
    }
    var activity = new ActivityServe();
    activity.addActivityWeb(kv.ActivityId, kv.CaseId, kv.ActDate, kv.ActStartTime, kv.ActEndTime, presentVolunteer, kv.ActType, kv.ActDetailType, kv.Remarks1, kv.Remarks2, kv.Remarks3, kv.Remarks4, kv.OtherActRemarks, kv.Remarks, ActDate_Display, kv.Status).then((e) => {

    })
  }

  setBloodPressureWeb(kv) {
    var bloodPressureServe = new BloodPressureServe();
    bloodPressureServe.addBloodPressureWeb(kv.CaseId, kv.Upper, kv.Lower, kv.date_swift_chart_display).then((e) => {
      console.log(e)

      console.log('血壓end')
    })
  }

  setWeightWeb(kv) {
    var weight = new WeightServe();
    weight.addWeight(kv.CaseId, kv.Weight, kv.date_swift_chart_display).then((e) => {
      console.log(e)
    })
  }

  setWHRWeb(kv) {
    var WHR = new WHRServe();
    WHR.addWHR(kv.CaseId, kv.Ratio, kv.date_swift_chart_display).then((e) => {
      console.log(e)
    })
  }

  setHeartRateWeb(kv) {
    var HeartRate = new HeartRateServe();
    HeartRate.addHeartRate(kv.CaseId, kv.HeartRate, kv.date_swift_chart_display).then((e) => {
      console.log(e)
    })
  }

  setMedicalRecordWeb(kv) {
    var medicalRecordServe = new MedicalRecordServe();
    console.log('復診 end')
    medicalRecordServe.addMedicalRecordWeb(kv.AppointmentId, kv.AppointmentDate, kv.AppointmentTime, kv.Description, kv.Reason, kv.Hosp, kv.Specialty, kv.CaseId).then(ret => {
      console.log(ret)
    })
  }

  saveImage_AttachmentId(AttachmentId, kv) {
    var imgserve = new ImageServe();
    imgserve.saveImage_AttachmentId(AttachmentId, kv.LocalId).then(e => {
      console.log(e)
    })
  }

  saveImage_ImgId(ImgId, AttachmentId) {
    var imgserve = new ImageServe();
    imgserve.saveImage_ImgId(ImgId, AttachmentId).then(e => {
      console.log(e)
    })
  }


}
