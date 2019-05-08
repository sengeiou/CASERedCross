import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivityServe } from 'src/mgrServe/ActivityServe';
import { ServiceApi } from 'src/providers/service.api';
import { CaseServe } from 'src/mgrServe/CaseServe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ServiceApi]
})
export class HomePage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public api: ServiceApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  n = 1500;
  list = [{}, {}]
  onMyLoad() {
    //参数
    this.params;
    // this.getActivityList()
  }
  onMyShow() {
  
    this.getActivityList()
    this.getCase()
  }

  logout(){ //退出登录
    this.showConfirm('你確定要登出嗎？',(e)=>{
      if(e){
        this.navigate('test')
      }
    })
  }

  upload(){ //上传资料到服务器
    this.showConfirm('你確定要同步資料嗎？',(e)=>{
      if(e){
        
      }
    })
  }

  name = "";
  aa() {
    this.navigate("phone", { name: this.name });
  }
  id = '';
  activity() {
    this.navigate('activity', { id: this.id });
  }

  visit(){
    this.navigate('visit', { id: this.id });
  }

  // addActivity(){
  //   var activity=new ActivityServe();
  //   activity.addActivity().then((e)=>{
  //     console.log(e)
  //   });
  // }

  getActivityList(){
    var activity=new ActivityServe();
    activity.getAllActivityList().then((e)=>{
      console.log(e)
    });
    // activity.addcase().then((e)=>{
    //   console.log(e)
    // });  
  }
  getCase(){
    var cases=new CaseServe();
    cases.getAllCaseList().then((e)=>{
      console.log(e)
    })
  }



}
