import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../product.service';


@Component({
  selector: 'app-inventory-management',
  standalone: true,
  imports: [NavbarComponent,ProductDetailsComponent,MatButtonModule, HttpClientModule],
  templateUrl: './inventory-management.component.html',
  styleUrl: './inventory-management.component.css'
})
export class InventoryManagementComponent{

    message: string = ''

}