
import { CommonModule } from '@angular/common';
import { ProductService } from '../../productService'; 
import { HttpClient } from '@angular/common/http';
import { Component,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ProductPipe } from '../../components/homepage-maincontent/product.pipe';
import { HomepageSidebarComponent } from '../../components/homepage-sidebar/homepage-sidebar.component';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,CommonModule,FormsModule,ProductPipe,HomepageSidebarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent  implements OnInit {
  product: any[] = []; // Define an array to store product data
  searchText: string = '';

  constructor(private http: HttpClient) { }

  onSearchChange(): void {
    this.filterCars();
  }

  ngOnInit() {
    this.fetchCarDetails();
  }
  
  // Add filterUsers method to filter the users array
  filterCars(): void {
    if (this.searchText) {
      this.product = this.product.filter((product: any) =>
        product.title.toLowerCase().includes(this.searchText.toLowerCase())  ||
        product.category.toLowerCase().includes(this.searchText.toLowerCase()) ||
        product.price.toString().toLowerCase().includes(this.searchText.toLowerCase())
        
      );
    } else {
      // If searchText is empty, reset the cars array to the original list
      this.fetchCarDetails();
    }
  }

  fetchCarDetails() {
    this.http.get<any>('http://localhost:3000/product/getAllProducts').subscribe({
      next: (response) => {
        console.log(response);
        this.product = response.products; // Assuming 'products' is the key containing the array of products
      },
      error: (err) => {
        console.error('Error fetching product data:', err);
      }
    });
  }
}