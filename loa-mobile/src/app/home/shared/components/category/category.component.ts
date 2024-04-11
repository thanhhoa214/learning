import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'home-category-item',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  @Input() category: { id: number; name: string; image: string; url: string };
}
