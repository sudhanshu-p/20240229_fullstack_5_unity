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
      
    };

    try {
      const response = await this.http.get<any>('http://localhost:3000/seller/createProduct', { headers }).toPromise();
      // const response = await this.http.get<any>('http://localhost:3000/seller/createProduct', data, { headers }).toPromise();
      
      console.log('Data from protected route:', response);
    } catch (error) {
      // Handle errors (e.g., network error, unauthorized access)
      console.error('Error fetching data:', error);
    }
  }
}
