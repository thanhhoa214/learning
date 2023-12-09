import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { SnackBarSuccessComponent } from 'src/app/shared/components';
import { ProductReadDto, ProductsService } from 'src/generated';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  product: ProductReadDto;
  formGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [''],
      title: [''],
      price: [''],
    });
    const id = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.productsService.apiProductsIdGet(id).subscribe((product) => {
      this.product = product;
      this.formGroup.patchValue({
        id: product.id,
        title: product.title,
        price: product.price,
      });
    });
  }

  update() {
    const { id, title, price } = this.formGroup.value;

    this.productsService
      .apiProductsIdPut(id, {
        ...this.product,
        title,
        price,
      })
      .pipe(take(1))
      .subscribe(() => {
        this.snackBar.openFromComponent(SnackBarSuccessComponent, {
          verticalPosition: 'top',
          horizontalPosition: 'end',
          panelClass: 'mat-snack-bar-success',
          data: { title: 'Success !', message: 'Update product successfully' },
        });
      });
  }
}
