import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    // Register for user
    { path: 'register', component: RegisterComponent, data: { role: "user" } },
    // Register for seller
    { path: 'register-seller', component: RegisterComponent, data: { role: "seller" } },
];
