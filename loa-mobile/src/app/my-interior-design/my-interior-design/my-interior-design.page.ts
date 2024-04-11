import { Component } from '@angular/core';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';

@Component({
  templateUrl: './my-interior-design.page.html',
  styleUrls: ['./my-interior-design.page.scss'],
})
export class MyInteriorDesignPage {
  constructor(public loginService: LoginService) {}
}
