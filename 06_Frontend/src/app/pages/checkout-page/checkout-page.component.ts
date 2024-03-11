import { Component } from '@angular/core';

import { NewAddressFormComponent } from '../../components/new-address-form/new-address-form.component';

import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    NewAddressFormComponent,
    MatRadioModule,
    FormsModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent {
  selectedAddress: string = 'New Address';
  allAddresses: string[] = ['Address 1', 'Address 2'];
  new_address: string = "New Address"
}