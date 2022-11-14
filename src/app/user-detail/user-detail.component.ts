import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import {Location} from '@angular/common';

//The module \"\"@angular/fire/compat/firestore\"\" has no exported member \"AngularFirestore\".

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId: any = '';
  user: User = new User();

  constructor(private firestore: AngularFirestore, 
    private route: ActivatedRoute, 
    public dialogRef: MatDialog,
    private router: Router,
    private _location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap =>  {
        this.userId = paramMap.get('id');
        console.log('GOT ID:', this.userId);
        this.getUser();
    })
  }


  getUser() {
    if (this.userId) {
      this.firestore
        .collection('users')
        .doc(this.userId)
        .valueChanges()
        .subscribe((user: any) => {
          this.user = new User(user);
          console.log('Retrieved user:', this.user);
        });      
    }
  }


  editMenu() {
    const dialog = this.dialogRef.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }


  editUser() {
    const dialog = this.dialogRef.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }


  back(): void {
    this._location.back();
  }


  deleteUser() {
    if (this.userId) {
      this.firestore
        .collection('users')
        .doc(this.userId)
        .delete();
        
      this.back();
    }
  }

}
