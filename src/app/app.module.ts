import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {GoogleMaps} from '@ionic-native/google-maps';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { TranslateModule, TranslateLoader,TranslateService } from 'ng2-translate';

import { NetworkEngineProvider } from '../providers/network-engine/network-engine';
import { FcmProvider } from '../providers/fcm/fcm';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SearchPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    TranslateModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SearchPage,
    TabsPage
  ],
  providers: [
    GoogleMaps,
    StatusBar,
    SplashScreen,
    Geolocation,
    TranslateService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NetworkEngineProvider,
    FcmProvider
  ]
})
export class AppModule {}
