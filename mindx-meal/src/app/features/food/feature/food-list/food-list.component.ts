import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { MealService } from 'src/app/data-access/services/meal.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent {
  searchControl = new FormControl();

  meals$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(f => this.mealSerivce.getMeals({ f }))
  );
  categories$ = this.mealSerivce.getCategories();
  areas$ = this.mealSerivce.getAreas();
  ingredients$ = this.mealSerivce.getIngredients();

  constructor(private mealSerivce: MealService) {}
}
