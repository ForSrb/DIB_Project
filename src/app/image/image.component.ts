
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Photo } from '../models/photo';
import { User } from '../models/user';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  selectedPhoto: Photo | any;
  photos: Photo[] = [];
  loggedInUser: User;

  constructor(private userService: UserServiceService, private auth: AuthService, private router: Router) {
    
    this.loggedInUser = this.auth.getLoggedInUser();
    if(this.loggedInUser == null) {
      this.auth.loginDialog();
    }
    else{
      this.selectedPhoto = this.userService.getSelectedPhoto();
      this.photos = this.userService.getAlbumPhotos(this.selectedPhoto.albumId, this.photos);
    }
  }

  changePhoto(direction: string) {
    this.selectedPhoto = this.userService.changePhoto(direction, this.selectedPhoto, this.photos);
    localStorage.setItem('selectedPhoto', JSON.stringify(this.selectedPhoto));
  }

  ngOnInit(): void {
  }

}
