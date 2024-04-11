import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  ViewChild,
  Input,
  Output,
} from '@angular/core';
import { IonTextarea } from '@ionic/angular';

@Component({
  selector: 'app-rin-ion-textarea',
  templateUrl: './rin-ion-textarea.component.html',
  styleUrls: ['./rin-ion-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RinIonTextareaComponent {
  @Input() initValue = '';
  @Input() placeholder = '';
  @Input() spellcheck = true;

  @Output() ionChange = new EventEmitter<CustomEvent<{ value: string }>>();
  @Output() ionInput = new EventEmitter<CustomEvent<{ value: string }>>();
  @Output() ionBlur = new EventEmitter<CustomEvent<{ value: string }>>();
  @Output() ionFocus = new EventEmitter<CustomEvent<{ value: string }>>();

  @ViewChild(IonTextarea) ionTextarea: IonTextarea;

  ionTextareaInput(event: CustomEvent<{ value: string }>) {
    const FONT_SIZE = 13;
    const FONT_SIZE_WIDTH = FONT_SIZE / 2;
    const EDITABLE_WIDTH = window.innerWidth * 0.8;
    const maxLetterPerLine = EDITABLE_WIDTH / FONT_SIZE_WIDTH;
    const textValue = event.detail.value;
    const textLength = textValue.length;
    const breakLineCount = (textValue.match(/\n/g) || []).length;

    const rows = Math.ceil(textLength / maxLetterPerLine) + breakLineCount;
    if (this.ionTextarea.rows !== rows) {
      if (rows > 10) {
        this.ionTextarea.rows = 10;
      } else {
        this.ionTextarea.rows = rows;
      }
    }
    if (this.ionTextarea.rows === 0) {
      this.ionTextarea.rows = 1;
    }
    setTimeout(() => {
      this.ionChange.emit(event);
    }, 50);
  }

  get value(): string {
    return this.ionTextarea.value;
  }

  reset() {
    this.ionTextarea.value = '';
  }
  setFocus() {
    return this.ionTextarea.setFocus();
  }
}
