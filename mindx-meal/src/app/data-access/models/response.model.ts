import { Area, Category, Ingredient, Meal, MealBrief } from './entity.model';

export interface MealsResponse {
  meals: Meal[];
}

export interface MealsFilterResponse {
  meals: MealBrief[];
}

export interface CategoriesResponse {
  meals: Category[];
}

export interface AreasResponse {
  meals: Area[];
}

export interface IngredientsResponse {
  meals: Ingredient[];
}
