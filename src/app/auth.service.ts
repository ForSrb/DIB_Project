import { NONE_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { users } from './data/USERS';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private messageListener = new Subject<string>();

  constructor(private router: Router, private dialog: MatDialog) { }

  getMessageListener() {
    return this.messageListener.asObservable();
  }

  loadUsers(): void {
    if(localStorage.getItem('users')==null){
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => localStorage.setItem('users', JSON.stringify(json)));
    }
  }

  getUsers(): User[] {
    let users = localStorage.getItem('users');
    if(users)
      return JSON.parse(users);
    else return [];
  }

  login(username: string, email: string): void {
    let users = this.getUsers();

    users.forEach(user => {
      if(user.username == username && user.email == email) {
        localStorage.setItem('loggedInUser', JSON.stringify(user))
        this.router.navigate(['/users']);
      }
    })

    this.messageListener.next("Pogresni kredencijali!");
  }

  getLoggedInUser() {
    let user = localStorage.getItem('loggedInUser');
    if(user)
      return JSON.parse(user);
    else 
      return null;
  }

  loginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/']);
    })
  }
}
