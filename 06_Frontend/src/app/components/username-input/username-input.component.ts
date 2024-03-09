import { Component } from '@angular/core';

// Angular Material based imports
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

/** Angular Material based class to handle matching of error state */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    // Converting possibly falsy / other values to boolean
    return !!(
      control &&
      control.invalid &&
      control.touched
    );
  }
}

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
