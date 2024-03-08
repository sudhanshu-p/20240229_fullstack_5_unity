import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ImageSliderComponent } from '../../components/image-slider/image-slider.component';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarComponent,ImageSliderComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
