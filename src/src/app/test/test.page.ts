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
import { Network } from '@ionic-native/network/ngx';
import { QrcodescanPage } from '../qrcodescan/qrcodescan.page';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
  providers: [ServiceApi, Network]
})
export class TestPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public network: Network,
    public api: ServiceApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  myname = "";
  connected = true;
  onMyLoad() {
    //参数
    this.params;
    this.myname = this.params.name;
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.connected = false;
    });

    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.connected = true;
    });



  }
  onMyShow() {
    this.number = '';
    this.password = '';

    if(AppBase.LastQrcode!=''){
      this.qrcodeHandle(AppBase.LastQrcode);
      AppBase.LastQrcode="";
      return;
    }
  }
  number = '';
  password = '';
  data = [];
  wangluo = '';

  insert() {
    var dbmgr = DBMgr.GetInstance();
    dbmgr.execSql("insert into USER (number,password,sdate) values (?,?,?)", [this.number, this.password, new Date().getTime()]).then((ret) => {
      // this.showAlert("影响了"+ret.res.rowsAffected+"行数据");
    });
  }

  update() {
    var dbmgr = DBMgr.GetInstance();
    dbmgr.execSql("update  USER SET sdate=" + new Date().getTime() + ' where ID=' + this.data[0]['ID']).then((ret) => {
      // this.showAlert("影响了"+ret.res.rowsAffected+"行数据");
    });
  }
  VolId = 0;

  // loginWeb() {
  login() {
    if (this.number.trim() == "") {
      this.toast('義工編號不能留空');
      return;
    }
    if (!this.password) {
      this.toast('密碼不能留空');
      return;
    }
    console.log(this.number, this.password);
    if (this.connected == false) {
      var lastlogininfo = null;
      lastlogininfo = window.localStorage.getItem("lastlogininfo");
      if (lastlogininfo == null) {
        this.toast('你当前处于离线状态，不可登录');
      } else {
        lastlogininfo = JSON.parse(lastlogininfo);
        var logintime = parseInt(lastlogininfo.logintime);
        var now = (new Date()).getTime();
        if ((now - logintime) > 1 * 60 * 1000) {
          if (this.number == lastlogininfo.number && this.password == lastlogininfo.password) {

            this.VolId = lastlogininfo.VolId;
            this.navigate('home', { id: this.VolId });
          } else {
            this.toast('你的義工編號或密碼不正確');
          }
        }
      }
    } else {

      var userServe = new UserServe();
      // if(this.network.type!=null){
      this.api.VolunteerLogin(this.number, this.password).then((ret) => {
        if (ret.Result == "true") {

          var lastlogininfo = {
            user: ret.objUser,
            number: this.number,
            password: this.password,
            logintime: (new Date()).getTime()
          };

          window.localStorage.setItem("lastlogininfo", JSON.stringify(lastlogininfo));
          this.number = "";
          this.password = "";

          this.VolId = ret.objUser.VolId;



          this.navigate('home', { id: this.VolId });
          this.update();
          userServe.getUserNumber(this.number).then((e) => {
            console.log(e)
            if (e.res.rows.length == 0) {
              this.insert()
            }
          })
        } else {
          this.toast('你的義工編號或密碼不正確');
        }
      })
    }
    // }else{
    // var dbmgr = DBMgr.GetInstance();
    // dbmgr.execSql("select * from USER where number='" + this.number + "' and password='" + this.password + "'").then((ret) => {
    //   var rows = ret.res.rows;
    //   console.log(rows);
    //   console.log(ret);
    //   this.data = rows;
    //   console.log(new Date().getTime())
    //   console.log(this.data[0]['sdate'])
    //   var time = new Date().getTime() - this.data[0]['sdate'];
    //   console.log(time)
    //   if (this.data) {
    //     if (time < 24 * 60 * 60 * 1000) {
    //       this.navigate('home', { id: this.VolId })
    //       this.update()
    //       this.toast('登录成功');

    //     } else {
    //       this.toast('未能連線，無法登入');
    //     }
    //   } else {
    //     this.toast('你的義工編號或密碼不正確');
    //   }
    // });
    // }
  }


  login12() {
    if (!this.number) {
      this.toast('義工編號不能留空');
      return;
    }
    if (!this.password) {
      this.toast('密碼不能留空');
      return;
    }
    // this.loginWeb()

    var userServe = new UserServe();
    userServe.getUserNumber(this.number).then((e) => {
      console.log(e)
      if (e.res.rows.length == 0) {
        this.insert()
        setTimeout(() => {
          this.login()
        }, 2000);
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
              this.navigate('home', { id: this.VolId })
              this.update()
              this.toast('登录成功');
            } else {
              this.toast('未能連線，無法登入');
            }

          } else {
            this.toast('你的義工編號或密碼不正確');
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
            this.modifyNumber = e.modifyNumber
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

  modifyPassword() {
    this.api.ForgotPassword(this.modifyNumber).then((ret) => {
      console.log(ret)
      if (ret == 1) {

        this.toast('設置密碼連結會經電郵發送，請查收');

      } else {
        // alert("登录失败:"+ret.strMsg);
        this.toast('系統沒有回應');
      }
    });
  }

  passwordKeyup(e) {
    console.log(e);
    if (e.key == 'Enter') {
      this.login();
    }
  }

  scan(){
    this.navigate("qrcodescan");
  }
  qrcodeHandle(code){
    alert(code);
  }
}
