import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BackBarComponent } from './components/back-bar/back-bar.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { CountdownModule } from 'ngx-countdown';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxMaskModule } from 'ngx-mask';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MatRippleModule } from '@angular/material/core';
import { IonicModule } from '@ionic/angular';
import { RinTruncateTextComponent } from './components/rin-truncate-text/rin-truncate-text.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { CurrencyI18nPipe } from './pipes/currency-i18n.pipe';
import { UsernameComponent } from './components/username/username.component';
import { RinIonTextareaComponent } from './components/rin-ion-textarea/rin-ion-textarea.component';
import { ZaloShareDialogComponent } from '../shared/components/zalo-share-dialog/zalo-share-dialog.component';
import { ViewMoreReviewComponent } from './components/view-more-review/view-more-review.component';
import { TimeagoModule } from 'ngx-timeago';

const modules = [
  MaterialModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  CountdownModule,
  TranslateModule,
  NgxSkeletonLoaderModule,
  NgxMaskModule,
  TimeagoModule,
  MatRippleModule,
  InfiniteScrollModule,
];
const components = [
  SearchBarComponent,
  BackBarComponent,
  ThumbnailComponent,
  GalleryComponent,
  RinTruncateTextComponent,
  DeleteDialogComponent,
  CurrencyI18nPipe,
  UsernameComponent,
  RinIonTextareaComponent,
  ZaloShareDialogComponent,
  ViewMoreReviewComponent,
];

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...modules, ...components],
  declarations: [...components],
})
export class SharedModule {}
