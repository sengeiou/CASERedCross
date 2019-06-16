import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import ECharts from 'echarts/dist/echarts.js';
import { BloodPressureServe } from 'src/mgrServe/BloodPressureServe';

@Component({
  selector: 'app-bloodpressure',
  templateUrl: './bloodpressure.page.html',
  styleUrls: ['./bloodpressure.page.scss'],
})
export class BloodpressurePage extends AppBase {
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

    var bloodPressureServe = new BloodPressureServe();
    bloodPressureServe.getAllBloodPressureList(this.params.caseid).then((e) => {
      console.log(e.res.rows)
      var list = Array.from(e.res.rows);

      var xdata = [];
      var ydata = [];
      var ydata2 = [];
      for (var i = 0; i < list.length; i++) {
        xdata.push(list[i]["MeasurementDate"]);
        ydata.push(list[i]["Upper"]);
        ydata2.push(list[i]["Lower"]);
      }

      let element = this.chart.nativeElement;
      let myChart = ECharts.init(element);
      // console.log(myChart);
      var option = {
        tooltip: {
          trigger: 'axis'
        },

        legend: {
          data:['上壓(mmHg)','下壓(mmHg)']
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
            name: '上壓(mmHg)',
            type: 'line',
            data: ydata,
            markPoint: {
              data: [
                { type: 'max', name: 'max' },
                { type: 'min', name: 'min' }
              ]
            }
          },{
            name: '下壓(mmHg)',
            type: 'line',
            data: ydata2,
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
