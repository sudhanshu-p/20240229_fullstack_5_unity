import { Component } from '@angular/core';
import { NewAddressFormComponent } from '../../components/new-address-form/new-address-form.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
// import { HomepageNavbarComponent } from '../../components/homepage-navbar/homepage-navbar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
declare var Razorpay: any;
@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    HttpClientModule,
    NewAddressFormComponent,
    MatRadioModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatInputModule, 
    MatFormFieldModule, 
    ReactiveFormsModule,
    NavbarComponent
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent {
  addressForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.addressForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      apartmentNumber: [''],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      console.log('Form submitted successfully!');
      console.log(this.addressForm.value);

      // Send HTTP POST request to backend API
      this.http.post<any>('http://localhost:3000/user/createAddress', this.addressForm.value)
        .subscribe(
          (response) => {
            console.log('Address added successfully:', response);
            // Handle success response, e.g., show success message
          },
          (error) => {
            console.error('Error adding address:', error);
            // Handle error response, e.g., show error message
          }
        );
    } else {
      console.log('Form is not valid!');
    }
  }
  loadRazorpaySdk() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        reject(false);
      };
      document.body.appendChild(script);
    });
  }
  
 /* payNow() {
    console.log("clicked");
    const options = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 300000,
      name: 'Arya',
      key: 'rzp_test_j7qFgqoX4YyrV9',
      image: '',
      prefill: {
        name:"Arya Deshmukh",
        email: 'deshmukharya61@gmail.com',
        contact: '9322953799',
      },
      theme: {
        color: '#f37254',
      },
      modal: {
        ondismiss: () => {
          console.log('Payment dismissed');
        },
      },
    };

    const successCallback = (paymentId: any) => {
      console.log('Payment successful with ID:', paymentId);
    };

    const failureCallback = (error: any) => {
      console.error('Payment failed with error:', error);
    };

    Razorpay.open(options, successCallback, failureCallback);
  }
}

*/
async payNow() {
  console.log("clicked");

  // Ensure the Razorpay SDK is loaded
  try {
    await this.loadRazorpaySdk();
    console.log('Razorpay SDK loaded successfully');
  } catch (error) {
    console.error('Failed to load Razorpay SDK', error);
    return;
  }

  // Razorpay SDK is now loaded, proceed with creating Razorpay instance
  const options = {
    // your options here
    description: 'Sample Razorpay demo',
    currency: 'INR',
    amount: 50000,
    name: 'Arya',
    key: 'rzp_test_j7qFgqoX4YyrV9',
    image: '',
    prefill: {
      name:"Arya Deshmukh",
      email: 'deshmukharya61@gmail.com',
      contact: '9322953799',
    },
    theme: {
      color: '#f37254',
    },
    modal: {
      ondismiss: () => {
        console.log('Payment dismissed');
      },
    },

  };

  const successCallback = (paymentId: any) => {
    console.log('Payment successful with ID:', paymentId);
  };

  const failureCallback = (error: any) => {
    console.error('Payment failed with error:', error);
  };

  // Create a new instance of Razorpay
  const rzp = new Razorpay(options);
  rzp.on('payment.success', successCallback);
  rzp.on('payment.failure', failureCallback);
  rzp.open();
}
}