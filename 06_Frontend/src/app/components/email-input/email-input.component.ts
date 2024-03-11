import { Component } from '@angular/core';

import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MyErrorStateMatcher } from '../../classes'; 

@Component({
  selector: 'app-email-input',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './email-input.component.html',
  styleUrl: './email-input.component.css',
})
export class EmailInputComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  resetController() {
    const value = this.emailFormControl.value;
    this.emailFormControl.reset();
    this.emailFormControl.setValue(value);
  }

  matcher = new MyErrorStateMatcher();
}
