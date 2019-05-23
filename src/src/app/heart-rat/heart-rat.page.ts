import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import ECharts from 'echarts/dist/echarts.js';
import { HeartRateServe } from 'src/mgrServe/HeartRateServe';

@Component({
  selector: 'app-heart-rat',
  templateUrl: './heart-rat.page.html',
  styleUrls: ['./heart-rat.page.scss'],
})
export class HeartRatPage  extends AppBase {
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
    this.getRat()
  }
  onMyShow() {
    let element = this.chart.nativeElement;
    let myChart = ECharts.init(element);

    var option = {
      title: {
          text: '心跳統計圖',
      },
      tooltip: {
          trigger: 'axis'
      },
      xAxis:  {
          type: 'category',
          boundaryGap: false,
          data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {
          type: 'value',
          axisLabel: {
              formatter: '{value} °C'
          }
      },
      series: [
          {
              name:'最高气温',
              type:'line',
              data:[11, 11, 15, 13, 12, 13, 10],
              markPoint: {
                  data: [
                      {type: 'max', name: '最大值'},
                      {type: 'min', name: '最小值'}
                  ]
              },
              markLine: {
                  data: [
                      {type: 'average', name: '平均值'}
                  ]
              }
          },
          {
              name:'最低气温',
              type:'line',
              data:[1, -2, 2, 5, 3, 2, 0],
              markPoint: {
                  data: [
                      {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                  ]
              },
              markLine: {
                  data: [
                      {type: 'average', name: '平均值'},
                      [{
                          symbol: 'none',
                          x: '90%',
                          yAxis: 'max'
                      }, {
                          symbol: 'circle',
                          label: {
                              normal: {
                                  position: 'start',
                                  formatter: '最大值'
                              }
                          },
                          type: 'max',
                          name: '最高点'
                      }]
                  ]
              }
          }
      ]
  };



    myChart.setOption(option);
  }

  getRat(){
    var heartRateServe=new HeartRateServe();
    heartRateServe.getAllHeartRateList().then((e)=>{
      console.log(e)
    })
  }
}
