import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { HomeService } from './home.service';
import { SubSinkable } from '../shared/models';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends SubSinkable implements ViewWillEnter {
  categories = [
    {
      id: 1,
      image: 'assets/images/home/life-style.png',
      name: 'life_style',
      url: 'life-style'
    },
    {
      id: 2,
      image: 'assets/images/home/interior-share.png',
      name: 'interior_tips',
      url: 'interior-share'
    },
    {
      id: 3,
      image: 'assets/images/home/construction.png',
      name: 'construction',
      url: 'construction'
    }
  ];

  constructor(public homeService: HomeService) {
    super();
  }

  ionViewWillEnter(): void {
    this.homeService.loadHomeData();
  }
  ionViewWillLeave(): void {
    this.homeService.resetBanner();
  }
}
