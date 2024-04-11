import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { GetHomeDataQuery } from '../../services';

@Component({
  selector: 'home-interior-share',
  templateUrl: './interior-share.component.html',
  styleUrls: ['./interior-share.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteriorShareComponent {
  @Input() newShares: GetHomeDataQuery['topicsWithoutImage'];
  @Input() mostPopularShares: GetHomeDataQuery['topicsWithImage'];
}
