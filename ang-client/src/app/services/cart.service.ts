import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalStoroage();
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addCartItem(food:Food):void{
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if(cartItem){
      return;
    } 
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  getCart(): Cart{
    return this.cartSubject.value;
  }

  removeCartItem(foodId: string):void {
    this.cart.items = this.cart.items.filter(item => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if(!cartItem) return;
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservables():Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage():void {
    this.cart.totalPrice = this.cart.items.reduce((prev, current) => prev + current.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prev, current) => prev + current.quantity, 0);

    const cartJSON = JSON.stringify(this.cart);
    localStorage.setItem("Cart", cartJSON);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStoroage():Cart {
    const cartJSON = localStorage.getItem("Cart");
    return cartJSON? JSON.parse(cartJSON): new Cart();
  }
}
