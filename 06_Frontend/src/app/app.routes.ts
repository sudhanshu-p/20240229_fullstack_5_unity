import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { SellerDashboardComponent } from './pages/seller-dashboard/seller-dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    // Register for user
    { path: 'register', component: RegisterComponent, data: { role: "user" } },
    // Register for seller
    { path: 'register-seller', component: RegisterComponent, data: { role: "seller" } },
    // Checkout
    { path: 'checkout', component: CheckoutPageComponent },
    // Seller's Dashboard
    { path: 'seller/home', component: SellerDashboardComponent },
];
