import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { SubSink } from 'subsink';
import {
  PostInteriorShare,
  PostInteriorShareFailed,
  PostInteriorShareSuccessful,
} from '../store';
import { Location } from '@angular/common';

@Component({
  selector: 'loa-mobile-create-interior-share',
  templateUrl: './create-interior-share.component.html',
  styleUrls: ['./create-interior-share.component.scss'],
})
export class CreateInteriorShareComponent implements OnInit {
  public dataSource;
  public tempImages = [];
  public imagesNew = [];
  public checkImage = false;
  public checkEmpty = true;
  subsink = new SubSink();
  postFormGroup: FormGroup;
  public checkSubmit = false;
  constructor(
    private _loginService: LoginService,
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _actions: Actions,
    private router: Router,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.postFormGroup = this._formBuilder.group({
      content: ['', [Validators.required]],
    });
    this.dataSource = this._loginService.snapshot?.userNode;
    console.log(this._loginService.snapshot?.userNode);
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
    if (this.tempImages.length == 0) {
      this.checkImage = true;
      if (this.postFormGroup.controls.content.value.trim()) {
        this.checkEmpty = false;
      } else {
        this.checkEmpty = true;
      }
    }
  }

  createPost() {
    if (this.tempImages.length == 0) {
      this.checkImage = true;
    }
    if (this.postFormGroup.valid || !this.checkImage) {
      const params = {
        content: this.postFormGroup.controls.content.value,
        listImages: this.tempImages,
      };
      this.getParamPostInteriorShare(params);
    } else {
      const params = {
        content: this.postFormGroup.controls.content.value,
      };
      this.getParamPostInteriorShare(params);
    }
  }

  getParamPostInteriorShare(params) {
    this.checkSubmit = true;
    this._store.dispatch(new PostInteriorShare(params));
    // Add banner fail
    this.subsink.sink = this._actions
      .pipe(ofActionSuccessful(PostInteriorShareFailed))
      .subscribe((translation) => {
        if (translation) {
          this.checkSubmit = false;
        }
      });
    // Add banner successful
    this.subsink.sink = this._actions
      .pipe(ofActionSuccessful(PostInteriorShareSuccessful))
      .subscribe((translation) => {
        if (translation) {
          this.postFormGroup.reset();
          this.tempImages = [];
          this.imagesNew = [];
          this.checkImage = false;
          this.checkSubmit = false;
          this.router.navigate(['/interior-share']);
        }
      });
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
