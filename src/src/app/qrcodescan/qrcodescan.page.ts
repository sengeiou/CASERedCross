import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import ECharts from 'echarts/dist/echarts.js';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-qrcodescan',
  templateUrl: './qrcodescan.page.html',
  styleUrls: ['./qrcodescan.page.scss'],
  providers:[QRScanner]
})
export class QrcodescanPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private qrScanner: QRScanner) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){

  }

  //二维码的内容
  scanresult="";

  startscan(){


    this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted

       alert("authorized");

       // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
        alert("finish scan");
         console.log('Scanned something', text);
         this.scanresult=text;

         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       },(err)=>{
         console.log(err);
         alert("subscribe error");
       },()=>{

        alert("subscribe complete");
       });


     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
       alert("denied");
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
       alert("提示用户手动打开允许二维码扫描");
     }
  })
  .catch((e: any) => console.log('Error is', e));
  }
}
