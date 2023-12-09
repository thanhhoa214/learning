import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditConfigPage } from './edit-config.page';
import { AvatarModule } from '@shared/ui/avatar';
import { EditConfigComponentModule } from '../shared/edit-config';

@NgModule({
  declarations: [EditConfigPage],
  imports: [CommonModule, AvatarModule, EditConfigComponentModule],
  exports: [EditConfigPage]
})
export class EditConfigModule {}
