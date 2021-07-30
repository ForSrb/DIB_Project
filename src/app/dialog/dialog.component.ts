import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../album/album.component';
import { Photo } from '../models/photo';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  //deletePhoto: Photo;

  constructor(private userService: UserServiceService, public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    //this.deletePhoto = this.userService.getDeletePhoto();
  }

  ngOnInit(): void {
  }

  deleteConfirmation(confirmation: Boolean) {
    this.data.confirmation = confirmation;
    this.dialogRef.close(this.data.confirmation);
  }

}
