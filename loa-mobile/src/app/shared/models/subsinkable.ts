import { Component, OnDestroy } from '@angular/core';
import { ViewWillLeave } from '@ionic/angular';
import { SubSink } from 'subsink';

@Component({ template: '' })
export abstract class SubSinkable implements OnDestroy, ViewWillLeave {
  protected _subSink = new SubSink();

  ionViewWillLeave(): void {
    console.log('SubSinkable - ionViewWillLeave');

    this._subSink.unsubscribe();
  }
  ngOnDestroy(): void {
    console.log('SubSinkable - ngOnDestroy');
    this._subSink.unsubscribe();
  }
}
