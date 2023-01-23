import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent {
  users:User[] = [];
  constructor(private userService:UserService, private router:Router){
    let userObservables:Observable<User[]>;
    userObservables =userService.getAllUsers();

    userObservables.subscribe((users) => {
      this.users = users;
    })
  }

  onUpdate(user:User, result?:boolean){
    user.isAdmin = !result;
    this.userService.updateUser(user).subscribe((data) => {
      // this.ngOnInit();
    })
  }

  onRemove(id:string){
    this.userService.deleteUser(id).subscribe((data) => {
      console.log(data);
      // this.router.navigateByUrl('/users');
      this.users.filter((user) => user.id!==id);
    })
  }

}
