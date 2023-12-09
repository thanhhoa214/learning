import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CreateButtonComponent,
  NavBarComponent,
  NotFoundComponent,
  SideBarComponent,
  SnackBarFailedComponent,
  SnackBarSuccessComponent,
  SnackBarWarnComponent,
} from '../shared/components';

const modules = [
  CommonModule,
  MaterialModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
];
const components = [
  NavBarComponent,
  NotFoundComponent,
  SideBarComponent,
  CreateButtonComponent,
  SnackBarFailedComponent,
  SnackBarSuccessComponent,
  SnackBarWarnComponent,
];

@NgModule({
  imports: modules,
  exports: [...modules, ...components],
  declarations: components,
})
export class SharedModule {}
