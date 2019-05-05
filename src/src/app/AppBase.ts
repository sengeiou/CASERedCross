import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { NavController, ModalController, ToastController, NavParams, AlertController }
    from "@ionic/angular";
import { AppComponent } from "./app.component";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ReturnStatement } from "@angular/compiler";
import { ViewController } from '@ionic/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit } from '@angular/core';

export class AppBase implements OnInit {
    public needlogin = false;

    public static TABName = "";
    public static LASTTAB=null;
    public static CurrentRoute: Router = null;
    public static CurrentNav: NavController = null;

    public static myapp: AppComponent = null;
    public static UNICODE = "zwgz";

    public statusBarStyle = "X";//{DARK}
    public uploadpath: string = ApiConfig.getUploadPath();
    public util = AppUtil;
    public static Resources = null;
    public res = [];
    public static InstInfo = null;
    public InstInfo = { logo: "", memberlogo: "", undershipping: 0, shippingfee: 0 };
    public MemberInfo = null;
    public static MYBABY = [];
    public mybaby = [];
    public options = null;
    public params: Params=null;

    public firseonshow = true;
    public scrolltop = 0;
    public headerscroptshow = 0;


    public constructor(
        public router: Router,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public activeRoute: ActivatedRoute) {

        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.params=params;
        });

    }
    setStatusBar() {
        //  this.statusBar.styleLightContent();
    }
    ngOnInit() {

        ApiConfig.SetUnicode(AppBase.UNICODE);
        this.onMyLoad();
        this.setStatusBar();
    }
    onMyLoad() {
    }
    
    ionViewDidEnter() {

        AppBase.CurrentRoute = this.router;
        AppBase.CurrentNav = this.navCtrl;


        this.onMyShow();

        this.firseonshow = false;
    }
    onMyShow() {

    }
    onPullRefresh(ref) {
        this.onMyShow();
        ref.complete();
    }
    doRefresh(ref) {
        this.onPullRefresh(ref);
        // setTimeout(() => {
        //     ref.complete();
        // }, 1000);
    }
    onLoadMoreRefresh(ref) {
        ref.complete();
    }
    doInfinite(infiniteScroll) {
        this.onLoadMoreRefresh(infiniteScroll);
        // setTimeout(() => {
        //   infiniteScroll.complete();
        // }, 1000);
    }
    back() {
        //alert(this.Params.fromtab);
        if(this.params.fromtab!=undefined){
            this.navCtrl.navigateBack('tabs/'+this.params.fromtab);
        }else{
            this.navCtrl.back();
        }
    }
    backToUrl(url){
        this.navCtrl.navigateBack(url);
    }
    close(data) {
        this.modalCtrl.dismiss(data);
    }
    returnData(data) {
        this.modalCtrl.dismiss(data);
    }
    windowslocation(url) {
        window.location.href = url;
    }
    navigate(pagename, param = {}) {
        this.router.navigate([pagename], { queryParams: param });
    }
    async showModal(pageobj, param = {}, callback = null) {
        var modal = await this.modalCtrl.create({
            component: pageobj,
            componentProps: param
        });
        await modal.onDidDismiss().then((data)=>{
            if(callback!=null){
                callback(data);
            }
        });
        await modal.present();
    }

    showContent(title, key) {
        this.navigate("content",{ title, key });
        //this.showModal("ContentPage", { title, key });
    }

    decode(val) {
        return AppUtil.HtmlDecode(val);
    }
    contentToLine(str) {
        if (str == null) {
            return "";
        }
        return str.split("\n");
    }

    tel(tel) {
        window.location.href = "tel:" + tel;
    }
    async toast(msg) {
        if (msg == "") {
            return;
        }
        console.log(((msg.length / 3) + 1) * 1000);
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: ((msg.length / 3) + 1) * 500
        });
        toast.present();
    }
    async showAlert(msg) {

        const alert = await this.alertCtrl.create({
            header: "提示",
            subHeader: msg,
            buttons: ["知道了"]
        });
        alert.present();
    }
    async showConfirm(msg, confirmcallback) {

        const alert = await this.alertCtrl.create({
            header: "提示",
            subHeader: msg,
            buttons: [{
                text: "取消",
                handler: () => {
                    console.log('Disagree clicked');

                    confirmcallback(false);
                }
            }, {
                text: "好的",
                handler: () => {
                    confirmcallback(true);
                }
            }]
        });
        alert.present();
    }
    async checkLogin(callback) {

    }

  async showActionSheet(actionSheetController,header,buttons) {
    const actionSheet = await actionSheetController.create({
      header: header,
      buttons: buttons
    });
    await actionSheet.present();
  }
    hasLogin() {
        return this.MemberInfo != null;
    }
    logout(){
        window.localStorage.removeItem("UserToken");
        this.MemberInfo=null;
    }
    store(name, value = null) {
        if (value == null) {
            return window.localStorage.getItem(name);
        } else {
            window.localStorage.setItem(name, value);
            return "";
        }
    }

    async uploadFile(transfer: FileTransfer, filepath: string, module: string) {
        let options: FileUploadOptions = {
            fileKey: 'img'
        }


        var fileTransfer: FileTransferObject = await transfer.create();
        return fileTransfer.upload(filepath, ApiConfig.getFileUploadAPI() + "?field=img&module=" + module, options)
            .then((data) => {
                // success
                //alert(data);
                return data.response.toString().split("|~~|")[1];
            }, (err) => {
                alert("upload faile");
                // error
            })
    }
    splitRow(content){
        return content.split("\n");
    }

    getMemberPhoto(photo: string) {
        if (photo == null || photo == undefined || photo.trim() == "") {
            return this.uploadpath + "inst/" + this.InstInfo.logo;
        } else {
            return this.uploadpath + "member/" + photo;
        }
    }

    logScrollStart() {
        console.log("logScrollStart");
    }
    logScrolling(e) {
        console.log(e);
        this.scrolltop = e.detail.scrollTop;
    }
    logScrollEnd() {
        console.log("logScrollEnd");
    }
    gotoDiv(id) {
        var target = document.querySelector('#' + id);
        target.scrollIntoView();
    }

    tryLogin(){
        this.showModal("MobileloginPage", {});
    }
}