import * as CanvasJS from '../../../assets/js/canvasjs.min';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app.config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public numUsersRegistered: number;
  public numCategoriesRegistered: number;
  public numOrdersRegistered: number;
  public numRestaurantsRegistered: number;
  public bar: any;
  public userRegChart: any;
  public dataPreferedFood: Array<any>;


  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getNumUsers();
    this.getNumOrders();
    this.getNumCategories();
    this.getNumRestaurants();
    this.getFoodChartStats();
    this.showUserRegisteredChart();
  }

  getNumOrders() {
    this.http.get<number>(`${config.API_URL}/api/count/orders`).subscribe(response => {
      this.numOrdersRegistered = response;
    })
  }
  getOrders() {
    this.http.get<number>(`${config.API_URL}/api/count/orders`).subscribe(response => {
      this.numOrdersRegistered = response;
    })
  }

  getNumCategories() {
    this.http.get<number>(`${config.API_URL}/api/count/categories`).subscribe(response => {
      this.numCategoriesRegistered = response;
    })
  }

  getNumUsers() {
    this.http.get<number>(`${config.API_URL}/api/count/users`).subscribe(response => {
      this.numUsersRegistered = response;
    })
  }

  getNumRestaurants() {
    this.http.get<number>(`${config.API_URL}/api/count/restaurants`).subscribe(response => {
      this.numRestaurantsRegistered = response;
    })
  }

  getFoodChartStats(): void {
    this.http.get<Array<any>>(`${config.API_URL}/api/stats/orders`).subscribe(response => {
      this.dataPreferedFood= response;
      this.showBarChart();
    })
  }

  showBarChart() {
    var dps=[];
    this.dataPreferedFood.forEach(function (item, i) {
      dps.push({ y: parseInt(item.CantidadTotal), label: item.name });
    });
    
    this.bar = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Comidas más pedidas"
      },
      data: [{
        type: "pie",
        dataPoints: dps
      }]
    });

    this.bar.render();
  }

  showUserRegisteredChart() {
    this.userRegChart = new CanvasJS.Chart("chartUserRegistered",
      {
        animationEnabled: true,
        title: {
          text: "Usuarios registrados por mes"
        },
        data: [{
          type: "line",
          dataPoints: [
            { x: new Date(2019, 0, 1), y: 4 },
            { x: new Date(2019, 2, 1), y: 5 },
            { x: new Date(2019, 3, 1), y: 3 },
            { x: new Date(2019, 4, 1), y: 10 },
            { x: new Date(2020, 0, 1), y: 7 }
          ]
        }]
      });

    this.userRegChart.render();
  }
}