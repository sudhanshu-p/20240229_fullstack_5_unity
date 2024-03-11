import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { OrderDetailsComponent } from '../../components/order-details/order-details.component';

@Component({
  selector: 'app-my-orders-buyers',
  standalone: true,
  imports: [NavbarComponent, OrderDetailsComponent],
  templateUrl: './my-orders-buyers.component.html',
  styleUrl: './my-orders-buyers.component.css'
})
export class MyOrdersBuyersComponent {
  message1:string="Order in progress"
  message2:string="Order completed"

}
