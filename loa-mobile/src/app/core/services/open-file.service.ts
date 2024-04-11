import { Injectable } from '@angular/core';
import { Capacitor, Plugins } from '@capacitor/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { NotificationService } from '@loa-shared/services/notification.service';
const { Filesystem } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class OpenFileService {
  constructor(private _fileOperner: FileOpener, private _notify: NotificationService) {}

  async open({ folderUrl, fileName }: { folderUrl: string; fileName: string }) {
    if (Capacitor.platform === 'ios') {
      window.open(folderUrl.replace('file://', 'shareddocuments://'), '_system');
    } else if (Capacitor.platform === 'android') {
      try {
        if (Capacitor.platform === 'android') await Filesystem.requestPermissions();
        this._fileOperner.open(folderUrl + '/' + fileName, 'application/zip');
      } catch (error) {
        this._notify.openSnackBar(
          'Open file failed. File seems to be missing. Logout & login again may help.',
          'error'
        );
      }
    }
  }
}
