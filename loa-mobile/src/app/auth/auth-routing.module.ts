import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TypeCodeComponent } from './type-code/type-code.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { IsNotLoggedInGuard } from './shared/guards/is-not-logged-in.guard';
import { ChangeOldPasswordComponent } from './change-old-password/change-old-password.component';
import { LoginResolver } from './login/services/login.resolver';
import { ChooseUserTypeComponent } from './choose-user-type/choose-user-type.component';
import { RegisterBusinessComponent } from './register-business/register-business.component';
import { ChooseRegisterTypeComponent } from './choose-register-type/choose-register-type.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { RegisterBusinessFormResolver } from './register-business/register-business-form.resolver';
import { RegisterBusinessSuccessComponent } from './register-business-success/register-business-success.component';
import { UpgradeBusinessComponent } from './upgrade-business/upgrade-business.component';
// import { IsBusiness } from './shared/guards/is-business.guard';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'register-business',
    component: RegisterBusinessComponent,
    resolve: { formGroup: RegisterBusinessFormResolver },
    canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'register-business-success',
    component: RegisterBusinessSuccessComponent
    // canActivate: [IsBusiness]
  },
  {
    path: 'register-success',
    component: RegisterSuccessComponent,
    canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'choose-user-type',
    component: ChooseUserTypeComponent,
    canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'choose-register-type',
    component: ChooseRegisterTypeComponent,
    canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsNotLoggedInGuard],
    resolve: { formGroup: LoginResolver }
  },
  {
    path: 'login-business',
    component: LoginComponent,
    canActivate: [IsNotLoggedInGuard],
    resolve: { formGroup: LoginResolver },
    data: { isBusiness: true }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'type-code',
    component: TypeCodeComponent,
    canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'upgrade-business',
    component: UpgradeBusinessComponent
  },
  {
    path: 'change-old-password',
    component: ChangeOldPasswordComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'choose-user-type'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
