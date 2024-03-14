// import { Component, Input, Inject, OnInit } from '@angular/core';
// import {MatTableModule} from '@angular/material/table';
// import {MatButtonModule} from '@angular/material/button';
// import {MatChipsModule} from '@angular/material/chips';
// import { HttpClient } from '@angular/common/http';


// const ELEMENT_DATA= [
//   {
//     "id": 1,
//     "title": "iPhoneadsfffffffffffasdfafdadfadffff 9",
//     "description": "An apple mobile which is nothing like apple",
//     "price": 549,
//     "discountPercentage": 12.96,
//     "rating": 4.69,
//     "stock": 94,
//     "brand": "Apple",
//     "category": "smartphones",
//     "status": "In progress",
//     'ordersCompleted':400,
//     "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
//     "images": [
//     "https://cdn.dummyjson.com/product-images/1/1.jpg",
//     "https://cdn.dummyjson.com/product-images/1/2.jpg",
//     "https://cdn.dummyjson.com/product-images/1/3.jpg",
//     "https://cdn.dummyjson.com/product-images/1/4.jpg",
//     "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
//     ]
//     },
//   {
//     "id": 1,
//     "title": "iPhoneadsfffffffffffasdfafdadfadffff 9",
//     "description": "An apple mobile which is nothing like apple",
//     "price": 549,
//     "discountPercentage": 12.96,
//     "rating": 4.69,
//     "stock": 94,
//     "brand": "Apple",
//     "category": "smartphones",
//     "status": "In progress",
//     'ordersCompleted':400,
//     "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
//     "images": [
//     "https://cdn.dummyjson.com/product-images/1/1.jpg",
//     "https://cdn.dummyjson.com/product-images/1/2.jpg",
//     "https://cdn.dummyjson.com/product-images/1/3.jpg",
//     "https://cdn.dummyjson.com/product-images/1/4.jpg",
//     "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
//     ]
//     },
//   {
//     "id": 1,
//     "title": "iPhoneadsfffffffffffasdfafdadfadffff 9",
//     "description": "An apple mobile which is nothing like apple",
//     "price": 549,
//     "discountPercentage": 12.96,
//     "rating": 4.69,
//     "stock": 94,
//     "brand": "Apple",
//     "category": "smartphones",
//     "status": "In progress",
//     'ordersCompleted':400,
//     "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
//     "images": [
//     "https://cdn.dummyjson.com/product-images/1/1.jpg",
//     "https://cdn.dummyjson.com/product-images/1/2.jpg",
//     "https://cdn.dummyjson.com/product-images/1/3.jpg",
//     "https://cdn.dummyjson.com/product-images/1/4.jpg",
//     "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
//     ]
//     },
//   {
//     "id": 1,
//     "title": "iPhoneadsfffffffffffasdfafdadfadffff 9",
//     "description": "An apple mobile which is nothing like apple",
//     "price": 549,
//     "discountPercentage": 12.96,
//     "rating": 4.69,
//     "stock": 94,
//     "brand": "Apple",
//     "category": "smartphones",
//     "status": "In progress",
//     'ordersCompleted':400,
//     "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
//     "images": [
//     "https://cdn.dummyjson.com/product-images/1/1.jpg",
//     "https://cdn.dummyjson.com/product-images/1/2.jpg",
//     "https://cdn.dummyjson.com/product-images/1/3.jpg",
//     "https://cdn.dummyjson.com/product-images/1/4.jpg",
//     "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
//     ]
//     },
// ];

// @Component({
//   selector: 'app-product-details',
//   standalone: true,
//   imports: [MatTableModule,MatChipsModule,MatButtonModule],
//   templateUrl: './product-details.component.html',
//   styleUrl: './product-details.component.css'
// })
// export class ProductDetailsComponent implements OnInit{
//   @Input() message:string=""
//   displayedColumns: string[] = ['image','title', 'price', 'stock', 'category','description','completed','action',];
//   dataSource = ELEMENT_DATA;
//   httpClient = Inject(HttpClient);
//   data: any[] = []
//   ngOnInit(): void {
//     this.fetchData();
//   }
//   fetchData(){
//     this.httpClient
//     .get('http://localhost:3000/product/search')
//     .subscribe((data: any) => {
//       console.log(data);
//       this.data = data;
//     })
//   }
// }
import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatTableModule, MatChipsModule, MatButtonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  @Input() message: string = ""; // Apply @Input decorator here
  displayedColumns: string[] = ['image', 'title', 'price', 'stock', 'category', 'description', 'completed', 'action'];
  dataSource = [];
  
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient
      .get('http://localhost:3000/product/')
      .subscribe((data: any) => {
        console.log(data);
        this.dataSource = data; // Assign data to dataSource instead of this.data
      });
  }
  
}
