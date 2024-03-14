import { Component, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [MatTableModule,MatChipsModule,MatButtonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})

export class OrderDetailsComponent {
  @Input() message: string = "";
  displayedColumns: string[] = ['image', 'price', 'status', 'action', 'cancel-order'];
  dataSource: any[] = []; // Initialize dataSource as an empty array

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchData(); // Fetch data when component initializes
  }

  fetchData() {
    this.http.get<any[]>('http://localhost:3000/seller/get') // Adjust URL as per your backend API
      .subscribe(
        (data) => {
          console.log('Fetched data:', data);
          this.dataSource = data; // Update dataSource with fetched data
        },
        (error) => {
          console.error('Error fetching data:', error);
          // Handle error appropriately (e.g., show error message)
        }
      );
  }

}
