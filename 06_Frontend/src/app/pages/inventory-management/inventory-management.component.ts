import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-inventory-management',
  standalone: true,
  imports: [NavbarComponent,ProductDetailsComponent,MatButtonModule],
  templateUrl: './inventory-management.component.html',
  styleUrl: './inventory-management.component.css'
})
export class InventoryManagementComponent {
  message:string="All Product"
}
