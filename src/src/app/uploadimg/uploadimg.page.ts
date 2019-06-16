import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { ActionSheetController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImageServe } from 'src/mgrServe/ImageServe';
import { Base64 } from '@ionic-native/base64/ngx';



@Component({
  selector: 'app-uploadimg',
  templateUrl: './uploadimg.page.html',
  styleUrls: ['./uploadimg.page.scss'],
  providers: [Camera,FileTransfer,File,Base64]
})
export class UploadimgPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public actionSheetController: ActionSheetController,
    public camera:Camera,
    public transfer:FileTransfer,
    public sanitizer: DomSanitizer,
    public base64:Base64
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    
    this.headerscroptshow = 480;

  }
  list = []
  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {
    console.log(this.params.visitid)
    var imgserver=new ImageServe();
    imgserver.getAllImageList().then(e=>{
      console.log(Array.from(e.res.rows))
    })
    // alert(this.params.visitid);
    imgserver.getImageList(this.params.visitid).then(e=>{
      var list = Array.from(e.res.rows);
      console.log(list)
      for(var i=0;i<list.length;i++){
        var item=null;
        item=list[i];
        // if(i==0){
        //   alert(item.Base64ImgString);
        // }
        item.Base64ImgString=this.sanitizer.bypassSecurityTrustUrl(item.Base64ImgString);

        list[i]=item;
      }
      this.list=list;
    });
  }

  uploadimg() {
    this.selectPhoto();
  }

  delimg(e){
    console.log(e)
    // this.list.splice(e,1);
    // console.log(this.list)
    this.showConfirm('確定要刪除圖片', (e) => {
      if(e){
        var imgserver=new ImageServe();
        imgserver.deleteImage(e).then(e=>{
          this.onMyShow()
        })
      }
      
    })
    
  }

  async selectPhoto() {
    var imgserver=new ImageServe();
    const actionSheet = await this.actionSheetController.create({
      // header: "选择头像",
      buttons: [
        {
          text: "立即自拍",
          handler: () => {
            let options: CameraOptions = {
              quality: 75,
              targetWidth: 200,
              targetHeight: 200,
              allowEdit: true,
              destinationType: this.camera.DestinationType.FILE_URI,
              sourceType: this.camera.PictureSourceType.CAMERA,
              encodingType: this.camera.EncodingType.JPEG
            };
            this.camera.getPicture(options).then((imagepath) => {
              this.base64.encodeFile(imagepath).then((code)=>{
                // alert(code);
                // alert("调用addImage的接口加到本地数据库");
                imgserver.addImage2(0,this.params.visitid,code).then(e=>{
                    console.log(e)
                })
                this.onMyShow();
              });
            }, (err) => {
              // Handle error
            });
          }
        }, {
          text: "从相册选择",
          handler: () => {
            let options: CameraOptions = {
              quality: 75,
              targetWidth: 200,
              targetHeight: 200,
              allowEdit: true,
              destinationType: this.camera.DestinationType.FILE_URI,
              sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE
            };

            this.camera.getPicture(options).then((imagepath) => {
              
              this.base64.encodeFile(imagepath).then((code)=>{
                // alert(code);
                // alert("调用addImage的接口加到本地数据库");
                imgserver.addImage2(0,this.params.visitid,code).then(e=>{
                  console.log(e)
              })
                this.onMyShow();
              });
              
            }, (err) => {
              // Handle error
            });
          }
        }
      ]
    });
    await actionSheet.present();
  }

  checkdata(){
    var imgservice=new ImageServe();
    imgservice.getAllImageList().then((res)=>{
      console.log(res);
    });
  }

}
