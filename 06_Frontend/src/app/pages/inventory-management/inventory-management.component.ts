import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-inventory-management',
  standalone: true,
  imports: [NavbarComponent,ProductDetailsComponent,MatButtonModule],
  templateUrl: './inventory-management.component.html',
  styleUrl: './inventory-management.component.css'
})
export class InventoryManagementComponent {
  message:string="All Product"

  constructor(private router: Router, private http: HttpClient) {} // Inject Router and HttpClient

  // Function to call the protected route
  async navigateToAddItem() {
    const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from local storage

    if (!token) {
      console.log("Missing token")
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` }); // Create Authorization header

    const data = {
      "title": "Mobile phone",
      "description": "iPhone 3Gs",
      "stock": 3000,
      "images": [
        "https://5.imimg.com/data5/NN/PW/XN/SELLER-8587078/11-500x500.jpg"
      ],
      "category": "Electonics ",
      "price": 43000,
      "reviews": [],
      "__v": 0,
      "trending": true,
      "thumbnailUrl": "https://5.imimg.com/data5/NN/PW/XN/SELLER-8587078/11-500x500.jpg"
    };

    try {
      const response = await this.http.post<any>('http://localhost:3000/seller/createProduct', data, { headers }).toPromise();
      // const response = await this.http.get<any>('http://localhost:3000/seller/createProduct', data, { headers }).toPromise();
      
      console.log('Data from protected route:', response);
    } catch (error) {
      // Handle errors (e.g., network error, unauthorized access)
      console.error('Error fetching data:', error);
    }
  }
}
