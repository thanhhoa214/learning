import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { UserNode } from '@loa-shared/models/graphql.model';

@Component({
  selector: 'loa-username',
  templateUrl: './username.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsernameComponent {
  @Input() user: UserNode;
}
