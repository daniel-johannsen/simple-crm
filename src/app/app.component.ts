import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simple-crm';

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.afAuth.signOut();
  }
}
