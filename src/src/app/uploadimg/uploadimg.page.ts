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
import { VisitServe } from 'src/mgrServe/VisitServe';


@Component({
  selector: 'app-uploadimg',
  templateUrl: './uploadimg.page.html',
  styleUrls: ['./uploadimg.page.scss'],
  providers: [Camera, FileTransfer, File, Base64]
})
export class UploadimgPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    public transfer: FileTransfer,
    public sanitizer: DomSanitizer,
    public base64: Base64
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);

    this.headerscroptshow = 480;

  }
  list = [];
  VisitLocalId = 0;
  visitid = 0;
  onMyLoad() {
    //参数
    this.params;
    this.VisitLocalId = this.params.VisitLocalId
    this.visitid = this.params.visitid
  }
  onMyShow() {
    console.log(this.params.visitid)
    var imgserver = new ImageServe();
    // imgserver.getAllImageList().then(e => {
    //   console.log(Array.from(e.res.rows))
    // })
    var visitid = 0;
    if (this.visitid > 0) {
      visitid = this.visitid;
    } else {
      visitid = this.VisitLocalId;
    }
    if (visitid > 0) {
      imgserver.getImageList(visitid).then(e => {
        var list = Array.from(e.res.rows);
        console.log(list)
        for (var i = 0; i < list.length; i++) {
          var item = null;
          item = list[i];
          item.Base64ImgString = this.sanitizer.bypassSecurityTrustUrl(item.Base64ImgString);

          list[i] = item;
        }
        this.list = list;
      });
    }
    if (this.VisitLocalId == 0) {
      imgserver.getImage_linshi().then(img => {
        console.log(img)
        var list = Array.from(img.res.rows);
        console.log(list)
        for (var i = 0; i < list.length; i++) {
          var item = null;
          item = list[i];
          item.Base64ImgString = this.sanitizer.bypassSecurityTrustUrl(item.Base64ImgString);

          list[i] = item;
        }
        this.list = list;
      })
    }

  }

  uploadimg() {
    this.selectPhoto();
  }

  delimg(e) {
    console.log(e)
    this.showConfirm('確定要刪除圖片', (ret) => {
      if (ret == true) {
        if (this.params.uploadtype == 'Y') {
          let DeletePicString = this.params.DeletePicString;
          if (DeletePicString == null) {
            DeletePicString = '';
          }
          if (e.ImgId != 0) {
            if(DeletePicString==''){
              DeletePicString =  e.ImgId
            }else{
              DeletePicString = DeletePicString + ',' + e.ImgId
            }
           
          }
          var visit = new VisitServe();
          visit.saveDeletePicString(this.visitid, DeletePicString).then(k => {
            console.log(k);
          })
        }

        var imgserver = new ImageServe();
        imgserver.deleteImage(e.LocalId).then(e => {
          this.onMyShow()
        })
      }

    })

  }

  async selectPhoto() {
    if(this.list.length==10){
      return;
    }
    var imgserver = new ImageServe();
    const actionSheet = await this.actionSheetController.create({
      // header: "选择头像",
      buttons: [
        {
          text: "即時拍照",
          handler: () => {
            let options: CameraOptions = {
              quality: 50,
              allowEdit: false,
              destinationType: this.camera.DestinationType.FILE_URI,
              sourceType: this.camera.PictureSourceType.CAMERA,
              encodingType: this.camera.EncodingType.JPEG
            };
            this.camera.getPicture(options).then((imagepath) => {
              this.base64.encodeFile(imagepath).then((code) => {

                if (this.VisitLocalId != 0) {
                  if (this.visitid == 0) {
                    this.visitid = this.VisitLocalId
                  }
                  imgserver.addImage2(0, this.visitid, code, this.VisitLocalId).then(e => {
                    console.log(e)
                  })
                }

                if (this.visitid == 0 && this.VisitLocalId == 0) {
                  imgserver.addImage2_linshi(code).then(img => {
                    console.log(img)
                  })
                }

                this.onMyShow();
              });
            }, (err) => {
              // Handle error
            });
          }
        }, {
          text: "照片庫",
          handler: () => {
            let options: CameraOptions = {
              quality: 50,
              allowEdit: true,
              destinationType: this.camera.DestinationType.FILE_URI,
              sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE
            };

            this.camera.getPicture(options).then((imagepath) => {
                // alert(imagepath)
              this.base64.encodeFile(imagepath).then((code) => {

                if (this.VisitLocalId != 0) {
                  if (this.visitid == 0) {
                    this.visitid = this.VisitLocalId
                  }
                  imgserver.addImage2(0, this.visitid, code, this.VisitLocalId).then(e => {
                    console.log(e)
                  })
                }

                if (this.visitid == 0 && this.VisitLocalId == 0) {
                  imgserver.addImage2_linshi(code).then(img => {
                    console.log(img)
                  })
                }

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

  checkdata() {
    var imgservice = new ImageServe();
    imgservice.getAllImageList().then((res) => {
      console.log(res);
    });
  }

  kk() {

    console.log(this.VisitLocalId);
    // return
    var imgserver = new ImageServe();
    if (this.VisitLocalId != 0) {
      if (this.visitid == 0) {
        this.visitid = this.VisitLocalId
      }
      imgserver.addImage2(0, this.visitid, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=', this.params.VisitLocalId).then(e => {
        console.log(e)
      })
    }

    if (this.visitid == 0 && this.VisitLocalId == 0) {
      imgserver.addImage2_linshi('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=').then(img => {
        console.log(img)
      })
    }
  }

}
