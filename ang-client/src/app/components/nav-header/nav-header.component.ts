import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent {
  cartQuantity = 0;
  user!:User;
  constructor(cartService:CartService, private userService:UserService){
    cartService.getCartObservables().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }


  onLogout(){
    this.userService.onLogout();
  }

  isAuth(){
    return this.user.token;
  }

}
