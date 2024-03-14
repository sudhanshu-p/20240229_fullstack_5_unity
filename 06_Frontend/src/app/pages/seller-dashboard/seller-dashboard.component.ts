import { Component } from '@angular/core';

import { SellerChartComponent } from '../../components/seller-chart/seller-chart.component';
import { SellerNavComponent } from '../../components/seller-nav/seller-nav.component';

import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [MatDatepickerModule, MatFormFieldModule, SellerChartComponent, SellerNavComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent {
  totalSales = 3
  totalOrders = 3
}
