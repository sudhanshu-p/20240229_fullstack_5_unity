import { Component } from '@angular/core';
import { HomepageSidebarComponent } from '../components/homepage-sidebar/homepage-sidebar.component';
import { HomepageNavbarComponent } from '../components/homepage-navbar/homepage-navbar.component';
import { SearchpageMaincontentComponent } from '../components/searchpage-maincontent/searchpage-maincontent.component';


@Component({
  selector: 'app-searchpage',
  standalone: true,
  imports: [HomepageSidebarComponent,HomepageNavbarComponent,SearchpageMaincontentComponent],
  templateUrl: './searchpage.component.html',
  styleUrl: './searchpage.component.css'
})
export class SearchpageComponent {
  categoryData: Array<String> = ["New In", "Clothing", "Shoes", "Accessories", "Activewear", "Gifts & Living", "inspiration"];
  productData: Array<Product> = [
    {
      title: 'Apparel1',
      category: 'Clothing',
      price: 19.99,
      imageUrl: 'assets/basics@2x.png'
    },
    {
      title: 'Nike1',
      category: 'Shoes',
      price: 29.99,
      imageUrl: 'assets/untitled-design-2@2x.png'
    },
    {
      title: 'Tissot',
      category: 'Accessories',
      price: 14.99,
      imageUrl: 'assets/untitled-design-1-1@2x.png'
    }
  ]
}
