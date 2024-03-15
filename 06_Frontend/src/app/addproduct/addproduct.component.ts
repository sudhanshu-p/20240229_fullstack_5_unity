
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../components/navbar/navbar.component';
@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [
    ReactiveFormsModule,NavbarComponent,
  ],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
  submitForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.submitForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      stock: ['', [Validators.required, Validators.min(1)]],
      thumbnail: ['', [Validators.required]],
      image: ['', [Validators.required]], // Assuming single image URL for simplicity
      category: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      discountprice: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.submitForm.valid) {
      console.log('Form submitted successfully!');
      console.log(this.submitForm.value);

      // Convert image URLs field to an array if using comma-separated values
      const formValues = {
        ...this.submitForm.value,
        images: this.submitForm.value.image.split(',').map((url: string) => url.trim()), // Split string by commas and trim
      };

      this.http.post('http://localhost:3000/seller/createProduct', formValues).subscribe({
        next: (response) => {
          console.log('Product submitted successfully', response);
          // Redirect or show success message
        },
        error: (error) => {
          console.error('Submission failed', error);
          // Show error message
        }
      });
    } else {
      console.log('Form is not valid!');
    }
  }


}
