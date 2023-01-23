import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SERVER_URL } from '../shared/constants/url';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { User } from '../shared/models/User';
import { CartService } from './cart.service';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject =
  new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient, private toastrService:ToastrService, private cartService:CartService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  onLogin(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(SERVER_URL+'/users/login', userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to MEHA. ${user.name}...`);
          // this.cartService.clearCart();
        },
        error: (error) => {
          this.toastrService.error(error.error, 'Login Failed!');
        }
      })
    )
  }

  onRegister(userRegisiter: IUserRegister):Observable<User>{
    return this.http.post<User>(SERVER_URL+'/users/register', userRegisiter).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Your account is created - ${user.name}...`, 'Reistration Completed');
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, "Reistration Failed")
        }
      })
    )
  }

  onLogout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user))

  }

  private getUserFromLocalStorage():User{
    const userJSON = localStorage.getItem(USER_KEY);

    if(userJSON) return JSON.parse(userJSON) as User;
    return new User();
  }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(SERVER_URL+'/users');
  }

  updateUser(user:User):Observable<User>{
    console.log(user);
    return this.http.patch<User>(SERVER_URL+'/users/'+user.id, user).pipe(
      tap({
        next: (order) => {
          this.toastrService.success("User updated successfully", "User Updated");
        },
        error: (error) => {
          console.log(error.error);
        }
      })
    )
  }

  deleteUser(id:string){
    console.log(id);
    return this.http.delete<User>(SERVER_URL+'/users/'+id).pipe(
      tap({
        next: (order) => {
          this.toastrService.success("User Deleted completely", "User Removed");
        },
        error: (error) => {
          console.log(error.error);
        }
      })
    )
  }

}
