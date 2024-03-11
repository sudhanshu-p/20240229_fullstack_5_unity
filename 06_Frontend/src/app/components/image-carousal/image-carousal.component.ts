import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-image-carousal',
  templateUrl: './image-carousal.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./image-carousal.component.css']
})
export class ImageCarousalComponent implements OnInit {
  @Input() images: string[] = []; // Array of image objects (src and alt)
  currentIndex = 0;

  ngOnInit() { }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
