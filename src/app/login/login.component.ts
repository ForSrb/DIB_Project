import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string = "";
  private messageSub: Subscription;

  constructor(private auth: AuthService, private userService: UserServiceService) {

    this.messageSub = this.auth.getMessageListener().subscribe(messageStatus => {
      this.message = messageStatus;
    })

    localStorage.clear();

   }

  ngOnInit(): void {
    this.auth.loadUsers();
    this.userService.loadAlbums();
    this.userService.loadPhotos();
  }

  
  onLogin(form: NgForm) {
    this.message = "";
    if (form.invalid) {
        return;
    }
    this.auth.login(form.value.username, form.value.email);
  }

  ngOnDestroy(): void {
    this.messageSub.unsubscribe();
  }

}
