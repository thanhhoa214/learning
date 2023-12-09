import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateButtonComponent {
  @Input() goTo: string;
}
