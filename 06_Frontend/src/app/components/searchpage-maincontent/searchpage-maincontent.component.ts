import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchpage-maincontent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searchpage-maincontent.component.html',
  styleUrl: './searchpage-maincontent.component.css'
})

export class SearchpageMaincontentComponent {
  @Input() productData: Array<Product> = [
    {
      category: 'Clothing',
      price: 19.99,
      imageUrl: '../../../src/assets/basics@2x.png'
    }
  ];
}
