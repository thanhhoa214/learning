import { Component } from '@angular/core';

@Component({
  selector: 'loa-mobile-support-contact',
  templateUrl: './support-contact.component.html',
  styleUrls: ['./support-contact.component.scss']
})
export class SupportContactComponent {
  isShowSections = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ];

  toggleShowSection(sectionIndex: number) {
    const newIsShowSections = [...this.isShowSections];
    newIsShowSections[sectionIndex] = !newIsShowSections[sectionIndex];
    this.isShowSections = newIsShowSections;
  }
}
