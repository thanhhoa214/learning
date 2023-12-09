import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/account.service';
import { SnackBarSuccessComponent } from 'src/app/shared/components';
import {
  ScreenReadDtoPagingResponseDto,
  ScreensService,
  ScreenTemplatesService,
  StoresService,
  TemplateReadDtoPagingResponseDto,
  TemplatesService,
} from 'src/generated';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  templates$: Observable<TemplateReadDtoPagingResponseDto>;
  screens$: Observable<ScreenReadDtoPagingResponseDto>;

  constructor(
    private formBuilder: FormBuilder,
    private displaysService: ScreenTemplatesService,
    private templatesService: TemplatesService,
    private screenService: ScreensService,
    private accountService: AccountService,
    private storeService: StoresService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      templateId: ['', Validators.required],
      screenId: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const account = this.accountService.getAccount();
    if (account.roleId === 1) {
      this.templates$ = this.storeService.apiStoresIdTemplatesGet(
        account.storeId
      );
      this.screens$ = this.storeService.apiStoresIdScreensGet(account.storeId);
    } else if (account.roleId === 3) {
      this.templates$ = this.templatesService.apiTemplatesGet();
      this.screens$ = this.screenService.apiScreensGet();
    }
  }

  create() {
    const { templateId, screenId } = this.form.value;

    this.displaysService
      .apiScreenTemplatesPost({ templateId, screenId })
      .pipe(take(1))
      .subscribe(() => {
        this.snackBar.openFromComponent(SnackBarSuccessComponent, {
          verticalPosition: 'top',
          horizontalPosition: 'end',
          panelClass: 'mat-snack-bar-success',
          data: {
            title: 'Success !',
            message: `Display "${templateId}" on screen "${screenId}" setted up successfully`,
          },
        });
      });
  }
}
