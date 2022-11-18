import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { getRelativePosition } from 'chart.js/helpers';

@Component({
  selector: 'app-category-chart',
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.scss']
})
export class CategoryChartComponent implements OnInit {

  user: User = new User();
  allUsers: any = [];
  stocks = 0;
  etf = 0;
  krypto = 0;
  realEstate = 0;
  bonds = 0;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getUser();
    this.checkAllUsers();
  }


  checkAllUsers() {
    this.checkUsersStocks();
    this.checkUsersEtf();
    this.checkUsersKrypto();
    this.checkUsersRealEstate();
    this.checkUsersBonds();
    this.createChar();
  }


  checkUsersStocks() {
    for (const user of this.allUsers) {
      if (user.category.includes('stocks')) {
        this.stocks++;
      }
    }
    console.log('stocks', this.stocks);
  }


  checkUsersEtf() {
    this.allUsers.forEach((element: { category: string | string[]; }) => {
      if (element.category.includes('etf')) {
        this.etf++;
      }
    });
    console.log('etf', this.etf);
  }


  checkUsersKrypto() {
    this.allUsers.forEach((element: { category: string | string[]; }) => {
      if (element.category.includes('krypto')) {
        this.krypto++;
      }
    });
    console.log('krypto', this.krypto);
  }


  checkUsersRealEstate() {
    this.allUsers.forEach((element: { category: string | string[]; }) => {
      if (element.category.includes('real-estate')) {
        this.realEstate++;
      }
    });
    console.log('realEstate', this.realEstate);
  }


  checkUsersBonds() {
    this.allUsers.forEach((element: { category: string | string[]; }) => {
      if (element.category.includes('bonds')) {
        this.bonds++;
      }
    });
    console.log('bonds', this.bonds);
  }

  
  getUser() {
      this.firestore
        .collection('users')
        .valueChanges({idField: 'customIdName'})
        .subscribe((changes: any) => {
          console.log('Recived changes from DB', changes);
          this.allUsers = changes;
        });

      console.log('allUsers', this.allUsers);
    }
  


  createChar() {
    let canvas = <HTMLCanvasElement> document.getElementById('myChart'); // node
    let ctx: any = canvas.getContext('2d'); // 2d context
  
    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Stocks', 'ETF', 'Krypto', 'Real-Estate', 'Bonds'],
            datasets: [{
                label: '# of all Assets',
                data: [this.stocks, this.etf, this.krypto, this.realEstate, this.bonds],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

  }

}