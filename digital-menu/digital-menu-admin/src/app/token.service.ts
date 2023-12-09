import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _tokenSubject: BehaviorSubject<string> = new BehaviorSubject(
    localStorage.getItem('accessToken')
  );

  getAccessToken$(): Observable<string> {
    return this._tokenSubject.asObservable();
  }
  updateAccessToken(token: string): void {
    this._tokenSubject.next(token);
    localStorage.setItem('accessToken', token);
  }
  removeAccessToken(): void {
    this._tokenSubject.next('');
    localStorage.clear();
  }
  snapshot(): { getAccessToken: () => string } {
    const getAccessToken = () => this._tokenSubject.value;
    return { getAccessToken };
  }
}
