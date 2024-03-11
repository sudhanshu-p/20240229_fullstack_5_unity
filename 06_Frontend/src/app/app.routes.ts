import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { MyOrdersBuyersComponent } from './pages/my-orders-buyers/my-orders-buyers.component';
import { MyOrdersSellerComponent } from './pages/my-orders-seller/my-orders-seller.component';
import { InventoryManagementComponent } from './pages/inventory-management/inventory-management.component';

export const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: 'product', component: ProductComponent },
{ path: 'myorderbuyer', component: MyOrdersBuyersComponent},
{ path: 'myorderseller', component: MyOrdersSellerComponent},
{ path: 'inventory', component: InventoryManagementComponent},

];
