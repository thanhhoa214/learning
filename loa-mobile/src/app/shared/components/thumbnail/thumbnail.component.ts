import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../../../shared/models';

@Component({
  selector: 'loa-mobile-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent {
  @Input() image: Image;
  @Input() imageUrl: string | ArrayBuffer;
  @Input() size = '5rem';
  @Input() hoverable = false;
  @Input() removable = false;
  @Input() errorMsg = '';

  @Output() click = new EventEmitter(true);
  @Output() remove = new EventEmitter(true);

  removeImage(event: CustomEvent, id: string) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.remove.emit(id);
  }
  clickImage(event: CustomEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.click.emit();
  }
}
