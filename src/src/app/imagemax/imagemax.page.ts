import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';

import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-imagemax',
  templateUrl: './imagemax.page.html',
  styleUrls: ['./imagemax.page.scss'],
  
})
export class ImagemaxPage   {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
   ) {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      console.log(123132132);
      this.url = params.url;
  });
   
  }
  back(){

    this.modalCtrl.dismiss({});
  }
   url="";
  
  ionViewDidEnter(){
   
  }
}
