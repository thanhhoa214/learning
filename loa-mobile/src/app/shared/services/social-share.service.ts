import { Injectable } from '@angular/core';
import { ShareTypes } from '@loa-shared/models';
import {
  BranchDeepLinksWeb,
  BranchShortUrlParams,
} from 'capacitor-branch-deep-links';
import { Plugins } from '@capacitor/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ZaloShareDialogComponent } from '@loa-shared/components/zalo-share-dialog/zalo-share-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ShareInput } from 'zalo-auth-capacitor-plugin';
import { LoginZaloService } from '@loa-mobile/auth/login/services/login-zalo.service';

const { Share, BranchDeepLinks } = Plugins;

export interface SocialShareInput {
  title?: string;
  message?: string;
  link?: string;
  thumbnailUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class SocialShareService {
  constructor(
    private _socialSharing: SocialSharing,
    private _dialog: MatDialog,
    private _zaloService: LoginZaloService
  ) {}

  async share(
    input: SocialShareInput,
    type: ShareTypes,
    options?: { zaloShareType: ShareInput['type'] }
  ) {
    const params: BranchShortUrlParams = {
      analytics: null,
      properties: {
        custom_string: input.link,
      },
    };
    const {
      url,
    } = await (BranchDeepLinks as BranchDeepLinksWeb).generateShortUrl(params);
    switch (type) {
      case 'system':
        Share.share({
          title: input.title,
          url,
          dialogTitle: `Share ${input.title}`,
        });
        break;
      case 'fb':
        this._socialSharing.shareViaFacebook(
          input.title,
          input.thumbnailUrl,
          url
        );
        break;
      case 'zalo':
        {
          const shareInput: ShareInput = {
            link: url,
            thumbnailUrl: input.thumbnailUrl,
            message: input.message,
            title: input.title,
            type: options?.zaloShareType,
          };
          if (options?.zaloShareType) {
            this._zaloService.share(shareInput);
          }
          this._dialog.open(ZaloShareDialogComponent, {
            width: '100%',
            data: shareInput,
          });
        }
        break;
    }
  }
}
