import { Routes } from '@angular/router';

// Importing the page components
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { MyOrdersBuyersComponent } from './pages/my-orders-buyers/my-orders-buyers.component';
import { MyOrdersSellerComponent } from './pages/my-orders-seller/my-orders-seller.component';
import { InventoryManagementComponent } from './pages/inventory-management/inventory-management.component';
import { RegisterComponent } from './pages/register/register.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { SellerDashboardComponent } from './pages/seller-dashboard/seller-dashboard.component';
import { OrderDetailsBuyerComponent } from './components/order-details-buyer/order-details-buyer.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomepageComponent },
    { path: 'product', component: ProductComponent },
    { path: 'myorderbuyer', component: MyOrdersBuyersComponent },
    { path: 'myorderseller', component: MyOrdersSellerComponent },
    { path: 'inventory', component: InventoryManagementComponent },
    { path: 'login', component: LoginComponent },
    // Register for user
    { path: 'register', component: RegisterComponent, data: { role: "user" } },
    // Register for seller
    { path: 'register-seller', component: RegisterComponent, data: { role: "seller" } },
    // Checkout
    { path: 'checkout', component: CheckoutPageComponent },
    // Seller's Dashboard
    { path: 'seller/home', component: SellerDashboardComponent },
    { path: 'search', component: SearchpageComponent },
    { path: 'orderDetails', component: OrderDetailsBuyerComponent }
];
