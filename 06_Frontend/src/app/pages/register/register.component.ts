import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RegisterFormComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
