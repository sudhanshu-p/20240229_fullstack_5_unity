import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-homepage-maincontent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage-maincontent.component.html',
  styleUrl: './homepage-maincontent.component.css'
})
export class HomepageMaincontentComponent {
  @Input() productData: Array<Product> = [
    {
      category: 'Clothing',
      price: 19.99,
      imageUrl: '../../../src/assets/w4-1@2x.png'
    }
  ];
  @Input() filteredProductData: Product[] = [];
}
