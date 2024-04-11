import { ChangeDetectorRef, Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions, ofActionSuccessful, Store } from "@ngxs/store";
import { SubSink } from "subsink";
import {
  LoadReviewConstructorById,
  ReviewState,
  UpdateReviewConstructor,
  UpdateReviewConstructorFailed,
  UpdateReviewConstructorSuccessful,
} from "../store";
interface StyleRoom {
  value: string;
  viewValue: string;
}
@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"],
})
export class UpdateComponent {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedStar = 1;
  tempImages = [];
  imagesNew = [];
  checkImage = false;
  checkEmpty = true;
  checkSubmit = false;
  styleRoom: StyleRoom[];
  slectedStyleRoom = "MODERN";
  imagesOld = [];
  arrDelete = [];
  reviewFormGroup: FormGroup;
  private _subSink = new SubSink();
  private _id: string;
  dataSourse;
  estimateFrom;
  estimateTo;
  checkFrom = false;
  checkTo = false;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _actions: Actions,
    private _cdRef: ChangeDetectorRef
  ) {}

  get areaConfig() {
    return {
      suffix: " sqm",
      mask: "separator.3",
      thousandSeparator: ",",
    };
  }

  get costConfig() {
    return {
      suffix: " đ",
      mask: "separator.3",
      thousandSeparator: ",",
    };
  }

  get timeConfig() {
    return {
      suffix: " month",
      mask: "separator.0",
      thousandSeparator: "",
    };
  }

  ionViewWillEnter(): void {
    this.reviewFormGroup = this._formBuilder.group({
      costFromCtr: [
        "",
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      costToCtr: [
        "",
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      phoneCtr: ["", [Validators.pattern(/^-?(0|[0-9]\d*)?$/)]],
      reviewContentCtr: ["", [Validators.required]],
      areaCtr: ["", [Validators.required]],
      periodCtr: ["", [Validators.required]],
      nameCtrl: ["", Validators.required],
      districtCtrl: ["", Validators.required],
      cityCtrl: ["", Validators.required],
    });

    this.styleRoom = [
      { value: "MODERN", viewValue: "CONSTRUCTION_REVIEW.WRITE_REVIEW.modern" },
      {
        value: "SCANDINAVIAN",
        viewValue: "CONSTRUCTION_REVIEW.WRITE_REVIEW.scandinavian",
      },
      { value: "LUXURY", viewValue: "CONSTRUCTION_REVIEW.WRITE_REVIEW.luxury" },
      {
        value: "INDUSTRIAL",
        viewValue: "CONSTRUCTION_REVIEW.WRITE_REVIEW.industrial",
      },
      {
        value: "CLASSIC",
        viewValue: "CONSTRUCTION_REVIEW.WRITE_REVIEW.classic",
      },
    ];
    this._id = this._activatedRoute.snapshot.paramMap.get("id");
    this.loadDataById(this._id);
  }
  loadDataById(id) {
    this._store.dispatch(new LoadReviewConstructorById({ id }));
    this._subSink.sink = this._store
      .select(ReviewState.getSelectedNode)
      .subscribe(this._fillDataSource.bind(this));
  }

  private _fillDataSource(nodeConnection: any): void {
    if (!nodeConnection) return;
    if (nodeConnection) {
      this.setValueForForm(nodeConnection);
      this.dataSourse = nodeConnection;
    }
    this._cdRef.detectChanges();
  }

  setValueForForm(data) {
    this.reviewFormGroup.setValue({
      costFromCtr: data.constructionCostFrom,
      costToCtr: data.constructionCostTo,
      phoneCtr: data.phoneNumber,
      reviewContentCtr: data.review,
      areaCtr: data.areaSize,
      periodCtr: data.constructionPeriod,
      nameCtrl: data.constructionLocation,
      districtCtrl: data.district,
      cityCtrl: data.city,
    });
    this.estimateFrom = data.constructionCostFrom;
    this.estimateTo = data.constructionCostTo;
    this.slectedStyleRoom = data.designStyle;
    this.selectedStar = data.rating;
    if (data.images.length > 0) {
      this.imagesOld = data.images;
    }
  }
  updateReview() {
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
      listImages: this.tempImages,
      imagesRemove: this.arrDelete,
      id: this._id,
    };
    this.userUpdateReviewConstructor(params);
  }

  userUpdateReviewConstructor(params) {
    this.checkSubmit = true;
    this._store.dispatch(new UpdateReviewConstructor(params));
    // Update Post Fail
    this._subSink.sink = this._actions
      .pipe(ofActionSuccessful(UpdateReviewConstructorFailed))
      .subscribe((translation) => {
        if (translation) {
          this.checkSubmit = false;
        }
      });
    // Update Post Successfully
    this._subSink.sink = this._actions
      .pipe(ofActionSuccessful(UpdateReviewConstructorSuccessful))
      .subscribe((translation) => {
        if (translation) {
          this.checkSubmit = false;
          this.imagesNew = [];
          this.imagesOld = [];
          this.checkImage = false;
          this.arrDelete = [];
          this.reviewFormGroup.reset();
          this._router.navigate(["/menu/my-construction-review/review"]);
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

  deleteImage(index) {
    this.tempImages.splice(index, 1);
    this.imagesNew.splice(index, 1);
    if (this.tempImages.length == 0 && this.imagesOld.length == 0) {
      this.checkImage = true;
    }
  }

  deleteImageOld(id) {
    const temp = this.imagesOld.filter((item) => item.id !== id);
    this.imagesOld = temp;
    this.arrDelete.push(id);
    if (this.imagesOld.length == 0 && this.tempImages.length == 0) {
      this.checkImage = true;
    }
  }

  changeValueContent(ev) {
    if (ev != null) {
      if (ev.trim() == "") {
        this.checkEmpty = false;
      } else {
        this.checkEmpty = true;
      }
    }
  }
}
