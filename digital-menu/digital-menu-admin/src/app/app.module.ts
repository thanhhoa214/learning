import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import {
  ApiModule,
  Configuration,
  // ConfigurationParameters,
} from 'src/generated';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorsInterceptor } from './shared/interceptors/cors.interceptor';

// export function apiConfigFactory(): Configuration {
//   const params: ConfigurationParameters = {};
//   return new Configuration(params);
// }

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ApiModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: Configuration,
      useFactory: (tokenService: TokenService) => {
        console.log('===============');
        
        return new Configuration({
          basePath: environment.API_URL,
          apiKeys: {
            Authorization: 'Bearer ' + tokenService.snapshot().getAccessToken(),
          },
        });
      },
      deps: [TokenService],
      multi: false,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
