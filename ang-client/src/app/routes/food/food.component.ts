import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodServiceService } from 'src/app/services/food.service.service';
import { Food } from 'src/app/shared/models/Food';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { RatesService } from 'src/app/services/rates.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent {
  result!:any;
  raters:number = 0;
  rate:number = 0;
  rates:any[] = [];
  public form!: FormGroup;
  food!:Food;
  constructor(activatedRoute:ActivatedRoute, foodService:FoodServiceService, private cartService:CartService, private router:Router,
    private rateService:RatesService, private fb:FormBuilder, private userService:UserService){
      this.form = this.fb.group({
        rating1: ['', Validators.required]
      });
    activatedRoute.params.subscribe((params) => {
      if(params.foodID){
        foodService.getFoodByID(params.foodID).subscribe((serverFood) => {
          this.food = serverFood;
          this.rateService.getRateOfItem(this.food.id).subscribe((rs) => {
            console.log("rates");
            console.log(rs);
            this.result = rs;
            this.raters = this.result.raters;
            this.result.rates.forEach((element:any) => {
              this.rate = this.rate + element.rate;
            });
            this.rate = Math.floor(this.rate/this.raters);
          })
        });
      }
    });
  }

  addToCart(){
    this.cartService.addCartItem(this.food);
    this.router.navigateByUrl("/cart-page");
  }

  addRate(foodID:string, value:number){
    let obj:any = {user:this.userService.currentUser.email, userID:this.userService.currentUser.id, rate:value};
    this.rates.push(obj);
    let rate = {
      item: foodID,
      rates: this.rates
    }
    this.rateService.addRate(rate).subscribe((data) => {
      // this.ngOnInit();
      console.log(data);
    })
  }

}
