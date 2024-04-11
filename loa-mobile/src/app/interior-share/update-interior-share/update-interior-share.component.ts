import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { SubSink } from 'subsink';
import { Location } from '@angular/common';
import {
  AdminUpdateTopic,
  AdminUpdateTopicFailed,
  AdminUpdateTopicSuccessful,
  LoadInteriorShareByID,
} from '../store/interior-share.action';
import { InteriorShareState } from '../store/interior-share.state';
@Component({
  selector: 'loa-mobile-update-interior-share',
  templateUrl: './update-interior-share.component.html',
  styleUrls: ['./update-interior-share.component.scss'],
})
export class UpdateInteriorShareComponent implements OnInit {
  public dataSource;
  public tempImages = [];
  public imagesNew = [];
  public checkImage = false;
  public checkImageOld = false;
  public postID;
  public imagesOld = [];
  public arrDelete = [];
  subsink = new SubSink();
  postFormGroup: FormGroup;
  public checkSubmit = false;
  public checkEmpty = false;
  constructor(
    private _loginService: LoginService,
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _actions: Actions,
    private router: Router,
    public location: Location,
    private activatedRoute: ActivatedRoute,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.postFormGroup = this._formBuilder.group({
      content: ['', [Validators.required]],
    });
    this.dataSource = this._loginService.snapshot?.userNode;
    this.postID = +this.activatedRoute.snapshot.paramMap.get('id');
    this.loadDataPost(this.postID);
  }

  loadDataPost(id) {
    this._store.dispatch(new LoadInteriorShareByID({ id }));
    this.subsink.sink = this._store
      .select(InteriorShareState.getSelectedNode)
      .subscribe(this._fillDataSource.bind(this));
  }

  private _fillDataSource(nodeConnection: any): void {
    if (!nodeConnection) return;
    if (nodeConnection) {
      if (this.postID == nodeConnection.id) {
        this.postFormGroup.setValue({
          content: nodeConnection.content,
        });
        this.imagesOld = [];
        if (nodeConnection.images.length > 0) {
          this.checkImageOld = false;
          this.imagesOld = nodeConnection.images;
          // this.tempImages = nodeConnection.thumbnail
        } else {
          this.checkImageOld = true;
        }
        if (nodeConnection.content.trim()) {
          this.checkEmpty = false;
        } else {
          this.checkEmpty = true;
        }
        this.postFormGroup.setValue({
          content: nodeConnection.content,
        });
      }
    }
    this._cdRef.detectChanges();
  }
  updatePost() {
    console.log(this.checkImage);
    if (this.tempImages.length == 0 && this.imagesOld.length == 0) {
      this.checkImage = true;
    }
    if (this.postFormGroup.valid || !this.checkImage) {
      const params = {
        content: this.postFormGroup.controls.content.value,
        imagesRemove: this.arrDelete,
        listImages: this.tempImages,
        id: this.postID,
      };
      this.adminUpdateTopic(params);
    } else {
      const params = {
        content: this.postFormGroup.controls.content.value,
        imagesRemove: this.arrDelete,
        id: this.postID,
      };
      this.adminUpdateTopic(params);
    }
  }

  adminUpdateTopic(params) {
    this.checkSubmit = true;
    this._store.dispatch(new AdminUpdateTopic(params));
    // Update Post Fail
    this.subsink.sink = this._actions
      .pipe(ofActionSuccessful(AdminUpdateTopicFailed))
      .subscribe((translation) => {
        if (translation) {
          this.checkSubmit = false;
        }
      });
    // Update Post Successfully
    this.subsink.sink = this._actions
      .pipe(ofActionSuccessful(AdminUpdateTopicSuccessful))
      .subscribe((translation) => {
        if (translation) {
          this.checkSubmit = false;
          this.router.navigate(['/interior-share']);
        }
      });
  }

  onFileSelected(files) {
    console.log(files);
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
    if (this.tempImages.length == 0 && this.imagesOld.length == 0) {
      this.checkImage = true;
      if (this.postFormGroup.controls.content.value.trim()) {
        this.checkEmpty = false;
      } else {
        this.checkEmpty = true;
      }
    }
  }

  deleteImageOld(index, id) {
    const temp = this.imagesOld.filter((item) => item.id !== id);
    this.imagesOld = temp;
    this.arrDelete.push(id);
    if (this.imagesOld.length == 0 && this.tempImages.length == 0) {
      this.checkImage = true;
      if (this.postFormGroup.controls.content.value.trim()) {
        this.checkEmpty = false;
      } else {
        this.checkEmpty = true;
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
    this.subsink.unsubscribe();
  }
}
