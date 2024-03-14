import { Component, OnInit } from '@angular/core';
import { HomepageSidebarComponent } from '../../components/homepage-sidebar/homepage-sidebar.component';
import { HomepageMaincontentComponent } from '../../components/homepage-maincontent/homepage-maincontent.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
// import { ProductService } from '../../product.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HomepageSidebarComponent, HomepageMaincontentComponent, NavbarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})


export class HomepageComponent implements OnInit {
  categoryData7: string[] = [];
  productData7: Product[] = [];
  filteredProductData: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProductData(); // Fetch initial product data
  }

  fetchProductData(query: string = '') {
    const apiUrl = 'http://localhost:3000/product/search';
    const params = query ? { params: { query } } : {};

    this.http.get<any>(apiUrl, params).subscribe(
      response => {
        console.log('API Response:', response); 
        if (response.results && response.results.length > 0) {
          this.productData7 = response.results;
          this.categoryData7 = response.results.map((product: Product) => product.category);
          this.filteredProductData = this.productData7.slice(); // Initialize filtered data with all products
        }
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  handleSearchQueryChange(query: string) {
    this.fetchProductData(query); // Fetch filtered data based on the search query
  }
}