import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { SignalRModule, SignalRConfiguration } from 'ng2-signalr';

import { ORIGIN_URL } from './shared/constants/baseurl.constants';
import { AppModuleShared } from './app.module';
import { AppComponent } from './app.component';
import { REQUEST } from './shared/constants/request';
import { BrowserTransferStateModule } from '../modules/transfer-state/browser-transfer-state.module';

import { BrowserPrebootModule } from 'preboot/browser';

//export function createConfig(): SignalRConfiguration {
//    const signalRConfig = new SignalRConfiguration();

//    signalRConfig.hubName = 'Ng2SignalRHub';
//    signalRConfig.qs = { user: 'donald' };
//    signalRConfig.url = 'http://ng2-signalr-backend.azurewebsites.net/';
//    signalRConfig.logging = true;

//    return signalRConfig;
//}

export function getOriginUrl() {
  var u = location.origin;
  if (typeof location.origin === 'undefined')
    u = location.protocol + '//' + location.host;
  return u;
}

export function getRequest() {
  // the Request object only lives on the server
  return { cookie: document.cookie };
}

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({
            appId: 'mobilesp-cms' // make sure this matches with your Server NgModule
        }),
        BrowserPrebootModule.replayEvents(),
        BrowserAnimationsModule,
        BrowserTransferStateModule,

        // Our Common AppModule
        AppModuleShared

        //,SignalRModule.forRoot(createConfig)
    ],
    providers: [
        {
            // We need this for our Http calls since they'll be using an ORIGIN_URL provided in main.server
            // (Also remember the Server requires Absolute URLs)
            provide: ORIGIN_URL,
            useFactory: (getOriginUrl)
        }, {
            // The server provides these in main.server
            provide: REQUEST,
            useFactory: (getRequest)
        }
    ]
})
export class AppModule { }
