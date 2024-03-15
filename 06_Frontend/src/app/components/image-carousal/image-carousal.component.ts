import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route } from '@angular/router';
import { response } from 'express';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-image-carousal',
  templateUrl: './image-carousal.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./image-carousal.component.css']
})
export class ImageCarousalComponent implements OnInit {
  /*@Input() images: string[] = []; // Array of image objects (src and alt)
  currentIndex = 0;

  ngOnInit() { }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }*/
  productId: any;
  productDetail: any; // Initialize as an object

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (data: any) => {
        this.productId = data._id;
        this.fetchProduct(); 
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  fetchProduct() {
    this.http.get(`http://localhost:3000/product/getProductById?productId=${this.productId}`).subscribe({
      next: (response: any) => {
        this.productDetail= response;
  // Assign the response directly to productDetail
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
