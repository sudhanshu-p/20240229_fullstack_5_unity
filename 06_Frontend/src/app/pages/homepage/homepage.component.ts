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
  productData7:any = [];
  filteredProductData:any = [];
  query=''
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProductData(); // Fetch initial product data
  }

  fetchProductData(query: string = '') {
    const apiUrl = 'http://localhost:3000/product/search';
    const params = query ? { params: { query } } : {};

    this.http.get<any>(apiUrl, params).subscribe(
      {
        next:response => {
          console.log('API Response:', response); 
          if (response.results && response.results.length > 0) {
            //this.productData7 = response.results;
            this.productData7 = response.results.filter((p:any)=>{ return p.title.toLowerCase().includes(query.toLowerCase())})
            this.categoryData7 = this.productData7.map((product: any) => product.category);
            this.filteredProductData = this.productData7; // Initialize filtered data with all products
          }
        },
        error:error => {
          let pp = [
            {
              title:"Apple iphone 6",
              category: "smartphones",
              price: 100,
              imageUrl: "https://cdn.dummyjson.com/product-images/1/1.jpg"
            },
            {
              title:"Mi 7A",
              category: "smartphones",
              price: 100,
              imageUrl: "https://cdn.dummyjson.com/product-images/1/4.jpg"
            }
            ];
            this.productData7 = pp.filter(p=>{ return p.title.toLowerCase().includes(query.toLowerCase())})
            console.log("Prod", this.productData7)
            this.categoryData7 = this.productData7.map((product: any) => {return product.category});
            this.filteredProductData = this.productData7.slice();

          console.error('Error fetching products:', error);
        }
      }
    );
  }

  handleSearchQueryChange(query: string) {
    this.fetchProductData(query); // Fetch filtered data based on the search query
  }
}
