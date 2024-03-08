import { Component } from '@angular/core';
import { EmailInputComponent } from '../../components/email-input/email-input.component';
import { PasswordInputComponent } from '../../components/password-input/password-input.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    EmailInputComponent,
    PasswordInputComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

}
