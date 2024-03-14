// import { Component, OnInit } from '@angular/core';
// import Chart from 'chart.js/auto';

// @Component({
//   selector: 'app-seller-chart',
//   templateUrl: './seller-chart.component.html',
//   standalone: true,
//   styleUrls: ['./seller-chart.component.css']
// })
// export class SellerChartComponent implements OnInit {

//   labels = [
//     '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
//   ]

//   data = [
//     [481, 457, 504, 522, 598, 497, 572, 497, 527, 518, 418, 439, 401, 477, 452, 410, 517, 535, 443, 449, 447, 582, 420, 420, 455, 579, 506, 533, 550, 457, 597],
//     [494, 499, 499, 535, 563, 573, 415, 473, 596, 539, 536, 565, 557, 497, 557, 588, 445, 411, 441, 510, 526, 522, 555, 551, 475, 422, 456, 489, 595, 438, 551]
//   ]


//   constructor() { }

//   ngOnInit(): void {
//     this.createChart();
//   }
//   public chart: any;

//   createChart() {

//     this.chart = new Chart("MyChart", {
//       type: 'line', //this denotes tha type of chart

//       data: {// values on X-Axis
//         labels: this.labels,
//         datasets: [
//           {
//             label: "January",
//             data: this.data[0],
//             backgroundColor: 'blue'
//           },
//           {
//             label: "February",
//             data: this.data[1],
//             backgroundColor: 'limegreen'
//           }
//         ]
//       },
//       options: {
//         aspectRatio: 2.5
//       }

//     });
//   }

// }