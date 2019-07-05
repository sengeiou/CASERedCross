import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Http, HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Network } from '@ionic-native/network/ngx';
import { DNS } from '@ionic-native/dns/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { ImagemaxPage } from './imagemax/imagemax.page';

@NgModule({
  declarations: [AppComponent,ImagemaxPage],
  entryComponents: [ImagemaxPage],
  imports: [BrowserModule, IonicModule.forRoot( {
    mode: 'ios',
    swipeBackEnabled:false,
    hardwareBackButton: false
  }), AppRoutingModule, HttpModule],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    QRScanner,
    SQLite,
    Network,
    DNS,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
