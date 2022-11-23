import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { getRelativePosition } from 'chart.js/helpers';
import { getFirestore, collection, getDocs } from "firebase/firestore";


@Component({
  selector: 'app-age-chart',
  templateUrl: './age-chart.component.html',
  styleUrls: ['./age-chart.component.scss']
})
export class AgeChartComponent implements OnInit {

  user: User = new User();
  allUsers: any = [];
  currentYear = new Date().getFullYear();
  age18_30 = 0;
  age30_40 = 0;
  age40_50 = 0;
  age50_60 = 0;
  age60Plus = 0;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getUser();
  }

  
  async getUser() {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.allUsers.push(doc.data());
      });
      console.log(this.allUsers);
      this.checkAllUsers();
    }


    checkAllUsers() {
      let userAge;
      this.allUsers.forEach((user: any) => {
        const milliseconds = user.birthDate;
        const dateObject = new Date(milliseconds);
        let userBirthYear = dateObject.getFullYear();
        let userAge = this.currentYear - userBirthYear;
        console.log(userAge);
        this.checkUserAge(userAge);
      });
      this.createChart();
    }


    checkUserAge(age: any) {
      if (age > 60) {
        this.age60Plus++;
      }
      if (age < 60 && age > 50) {
        this.age50_60++;
      }
      if (age < 50 && age > 40) {
        this.age40_50++;
      }
      if (age < 40 && age > 30) {
        this.age30_40++;
      }
      if (age < 30) {
        this.age18_30++;
      }
    }
  

    createChart() {
      let canvas = <HTMLCanvasElement> document.getElementById('myChartAge'); // node
      let ctx: any = canvas.getContext('2d'); // 2d context
    
      let myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: ['18-30', '30-40', '40-50', '50-60', '60+'],
              datasets: [{
                  label: 'of all Users',
                  data: [this.age18_30, this.age30_40, this.age40_50, this.age50_60, this.age60Plus],
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
                      beginAtZero: true,
                      ticks: {
                        display: false
                      },
                      grid: {
                        display: false,
                        drawTicks: false
                      }
                  }
              },
              responsive: true
          }
      });
  
    }

}
