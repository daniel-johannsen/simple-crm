import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  user: User = new User();
  loading = false;
  birthDate: Date;
  userId:string;

  constructor(private firestore: AngularFirestore, public dialogRef: MatDialogRef<DialogEditUserComponent>) { }

  ngOnInit(): void {

  }

  
  saveUser() {
    this.loading = true;
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
