import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MealsRequest } from '../models/request.model';
import { AreasResponse, CategoriesResponse, IngredientsResponse, MealsResponse } from '../models/response.model';

@Injectable({ providedIn: 'root' })
export class MealService {
  constructor(private http: HttpClient) {}

  getMeals(params: MealsRequest = {}) {
    return this.http
      .get<MealsResponse>(`${environment.apiUrl}/search.php?s=${params.s || ''}&f=${params.f || ''}`)
      .pipe(map(({ meals }) => meals));
  }
  getMealById(id: string) {
    return this.http.get<MealsResponse>(`${environment.apiUrl}/lookup.php?i=${id}`).pipe(map(({ meals }) => meals[0]));
  }

  getCategories() {
    return this.http
      .get<CategoriesResponse>(`${environment.apiUrl}/list.php?c=list`)
      .pipe(map(({ meals: categories }) => categories.map(c => c.strCategory)));
  }

  getAreas() {
    return this.http
      .get<AreasResponse>(`${environment.apiUrl}/list.php?a=list`)
      .pipe(map(({ meals: areas }) => areas.map(c => c.strArea)));
  }

  getIngredients() {
    return this.http
      .get<IngredientsResponse>(`${environment.apiUrl}/list.php?i=list`)
      .pipe(map(({ meals: ingredients }) => ingredients.map(c => c.strIngredient)));
  }
}
