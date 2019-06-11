import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import ECharts from 'echarts/dist/echarts.js';
import { WHRServe } from 'src/mgrServe/WHRServe';

@Component({
  selector: 'app-whr',
  templateUrl: './whr.page.html',
  styleUrls: ['./whr.page.scss'],
})
export class WhrPage extends AppBase {
  @ViewChild('chart') chart: ElementRef;

  constructor(public router: Router,
      public navCtrl: NavController,
      public modalCtrl: ModalController,
      public toastCtrl: ToastController,
      public alertCtrl: AlertController,
      public activeRoute: ActivatedRoute,
      public sanitizer: DomSanitizer) {
      super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
      this.headerscroptshow = 480;

  }

  onMyLoad() {
      //参数
      this.params;
      // this.getRat()
  }
  onMyShow() {

      var wHRServe=new WHRServe();
      wHRServe.getAllWHRList(this.params.caseid).then((e)=>{
        console.log(e)
          var list = Array.from(e.res.rows);

          var xdata=[];
          var ydata=[];
          for(var i=0;i<list.length;i++){
              xdata.push(list[i]["MeasurementDate"]);
              ydata.push(list[i]["Ratio"]);
          }


      let element = this.chart.nativeElement;
      let myChart = ECharts.init(element);
      // console.log(myChart);
      var option = {
          tooltip: {
              trigger: 'axis'
          },
          xAxis: {
              data: xdata
          },
          yAxis: {
              name: '',
              type: 'value',
              axisLabel: {
                  formatter: '{value}'
              }

          },
          series: [
              {
                  name: '',
                  type: 'line',
                  data: ydata,
                  markPoint: {
                      data: [
                          { type: 'max', name: 'max' },
                          { type: 'min', name: 'min' }
                      ]
                  }
              },
          ]
      };



      myChart.setOption(option);
  });
  }

  // getRat() {
  //     var heartRateServe = new HeartRateServe();
  //     heartRateServe.getHeartRateId(this.params.caseid).then((e) => {
  //         console.log(e)
  //     })
  // }
}

