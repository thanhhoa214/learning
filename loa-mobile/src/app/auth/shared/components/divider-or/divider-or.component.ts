import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'loa-mobile-divider-or',
  templateUrl: './divider-or.component.html',
  styleUrls: ['./divider-or.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerOrComponent {
  @Input() backgroundColor: string;
  @Input() height = '20vh';
}
