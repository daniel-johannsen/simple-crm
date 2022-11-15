import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-edit-assets',
  templateUrl: './dialog-edit-assets.component.html',
  styleUrls: ['./dialog-edit-assets.component.scss']
})
export class DialogEditAssetsComponent implements OnInit {

  user: User = new User();
  loading = false;
  userId:string;

  constructor(private firestore: AngularFirestore, public dialogRef: MatDialogRef<DialogEditAssetsComponent>) { }

  ngOnInit(): void {
  }

  
  saveUser() {
    this.loading = true;
    if (this.userId) {
      this.firestore
        .collection('users')
        .doc(this.userId)
        .update(this.user.toJSON())
        .then(() => {        
          this.loading = false;
          this.dialogRef.close();
        })      
    }
  }

}
