import { Component } from '@angular/core';
import { FoodServiceService } from 'src/app/services/food.service.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tagsbar',
  templateUrl: './tagsbar.component.html',
  styleUrls: ['./tagsbar.component.css']
})
export class TagsbarComponent {
  tags?:Tag[]
  constructor(foodService:FoodServiceService){
    foodService.getAllTags().subscribe((serverTags) => {
      this.tags = serverTags;
    });
  }

}
