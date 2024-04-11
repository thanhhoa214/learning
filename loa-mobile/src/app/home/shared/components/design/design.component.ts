import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { GetHomeDataQuery } from '../../services';

@Component({
  selector: 'home-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDesignComponent {
  @Input() designs: GetHomeDataQuery['designs'];
}
