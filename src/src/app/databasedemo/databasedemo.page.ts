import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { DBMgr } from 'src/mgr/DBMgr';

@Component({
  selector: 'app-databasedemo',
  templateUrl: './databasedemo.page.html',
  styleUrls: ['./databasedemo.page.scss'],
})
export class DatabasedemoPage extends AppBase {

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

  onMyLoad(){
    //参数
    this.params;
  }

  data=[];


  onMyShow(){

  }

  insert(){
    var dbmgr=DBMgr.GetInstance();
    dbmgr.execSql("insert into TEST (sdate) values (?)",[Date()]).then((ret)=>{
      this.showAlert("影响了"+ret.res.rowsAffected+"行数据");
    });
  }
  select(){

    var dbmgr=DBMgr.GetInstance();
    dbmgr.execSql("select * from TEST").then((ret)=>{
      var rows=ret.res.rows;
      console.log(rows);
      console.log(ret);
      this.data=rows;
    });;
  }
}
