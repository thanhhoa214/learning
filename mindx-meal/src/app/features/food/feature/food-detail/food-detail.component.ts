import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MealService } from 'src/app/data-access/services/meal.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent implements OnInit {
  meal$ = this.activatedRoute.params.pipe(
    map(({ id }) => id as string),
    switchMap(id => this.mealService.getMealById(id))
  );

  constructor(private activatedRoute: ActivatedRoute, private mealService: MealService) {}

  ngOnInit(): void {}
}
