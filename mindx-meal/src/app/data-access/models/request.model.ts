export interface MealsRequest {
  s?: string; // name
  f?: string; // first letter of name
}

export interface MealByIdRequest {
  i: string; // id
}

export interface MealsFilterRequest {
  c?: string;
  a?: string;
}
