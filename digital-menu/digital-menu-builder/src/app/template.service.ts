import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Template } from './shared/models/template.model';

@Injectable({ providedIn: 'root' })
export class TemplateService {
  constructor(private _http: HttpClient) {}

  getTemplateById(id: string): Observable<Template> {
    return this._http.get<Template>(`${environment.API_URL}templates/${id}/`);
  }
}
