import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-orders-page',
  templateUrl: './my-orders-page.component.html',
  styleUrls: ['./my-orders-page.component.css']
})
export class MyOrdersPageComponent {
  orders:Order[] = [];
  constructor(private orderService:OrderService, private router:Router, private userService:UserService){
    let orderObservables:Observable<Order[]>;
    orderObservables = orderService.getAllMyOrders(userService.currentUser.id);

    orderObservables.subscribe((orders) => {
      this.orders = orders;
    })
  }

  onRemove(orderID:number){
    this.orderService.deleteOrder(orderID).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl('/orders');
    })
  }

  onAccept(order:Order){
    order.status = "SHIPPED";
    this.orderService.updateOrder(order).subscribe((data) => {
      // this.ngOnInit();
    })
  }

}
