import { Component, Input } from '@angular/core';
import { EmailInputComponent } from '../../components/email-input/email-input.component';
import { PasswordInputComponent } from '../../components/password-input/password-input.component';
import { UsernameInputComponent } from '../../components/username-input/username-input.component';
// import { PhoneInputComponent } from '../../components/phone-input/phone-input.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    EmailInputComponent,
    PasswordInputComponent,
    UsernameInputComponent
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  /** Enum for input */
  @Input() userRole: 'user' | 'seller' = 'user'
}
