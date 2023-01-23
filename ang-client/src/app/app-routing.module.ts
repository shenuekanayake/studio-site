import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeModule } from './features/home/home.module';
// import { OrdersModule } from './features/orders/orders.module';
// import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { rootPaths } from './core/constants/root-paths';
import { CartComponent } from './routes/cart/cart.component';
import { CheckoutPageComponent } from './routes/checkout-page/checkout-page.component';
import { FoodComponent } from './routes/food/food.component';
import { HomeComponent } from './routes/home/home.component';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { MyOrdersPageComponent } from './routes/my-orders-page/my-orders-page.component';
import { OrdersPageComponent } from './routes/orders-page/orders-page.component';
import { PaymentPageComponent } from './routes/payment-page/payment-page.component';
import { RegisterPageComponent } from './routes/register-page/register-page.component';
import { UsersPageComponent } from './routes/users-page/users-page.component';
// import { UserModule } from './features/user/user.module';
// import { RestaurantsModule } from './features/restaurants/restaurants.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'tag/:tagID', component: HomeComponent },
  { path: 'food/:foodID', component:FoodComponent },
  { path: 'cart-page', component:CartComponent },
  { path: 'login', component:LoginPageComponent },
  { path: 'register', component:RegisterPageComponent },
  { path: 'checkout', component:CheckoutPageComponent },
  { path: 'payment', component:PaymentPageComponent },
  { path: 'orders', component:OrdersPageComponent },
  { path: 'my-orders', component:MyOrdersPageComponent },
  { path: 'users', component:UsersPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
