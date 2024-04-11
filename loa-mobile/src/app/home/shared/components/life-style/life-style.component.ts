import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { GetHomeDataQuery } from '../../services';

@Component({
  selector: 'home-life-style',
  templateUrl: './life-style.component.html',
  styleUrls: ['./life-style.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifeStyleComponent {
  @Input() lifeStyles: GetHomeDataQuery['articles'];
}
