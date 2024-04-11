import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { DesignDetailState } from '../detail/store';
import { DesignListingState } from '../listing/store';

@State<Record<string, never>>({
  name: 'design',
  defaults: {},
  children: [DesignListingState, DesignDetailState],
})
@Injectable()
export class DesignState {}
