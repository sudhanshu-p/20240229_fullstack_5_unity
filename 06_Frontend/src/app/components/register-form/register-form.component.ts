import { Component, Input,Output,EventEmitter, OnInit } from '@angular/core';
import { EmailInputComponent } from '../../components/email-input/email-input.component';
import { PasswordInputComponent } from '../../components/password-input/password-input.component';
import { UsernameInputComponent } from '../../components/username-input/username-input.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MyErrorStateMatcher } from '../../classes'; 

// import { PhoneInputComponent } from '../../components/phone-input/phone-input.component';


@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    EmailInputComponent,
    PasswordInputComponent,
    UsernameInputComponent,
    ReactiveFormsModule,
  
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent  {

  @Input() userRole: 'user' | 'seller' = 'user';
  signupForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router) 
  {
    this.signupForm = this.formBuilder.group({
      username: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required]],
    });
  }

  onSubmit() {
    console.log("submit pressed");
    // if (this.signupForm.valid) {
      console.log('Form submitted successfully!');
      console.log(this.signupForm.value);
      const userData = {
        username:this.signupForm.value.username,
        email:this.signupForm.value.email,
        password:this.signupForm.value.password,
        role: 'user'
      }
      this.http.post('http://localhost:3000/auth/signup',userData).subscribe({
        next: (response) => {
          // Handle the response if needed
          console.log('Signup successful', response);
        },
        error: (error) => {
          // Handle any errors here
          console.error('Signup failed', error);
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
  const value2 = this.usernameFormControl.value;
  this.usernameFormControl.reset();
  this.usernameFormControl.setValue(value2);
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


