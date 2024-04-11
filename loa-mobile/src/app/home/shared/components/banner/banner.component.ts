import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { GetHomeDataQuery } from '../../services';

@Component({
  selector: 'home-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {
  @Input() banners: GetHomeDataQuery['banners'];

  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: {
      disableOnInteraction: false,
      delay: 2500
    },
    loop: true,
    speed: 200
  };
}
