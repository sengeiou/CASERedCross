import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { ActionSheetController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';



@Component({
  selector: 'app-uploadimg',
  templateUrl: './uploadimg.page.html',
  styleUrls: ['./uploadimg.page.scss'],
  providers: [Camera,FileTransfer]
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
    public sanitizer: DomSanitizer) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    
    this.headerscroptshow = 480;

  }
  list = [{}, {}]
  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {

  }

  uploadimg() {
    this.selectPhoto();
  }

  async selectPhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: "选择头像",
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
              this.uploadFile(this.transfer, imagepath, "member").then(photo => {
                

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
              this.uploadFile(this.transfer, imagepath, "member").then(photo => {
                
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

}
