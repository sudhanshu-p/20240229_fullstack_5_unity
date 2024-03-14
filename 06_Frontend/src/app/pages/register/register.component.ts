import { Component, OnInit,Input } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RegisterFormComponent,
    ReactiveFormsModule,
    NavbarComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  // This is to differentiate between the user and the seller.
  @Input() userRole: 'user' | 'seller' = 'user'; // Ensure this is here

  constructor(private route: ActivatedRoute) { 
    console.log(this.userRole)
  }

  ngOnInit(): void {
    this.userRole = this.route.snapshot.data['role']
  }
}


