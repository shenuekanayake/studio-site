import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button'; 
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from "@auth0/angular-jwt";
import { ToastrModule } from 'ngx-toastr';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatToolbarModule} from '@angular/material/toolbar';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { ErrorComponent } from './core/components/error/error.component';
import { BasketButtonComponent } from './core/components/basket-button/basket-button.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HomeComponent } from './routes/home/home.component';
import { SigninComponent } from './routes/signin/signin.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { RatingModule } from 'ng-starrating';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { SearchComponent } from './components/search/search.component';
import { FoodComponent } from './routes/food/food.component';
import { TagsbarComponent } from './components/tagsbar/tagsbar.component';
import { CartComponent } from './routes/cart/cart.component';
import { TitleComponent } from './components/title/title.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputContainerComponent } from './components/input-container/input-container.component';
import { InputValidationComponent } from './components/input-validation/input-validation.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { DefaultButtonComponent } from './components/default-button/default-button.component';
import { RegisterPageComponent } from './routes/register-page/register-page.component';
import { CheckoutPageComponent } from './routes/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/order-items-list/order-items-list.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentPageComponent } from './routes/payment-page/payment-page.component';
import { PayButtonComponent } from './components/pay-button/pay-button.component';
import { OrdersPageComponent } from './routes/orders-page/orders-page.component';
import { MyOrdersPageComponent } from './routes/my-orders-page/my-orders-page.component';
import { UsersPageComponent } from './routes/users-page/users-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ErrorComponent,
    BasketButtonComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SigninComponent,
    NavHeaderComponent,
    SearchComponent,
    FoodComponent,
    TagsbarComponent,
    CartComponent,
    TitleComponent,
    NotFoundComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RegisterPageComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    PaymentPageComponent,
    PayButtonComponent,
    OrdersPageComponent,
    MyOrdersPageComponent,
    UsersPageComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatMenuModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RatingModule,
    NgxStarRatingModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({config:{throwNoTokenError: true}})
  ],
  providers: [{provide:HTTP_INTERCEPTORS,  useClass:AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
