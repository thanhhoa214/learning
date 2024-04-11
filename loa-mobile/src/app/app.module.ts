import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { appState, appStoredState } from './app-state.model';
import { environment } from '../../src/environments/environment';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TimeagoClock, TimeagoFormatter, TimeagoModule } from 'ngx-timeago';
import { CustomTimeagoClock } from './shared/utils/timeago/custom-timeago-clock';
import { CustomTimeagoFormatter } from './shared/utils/timeago/custom-timeage-formatter';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@loa-shared/shared.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      animated: false,
      mode: 'ios',
      swipeBackEnabled: false
    }),
    AppRoutingModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    GraphQLModule,
    NgxsModule.forRoot(appState, { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot({
      key: appStoredState
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxMaskModule.forRoot(),
    NgxSkeletonLoaderModule,
    TimeagoModule.forRoot({
      clock: { provide: TimeagoClock, useClass: CustomTimeagoClock },
      formatter: {
        provide: TimeagoFormatter,
        useClass: CustomTimeagoFormatter
      }
    }),
    HttpClientModule,
    MatTabsModule,
    SharedModule
  ],
  providers: [
    SplashScreen,
    SocialSharing,
    FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
