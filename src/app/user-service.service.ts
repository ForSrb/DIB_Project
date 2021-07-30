import { Injectable } from '@angular/core';
import { albums } from './data/ALBUMS';
import { photos } from './data/PHOTOS';
import { Album } from './models/album';
import { Photo } from './models/photo';
import { AlbumWithPhoto } from './user/user.component';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

  getGrid() {
    let grid = localStorage.getItem('grid');
    if(grid)
      return JSON.parse(grid);
    else return true;
  }

  loadAlbums(): void {
    if(localStorage.getItem('albums')==null){
      fetch('https://jsonplaceholder.typicode.com/albums')
        .then(response => response.json())
        .then(json => localStorage.setItem('albums', JSON.stringify(json)));
    }

      
  }

  getAlbums(): AlbumWithPhoto[] {
    let albums = localStorage.getItem('albums');
    if(albums)
      return JSON.parse(albums);
    else return [];
  }

  loadPhotos() {
    if(localStorage.getItem('photos')==null){
      fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(json => localStorage.setItem('photos', JSON.stringify(json)));
    }
  }

  getPhotos(): Photo[] {
    let photos = localStorage.getItem('photos');
    if(photos)
      return JSON.parse(photos);
    else return [];
  }

  getUserAlbums(id: number) {
    let albums = this.getAlbums();
    let userAlbums : AlbumWithPhoto[] = [];

    albums.forEach(album => {
      if(album.userId == id) {
        userAlbums.push(album);
      }
    })

    return userAlbums;
  }

  getAlbumPhotos(id: number, photos: Photo[]) {
    let allPhotos = this.getPhotos();

    allPhotos.forEach(photo => {
      if(photo.albumId == id) {
        photos.push(photo);
      }
    })

    return photos;
  }

  getFirstAlbumPhoto(id: number) {
    let allPhotos = this.getPhotos();
    let firstPhotoUrl : string = "";

    for (let i = 0; i < allPhotos.length; i++) {
      const photo = allPhotos[i];
      if(photo.albumId == id) {
        firstPhotoUrl = photo.url;
        break;
      }
    }

    return firstPhotoUrl;
  }

  getPickedAlbum() {
    let album = localStorage.getItem('album');
    if(album)
      return JSON.parse(album);
    else return null;
  }

  getSearchedPhotos(keyWord: string, albumId: number) {
    let searchedPhotos: Photo[] = [];
    let albumPhotos : Photo[] = [];
    albumPhotos = this.getAlbumPhotos(albumId, albumPhotos);

    albumPhotos.forEach(photo => {
      if (photo.title.includes(keyWord)){
        searchedPhotos.push(photo);
      }
    })

    return searchedPhotos;
  }

  deletePhoto(id: number, photos: Photo[]) {
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      
      if(photo.id == id) {
        photos.splice(i, 1);
        break;
      }
    }

    let allPhotos = this.getPhotos();
    for (let i = 0; i < allPhotos.length; i++) {
      const photo = allPhotos[i];
      
      if(photo.id == id) {
        allPhotos.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('photos', JSON.stringify(allPhotos));

    return photos;
  }

  getSelectedPhoto() {
    let photo = localStorage.getItem('selectedPhoto');
    if(photo)
      return JSON.parse(photo);
    else return null;
  }

  changePhoto(direction: string, presentPhoto: Photo, allPhotos: Photo[]) : Photo {
    let dir = direction == "right" ? 1 : -1;
    let nextPhotoIndex = 0;

    for (let i = 0; i < allPhotos.length; i++) {
      const photo = allPhotos[i];

      if(photo.id == presentPhoto.id) {
        if(i == 0 && dir == -1) 
          nextPhotoIndex = allPhotos.length - 1;
        else if (i == allPhotos.length - 1 && dir == 1) 
          nextPhotoIndex = 0
        else 
          nextPhotoIndex = (i + dir) % allPhotos.length;
        
        break;
      }
      
    }

    let nextPhoto = allPhotos[nextPhotoIndex];

    return nextPhoto;
  }

}
