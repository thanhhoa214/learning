import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { LoginUserNode } from '@loa-mobile/auth/login/store';
import { ConstructionDetailService } from '@loa-mobile/construction/detail/detail.service';
import { GetConstructionQuery } from '@loa-mobile/construction/detail/services';
import { SubSink } from 'subsink';
import { Location } from '@angular/common';
import { ViewWillEnter } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import {
  WriteReviewConstructor,
  WriteReviewConstructorFailed,
  WriteReviewConstructorSuccessful,
} from './store/construction-review.action';
import { NotificationService } from '@loa-shared/services/notification.service';

interface StyleRoom {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss'],
})
export class WriteReviewComponent implements ViewWillEnter, OnDestroy {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedStar = 1;
  tempImages = [];
  imagesNew = [];
  checkImage = false;
  checkEmpty = true;
  checkSubmit = false;
  styleRoom: StyleRoom[];
  slectedStyleRoom = 'MODERN';
  construction: GetConstructionQuery['construction'];
  user: LoginUserNode;
  reviewFormGroup: FormGroup;
  private _subSink = new SubSink();
  private _id: string;
  estimateFrom;
  estimateTo;
  checkFrom = false;
  checkTo = false;
  constructor(
    private _router: Router,
    public location: Location,
    public _detailService: ConstructionDetailService,
    private _loginService: LoginService,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _actions: Actions,
    private _notify: NotificationService
  ) {}

  get areaConfig() {
    return {
      suffix: ' sqm',
      mask: 'separator.3',
      thousandSeparator: ',',
    };
  }

  get costConfig() {
    return {
      suffix: ' đ',
      mask: 'separator.3',
      thousandSeparator: ',',
    };
  }

  get timeConfig() {
    return {
      suffix: ' month',
      mask: 'separator.0',
      thousandSeparator: '',
    };
  }

  ionViewWillEnter(): void {
    this.reviewFormGroup = this._formBuilder.group({
      costFromCtr: [
        '',
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      costToCtr: [
        '',
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      phoneCtr: ['', [Validators.pattern(/^-?(0|[0-9]\d*)?$/)]],
      reviewContentCtr: ['', [Validators.required]],
      areaCtr: ['', [Validators.required]],
      periodCtr: ['', [Validators.required]],
      nameCtrl: ['', Validators.required],
      districtCtrl: ['', Validators.required],
      cityCtrl: ['', Validators.required],
    });

    this.styleRoom = [
      { value: 'MODERN', viewValue: 'CONSTRUCTION_REVIEW.WRITE_REVIEW.modern' },
      {
        value: 'SCANDINAVIAN',
        viewValue: 'CONSTRUCTION_REVIEW.WRITE_REVIEW.scandinavian',
      },
      { value: 'LUXURY', viewValue: 'CONSTRUCTION_REVIEW.WRITE_REVIEW.luxury' },
      {
        value: 'INDUSTRIAL',
        viewValue: 'CONSTRUCTION_REVIEW.WRITE_REVIEW.industrial',
      },
      {
        value: 'CLASSIC',
        viewValue: 'CONSTRUCTION_REVIEW.WRITE_REVIEW.classic',
      },
    ];
    window.scroll(0, 0);
    this._id = this._activatedRoute.snapshot.paramMap.get('id');
    this._detailService.clear(this._id);
    this._detailService.loadConstructionDetail({ id: this._id });
    this._subSink.sink = this._detailService
      .getConstructionDetail$()
      .subscribe((construction) => {
        if (construction) {
          this.construction = construction.construction;
        }
      });
    this.user = this._loginService.snapshot?.userNode;
  }

  createReview() {
    if (this.tempImages.length == 0) {
      this.checkImage = true;
    }

    if (this.reviewFormGroup.valid && !this.checkEmpty && !this.checkImage) {
      const params = {
        phoneNumber: this.reviewFormGroup.controls.phoneCtr.value,
        constructionLocation: this.reviewFormGroup.controls.nameCtrl.value,
        areaSize: this.reviewFormGroup.controls.areaCtr.value,
        designStyle: this.slectedStyleRoom,
        constructionPeriod: this.reviewFormGroup.controls.periodCtr.value,
        constructionCostFrom: this.reviewFormGroup.controls.costFromCtr.value,
        constructionCostTo: this.reviewFormGroup.controls.costToCtr.value,
        review: this.reviewFormGroup.controls.reviewContentCtr.value,
        rating: this.selectedStar,
        construction: this._id,
        listImages: this.tempImages,
        district: this.reviewFormGroup.controls.districtCtrl.value,
        city: this.reviewFormGroup.controls.cityCtrl.value,
      };
      this.getParamReviewConstructor(params);
    } else if (
      this.reviewFormGroup.valid &&
      !this.checkEmpty &&
      this.checkImage
    ) {
      const params = {
        phoneNumber: this.reviewFormGroup.controls.phoneCtr.value,
        constructionLocation: this.reviewFormGroup.controls.nameCtrl.value,
        areaSize: this.reviewFormGroup.controls.areaCtr.value,
        designStyle: this.slectedStyleRoom,
        constructionPeriod: this.reviewFormGroup.controls.periodCtr.value,
        constructionCostFrom: this.reviewFormGroup.controls.costFromCtr.value,
        constructionCostTo: this.reviewFormGroup.controls.costToCtr.value,
        review: this.reviewFormGroup.controls.reviewContentCtr.value,
        rating: this.selectedStar,
        construction: this._id,
        listImages: [],
        district: this.reviewFormGroup.controls.districtCtrl.value,
        city: this.reviewFormGroup.controls.cityCtrl.value,
      };
      this.getParamReviewConstructor(params);
    }
  }

  getParamReviewConstructor(params) {
    this.checkSubmit = true;
    this._store.dispatch(new WriteReviewConstructor(params));
    // Review Constructor fail
    this._subSink.sink = this._actions
      .pipe(ofActionSuccessful(WriteReviewConstructorFailed))
      .subscribe((translation) => {
        if (translation) {
          this.checkSubmit = false;
          this._notify.openSnackBar('Review fails', 'error');
        }
      });
    // Review constructor successful
    this._subSink.sink = this._actions
      .pipe(ofActionSuccessful(WriteReviewConstructorSuccessful))
      .subscribe((translation) => {
        if (translation) {
          this.reviewFormGroup.reset();
          this.tempImages = [];
          this.imagesNew = [];
          this.checkImage = false;
          this.checkSubmit = false;
          this._router.navigateByUrl('/construction');
        }
      });
  }

  rating(ev: Event, star) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    this.selectedStar = parseInt(star) + 1;
  }
  onFileSelected(files) {
    if (files.length > 0) {
      this.checkImage = false;
      for (let i = 0; i < files.length; i++) {
        this.tempImages.push(files[i]);
      }
    }
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagesNew.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  deleteImage(index) {
    this.tempImages.splice(index, 1);
    this.imagesNew.splice(index, 1);
    if (this.tempImages.length == 0) {
      this.checkImage = true;
      if (this.reviewFormGroup.controls.reviewContentCtr.value.trim()) {
        this.checkEmpty = false;
      } else {
        this.checkEmpty = true;
      }
    }
  }

  estimateFromChange(value) {
    if (value) {
      this.estimateFrom = value;
    } else {
      this.checkFrom = false;
      this.estimateFrom = 0;
    }
    if (this.estimateTo) {
      if (parseFloat(this.estimateFrom) >= parseFloat(this.estimateTo)) {
        this.checkFrom = true;
        this.checkTo = false;
      } else {
        this.checkTo = false;
        this.checkFrom = false;
      }
    }
  }

  estimateToChange(value) {
    if (value) {
      this.estimateTo = value;
    } else {
      this.checkTo = false;
      this.estimateTo = 0;
    }
    if (this.estimateFrom) {
      if (parseFloat(this.estimateTo) <= parseFloat(this.estimateFrom)) {
        this.checkFrom = false;
        this.checkTo = true;
      } else {
        this.checkTo = false;
        this.checkFrom = false;
      }
    }
  }

  changeValueContent(ev) {
    if (ev.trim()) {
      this.checkEmpty = false;
    } else {
      this.checkEmpty = true;
    }
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }
}
