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
  providers: [QRScanner]
})
export class QrcodescanPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private qrScanner: QRScanner,
    public elementRef: ElementRef
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  onMyLoad() {
    //参数
    this.params;
    // this.startscan();
  }
  onMyShow() {
    this.startscan();
  }

  //二维码的内容
  scanresult = "";

  startscan() {
    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
      console.log('Scanned something', text);

      this.qrScanner.hide().then((status: QRScannerStatus) => {
        console.log(status);
      });; // hide camera preview
      scanSub.unsubscribe(); // stop scanning

      var obj = this.elementRef.nativeElement.querySelector('#ctv');
      obj.className = "";
      AppBase.LastQrcode=text;
      // alert(AppBase.LastQrcode);
      this.back();
      if(AppBase.LastQrcode!=''){
        // this.showAlert('掃描成功').then(e=>{
        //   this.back();
        // })
        
      }else{
        // this.showAlert('你掃描的二維碼和你的探訪對象並不符合').then(e=>{
        //   this.back();
        // })
      }
      

    });
    var obj = this.elementRef.nativeElement.querySelector('#ctv');
    console.log(obj);
    obj.className = "tranp";
    this.qrScanner.show().then((status: QRScannerStatus) => {
      console.log(status);
    });
  }
}
