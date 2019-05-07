import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends AppBase {

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
  n = 1500;
  list = [{}, {}]
  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {

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

}
