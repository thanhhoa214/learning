import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TypeCodeComponent } from './type-code/type-code.component';
import { RegisterService } from './register/register.service';
import { ForgotPasswordService } from './forgot-password/forgot-password.service';
import { TypeCodeService } from './type-code/type-code.service';
import { NgOtpInputModule } from 'ng-otp-input';
import { ChangePasswordService } from './change-password/change-password.service';
import { ChangeOldPasswordComponent } from './change-old-password/change-old-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangeOldPasswordService } from './change-old-password/change-old-password.service';
import { ProfileService } from './profile/profile.service';
import { ChooseUserTypeComponent } from './choose-user-type/choose-user-type.component';
import { DividerOrComponent } from './shared/components/divider-or/divider-or.component';
import { ChooseRegisterTypeComponent } from './choose-register-type/choose-register-type.component';
import { RegisterBusinessComponent } from './register-business/register-business.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { RegisterBusinessFormResolver } from './register-business/register-business-form.resolver';
import { RegisterBusinessSuccessComponent } from './register-business-success/register-business-success.component';
import { RegisterBusinessService } from './register-business/register-business.service';
import { UpgradeBusinessComponent } from './upgrade-business/upgrade-business.component';
import { UogradeBusinessFormResolver } from './upgrade-business/upgrade-business-form.resolver';
import { SwitchToBusinessComponent } from './profile/switch-to-business/switch-to-business.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    TypeCodeComponent,
    ChangeOldPasswordComponent,
    ProfileComponent,
    ChooseUserTypeComponent,
    DividerOrComponent,
    ChooseRegisterTypeComponent,
    RegisterBusinessComponent,
    RegisterSuccessComponent,
    RegisterBusinessSuccessComponent,
    UpgradeBusinessComponent,
    SwitchToBusinessComponent
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule, NgOtpInputModule],
  providers: [
    RegisterService,
    ForgotPasswordService,
    TypeCodeService,
    ChangePasswordService,
    ChangeOldPasswordService,
    ProfileService,
    RegisterBusinessFormResolver,
    RegisterBusinessService,
    UogradeBusinessFormResolver
  ],
})
export class AuthModule {}
