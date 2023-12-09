import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpdatePage } from '@admin/staff/update/ui';
import { DataAccessModule as StaffDataAccessModule } from '@shared/features/staff/data-access';
import { DataAccessModule as ManagerDataAccessModule } from '@shared/features/manager/data-access';
import { UnsavedChangesGuard } from '@shared/util';

@NgModule({
  imports: [
    StaffDataAccessModule,
    ManagerDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: UpdatePage,
        data: { title: 'Update Staff' },
        canDeactivate: [UnsavedChangesGuard]
      }
    ])
  ],
  providers: [UnsavedChangesGuard]
})
export class FeatureModule {}
