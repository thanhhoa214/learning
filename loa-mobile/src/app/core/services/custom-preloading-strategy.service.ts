import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CustomPreloadingStrategyService implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (route.data?.preload) {
      const delay = route.data?.loadAfterSeconds ?? 0;
      return delay > 0 ? timer(delay * 1000).pipe(map(() => fn())) : fn();
    }
    return of(null);
  }
}
