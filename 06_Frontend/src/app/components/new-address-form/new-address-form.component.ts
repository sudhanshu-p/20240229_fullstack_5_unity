import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-address-form',
  standalone: true,
  imports: [
    MatInputModule, MatFormFieldModule, FormsModule
  ],
  templateUrl: './new-address-form.component.html',
  styleUrl: './new-address-form.component.css'
})
export class NewAddressFormComponent {
  address: Address = {
    firstName: '',
    lastName: '',
    streetAddress: '',
    apartmentNumber: '',
    state: '',
    zipcode: 0,
  }
}
