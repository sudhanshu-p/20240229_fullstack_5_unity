import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { OrderDetailsComponent } from '../../components/order-details/order-details.component';

@Component({
  selector: 'app-my-orders-seller',
  standalone: true,
  imports: [NavbarComponent, OrderDetailsComponent],
  templateUrl: './my-orders-seller.component.html',
  styleUrl: './my-orders-seller.component.css'
})
export class MyOrdersSellerComponent {
  message1:string="Order in progress"
  message2:string="Order completed"
}



