import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Box } from '../shared/models/box.model';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxComponent {
  @Input() box: Box;
  ownName = 'swd-box';
}
