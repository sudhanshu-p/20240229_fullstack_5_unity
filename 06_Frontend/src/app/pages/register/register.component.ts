import { Component, OnInit } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RegisterFormComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  // This is to differentiate between the user and the seller.
  userRole: 'user' | 'seller' = 'user' // Default value being user

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userRole = this.route.snapshot.data['role']
  }
}
