import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { MyOrdersBuyersComponent } from './pages/my-orders-buyers/my-orders-buyers.component';

export const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: 'product', component: ProductComponent },
{ path: 'myorderseller', component: MyOrdersBuyersComponent}];
