import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RatingAndReviewsComponent } from '../../components/rating-and-reviews/rating-and-reviews.component';
import { ImageCarousalComponent } from '../../components/image-carousal/image-carousal.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarComponent,RatingAndReviewsComponent,ImageCarousalComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  images: string[]=[
    "https://cdn.dummyjson.com/product-images/1/1.jpg",
"https://cdn.dummyjson.com/product-images/1/2.jpg",
"https://cdn.dummyjson.com/product-images/1/3.jpg",
"https://cdn.dummyjson.com/product-images/1/4.jpg",
"https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
  ]
}
