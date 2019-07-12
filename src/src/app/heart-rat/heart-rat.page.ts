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
export class HeartRatPage extends AppBase {
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

        var heartRateServe=new HeartRateServe();
        heartRateServe.getAllHeartRateList(this.params.caseid).then((e)=>{
            var list = Array.from(e.res.rows);

            var xdata=[];
            var ydata=[];
            for(var i=0;i<list.length;i++){
                xdata.push(list[i]["MeasurementDate"]);
                ydata.push(list[i]["RatePerMin"]);
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
                name: '心跳(每分鐘)',
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }

            },
            series: [
                {
                    name: '心率數據',
                    type: 'line',
                    data: ydata,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                },
            ]
        };



        myChart.setOption(option);
    });
    }

    getRat() {
        var heartRateServe = new HeartRateServe();
        heartRateServe.getHeartRateId(this.params.caseid).then((e) => {
            console.log(e)
        })
    }
}
