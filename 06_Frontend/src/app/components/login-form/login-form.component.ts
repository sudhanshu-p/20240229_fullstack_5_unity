import { Component,Output,EventEmitter } from '@angular/core';
import { EmailInputComponent } from '../../components/email-input/email-input.component';
import { PasswordInputComponent } from '../../components/password-input/password-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MyErrorStateMatcher } from '../../classes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    EmailInputComponent,
    PasswordInputComponent,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  // Define an event emitter to notify the parent component about the user role change
  @Output() userRoleChange: EventEmitter<'user' | 'seller'> = new EventEmitter<'user' | 'seller'>();


  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private http:HttpClient, private router: Router) 
  {
    this.loginForm = this.formBuilder.group({
      username: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required]],
    });
  }

  onSubmit() {
    console.log("submit pressed");
    // if (this.signupForm.valid) {
      console.log('Form submitted successfully!');
      console.log(this.loginForm.value);
      const userData = {
        email:this.loginForm.value.email,
        password:this.loginForm.value.password
      }
      this.http.post('http://localhost:3000/auth/signin',userData).subscribe({
        next: (response) => {
          // Handle the response if needed
          console.log('Login successful', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          // Handle any errors here
          console.error('Login failed', error);
        }
      });
  // }
}
emailFormControl = new FormControl('', [
  Validators.required,
  Validators.email,
]);

resetController() {
  const value = this.emailFormControl.value;
  this.emailFormControl.reset();
  this.emailFormControl.setValue(value);
  const value3 = this.passwordFormControl.value;
  this.passwordFormControl.reset();
  this.passwordFormControl.setValue(value3);
}

usernameFormControl = new FormControl('', [
  // These are the conditions to be met
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(20),
]);

passwordFormControl = new FormControl('', [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(20),
]);



matcher = new MyErrorStateMatcher();

  
  }
