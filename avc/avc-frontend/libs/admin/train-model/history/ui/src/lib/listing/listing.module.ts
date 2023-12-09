import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DynamicTableModule } from '@shared/ui/dynamic-table';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiSvgModule, TuiButtonModule } from '@taiga-ui/core';
import { ListingPage } from './listing.page';

const tuiModules = [TuiSvgModule, TuiInputModule, TuiButtonModule];
@NgModule({
  declarations: [ListingPage],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DynamicTableModule, tuiModules]
})
export class ListingUiModule {}
