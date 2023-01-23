import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods } from '../sample/data';
import { sample_tags } from '../sample/tags';
import { SERVER_URL } from '../shared/constants/url';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {

  constructor(private http:HttpClient) { }

  getAllFoods():Observable<Food[]>{
    return this.http.get<Food[]>(SERVER_URL+'/foods');
  }

  getAllFoodsBySearchTerm(term:string):Observable<Food[]>{
    return this.http.get<Food[]>(SERVER_URL+'/foods/search/'+term);
  }

  getFoodByID(foodID:string):Observable<Food>{
    return this.http.get<Food>(SERVER_URL+"/foods/food/"+foodID);
  }

  getAllTags():Observable<Tag[]> {
    return this.http.get<Tag[]>(SERVER_URL+'/tags');
  }

  getAllFoodsByTag(tag:string):Observable<Food[]>{
    return this.http.get<Food[]>(SERVER_URL+'/foods/tag/'+tag);
  }
}
