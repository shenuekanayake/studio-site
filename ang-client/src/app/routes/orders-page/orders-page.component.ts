import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit{
  orders:Order[] = [];
  constructor(private orderService:OrderService, private router:Router){
    let orderObservables:Observable<Order[]>;
    orderObservables = orderService.getAllOrders();

    orderObservables.subscribe((orders) => {
      this.orders = orders;
    })
  }
  ngOnInit(): void {
    socket.on("load-data", (res) => {
      console.log("Loading Data");
      let orderObservables:Observable<Order[]>;
      orderObservables = this.orderService.getAllOrders();

      orderObservables.subscribe((orders) => {
        this.orders = orders;
      });
    })
    
  }

  onRemove(orderID:number){
    this.orderService.deleteOrder(orderID).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl('/orders');
      // socket.emit("data-change", data);
    })
  }

  onAccept(order:Order){
    order.status = "SHIPPED";
    this.orderService.updateOrder(order).subscribe((data) => {
      // this.ngOnInit();
    })
  }

}
