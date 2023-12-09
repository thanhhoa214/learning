import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {
  AccountReadAfterAuthenDto,
  StoresService,
  TemplateReadDtoPagingResponseDto,
  TemplatesService,
} from 'src/generated';
import { ImageModalComponent } from '../shared/components/image-modal/image-modal.component';
import { AccountService } from 'src/app/account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit, OnDestroy {
  templates: TemplateReadDtoPagingResponseDto;
  sampleData = [
    {
      id: '1',
      src: 'assets/images/img1.jpg',
    },
    {
      id: '2',
      src: 'assets/images/img2.jpg',
    },
    {
      id: '3',
      src: 'assets/images/img3.jpg',
    },
    {
      id: '4',
      src: 'assets/images/img4.jpg',
    },
    {
      id: '5',
      src: 'assets/images/img5.jpg',
    },
    {
      id: '6',
      src: 'assets/images/img6.jpg',
    },
  ];
  account: AccountReadAfterAuthenDto;
  search: FormControl = new FormControl('');
  subscriptions: Subscription[] = [];
  isPicked = false;

  constructor(
    public dialog: MatDialog,
    private templateService: TemplatesService,
    private accountService: AccountService,
    private storeService: StoresService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.account = this.accountService.getAccount();
    this.isPicked = this.route.snapshot.data.type === 'pick';
    if (this.account.roleId === 1 && !this.isPicked) {
      console.log(this.account.roleName);

      this.storeService
        .apiStoresIdTemplatesGet(this.account.storeId)
        .subscribe((templates) => {
          this.templates = templates;
        });
      this.subscriptions.push(
        this.search.valueChanges
          .pipe(debounceTime(500), distinctUntilChanged())
          .subscribe((value) => {
            this.storeService
              .apiStoresIdTemplatesGet(
                this.account.storeId,
                1,
                0,
                undefined,
                value
              )
              .subscribe((templates) => {
                this.templates = templates;
              });
          })
      );
    }
    if (this.account.roleId === 3 || this.isPicked) {
      this.templateService.apiTemplatesGet().subscribe((templates) => {
        this.templates = templates;
      });
      this.subscriptions.push(
        this.search.valueChanges
          .pipe(debounceTime(500), distinctUntilChanged())
          .subscribe((value) => {
            this.subscriptions.push(
              this.templateService
                .apiTemplatesGet(1, 0, undefined, value)
                .subscribe((templates) => {
                  this.templates = templates;
                })
            );
          })
      );
    }
  }
  ngOnDestroy(): void {
    console.log('cleannnn');

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  openDialog(id: string, title: string, src: string) {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      data: { id, title, src },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
