import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import ECharts from 'echarts/dist/echarts.js';
import { Network } from '@ionic-native/network/ngx';
import { DNS } from '@ionic-native/dns/ngx';
import { Injectable } from '@angular/core';
import { Http, XHRBackend } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { ApiConfig } from '../../app/api.config';
import { X2JS } from 'src/mgr/X2JS';

@Injectable()

@Component({
  selector: 'app-wangluo',
  templateUrl: './wangluo.page.html',
  styleUrls: ['./wangluo.page.scss'],
})
export class WangluoPage extends AppBase {
  @ViewChild('chart') chart: ElementRef;

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    private network: Network,
    private dns: DNS,
    public sanitizer: DomSanitizer) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {
    // watch network for a disconnection
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

    // stop disconnect watch
    disconnectSubscription.unsubscribe();


    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

    // stop connect watch
    connectSubscription.unsubscribe();


    console.log(connectSubscription);

  }

  check() {
    // console.log(location.hostname);
    
    // this.dns.resolve(location.hostname).then(
    //     address => console.log('Resolved ' + location.hostname + ' to ' + address),
    //     error => console.log('Failed to resolve ' + location.hostname + ': ' + error)
    //   );
      
    console.log(this.network.Connection);
  }

}
