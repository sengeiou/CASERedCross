import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage  extends AppBase {

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

  myname="";

  onMyLoad(){
    //参数
    this.params;
    this.myname=this.params.name;
  }
  onMyShow(){

  }
  login(){
    this.navigate('home')
  }
  aa(){
    this.presentAlertCheckbox();
  }
  checkbox1='';

  async presentAlertCheckbox() {
    const alert = await this.alertCtrl.create({
      header: '忘記密碼',
      message: '請輸入義工編號',
      inputs: [
        {
          name: 'checkbox1',
          type: 'text',
          label: 'Checkbox 1',
          value: '',
          placeholder: '義工編號'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '確定',
          handler: (e) => {
            console.log(e);
            console.log(e.checkbox1)
          }
        }
      ]
    });

    await alert.present();
  }
}
