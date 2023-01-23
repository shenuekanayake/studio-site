import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent {

  order:Order = new Order();
  constructor(private orderService:OrderService, private router: Router, private userService:UserService, private toastrService:ToastrService,
    private cartService:CartService){
    orderService.getNewOrderForCurrentUser(userService.currentUser.id).subscribe({
      next: (order) => {
        this.order = order;
      },
      error: (errorR) => {
        console.log(errorR.error);
        toastrService.error(errorR.error, "Error Occured.");
        router.navigateByUrl('/checkout');
      }
    })
  }

  payOrder(){
    this.order.status = "PAYED";
    this.order.user = this.userService.currentUser;
    this.orderService.create(this.order).subscribe({
      next: () => {
        this.cartService.clearCart();
        socket.emit("data-change", {load:true});
        this.router.navigateByUrl('/');
      },
      error: (errorR) => {
        this.toastrService.error(errorR.error, "Payment Failed.");
      }
    })
  }
}
