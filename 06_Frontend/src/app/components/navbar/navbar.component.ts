import { Component,Output, EventEmitter,Input,OnInit } from '@angular/core';
import { HomepageMaincontentComponent } from '../homepage-maincontent/homepage-maincontent.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../productService'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ProductPipe } from '../homepage-maincontent/product.pipe';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();

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
