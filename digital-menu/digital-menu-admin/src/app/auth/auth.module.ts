import { NgModule } from '@angular/core';

import { AuthPageRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  imports: [AuthPageRoutingModule, SharedModule],
  declarations: [LoginComponent, SignUpComponent],
})
export class AuthModule {}
