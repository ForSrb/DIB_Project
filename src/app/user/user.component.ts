import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Album } from '../models/album';
import { Photo } from '../models/photo';
import { User } from '../models/user';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  loggedInUser: User;
  albums: AlbumWithPhoto[] = [];
  grid: Boolean = true;
  list: Boolean = false;

  constructor(private router: Router, private auth: AuthService, private userService: UserServiceService) {
    this.loggedInUser = this.auth.getLoggedInUser();
    if(this.loggedInUser == null) {
      this.auth.loginDialog();
    }
    else{
      this.grid = this.userService.getGrid();
      this.list = !this.grid;
    }
  }

  ngOnInit(): void {
    if(this.loggedInUser){
      
      this.albums = this.userService.getUserAlbums(this.loggedInUser.id);
      this.albums.forEach(album => {
        album.albumUrl = this.userService.getFirstAlbumPhoto(album.id);
      })
    }

  }

  listView() {
    this.grid = false;
    this.list = true;
  }

  gridView() {
    this.list = false;
    this.grid = true;
  }

  goToAlbum(album: AlbumWithPhoto){
    localStorage.setItem("album", JSON.stringify(album));
    localStorage.setItem("grid", JSON.stringify(this.grid));
    this.router.navigate(['/albums']);
  }
}
export interface AlbumWithPhoto extends Album{
  albumUrl: string;
}
