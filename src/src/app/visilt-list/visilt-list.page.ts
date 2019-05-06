import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';

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
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  list = [{}, {}]
  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){

  }
  id='';
  record(){
    this.navigate('visit-record',{id:this.id});
  }
}