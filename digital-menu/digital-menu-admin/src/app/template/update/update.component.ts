import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { DrawerService } from 'src/app/drawer.service';
import {
  ImageService,
  ProductListReadDto,
  ProductReadDto,
  ProductTemplateReadDto,
  StoresService,
  TemplateDetailReadDto,
  TemplatesService,
} from 'src/generated';
import { FormBuilder, FormGroup } from '@angular/forms';
import { convertTemplateDetailReadDtoToTemplateIdPut } from '../shared/utils';
import { BoxDetailTemplateReadDto } from 'src/generated/';
import { MatSelectionList } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  SnackBarSuccessComponent,
  SnackBarWarnComponent,
} from 'src/app/shared/components';
import { isEqual } from 'lodash';

export const ACCEPTEDIMAGETYPES = ['image/png', 'image/jpeg'];
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @ViewChild('headerSrcInput') headerSrcInput: ElementRef<HTMLInputElement>;
  @ViewChild('headerSrcFileInput') headerSrcFileInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('footerSrcInput') footerSrcInput: ElementRef<HTMLInputElement>;
  @ViewChild('footerSrcFileInput') footerSrcFileInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild(MatSelectionList) selectionList: ElementRef<MatSelectionList>;

  form: FormGroup;
  templateData: TemplateDetailReadDto;
  tempTemplateData: TemplateDetailReadDto;
  configuration: any = {};
  configurationType: 'box' = 'box';
  products: ProductReadDto[];
  isConfigurationShow = false;
  currentSelectedCount = 5;

  loading = false;

  private initTemplateData: TemplateDetailReadDto;
  private setupEventListenersInterval: any;
  private script: HTMLScriptElement;

  constructor(
    private activatedRoute: ActivatedRoute,
    private renderer2: Renderer2,
    private drawerService: DrawerService,
    private templateService: TemplatesService,
    private storeService: StoresService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.form = this.formBuilder.group({
      headerTitle: [''],
      headerSrc: [''],
      footerTitle: [''],
      footerSrc: [''],
    });

    this.drawerService.close();
    this.drawerService.setMode('over');

    const id = parseInt(this.activatedRoute.snapshot.params.id, 10);
    const template = await this.templateService
      .apiTemplatesIdGet(id)
      .toPromise();

    this.storeService.apiStoresIdProductsGet(id, 0, 0).subscribe((products) => {
      this.products = products.result;
    });
    this.templateData = template;
    this.tempTemplateData = template;
    this.initTemplateData = { ...template };
    this.script = this.renderer2.createElement('script');
    this.script.async = true;
    this.script.type = 'module';
    this.script.src =
      template.uilink + '?version=' + Math.round(Math.random() * 10000);
    this.renderer2.appendChild(document.body, this.script);

    this.setupEventListenersInterval = setInterval(() => {
      const templateBoxes = document.querySelectorAll('swd-root-box');
      if (templateBoxes) {
        templateBoxes.forEach((templateBox) => {
          templateBox.addEventListener(
            'swd-root-box-click',
            ({ detail }: CustomEvent) => {
              console.log('detail', detail);

              this.isConfigurationShow = true;
              this.configuration = detail;
              this.form.patchValue({
                headerTitle: detail.headerTitle,
                footerTitle: detail.footerTitle,
                headerSrc: detail.headerSrc,
                footerSrc: detail.footerSrc,
              });
            }
          );
        });
        clearInterval(this.setupEventListenersInterval);
      }
    }, 1000);
  }

  async ngOnDestroy() {
    this.renderer2.removeChild(document.body, this.script);
  }

  get selectedItemsLength(): number {
    return this.selectionList?.nativeElement?.selectedOptions.selected.length;
  }

  get stringifiedData(): string {
    return JSON.stringify(this.templateData);
  }
  async headerImageInputChange({
    target,
  }: CustomEvent<HTMLInputElement>): Promise<void> {
    const { files } = target as HTMLInputElement;
    if (!files) {
      return;
    }
    this.loading = true;
    const file = files[0];
    const headerFirebaseUrl = await this.imageService
      .apiImagePost(file)
      .toPromise();
    this.loading = false;
    this.headerSrcInput.nativeElement.value = headerFirebaseUrl;

    const { id: boxId } = this.configuration;

    const oldBoxIndex = this.tempTemplateData.boxes.findIndex(
      (b) => b.id === boxId
    );
    const newBox: BoxDetailTemplateReadDto = {
      ...this.tempTemplateData.boxes[oldBoxIndex],
      headerSrc: headerFirebaseUrl,
    };

    this.tempTemplateData.boxes[oldBoxIndex] = newBox;
    console.log(this.headerSrcFileInput);
  }
  async footerImageInputChange({
    target,
  }: CustomEvent<HTMLInputElement>): Promise<void> {
    const { files } = target as HTMLInputElement;
    if (!files) {
      return;
    }
    this.loading = true;

    const file = files[0];
    const footerFirebaseUrl = await this.imageService
      .apiImagePost(file)
      .toPromise();
    this.loading = false;
    this.footerSrcInput.nativeElement.value = footerFirebaseUrl;
    const { id: boxId } = this.configuration;
    const oldBoxIndex = this.tempTemplateData.boxes.findIndex(
      (b) => b.id === boxId
    );
    const newBox: BoxDetailTemplateReadDto = {
      ...this.tempTemplateData.boxes[oldBoxIndex],
      footerSrc: footerFirebaseUrl,
    };
    this.tempTemplateData.boxes[oldBoxIndex] = newBox;
  }

  isIncludes(products: ProductReadDto[], productId: ProductReadDto): boolean {
    return products.some((p) => p.id === productId);
  }
  updateProductListTitle(event: any, productListId: number) {
    const { id: boxId } = this.configuration;
    const oldBoxIndex = this.tempTemplateData.boxes.findIndex(
      (b) => b.id === boxId
    );
    const oldProductListIndex = this.tempTemplateData.boxes[
      oldBoxIndex
    ].productLists.findIndex((pl) => pl.id === productListId);
    const newProductList: ProductListReadDto = {
      ...this.tempTemplateData.boxes[oldBoxIndex].productLists[
        oldProductListIndex
      ],
      title: event.target.value,
    };
    this.tempTemplateData.boxes[oldBoxIndex].productLists[
      oldProductListIndex
    ] = newProductList;
  }
  updateHeader() {
    const { id: boxId } = this.configuration;
    const { headerTitle, footerTitle } = this.form.value;

    const oldBoxIndex = this.tempTemplateData.boxes.findIndex(
      (b) => b.id === boxId
    );
    const newBox: BoxDetailTemplateReadDto = {
      ...this.tempTemplateData.boxes[oldBoxIndex],
      headerTitle,
      footerTitle,
    };
    this.tempTemplateData.boxes[oldBoxIndex] = newBox;
  }

  // async updateBox() {
  //   const { id: boxId } = this.configuration;

  //   const oldBoxIndex = this.tempTemplateData.boxes.findIndex(
  //     (b) => b.id === boxId
  //   );
  //   const newBox: BoxDetailTemplateReadDto = {
  //     ...this.tempTemplateData.boxes[oldBoxIndex],
  //   };
  //   newBox.productLists.forEach((productList) => {
  //     productList.products = productList.products.map((p, index) => {
  //       p.location = index + 1;
  //       return p;
  //     });
  //   });
  //   console.warn(newBox);

  //   this.tempTemplateData.boxes[oldBoxIndex] = newBox;
  //   this.templateData = this.tempTemplateData;
  //   this.tempTemplateData = undefined;
  //   this.snackBar.openFromComponent(SnackBarSuccessComponent, {
  //     verticalPosition: 'top',
  //     horizontalPosition: 'end',
  //     panelClass: 'mat-snack-bar-success',
  //     data: {
  //       title: 'Success !',
  //       message: 'Save box successfully. You must UPDATE to trigger changes.',
  //     },
  //   });
  // }

  productListChange(event: any, productListId: number) {
    const { id: boxId } = this.configuration;
    const { value: selectedProductId, selected } = event.option;
    const oldProducts = this.tempTemplateData.boxes
      .find((b) => b.id === boxId)
      .productLists.find((l) => l.id === productListId).products;
    let newProducts: ProductTemplateReadDto[] = oldProducts.filter(
      (p) => p.id !== selectedProductId
    );
    if (selected) {
      const product = this.products.find((p) => p.id === selectedProductId);
      newProducts = [...oldProducts, product];
      this.updateProductList(boxId, productListId, newProducts);
    } else {
      this.updateProductList(boxId, productListId, newProducts);
    }
    newProducts.forEach((product, index) => {
      product.location = index + 1;
      return product;
    });
  }

  updateProductList(
    boxId: number,
    productListId: number,
    newProducts: ProductListReadDto[]
  ) {
    this.tempTemplateData.boxes
      .find((b) => b.id === boxId)
      .productLists.find((l) => l.id === productListId).products = newProducts;
    this.snackBar.openFromComponent(SnackBarSuccessComponent, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: 'mat-snack-bar-success',
      data: {
        title: 'Success !',
        message:
          'Save product list successfully. You must UPDATE to trigger changes.',
      },
    });
  }

  updateTemplate() {
    this.templateService
      .apiTemplatesIdPut(
        this.tempTemplateData.id,
        convertTemplateDetailReadDtoToTemplateIdPut(this.tempTemplateData)
      )
      .subscribe(() => {
        this.snackBar.openFromComponent(SnackBarSuccessComponent, {
          verticalPosition: 'top',
          horizontalPosition: 'end',
          panelClass: 'mat-snack-bar-success',
          data: {
            title: 'Success !',
            message: 'Update template successfully.',
          },
        });
      });
  }
  goBack() {
    const isNotChanged = isEqual(this.templateData, this.initTemplateData);
    if (!isNotChanged) {
      const result = confirm(
        'All changes will be lost if you go back without saving anything. Are you sure to go back ?'
      );
      if (result) {
        this.router.navigateByUrl('/templates');

        this.snackBar.openFromComponent(SnackBarWarnComponent, {
          verticalPosition: 'top',
          horizontalPosition: 'end',
          panelClass: 'mat-snack-bar-warn',
          data: {
            title: 'Discarded !',
            message: 'Updating template is discarded.',
          },
        });
      }
    } else {
      this.router.navigateByUrl('/templates');
    }
  }

  getTemplateDataForUI() {
    return JSON.stringify(this.tempTemplateData ?? this.templateData);
  }
  resetBox() {
    const { id: boxId } = this.configuration;
    const oldBoxIndex = this.tempTemplateData.boxes.findIndex(
      (b) => b.id === boxId
    );
    console.warn(this.initTemplateData.boxes[oldBoxIndex]);

    this.tempTemplateData.boxes[oldBoxIndex] = {
      ...this.initTemplateData.boxes[oldBoxIndex],
    };
    this.snackBar.openFromComponent(SnackBarSuccessComponent, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: 'mat-snack-bar-success',
      data: {
        title: 'Success !',
        message: 'Reset box successfully. You must UPDATE to trigger changes.',
      },
    });
  }
}
