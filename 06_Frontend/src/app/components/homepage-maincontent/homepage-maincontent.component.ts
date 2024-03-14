import { CommonModule } from '@angular/common';
import { ProductService } from '../../productService'; 
import { HttpClient } from '@angular/common/http';
import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage-maincontent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage-maincontent.component.html',
  styleUrl: './homepage-maincontent.component.css'
})
export class HomepageMaincontentComponent {
  @Input() productData: Array<String> = [];


}
