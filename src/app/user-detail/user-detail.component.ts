import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId: any = '';
  user: User = new User();

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap =>  {
        this.userId = paramMap.get('id');
        console.log('GOT ID:', this.userId);
        this.getUser();
    })
  }


  getUser() {
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
