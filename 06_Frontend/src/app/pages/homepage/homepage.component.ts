import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


import { HomepageSidebarComponent } from '../../components/homepage-sidebar/homepage-sidebar.component';
import { HomepageMaincontentComponent } from '../../components/homepage-maincontent/homepage-maincontent.component';
// import { HomepageNavbarComponent } from '../../components/homepage-navbar/homepage-navbar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HomepageSidebarComponent, HomepageMaincontentComponent, NavbarComponent],
  // template: `
  //   <app-homepage-sidebar [categoryData]="categoryData7"></app-homepage-sidebar>
  //   <app-homepage-maincontent [productData]="productData7"></app-homepage-maincontent>
  // `,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent implements OnInit {
  categoryData7: string[] = [];
  productData7: Product[] = [];
  productTitles7: string[] = [];
  productPrice7: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/product/getTrendingProducts').pipe(
      catchError(error => {
        console.error('Error fetching trending products:', error);
        return throwError(error);
      })
    ).subscribe(response => {
      // Check if response contains products array
      if (response.products && response.products.length > 0) {
        // Assuming products array is directly returned in the response
        // Extract thumbnailUrls and categories from the response
        this.productData7 = response.products.map((product: { thumbnailUrl: any; }) => product.thumbnailUrl);
        this.productData7 = response.products.map((product: { thumbnailUrl: any; }) => product.thumbnailUrl);
        this.productData7 = response.products.map((product: { thumbnailUrl: any; }) => product.thumbnailUrl);
        this.categoryData7 = response.products.map((product: { category: any; }) => product.category);
      }
    });
  }
}