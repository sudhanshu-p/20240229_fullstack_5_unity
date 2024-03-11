import { Component } from '@angular/core';

@Component({
  selector: 'app-rating-and-reviews',
  standalone: true,
  imports: [],
  templateUrl: './rating-and-reviews.component.html',
  styleUrl: './rating-and-reviews.component.css'
})
export class RatingAndReviewsComponent {
  rating: number=4.6;
  ReviewNum: number= 7;

  get stars() {
    console.log(Array(Math.floor(this.rating)).fill(0))
    return Array(Math.floor(this.rating)).fill(0);
  }
}
