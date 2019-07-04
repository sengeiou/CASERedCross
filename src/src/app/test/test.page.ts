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

    this.needcheck = false;
  }

  myname = "";
  connected = true;
  wangluo = '';
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
  number = '';
  password = '';
  data = [];

  onMyShow() {
    // this.number = '91001';
    // this.password = 'carman';
    this.number = '';
    this.password = '';

    this.wangluo = this.network.type;
    console.log(this.network.type)

    if (AppBase.LastQrcode != '') {
      this.qrcodeHandle(AppBase.LastQrcode);
      AppBase.LastQrcode = "";
      return;
    }
  }


  insert() {
    var dbmgr = DBMgr.GetInstance();
    dbmgr.execSql("insert into USER (number,password,sdate,VolId) values (?,?,?,?)", [this.number, this.password, new Date().getTime(), this.VolId]).then((ret) => {
      // this.showAlert("影响了"+ret.res.rowsAffected+"行数据");
      this.number = "";
      this.password = "";
    });
  }

  update() {
    var dbmgr = DBMgr.GetInstance();
    dbmgr.execSql("update  USER SET sdate=" + new Date().getTime() + ' where id=' + this.data[0]['id']).then((ret) => {
      // this.showAlert("影响了"+ret.res.rowsAffected+"行数据");
      this.number = "";
      this.password = "";
    });
  }

  VolId = 0;

  login() {
    this.wangluo = this.network.type;
    if (this.number.trim() == "") {
      this.toast('義工編號不能留空');
      return;
    }
    if (this.password == '') {
      this.toast('密碼不能留空');
      return;
    }

    console.log(this.number, this.password);
    console.log(this.wangluo)
    if (this.wangluo == 'none') {
      var lastlogininfo = null;
      lastlogininfo = window.localStorage.getItem("lastlogininfo");
      // if (lastlogininfo == null) {
        var userServe = new UserServe();
        // userServe.getAllUserList().then(e => {
        //   console.log(e);
        // })
        userServe.getUser(this.number, this.password).then(ret => {
          var rows = ret.res.rows;
          console.log(rows);
          this.data = rows;

          if (this.data) {
            var time = new Date().getTime() - this.data[0]['sdate'];
            if (time < 24 * 60 * 60 * 1000) {
              this.navigate('home', { id: rows[0].VolId })
              this.update()
              this.toast('登錄成功');
            } else {
              this.toast('你当前处于离线状态，不可登錄');
            }

          } else {
            this.toast('你的義工編號或密碼不正確');

          }
        })

    } else {
      var userServe = new UserServe();
      this.api.VolunteerLogin(this.number, this.password).then((ret) => {
        if (ret.Result == "true") {
          var lastlogininfo = {
            user: ret.objUser,
            number: this.number,
            password: this.password,
            logintime: (new Date()).getTime()
          };

          window.localStorage.setItem("lastlogininfo", JSON.stringify(lastlogininfo));

          this.VolId = ret.objUser.VolId;
          this.navigate('home', { id: this.VolId });
          userServe.getUserNumber(this.number).then((e) => {
            console.log(e)
            if (e.res.rows.length == 0) {
              this.insert()
            } else {
              this.update();
            }
          })


        } else {

          this.toast('你的義工編號或密碼不正確');
        }
      })
    }

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

  scan() {
    this.navigate("qrcodescan");
  }
  qrcodeHandle(code) {
    alert(code);
  }
}
