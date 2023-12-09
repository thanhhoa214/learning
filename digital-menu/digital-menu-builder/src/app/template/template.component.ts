import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TemplateService } from '../template.service';
import { Template } from '../shared/models/template.model';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateComponent implements OnInit {
  @Input() templateVersion = '1.1.1';
  ownName: 'swd-template';
  template$: Observable<Template>;

  constructor(templateService: TemplateService) {
    this.template$ = templateService.getTemplateById('1');
  }

  ngOnInit(): void {}
}
