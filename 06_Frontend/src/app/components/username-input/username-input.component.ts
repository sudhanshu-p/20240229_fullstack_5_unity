import { Component } from '@angular/core';

// Angular Material based imports
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MyErrorStateMatcher } from '../../classes'; 

@Component({
  selector: 'app-username-input',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './username-input.component.html',
  styleUrl: './username-input.component.css',
})
export class UsernameInputComponent {
  usernameFormControl = new FormControl('', [
    // These are the conditions to be met
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
  ]);

  /** Resetting helps not show the error when in focus */
  resetController() {
    const value = this.usernameFormControl.value;
    this.usernameFormControl.reset();
    this.usernameFormControl.setValue(value);
  }

  matcher = new MyErrorStateMatcher();
}
