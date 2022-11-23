import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { getRelativePosition } from 'chart.js/helpers';
import { getFirestore, collection, getDocs } from "firebase/firestore";

@Component({
  selector: 'app-gender-chart',
  templateUrl: './gender-chart.component.html',
  styleUrls: ['./gender-chart.component.scss']
})
export class GenderChartComponent implements OnInit {

  user: User = new User();
  userId:string;
  allUsers: any = [];
  male = 0;
  female = 0;

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
      this.allUsers.forEach((user: any) => {
        let userGender = user.gender;
        if (userGender == 'assets/img/Male.png') {
          this.male++;
        } 
        if (userGender == 'assets/img/Female.png') {
          this.female++;
        }
      });
      
      this.createChart();
    }
  

    createChart() {
      let canvas = <HTMLCanvasElement> document.getElementById('myChartGender'); // node
      let ctx: any = canvas.getContext('2d'); // 2d context
    
      let myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: ['female', 'male'],
              datasets: [{
                  label: 'of all Users',
                  data: [this.female, this.male],
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
