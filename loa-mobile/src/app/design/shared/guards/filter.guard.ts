import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { DesignListingService } from '@loa-mobile/design/listing/listing.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetFilterGuard implements CanActivate {
  constructor(private _listingService: DesignListingService) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this._listingService.saveFilters({});
    return true;
  }
}
