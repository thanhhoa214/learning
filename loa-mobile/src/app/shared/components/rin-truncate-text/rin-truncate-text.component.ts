import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-rin-truncate-text',
  templateUrl: './rin-truncate-text.component.html',
  styleUrls: ['./rin-truncate-text.component.scss'],
})
export class RinTruncateTextComponent implements AfterViewInit {
  @Input() seeMoreColor = 'secondary';
  @Input() seeMoreBgColor = 'light';

  @ViewChild('contentWrapper') contentWrapper: ElementRef<HTMLSpanElement>;
  @ViewChild('content') content: ElementRef<HTMLSpanElement>;

  isShowSeeMore = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      const parentHeight = this.contentWrapper.nativeElement.getBoundingClientRect()
        .height;
      const childHeight = this.content.nativeElement.getBoundingClientRect()
        .height;

      if (parentHeight < childHeight) {
        this.isShowSeeMore = true;
      }
    }, 50);
  }

  expand() {
    this.isShowSeeMore = false;
    this.contentWrapper.nativeElement.classList.add('d-inline-block');
  }
  collapse() {
    this.isShowSeeMore = true;
    this.contentWrapper.nativeElement.classList.remove('d-inline-block');
  }
}
