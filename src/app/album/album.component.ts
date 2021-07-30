import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Photo } from '../models/photo';
import { User } from '../models/user';
import { UserServiceService } from '../user-service.service';
import { AlbumWithPhoto } from '../user/user.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  loggedInUser: User;
  album: AlbumWithPhoto | any;
  photos: Photo[] = []
  grid: Boolean = true;
  list: Boolean = false;
  confirmation: Boolean = false;

  constructor(private userService: UserServiceService, private router: Router, private auth: AuthService,
              public dialog: MatDialog) { 
    
    this.loggedInUser = this.auth.getLoggedInUser();
    if(this.loggedInUser == null) {
      this.auth.loginDialog();
    }
    else {
      this.album = this.userService.getPickedAlbum();
      this.photos = this.userService.getAlbumPhotos(this.album.id, this.photos);
    }
 
  }

  ngOnInit(): void {
  }

  listView() {
    this.grid = false;
    this.list = true;
  }

  gridView() {
    this.list = false;
    this.grid = true;
  }

  openPhoto(photo: Photo) {
    localStorage.setItem('selectedPhoto', JSON.stringify(photo));
    this.router.navigate(['/photos']);
  }

  returnToAlbums() {
    this.router.navigate(['/users'])
  }

  search(form: NgForm) {
    if (form.invalid) {
        return;
    }
    this.photos = this.userService.getSearchedPhotos(form.value.photo, this.album.id);
  }

  openDialog(photo: Photo) {
    //localStorage.setItem('deletePhoto', JSON.stringify(photo));
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '700px',
      data: {photo: photo, confirmation: this.confirmation}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deletePhoto(photo.id);
      }
    })
  }

  deletePhoto(id: number){
    this.photos = this.userService.deletePhoto(id, this.photos);
  }
}

export interface DialogData{
  photo: Photo;
  confirmation: Boolean;
}
