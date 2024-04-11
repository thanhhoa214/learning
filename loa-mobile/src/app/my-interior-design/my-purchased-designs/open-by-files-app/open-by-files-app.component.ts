import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'loa-open-by-files-app',
  templateUrl: './open-by-files-app.component.html',
  styleUrls: ['./open-by-files-app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenByFilesAppComponent implements OnInit {
  platform: string;

  ngOnInit(): void {
    this.platform = Capacitor.platform;
  }
}
