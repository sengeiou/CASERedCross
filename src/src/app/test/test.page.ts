import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { DBMgr } from 'src/mgr/DBMgr';
import { ServiceApi } from 'src/providers/service.api';
import { UserServe } from 'src/mgrServe/UserServe';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
  providers: [ServiceApi]
})
export class TestPage extends AppBase {

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

  myname = "";

  onMyLoad() {
    //参数
    this.params;
    this.myname = this.params.name;
  }
  onMyShow() {
    this.number = '';
    this.password = '';
  }
  number = '';
  password = '';
  data = [];

  insert() {
    var dbmgr = DBMgr.GetInstance();
    dbmgr.execSql("insert into USER (number,password,sdate) values (?,?,?)", [this.number, this.password, new Date().getTime()]).then((ret) => {
      // this.showAlert("影响了"+ret.res.rowsAffected+"行数据");
    });
  }

  select() {
    var dbmgr = DBMgr.GetInstance();
    dbmgr.execSql("select * from USER where number='" + this.number + "' and password='" + this.password + "'").then((ret) => {
      var rows = ret.res.rows;
      console.log(rows);
      console.log(ret);
      this.data = rows;
    });
  }

  update() {
    var dbmgr = DBMgr.GetInstance();
    dbmgr.execSql("update  USER SET sdate=" + new Date().getTime() + ' where ID=' + this.data[0]['ID']).then((ret) => {
      // this.showAlert("影响了"+ret.res.rowsAffected+"行数据");
    });
  }

  loginWeb(){
    this.api.VolunteerLogin(this.number,this.password).then((ret)=>{
      // if(ret.)
      if(ret.Result=="true"){
        alert("登录成功:"+ret.objUser.UserName);
        this.update()
      }else{
        alert("登录失败:"+ret.strMsg);
        this.toast('未能連線，無法登入');
      }
    });
  }

  // kk(item){
  //   alert(item.LocalId);
  // }

 
  login() {
    if (!this.number) {
      this.toast('義工編號不能留空');
      return;
    }
    if (!this.password) {
      this.toast('密碼不能留空');
      return;
    }
    var userServe = new UserServe();
    userServe.getUserNumber(this.number).then((e) => {
      // console.log(Array.from(e))
      console.log(e)
      if (e.res.rows.length==0) {
        this.insert()
        setTimeout(()=>{
          this.login()
        },2000);
      } else {
        var dbmgr = DBMgr.GetInstance();
        dbmgr.execSql("select * from USER where number='" + this.number + "' and password='" + this.password + "'").then((ret) => {
          var rows = ret.res.rows;
          console.log(rows);
          console.log(ret);
          this.data = rows;
          console.log(new Date().getTime())
          console.log(this.data[0]['sdate'])
          var time = new Date().getTime() - this.data[0]['sdate'];
          console.log(time)
          if (this.data) {
            if (time < 24 * 60 * 60 * 1000) {
              this.navigate('home',[this.number])
              this.update()
              this.toast('登录成功');
            } else {
              this.loginWeb()
              // this.toast('未能連線，無法登入');
            }

          } else {
            this.toast('你的義工編號或密碼不正確');
            // this.insert()
          }
        });
      }
    })

  }

  aa() { //忘记密码
    this.presentAlertCheckbox();
  }
  modifyNumber = '';

  async presentAlertCheckbox() {
    const alert = await this.alertCtrl.create({
      header: '忘記密碼',
      message: '請輸入義工編號',
      inputs: [
        {
          name: 'modifyNumber',
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
            console.log(e.modifyNumber)
            this.modifyNumber=e.modifyNumber
            if (!this.modifyNumber) {
              this.toast('義工編號不能留空');
              return;
            }
            this.modifyPassword()
          }
        }
      ]
    });

    await alert.present();
  }

  modifyPassword(){
    this.api.ForgotPassword(this.modifyNumber).then((ret)=>{
      // if(ret.)
      if(ret.Result=="true"){
        this.toast('設置密碼連結會經電郵發送，請查收');
        // alert("設置密碼連結會經電郵發送，請查收"+ret.objUser.ForgotPasswordResult);
        // this.update()
      }else{
        // alert("登录失败:"+ret.strMsg);
        this.toast('');
      }
    });
  }
}
