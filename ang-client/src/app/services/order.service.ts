import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { SERVER_URL } from '../shared/constants/url';
import { Order } from '../shared/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient,  private toastrService:ToastrService) { }

  create(order:Order){
    return this.http.post<Order>(SERVER_URL+'/orders/create', order);
  }

  getAllOrders(){
    return this.http.get<Order[]>(SERVER_URL+'/orders');
  }

  getAllMyOrders(username:string){
    return this.http.get<Order[]>(SERVER_URL+'/orders/byUser/'+username);
  }

  getNewOrderForCurrentUser(id:string):Observable<Order>{
    return this.http.get<Order>(SERVER_URL+'/orders/newOrderForCurrentUser/'+id);
  }

  updateOrder(order:Order):Observable<Order>{
    console.log("Update");
    return this.http.patch<Order>(SERVER_URL+'/orders/'+order.id, order).pipe(
      tap({
        next: (order) => {
          this.toastrService.success("Order details Updated", "Order Delivered");
        },
        error: (error) => {
          console.log(error.error);
        }
      })
    )
  }

  deleteOrder(id:number){
    console.log(id);
    return this.http.delete<Order>(SERVER_URL+'/orders/'+id).pipe(
      tap({
        next: (order) => {
          this.toastrService.success("Order Deleted completely", "Order Removed");
        },
        error: (error) => {
          console.log(error.error);
        }
      })
    )
  }

}
