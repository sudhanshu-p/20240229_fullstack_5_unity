import { Component } from '@angular/core';
import { HomepageSidebarComponent } from '../../components/homepage-sidebar/homepage-sidebar.component';
import { HomepageMaincontentComponent } from '../../components/homepage-maincontent/homepage-maincontent.component';
import { HomepageNavbarComponent } from '../../components/homepage-navbar/homepage-navbar.component';
// import { NavbarComponent } from '../../components/navbar/navbar.component';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HomepageSidebarComponent, HomepageMaincontentComponent, HomepageNavbarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  categoryData: Array<String> = ["New In", "Clothing", "Shoes", "Accessories", "Activewear", "Gifts & Living", "inspiration"];
  productData: Array<String> = [
     "assets/image-41@2x.png","assets/image-42@2x.png","assets/w3@2x.png","assets/w4-1@2x.png"
  ]
}
