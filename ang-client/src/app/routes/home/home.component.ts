import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodServiceService } from 'src/app/services/food.service.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  foods:Food[] = [];

  constructor(private foods_service:FoodServiceService, activatedRoute: ActivatedRoute){
    activatedRoute.params.subscribe((params) => {
      let foodObservable:Observable<Food[]>;
      if(params.searchTerm){
        foodObservable = foods_service.getAllFoodsBySearchTerm(params.searchTerm);
      } else if(params.tagID) {
        foodObservable = foods_service.getAllFoodsByTag(params.tagID);
      } else {
        foodObservable = foods_service.getAllFoods();
      }
      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
        // console.log(this.foods[0]["_id"]);
      })
    });
  }

}
