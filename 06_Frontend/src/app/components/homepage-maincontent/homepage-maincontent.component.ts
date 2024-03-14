import { CommonModule } from '@angular/common';
import { ProductService } from '../../productService'; 
import { HttpClient } from '@angular/common/http';
import { Component,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage-maincontent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage-maincontent.component.html',
  styleUrl: './homepage-maincontent.component.css'
})

export class  HomepageMaincontentComponent implements OnInit {
  productData: any[] = []; // Define an array to store product data

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/product/getAllProducts').subscribe({
      next: (response) => {
        console.log(response);
        this.productData = response.products; // Assuming 'products' is the key containing the array of products
      },
      error: (err) => {
        console.error('Error fetching product data:', err);
      }
    });
  }
}