import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';

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
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  location=''; //面见地点
  otherLocation='';//其他地点输入
  visitState='';//探访状况
  failVisit='';//未能探访输入
  indoorActivities='';//室内活动
  otherIndoorActivities='';//其他室内活动输入
  outdoorActivities='';//室外活动
  otherOutdoorActivities='';//其他室外活动输入
  otherServe='';//其他服务
  targetTitle1='';//目标标题
  targetTitle2='';//目标标题
  targetTitle3='';//目标标题
  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){

  }
  
  id='';
  visitList(){
    this.navigate('visilt-list', { id: this.id });
  }

  uploadimg(){
    this.navigate('uploadimg', { id: this.id });
  }

  scan(){
    
  }

  aa(){
    this.navigate('chartdemo', { id: this.id });
  }
}